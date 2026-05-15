import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { Plus, Search, BookOpen } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { supabase } from "@/lib/supabase"
import { useAuth } from "@/lib/auth"

interface Playbook {
  id: string
  title: string
  description: string
  contract_type: string
  status: string
  version: string
  updated_at: string
}

export function PlaybooksListPage() {
  const { profile, loading: authLoading } = useAuth()
  const [playbooks, setPlaybooks] = useState<Playbook[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")

  useEffect(() => {
    if (authLoading) return
    if (!profile?.tenant_id) {
      setLoading(false)
      return
    }
    fetchPlaybooks()
  }, [profile?.tenant_id, authLoading])

  async function fetchPlaybooks() {
    const { data } = await supabase
      .from("playbooks")
      .select("id, title, description, contract_type, status, version, updated_at")
      .eq("tenant_id", profile!.tenant_id!)
      .order("updated_at", { ascending: false })

    setPlaybooks(data || [])
    setLoading(false)
  }

  const filtered = playbooks.filter((p) => {
    return !search || p.title.toLowerCase().includes(search.toLowerCase())
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
          <h1 className="text-2xl font-bold tracking-tight">Playbooks</h1>
          <p className="text-sm text-muted-foreground">Manage legal rules, fallback clauses, and risk preferences</p>
        </div>
        <Button asChild>
          <Link to="/playbooks/new">
            <Plus className="mr-2 h-4 w-4" />
            New playbook
          </Link>
        </Button>
      </div>

      <div className="mb-6 flex items-center gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search playbooks..." className="pl-9" value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((playbook) => (
          <Card key={playbook.id} className="cursor-pointer transition-colors hover:border-primary">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent">
                  <BookOpen className="h-4 w-4 text-primary" />
                </div>
                <Badge variant={playbook.status === "published" ? "secondary" : "outline"}>
                  {playbook.status}
                </Badge>
              </div>
              <CardTitle className="text-base">
                <Link to={`/playbooks/${playbook.id}`} className="hover:underline">
                  {playbook.title}
                </Link>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-xs text-muted-foreground line-clamp-2">{playbook.description}</p>
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="text-xs">{playbook.contract_type}</Badge>
                <span className="text-xs text-muted-foreground">{playbook.version}</span>
              </div>
            </CardContent>
          </Card>
        ))}

        {filtered.length === 0 && playbooks.length === 0 && (
          <Card className="flex cursor-pointer flex-col items-center justify-center border-dashed transition-colors hover:border-primary">
            <CardContent className="flex flex-col items-center gap-2 py-8">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                <Plus className="h-5 w-5 text-muted-foreground" />
              </div>
              <p className="text-sm font-medium">Create your first playbook</p>
              <p className="text-xs text-muted-foreground">Define rules for AI contract review</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
