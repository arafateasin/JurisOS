import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { Shield, TriangleAlert as AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { supabase } from "@/lib/supabase"
import { useAuth } from "@/lib/auth"

interface Framework {
  id: string
  name: string
  version: string
  total_controls: number
  status: string
}

interface Control {
  id: string
  control_id_code: string
  title: string
  status: string
  evidence_status: string
  category: string
  framework_id: string
}

export function ComplianceDashboardPage() {
  const { profile, loading: authLoading } = useAuth()
  const [frameworks, setFrameworks] = useState<Framework[]>([])
  const [controls, setControls] = useState<Control[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (authLoading) return
    if (!profile?.tenant_id) {
      setLoading(false)
      return
    }
    fetchComplianceData()
  }, [profile?.tenant_id, authLoading])

  async function fetchComplianceData() {
    const [fwRes, ctrlRes] = await Promise.all([
      supabase
        .from("compliance_frameworks")
        .select("id, name, version, total_controls, status")
        .eq("tenant_id", profile!.tenant_id!),
      supabase
        .from("controls")
        .select("id, control_id_code, title, status, evidence_status, category, framework_id"),
    ])

    setFrameworks(fwRes.data || [])
    setControls(ctrlRes.data || [])
    setLoading(false)
  }

  function getFrameworkStats(frameworkId: string) {
    const fwControls = controls.filter((c) => c.framework_id === frameworkId)
    const passing = fwControls.filter((c) => c.status === "passing").length
    const failing = fwControls.filter((c) => c.status === "failing").length
    const total = fwControls.length || 1
    return { passing, failing, notTested: total - passing - failing, readiness: Math.round((passing / total) * 100) }
  }

  const failingControls = controls.filter((c) => c.status === "failing").slice(0, 5)

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
          <h1 className="text-2xl font-bold tracking-tight">Compliance</h1>
          <p className="text-sm text-muted-foreground">Track compliance posture and evidence readiness across frameworks</p>
        </div>
        <Button variant="outline">Export report</Button>
      </div>

      <div className="mb-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {frameworks.length === 0 ? (
          <Card className="col-span-full">
            <CardContent className="py-12 text-center">
              <Shield className="mx-auto mb-3 h-8 w-8 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">No compliance frameworks configured yet.</p>
            </CardContent>
          </Card>
        ) : (
          frameworks.map((fw) => {
            const stats = getFrameworkStats(fw.id)
            return (
              <Card key={fw.id} className="cursor-pointer transition-colors hover:border-primary">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent">
                      <Shield className="h-4 w-4 text-primary" />
                    </div>
                    <Badge variant={stats.readiness >= 80 ? "secondary" : "outline"} className={stats.readiness >= 80 ? "bg-success/10 text-success border-success/20" : ""}>
                      {stats.readiness}%
                    </Badge>
                  </div>
                  <p className="font-medium text-sm">{fw.name}</p>
                  <p className="text-xs text-muted-foreground">{fw.version}</p>
                  <Progress value={stats.readiness} className="mt-2 h-1.5" />
                  <div className="mt-3 grid grid-cols-3 gap-1 text-xs text-muted-foreground">
                    <span className="text-success">{stats.passing} pass</span>
                    <span className="text-destructive">{stats.failing} fail</span>
                    <span>{stats.notTested} untested</span>
                  </div>
                </CardContent>
              </Card>
            )
          })
        )}
      </div>

      {failingControls.length > 0 && (
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-base">Failing controls</CardTitle>
              <CardDescription>Controls requiring immediate attention</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {failingControls.map((control) => (
                <Link key={control.id} to={`/compliance/${control.id}`} className="flex items-center justify-between rounded-lg border border-border p-3 hover:bg-accent">
                  <div className="flex items-center gap-3">
                    <AlertTriangle className="h-4 w-4 text-destructive" />
                    <div>
                      <p className="text-sm font-medium">{control.title}</p>
                      <p className="text-xs text-muted-foreground">{control.control_id_code} · {control.category}</p>
                    </div>
                  </div>
                  <Badge variant="destructive" className="text-xs">{control.evidence_status}</Badge>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
