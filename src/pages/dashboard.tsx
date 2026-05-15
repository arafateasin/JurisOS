import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { FileText, TriangleAlert as AlertTriangle, CircleCheck as CheckCircle2, Clock, ArrowUpRight, TrendingDown, TrendingUp, Bot } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { supabase } from "@/lib/supabase"
import { useAuth } from "@/lib/auth"

interface DashboardStats {
  contractsInReview: number
  highRiskFindings: number
  pendingApprovals: number
  avgReviewTimeMs: number
}

interface AgentActivity {
  id: string
  agent_type: string
  task_type: string
  input_summary: string
  output_summary: string
  status: string
  created_at: string
}

interface ReviewPipeline {
  intake: number
  aiReviewing: number
  humanReview: number
  approvalNeeded: number
  completed: number
}

export function DashboardPage() {
  const { profile, loading: authLoading } = useAuth()
  const [stats, setStats] = useState<DashboardStats>({ contractsInReview: 0, highRiskFindings: 0, pendingApprovals: 0, avgReviewTimeMs: 0 })
  const [activity, setActivity] = useState<AgentActivity[]>([])
  const [pipeline, setPipeline] = useState<ReviewPipeline>({ intake: 0, aiReviewing: 0, humanReview: 0, approvalNeeded: 0, completed: 0 })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (authLoading) return
    if (!profile?.tenant_id) {
      setLoading(false)
      return
    }
    fetchDashboardData()
  }, [profile?.tenant_id, authLoading])

  async function fetchDashboardData() {
    if (!profile?.tenant_id) return

    const [reviewsRes, findingsRes, approvalsRes, agentRunsRes] = await Promise.all([
      supabase
        .from("reviews")
        .select("id, status, started_at, completed_at")
        .eq("tenant_id", profile.tenant_id),
      supabase
        .from("review_findings")
        .select("id, risk_level")
        .eq("tenant_id", profile.tenant_id)
        .eq("risk_level", "high"),
      supabase
        .from("approvals")
        .select("id")
        .eq("tenant_id", profile.tenant_id)
        .eq("status", "pending"),
      supabase
        .from("agent_runs")
        .select("id, agent_type, task_type, input_summary, output_summary, status, created_at")
        .eq("tenant_id", profile.tenant_id)
        .order("created_at", { ascending: false })
        .limit(5),
    ])

    const reviews = reviewsRes.data || []
    const inProgress = reviews.filter(r => r.status === "in_progress")
    const completed = reviews.filter(r => r.status === "completed")
    const pending = reviews.filter(r => r.status === "pending")

    let avgMs = 0
    const completedWithTimes = completed.filter(r => r.started_at && r.completed_at)
    if (completedWithTimes.length > 0) {
      const total = completedWithTimes.reduce((sum, r) => {
        return sum + (new Date(r.completed_at!).getTime() - new Date(r.started_at!).getTime())
      }, 0)
      avgMs = total / completedWithTimes.length
    }

    setStats({
      contractsInReview: inProgress.length + pending.length,
      highRiskFindings: findingsRes.data?.length || 0,
      pendingApprovals: approvalsRes.data?.length || 0,
      avgReviewTimeMs: avgMs,
    })

    setPipeline({
      intake: reviews.filter(r => r.status === "pending").length,
      aiReviewing: reviews.filter(r => r.status === "in_progress").length,
      humanReview: reviews.filter(r => r.status === "human_review").length,
      approvalNeeded: approvalsRes.data?.length || 0,
      completed: completed.length,
    })

    setActivity(agentRunsRes.data || [])
    setLoading(false)
  }

  function formatDuration(ms: number): string {
    if (ms === 0) return "N/A"
    const hours = ms / (1000 * 60 * 60)
    if (hours < 1) return `${Math.round(ms / (1000 * 60))}m`
    return `${hours.toFixed(1)}h`
  }

  function formatTimeAgo(dateStr: string): string {
    const diff = Date.now() - new Date(dateStr).getTime()
    const mins = Math.floor(diff / 60000)
    if (mins < 1) return "just now"
    if (mins < 60) return `${mins} min ago`
    const hours = Math.floor(mins / 60)
    if (hours < 24) return `${hours}h ago`
    return `${Math.floor(hours / 24)}d ago`
  }

  const kpis = [
    { label: "Contracts in review", value: String(stats.contractsInReview), icon: FileText, trend: "neutral" as const },
    { label: "High-risk findings", value: String(stats.highRiskFindings), icon: AlertTriangle, trend: stats.highRiskFindings > 0 ? "up" as const : "neutral" as const },
    { label: "Pending approvals", value: String(stats.pendingApprovals), icon: CheckCircle2, trend: "neutral" as const },
    { label: "Avg. review time", value: formatDuration(stats.avgReviewTimeMs), icon: Clock, trend: "down" as const },
  ]

  const pipelineMax = Math.max(pipeline.intake, pipeline.aiReviewing, pipeline.humanReview, pipeline.approvalNeeded, pipeline.completed, 1)

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
          <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-sm text-muted-foreground">Welcome back. Here is your legal operations overview.</p>
        </div>
        <Button asChild>
          <Link to="/intake">New request</Link>
        </Button>
      </div>

      <div className="mb-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {kpis.map((kpi) => (
          <Card key={kpi.label}>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <kpi.icon className="h-5 w-5 text-muted-foreground" />
                {kpi.trend === "up" && <TrendingUp className="h-4 w-4 text-warning" />}
                {kpi.trend === "down" && <TrendingDown className="h-4 w-4 text-success" />}
              </div>
              <p className="mt-3 text-2xl font-bold">{kpi.value}</p>
              <p className="text-xs text-muted-foreground">{kpi.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Review pipeline</CardTitle>
              <CardDescription>Contract review status overview</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { stage: "Intake received", count: pipeline.intake },
                  { stage: "AI reviewing", count: pipeline.aiReviewing },
                  { stage: "Human review", count: pipeline.humanReview },
                  { stage: "Approval needed", count: pipeline.approvalNeeded },
                  { stage: "Completed", count: pipeline.completed },
                ].map((item) => (
                  <div key={item.stage} className="flex items-center gap-3">
                    <span className="w-32 text-sm text-muted-foreground">{item.stage}</span>
                    <div className="flex-1">
                      <Progress value={(item.count / pipelineMax) * 100} className="h-2" />
                    </div>
                    <span className="w-8 text-right text-sm font-medium">{item.count}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-base">AI agent activity</CardTitle>
                <CardDescription>Recent autonomous actions</CardDescription>
              </div>
              <Button variant="ghost" size="sm" asChild>
                <Link to="/agents">View all <ArrowUpRight className="ml-1 h-3 w-3" /></Link>
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {activity.length === 0 ? (
                  <p className="text-sm text-muted-foreground">No agent activity yet.</p>
                ) : (
                  activity.map((run) => (
                    <div key={run.id} className="flex gap-3">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent">
                        <Bot className="h-4 w-4 text-primary" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-medium">{run.task_type.replace(/_/g, " ")}</p>
                        <p className="truncate text-xs text-muted-foreground">{run.input_summary}</p>
                        <p className="text-xs text-muted-foreground">{run.agent_type} · {formatTimeAgo(run.created_at)}</p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
