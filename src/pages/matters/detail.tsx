import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { ArrowLeft, FileText, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { supabase } from "@/lib/supabase"
import { useAuth } from "@/lib/auth"

interface Matter {
  id: string
  title: string
  description: string
  counterparty: string
  matter_type: string
  status: string
  priority: string
  due_date: string | null
  created_at: string
  metadata: Record<string, unknown>
}

interface Document {
  id: string
  title: string
  file_type: string
  status: string
  created_at: string
}

interface Review {
  id: string
  status: string
  overall_risk: string | null
  findings_count: number
  created_at: string
}

export function MatterDetailPage() {
  const { id } = useParams<{ id: string }>()
  const { profile, loading: authLoading } = useAuth()
  const [matter, setMatter] = useState<Matter | null>(null)
  const [documents, setDocuments] = useState<Document[]>([])
  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (authLoading) return
    if (!profile?.tenant_id || !id) {
      setLoading(false)
      return
    }
    fetchMatter()
  }, [profile?.tenant_id, id, authLoading])

  async function fetchMatter() {
    const [matterRes, docsRes, reviewsRes] = await Promise.all([
      supabase
        .from("matters")
        .select("*")
        .eq("id", id!)
        .eq("tenant_id", profile!.tenant_id!)
        .maybeSingle(),
      supabase
        .from("documents")
        .select("id, title, file_type, status, created_at")
        .eq("tenant_id", profile!.tenant_id!)
        .eq("matter_id", id!),
      supabase
        .from("reviews")
        .select("id, status, overall_risk, findings_count, created_at")
        .eq("tenant_id", profile!.tenant_id!)
        .eq("document_id", id!),
    ])

    setMatter(matterRes.data)
    setDocuments(docsRes.data || [])
    setReviews(reviewsRes.data || [])
    setLoading(false)
  }

  function formatDate(date: string | null) {
    if (!date) return "-"
    return new Date(date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center p-12">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    )
  }

  if (!matter) {
    return (
      <div className="p-6">
        <Link to="/matters" className="mb-4 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4" />
          Back to matters
        </Link>
        <p className="text-muted-foreground">Matter not found.</p>
      </div>
    )
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <Link to="/matters" className="mb-4 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4" />
          Back to matters
        </Link>
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold tracking-tight">{matter.title}</h1>
              <Badge variant={matter.priority === "high" ? "destructive" : "secondary"}>
                {matter.priority} priority
              </Badge>
            </div>
            <p className="mt-1 text-sm text-muted-foreground">
              Counterparty: {matter.counterparty} · Type: {matter.matter_type} · Created {formatDate(matter.created_at)}
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">Export</Button>
          </div>
        </div>
      </div>

      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="documents">Documents ({documents.length})</TabsTrigger>
          <TabsTrigger value="reviews">Reviews ({reviews.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6">
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Description</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    {matter.description || "No description provided."}
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Documents</CardTitle>
                </CardHeader>
                <CardContent>
                  {documents.length === 0 ? (
                    <p className="text-sm text-muted-foreground">No documents uploaded yet.</p>
                  ) : (
                    <div className="space-y-3">
                      {documents.map((doc) => (
                        <div key={doc.id} className="flex items-center justify-between rounded-lg border border-border p-3">
                          <div className="flex items-center gap-3">
                            <FileText className="h-4 w-4 text-muted-foreground" />
                            <div>
                              <p className="text-sm font-medium">{doc.title}</p>
                              <p className="text-xs text-muted-foreground">{formatDate(doc.created_at)}</p>
                            </div>
                          </div>
                          <Badge variant="secondary">{doc.status}</Badge>
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
                  <CardTitle className="text-base">Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {[
                    { label: "Status", value: matter.status.replace(/_/g, " ") },
                    { label: "Priority", value: matter.priority },
                    { label: "Counterparty", value: matter.counterparty },
                    { label: "Type", value: matter.matter_type },
                    { label: "Due date", value: formatDate(matter.due_date) },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">{item.label}</span>
                      <span className="font-medium capitalize">{item.value}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="documents" className="mt-6">
          <Card>
            <CardContent className="py-6">
              {documents.length === 0 ? (
                <div className="py-8 text-center">
                  <FileText className="mx-auto mb-3 h-8 w-8 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">No documents uploaded yet.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {documents.map((doc) => (
                    <div key={doc.id} className="flex items-center justify-between rounded-lg border border-border p-3">
                      <div className="flex items-center gap-3">
                        <FileText className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium">{doc.title}</p>
                          <p className="text-xs text-muted-foreground">{doc.file_type} · {formatDate(doc.created_at)}</p>
                        </div>
                      </div>
                      <Badge variant="secondary">{doc.status}</Badge>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reviews" className="mt-6">
          <Card>
            <CardContent className="py-6">
              {reviews.length === 0 ? (
                <div className="py-8 text-center">
                  <Calendar className="mx-auto mb-3 h-8 w-8 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">No reviews started yet.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {reviews.map((review) => (
                    <Link key={review.id} to={`/review/${review.id}`} className="flex items-center justify-between rounded-lg border border-border p-3 hover:bg-accent">
                      <div>
                        <p className="text-sm font-medium">Review - {formatDate(review.created_at)}</p>
                        <p className="text-xs text-muted-foreground">
                          {review.findings_count} findings · Risk: {review.overall_risk || "pending"}
                        </p>
                      </div>
                      <Badge variant="secondary">{review.status}</Badge>
                    </Link>
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
