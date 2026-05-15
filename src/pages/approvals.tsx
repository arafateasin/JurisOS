import { useEffect, useState } from "react"
import { CircleCheck as CheckCircle2, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { supabase } from "@/lib/supabase"
import { useAuth } from "@/lib/auth"

interface Approval {
  id: string
  resource_type: string
  resource_id: string
  status: string
  decision_reason: string | null
  decided_at: string | null
  created_at: string
}

export function ApprovalsPage() {
  const { profile, loading: authLoading } = useAuth()
  const [approvals, setApprovals] = useState<Approval[]>([])
  const [loading, setLoading] = useState(true)
  const [tab, setTab] = useState("pending")

  useEffect(() => {
    if (authLoading) return
    if (!profile?.tenant_id) {
      setLoading(false)
      return
    }
    fetchApprovals()
  }, [profile?.tenant_id, authLoading])

  async function fetchApprovals() {
    const { data } = await supabase
      .from("approvals")
      .select("id, resource_type, resource_id, status, decision_reason, decided_at, created_at")
      .eq("tenant_id", profile!.tenant_id!)
      .order("created_at", { ascending: false })

    setApprovals(data || [])
    setLoading(false)
  }

  async function handleApprove(id: string) {
    await supabase
      .from("approvals")
      .update({ status: "approved", decided_at: new Date().toISOString() })
      .eq("id", id)

    setApprovals((prev) => prev.map((a) => a.id === id ? { ...a, status: "approved", decided_at: new Date().toISOString() } : a))
  }

  async function handleReject(id: string) {
    await supabase
      .from("approvals")
      .update({ status: "rejected", decided_at: new Date().toISOString() })
      .eq("id", id)

    setApprovals((prev) => prev.map((a) => a.id === id ? { ...a, status: "rejected", decided_at: new Date().toISOString() } : a))
  }

  const filtered = approvals.filter((a) => {
    if (tab === "all") return true
    return a.status === tab
  })

  const pendingCount = approvals.filter((a) => a.status === "pending").length

  function formatTimeAgo(dateStr: string): string {
    const diff = Date.now() - new Date(dateStr).getTime()
    const mins = Math.floor(diff / 60000)
    if (mins < 1) return "just now"
    if (mins < 60) return `${mins} min ago`
    const hours = Math.floor(mins / 60)
    if (hours < 24) return `${hours}h ago`
    return `${Math.floor(hours / 24)}d ago`
  }

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
          <h1 className="text-2xl font-bold tracking-tight">Approvals</h1>
          <p className="text-sm text-muted-foreground">Review and approve AI-assisted outputs and workflow decisions</p>
        </div>
      </div>

      <Tabs value={tab} onValueChange={setTab} className="mb-6">
        <TabsList>
          <TabsTrigger value="pending">Pending ({pendingCount})</TabsTrigger>
          <TabsTrigger value="approved">Approved</TabsTrigger>
          <TabsTrigger value="rejected">Rejected</TabsTrigger>
          <TabsTrigger value="all">All</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="space-y-4">
        {filtered.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-sm text-muted-foreground">
                {tab === "pending" ? "No pending approvals." : "No approvals found."}
              </p>
            </CardContent>
          </Card>
        ) : (
          filtered.map((approval) => (
            <Card key={approval.id}>
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-medium capitalize">{approval.resource_type.replace(/_/g, " ")}</span>
                      <Badge variant="outline" className="text-xs">{approval.status}</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {formatTimeAgo(approval.created_at)}
                      {approval.decision_reason && ` · Reason: ${approval.decision_reason}`}
                    </p>
                  </div>
                  {approval.status === "pending" && (
                    <div className="flex items-center gap-2 ml-4">
                      <Button variant="ghost" size="sm" className="h-8" onClick={() => handleReject(approval.id)}>
                        <Eye className="mr-1 h-3.5 w-3.5" />
                        Reject
                      </Button>
                      <Button size="sm" className="h-8" onClick={() => handleApprove(approval.id)}>
                        <CheckCircle2 className="mr-1 h-3.5 w-3.5" />
                        Approve
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
