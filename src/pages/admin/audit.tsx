import { useEffect, useState } from "react"
import { Download, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { supabase } from "@/lib/supabase"
import { useAuth } from "@/lib/auth"

interface AuditEvent {
  id: string
  actor_type: string
  actor_id: string
  action: string
  resource_type: string
  resource_id: string | null
  result: string
  metadata: Record<string, unknown>
  created_at: string
}

function getActorTypeColor(type: string) {
  switch (type) {
    case "agent": return "bg-blue-500/10 text-blue-600 border-blue-500/20"
    case "system": return "bg-warning/10 text-warning border-warning/20"
    default: return ""
  }
}

export function AdminAuditPage() {
  const { profile, loading: authLoading } = useAuth()
  const [events, setEvents] = useState<AuditEvent[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")
  const [actorFilter, setActorFilter] = useState("all")

  useEffect(() => {
    if (authLoading) return
    if (!profile?.tenant_id) {
      setLoading(false)
      return
    }
    fetchAuditEvents()
  }, [profile?.tenant_id, authLoading])

  async function fetchAuditEvents() {
    const { data } = await supabase
      .from("audit_events")
      .select("id, actor_type, actor_id, action, resource_type, resource_id, result, metadata, created_at")
      .eq("tenant_id", profile!.tenant_id!)
      .order("created_at", { ascending: false })
      .limit(100)

    setEvents(data || [])
    setLoading(false)
  }

  const filtered = events.filter((e) => {
    const matchSearch = !search || e.action.toLowerCase().includes(search.toLowerCase()) || e.resource_type.toLowerCase().includes(search.toLowerCase())
    const matchActor = actorFilter === "all" || e.actor_type === actorFilter
    return matchSearch && matchActor
  })

  function formatTimestamp(dateStr: string) {
    return new Date(dateStr).toLocaleString("en-US", {
      month: "short", day: "numeric", year: "numeric",
      hour: "2-digit", minute: "2-digit", second: "2-digit",
    })
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
          <h1 className="text-2xl font-bold tracking-tight">Audit Log</h1>
          <p className="text-sm text-muted-foreground">Complete record of all platform activity for compliance and security</p>
        </div>
        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Export CSV
        </Button>
      </div>

      <div className="mb-4 flex items-center gap-3">
        <div className="relative max-w-sm flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search audit log..." className="pl-9" value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <Select value={actorFilter} onValueChange={setActorFilter}>
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="All actors" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All actors</SelectItem>
            <SelectItem value="user">Users only</SelectItem>
            <SelectItem value="agent">AI agents only</SelectItem>
            <SelectItem value="system">System</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Timestamp</TableHead>
                <TableHead>Actor</TableHead>
                <TableHead>Action</TableHead>
                <TableHead>Resource</TableHead>
                <TableHead>Result</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="py-8 text-center text-muted-foreground">
                    No audit events found.
                  </TableCell>
                </TableRow>
              ) : (
                filtered.map((event) => (
                  <TableRow key={event.id}>
                    <TableCell className="text-xs font-mono text-muted-foreground whitespace-nowrap">
                      {formatTimestamp(event.created_at)}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={`text-xs ${getActorTypeColor(event.actor_type)}`}>
                        {event.actor_type}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm">{event.action}</TableCell>
                    <TableCell className="text-sm max-w-[200px] truncate">
                      {event.resource_type}{event.resource_id ? ` / ${event.resource_id.substring(0, 8)}` : ""}
                    </TableCell>
                    <TableCell>
                      <Badge variant={event.result === "success" ? "secondary" : "destructive"} className={event.result === "success" ? "bg-success/10 text-success border-success/20" : ""}>
                        {event.result}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
        <span>Showing {filtered.length} entries</span>
      </div>
    </div>
  )
}
