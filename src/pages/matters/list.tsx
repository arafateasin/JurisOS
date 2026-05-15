import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { Plus, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { supabase } from "@/lib/supabase"
import { useAuth } from "@/lib/auth"

interface Matter {
  id: string
  title: string
  counterparty: string
  matter_type: string
  status: string
  priority: string
  due_date: string | null
  owner_id: string | null
}

function PriorityBadge({ priority }: { priority: string }) {
  if (priority === "high") return <Badge variant="destructive">High</Badge>
  if (priority === "medium") return <Badge className="bg-warning/10 text-warning border-warning/20">Medium</Badge>
  return <Badge className="bg-success/10 text-success border-success/20">Low</Badge>
}

function StatusBadge({ status }: { status: string }) {
  if (status === "completed") return <Badge variant="secondary">Completed</Badge>
  if (status === "pending_approval") return <Badge className="bg-info/10 text-info border-info/20">Pending approval</Badge>
  if (status === "in_review") return <Badge className="bg-warning/10 text-warning border-warning/20">In review</Badge>
  return <Badge variant="outline">{status.replace(/_/g, " ")}</Badge>
}

export function MattersListPage() {
  const { profile, loading: authLoading } = useAuth()
  const [matters, setMatters] = useState<Matter[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  useEffect(() => {
    if (authLoading) return
    if (!profile?.tenant_id) {
      setLoading(false)
      return
    }
    fetchMatters()
  }, [profile?.tenant_id, authLoading])

  async function fetchMatters() {
    const { data } = await supabase
      .from("matters")
      .select("id, title, counterparty, matter_type, status, priority, due_date, owner_id")
      .eq("tenant_id", profile!.tenant_id!)
      .order("created_at", { ascending: false })

    setMatters(data || [])
    setLoading(false)
  }

  const filtered = matters.filter((m) => {
    const matchSearch = !search || m.title.toLowerCase().includes(search.toLowerCase()) || m.counterparty.toLowerCase().includes(search.toLowerCase())
    const matchStatus = statusFilter === "all" || m.status === statusFilter
    return matchSearch && matchStatus
  })

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

  return (
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Matters</h1>
          <p className="text-sm text-muted-foreground">Organize contracts and legal work by business matter</p>
        </div>
        <Button asChild>
          <Link to="/intake">
            <Plus className="mr-2 h-4 w-4" />
            New matter
          </Link>
        </Button>
      </div>

      <div className="mb-4 flex items-center gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search matters..." className="pl-9" value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All statuses</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="in_review">In review</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="rounded-lg border border-border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Matter</TableHead>
              <TableHead>Counterparty</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead>Due date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="py-8 text-center text-muted-foreground">
                  {matters.length === 0 ? "No matters yet. Create your first matter to get started." : "No matters match your filters."}
                </TableCell>
              </TableRow>
            ) : (
              filtered.map((matter) => (
                <TableRow key={matter.id} className="cursor-pointer">
                  <TableCell>
                    <Link to={`/matters/${matter.id}`} className="font-medium hover:underline">
                      {matter.title}
                    </Link>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{matter.counterparty}</TableCell>
                  <TableCell className="text-muted-foreground">{matter.matter_type}</TableCell>
                  <TableCell><StatusBadge status={matter.status} /></TableCell>
                  <TableCell><PriorityBadge priority={matter.priority} /></TableCell>
                  <TableCell className="text-muted-foreground">{formatDate(matter.due_date)}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
