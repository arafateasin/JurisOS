import { Database, Search, Plus, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

const sources = [
  { name: "Standard Contract Templates", type: "Templates", items: 24, lastIndexed: "2 hours ago", usedBy: "Contract Review Agent, Redline Agent", status: "Healthy" },
  { name: "Company Policies", type: "Policies", items: 18, lastIndexed: "1 day ago", usedBy: "Compliance Agent, Regulatory Agent", status: "Healthy" },
  { name: "Prior Legal Decisions", type: "Decisions", items: 142, lastIndexed: "4 hours ago", usedBy: "Research Agent, Memo Agent", status: "Healthy" },
  { name: "Approved Clause Library", type: "Clauses", items: 86, lastIndexed: "30 min ago", usedBy: "Redline Agent, Contract Review Agent", status: "Healthy" },
  { name: "Regulatory Sources", type: "Regulatory", items: 56, lastIndexed: "6 hours ago", usedBy: "Regulatory Monitor Agent", status: "Stale" },
  { name: "Training Examples", type: "Training", items: 320, lastIndexed: "3 days ago", usedBy: "All agents", status: "Needs update" },
]

export function KnowledgeBasePage() {
  return (
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Knowledge Base</h1>
          <p className="text-sm text-muted-foreground">Manage the data JurisOS uses for retrieval and memory</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add source
        </Button>
      </div>

      <Tabs defaultValue="all" className="mb-6">
        <TabsList>
          <TabsTrigger value="all">All sources</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="policies">Policies</TabsTrigger>
          <TabsTrigger value="clauses">Clauses</TabsTrigger>
          <TabsTrigger value="regulatory">Regulatory</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="mb-4">
        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search knowledge base..." className="pl-9" />
        </div>
      </div>

      <div className="space-y-4">
        {sources.map((source) => (
          <Card key={source.name}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent">
                    <Database className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">{source.name}</p>
                    <p className="text-xs text-muted-foreground">{source.items} items · Used by: {source.usedBy}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      Last indexed: {source.lastIndexed}
                    </div>
                  </div>
                  <Badge
                    variant={source.status === "Healthy" ? "secondary" : "outline"}
                    className={source.status === "Healthy" ? "bg-success/10 text-success border-success/20" : source.status === "Stale" ? "bg-warning/10 text-warning border-warning/20" : ""}
                  >
                    {source.status}
                  </Badge>
                  <Button variant="outline" size="sm">Manage</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
