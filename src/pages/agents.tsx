import { useEffect, useState } from "react"
import { Bot } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { supabase } from "@/lib/supabase"
import { useAuth } from "@/lib/auth"

interface AgentStats {
  agent_type: string
  total_runs: number
  last_run: string | null
  failed_runs: number
}

const agentDescriptions: Record<string, string> = {
  contract_review_agent: "Reviews NDAs, MSAs, DPAs against playbooks",
  redline_agent: "Generates redlines using fallback clause library",
  legal_memo_agent: "Creates risk memos with source citations",
  compliance_agent: "Collects and maps evidence to controls",
  regulatory_monitor: "Tracks regulatory changes and impact",
  model_router: "Routes tasks to appropriate AI models",
  research_agent: "Conducts grounded legal research",
  negotiation_agent: "Tracks counterparty positions and strategy",
}

export function AgentsPage() {
  const { profile, loading: authLoading } = useAuth()
  const [agents, setAgents] = useState<AgentStats[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (authLoading) return
    if (!profile?.tenant_id) {
      setLoading(false)
      return
    }
    fetchAgentStats()
  }, [profile?.tenant_id, authLoading])

  async function fetchAgentStats() {
    const { data } = await supabase
      .from("agent_runs")
      .select("agent_type, status, created_at")
      .eq("tenant_id", profile!.tenant_id!)
      .order("created_at", { ascending: false })

    if (!data) {
      setLoading(false)
      return
    }

    const statsMap = new Map<string, AgentStats>()
    for (const run of data) {
      const existing = statsMap.get(run.agent_type)
      if (!existing) {
        statsMap.set(run.agent_type, {
          agent_type: run.agent_type,
          total_runs: 1,
          last_run: run.created_at,
          failed_runs: run.status === "failed" ? 1 : 0,
        })
      } else {
        existing.total_runs++
        if (run.status === "failed") existing.failed_runs++
      }
    }

    setAgents(Array.from(statsMap.values()))
    setLoading(false)
  }

  function formatTimeAgo(dateStr: string | null): string {
    if (!dateStr) return "Never"
    const diff = Date.now() - new Date(dateStr).getTime()
    const mins = Math.floor(diff / 60000)
    if (mins < 1) return "just now"
    if (mins < 60) return `${mins} min ago`
    const hours = Math.floor(mins / 60)
    if (hours < 24) return `${hours}h ago`
    return `${Math.floor(hours / 24)}d ago`
  }

  const allAgents = Object.keys(agentDescriptions)
  const displayAgents = allAgents.map((type) => {
    const stats = agents.find((a) => a.agent_type === type)
    return {
      agent_type: type,
      description: agentDescriptions[type],
      total_runs: stats?.total_runs || 0,
      last_run: stats?.last_run || null,
      failed_runs: stats?.failed_runs || 0,
      active: (stats?.total_runs || 0) > 0,
    }
  })

  if (loading) {
    return (
      <div className="flex items-center justify-center p-12">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    )
  }

  return (
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Agents</h1>
          <p className="text-sm text-muted-foreground">Manage AI agents, their capabilities, and permissions</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {displayAgents.map((agent) => (
          <Card key={agent.agent_type}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent">
                  <Bot className="h-5 w-5 text-primary" />
                </div>
                <Badge
                  variant={agent.active ? "secondary" : "outline"}
                  className={agent.active ? "bg-success/10 text-success border-success/20" : ""}
                >
                  {agent.active ? "Active" : "Inactive"}
                </Badge>
              </div>
              <CardTitle className="text-base">{agent.agent_type.replace(/_/g, " ")}</CardTitle>
              <CardDescription>{agent.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <span className="text-muted-foreground">Last run</span>
                  <p className="font-medium">{formatTimeAgo(agent.last_run)}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Total runs</span>
                  <p className="font-medium">{agent.total_runs}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Error rate</span>
                  <p className="font-medium">
                    {agent.total_runs > 0
                      ? `${((agent.failed_runs / agent.total_runs) * 100).toFixed(1)}%`
                      : "N/A"}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
