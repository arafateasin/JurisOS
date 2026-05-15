import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers":
    "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface ReviewRequest {
  document_id: string;
  playbook_id?: string;
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: "Missing authorization header" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_ANON_KEY")!,
      { global: { headers: { Authorization: authHeader } } }
    );

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return new Response(
        JSON.stringify({ error: "Unauthorized" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const body: ReviewRequest = await req.json();
    const startTime = Date.now();

    const serviceClient = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    // Get user's tenant
    const { data: profile } = await serviceClient
      .from("profiles")
      .select("tenant_id")
      .eq("id", user.id)
      .maybeSingle();

    if (!profile?.tenant_id) {
      return new Response(
        JSON.stringify({ error: "User has no tenant" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Verify document exists and belongs to tenant
    const { data: document } = await serviceClient
      .from("documents")
      .select("*")
      .eq("id", body.document_id)
      .eq("tenant_id", profile.tenant_id)
      .maybeSingle();

    if (!document) {
      return new Response(
        JSON.stringify({ error: "Document not found" }),
        { status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Create review record
    const { data: review, error: reviewError } = await serviceClient
      .from("reviews")
      .insert({
        tenant_id: profile.tenant_id,
        document_id: body.document_id,
        playbook_id: body.playbook_id || null,
        status: "in_progress",
        started_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (reviewError || !review) {
      return new Response(
        JSON.stringify({ error: "Failed to create review" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // In production, this would:
    // 1. Parse the document (extract text from PDF/DOCX)
    // 2. Segment into clauses
    // 3. Retrieve playbook rules
    // 4. Run Juris 1.0 Contract Review Agent
    // 5. Generate findings with source quotes
    // 6. Run guardrail checks
    // 7. Store findings
    // For now, mark as pending human configuration of AI model

    await serviceClient
      .from("reviews")
      .update({
        status: "pending",
        overall_risk: "medium",
        confidence_score: 0,
        findings_count: 0,
        completed_at: new Date().toISOString(),
      })
      .eq("id", review.id);

    // Log agent run
    await serviceClient.from("agent_runs").insert({
      tenant_id: profile.tenant_id,
      agent_type: "contract_review_agent",
      task_type: "contract_review",
      status: "completed",
      input_summary: `Review document: ${document.title}`,
      output_summary: "Review created. AI model pending configuration.",
      tokens_used: 0,
      cost_usd: 0,
      duration_ms: Date.now() - startTime,
      model_used: "juris-1.0-review",
      started_at: new Date(startTime).toISOString(),
      completed_at: new Date().toISOString(),
    });

    // Log audit event
    await serviceClient.from("audit_events").insert({
      tenant_id: profile.tenant_id,
      actor_type: "agent",
      actor_id: "contract_review_agent",
      action: "review.started",
      resource_type: "review",
      resource_id: review.id,
      result: "success",
      metadata: {
        document_id: body.document_id,
        playbook_id: body.playbook_id || null,
      },
    });

    return new Response(
      JSON.stringify({
        review_id: review.id,
        status: "pending",
        message: "Review created. Configure Juris 1.0 model API to enable AI-powered analysis.",
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Internal server error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
