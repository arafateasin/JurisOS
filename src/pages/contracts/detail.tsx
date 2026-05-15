import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { ArrowLeft, FileText, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { supabase } from "@/lib/supabase"
import { useAuth } from "@/lib/auth"

interface ContractDetail {
  id: string
  contract_type: string
  counterparty: string
  status: string
  effective_date: string | null
  expiry_date: string | null
  value_amount: number | null
  metadata: Record<string, unknown>
  document_id: string | null
  matter_id: string | null
}

interface ReviewFinding {
  id: string
  clause_reference: string
  finding_type: string
  risk_level: string
  title: string
  description: string
}

export function ContractDetailPage() {
  const { id } = useParams<{ id: string }>()
  const { profile, loading: authLoading } = useAuth()
  const [contract, setContract] = useState<ContractDetail | null>(null)
  const [findings, setFindings] = useState<ReviewFinding[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (authLoading) return
    if (!profile?.tenant_id || !id) {
      setLoading(false)
      return
    }
    fetchContract()
  }, [profile?.tenant_id, id, authLoading])

  async function fetchContract() {
    const [contractRes, findingsRes] = await Promise.all([
      supabase
        .from("contracts")
        .select("*")
        .eq("id", id!)
        .eq("tenant_id", profile!.tenant_id!)
        .maybeSingle(),
      supabase
        .from("review_findings")
        .select("id, clause_reference, finding_type, risk_level, title, description")
        .eq("tenant_id", profile!.tenant_id!),
    ])

    setContract(contractRes.data)
    setFindings(findingsRes.data || [])
    setLoading(false)
  }

  function formatDate(date: string | null) {
    if (!date) return "-"
    return new Date(date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
  }

  function formatValue(val: number | null) {
    if (!val) return "-"
    return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(val)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center p-12">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    )
  }

  if (!contract) {
    return (
      <div className="p-6">
        <Link to="/contracts" className="mb-4 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4" />
          Back to contracts
        </Link>
        <p className="text-muted-foreground">Contract not found.</p>
      </div>
    )
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <Link to="/contracts" className="mb-4 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4" />
          Back to contracts
        </Link>
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold tracking-tight">{contract.counterparty} - {contract.contract_type}</h1>
              <Badge variant="outline">{contract.status.replace(/_/g, " ")}</Badge>
            </div>
            <p className="mt-1 text-sm text-muted-foreground">
              {contract.counterparty} · {contract.contract_type} · Effective {formatDate(contract.effective_date)}
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <ExternalLink className="mr-2 h-4 w-4" />
              Export
            </Button>
            {contract.document_id && (
              <Button asChild>
                <Link to={`/review/${contract.document_id}`}>Open review</Link>
              </Button>
            )}
          </div>
        </div>
      </div>

      <Tabs defaultValue="summary">
        <TabsList>
          <TabsTrigger value="summary">Summary</TabsTrigger>
          <TabsTrigger value="findings">Findings ({findings.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="summary" className="mt-6">
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Key findings</CardTitle>
                </CardHeader>
                <CardContent>
                  {findings.length === 0 ? (
                    <p className="text-sm text-muted-foreground">No review findings yet. Start a review to identify risks.</p>
                  ) : (
                    <div className="space-y-3">
                      {findings.slice(0, 5).map((f) => (
                        <div key={f.id} className="flex items-center justify-between rounded-lg border border-border p-3">
                          <div>
                            <p className="text-sm font-medium">{f.title}</p>
                            <p className="text-xs text-muted-foreground">{f.clause_reference} · {f.description?.substring(0, 80)}</p>
                          </div>
                          <Badge
                            variant={f.risk_level === "high" ? "destructive" : "secondary"}
                            className={f.risk_level === "medium" ? "bg-warning/10 text-warning border-warning/20" : f.risk_level === "low" ? "bg-success/10 text-success border-success/20" : ""}
                          >
                            {f.risk_level}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Contract details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  {[
                    { label: "Counterparty", value: contract.counterparty },
                    { label: "Type", value: contract.contract_type },
                    { label: "Value", value: formatValue(contract.value_amount) },
                    { label: "Effective date", value: formatDate(contract.effective_date) },
                    { label: "Expiry date", value: formatDate(contract.expiry_date) },
                    { label: "Status", value: contract.status.replace(/_/g, " ") },
                  ].map((item) => (
                    <div key={item.label} className="flex justify-between">
                      <span className="text-muted-foreground">{item.label}</span>
                      <span className="font-medium capitalize">{item.value}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="findings" className="mt-6">
          <Card>
            <CardContent className="py-6">
              {findings.length === 0 ? (
                <div className="py-8 text-center">
                  <FileText className="mx-auto mb-3 h-8 w-8 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">No findings yet.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {findings.map((f) => (
                    <div key={f.id} className="rounded-lg border border-border p-4">
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-sm font-medium">{f.title}</p>
                        <Badge
                          variant={f.risk_level === "high" ? "destructive" : "secondary"}
                          className={f.risk_level === "medium" ? "bg-warning/10 text-warning border-warning/20" : f.risk_level === "low" ? "bg-success/10 text-success border-success/20" : ""}
                        >
                          {f.risk_level}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mb-1">Section: {f.clause_reference} · Type: {f.finding_type}</p>
                      <p className="text-sm text-muted-foreground">{f.description}</p>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
