import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers":
    "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface ModelRequest {
  task_type: string;
  tenant_id: string;
  document_id?: string;
  playbook_id?: string;
  input: string;
  context?: string[];
}

interface ModelResponse {
  model_used: string;
  task_type: string;
  output: unknown;
  tokens_used: number;
  cost_usd: number;
  duration_ms: number;
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

    const body: ModelRequest = await req.json();
    const startTime = Date.now();

    // Juris 1.0 Model Router Logic
    // Routes to appropriate model based on task_type, tenant policy, and risk level
    const modelSelection = selectModel(body.task_type);

    // For now, return a structured response indicating the model routing decision
    // In production, this would call the actual model API (OpenAI, Anthropic, or self-hosted)
    const response: ModelResponse = {
      model_used: modelSelection.model,
      task_type: body.task_type,
      output: {
        message: `Juris 1.0 (${modelSelection.model}) processed task: ${body.task_type}`,
        routing_reason: modelSelection.reason,
        status: "model_not_configured",
        note: "Configure JURIS_MODEL_API_KEY secret to enable AI processing",
      },
      tokens_used: 0,
      cost_usd: 0,
      duration_ms: Date.now() - startTime,
    };

    // Log the agent run
    const serviceClient = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    const { data: profile } = await serviceClient
      .from("profiles")
      .select("tenant_id")
      .eq("id", user.id)
      .maybeSingle();

    if (profile?.tenant_id) {
      await serviceClient.from("agent_runs").insert({
        tenant_id: profile.tenant_id,
        agent_type: "model_router",
        task_type: body.task_type,
        status: "completed",
        input_summary: body.input.substring(0, 200),
        output_summary: JSON.stringify(response.output).substring(0, 500),
        tokens_used: response.tokens_used,
        cost_usd: response.cost_usd,
        duration_ms: response.duration_ms,
        model_used: response.model_used,
        started_at: new Date(startTime).toISOString(),
        completed_at: new Date().toISOString(),
      });
    }

    return new Response(JSON.stringify(response), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Internal server error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});

function selectModel(taskType: string): { model: string; reason: string } {
  switch (taskType) {
    case "clause_extraction":
      return { model: "juris-1.0-extract", reason: "Fine-tuned small model for clause segmentation" };
    case "contract_review":
      return { model: "juris-1.0-review", reason: "Strong reasoning model with RAG for risk identification" };
    case "redline_draft":
      return { model: "juris-1.0-redline", reason: "Reasoning model with playbook context for edit generation" };
    case "compliance_mapping":
      return { model: "juris-1.0-compliance", reason: "Medium model with deterministic rules for control mapping" };
    case "legal_memo":
      return { model: "juris-1.0-memo", reason: "Reasoning model for structured memo generation with citations" };
    case "regulatory_impact":
      return { model: "juris-1.0-regulatory", reason: "Medium model for regulatory change classification" };
    default:
      return { model: "juris-1.0-general", reason: "Default model for general legal tasks" };
  }
}
