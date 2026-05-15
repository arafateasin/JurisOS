import { Link } from "react-router-dom"
import { ArrowLeft, Plus, Save, Play, GripVertical } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"

const clauseCategories = [
  "Limitation of Liability",
  "Indemnification",
  "IP Ownership",
  "Confidentiality",
  "Data Protection",
  "Termination",
  "Payment Terms",
  "Warranties",
  "Force Majeure",
  "Governing Law",
  "Dispute Resolution",
  "Assignment",
]

const existingRules = [
  { clause: "Limitation of Liability", risk: "High", position: "Cap must exclude confidentiality, IP, data protection, fraud" },
  { clause: "Indemnification", risk: "High", position: "Must be mutual for IP infringement and data breaches" },
  { clause: "IP Ownership", risk: "Medium", position: "Customer retains rights in customer data and configurations" },
  { clause: "Termination", risk: "Medium", position: "Mutual termination for convenience with 90 days notice" },
]

export function PlaybookBuilderPage() {
  return (
    <div className="flex h-[calc(100vh-3.5rem)] flex-col">
      <div className="flex items-center justify-between border-b border-border bg-card px-4 py-2.5">
        <div className="flex items-center gap-3">
          <Link to="/playbooks" className="text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <Separator orientation="vertical" className="h-5" />
          <div>
            <span className="text-sm font-medium">Standard SaaS Agreement Review</span>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="text-xs">v3.2</Badge>
              <Badge variant="outline" className="text-xs">Published</Badge>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Play className="mr-1.5 h-3.5 w-3.5" />
            Test against contract
          </Button>
          <Button variant="outline" size="sm">
            <Save className="mr-1.5 h-3.5 w-3.5" />
            Save draft
          </Button>
          <Button size="sm">Publish playbook</Button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        <div className="w-56 border-r border-border bg-card">
          <div className="p-3">
            <p className="mb-2 text-xs font-medium text-muted-foreground">Clause categories</p>
            <ScrollArea className="h-[calc(100vh-10rem)]">
              <div className="space-y-0.5">
                {clauseCategories.map((category) => (
                  <button
                    key={category}
                    className="w-full rounded-md px-2.5 py-1.5 text-left text-sm hover:bg-accent first:bg-accent first:font-medium"
                  >
                    {category}
                  </button>
                ))}
              </div>
            </ScrollArea>
          </div>
        </div>

        <div className="flex-1 overflow-auto p-6">
          <div className="mx-auto max-w-3xl space-y-6">
            <div>
              <h2 className="mb-4 text-lg font-semibold">Playbook rules</h2>
              <p className="mb-6 text-sm text-muted-foreground">
                Define your preferred positions and risk tolerance for each clause type. JurisOS will enforce these rules during contract review.
              </p>
            </div>

            <div className="space-y-4">
              {existingRules.map((rule, index) => (
                <Card key={index}>
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <GripVertical className="mt-0.5 h-4 w-4 shrink-0 cursor-grab text-muted-foreground" />
                      <div className="flex-1 space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium">{rule.clause}</span>
                            <Badge
                              variant={rule.risk === "High" ? "destructive" : "secondary"}
                              className={`text-xs ${rule.risk === "Medium" ? "bg-warning/10 text-warning border-warning/20" : ""}`}
                            >
                              {rule.risk} risk
                            </Badge>
                          </div>
                          <Button variant="ghost" size="sm" className="h-7 text-xs">Edit</Button>
                        </div>
                        <p className="text-sm text-muted-foreground">{rule.position}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Separator />

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Add new rule</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Clause type</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select clause type" />
                      </SelectTrigger>
                      <SelectContent>
                        {clauseCategories.map((cat) => (
                          <SelectItem key={cat} value={cat.toLowerCase().replace(/\s/g, "-")}>{cat}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Risk level</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Risk level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="high">High - Must fix before signing</SelectItem>
                        <SelectItem value="medium">Medium - Should negotiate</SelectItem>
                        <SelectItem value="low">Low - Acceptable with note</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Preferred position</Label>
                  <Textarea placeholder="Describe what you want this clause to say..." className="min-h-[80px]" />
                </div>
                <div className="space-y-2">
                  <Label>Acceptable fallback</Label>
                  <Textarea placeholder="If preferred position is rejected, what is acceptable?" className="min-h-[80px]" />
                </div>
                <div className="space-y-2">
                  <Label>Unacceptable language</Label>
                  <Textarea placeholder="What language should trigger a high-risk flag?" className="min-h-[60px]" />
                </div>
                <div className="flex gap-2">
                  <Button size="sm">
                    <Plus className="mr-1.5 h-3.5 w-3.5" />
                    Add rule
                  </Button>
                  <Button variant="outline" size="sm">Cancel</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="w-80 border-l border-border bg-card">
          <div className="p-4">
            <h3 className="mb-3 text-sm font-medium">Test preview</h3>
            <Card>
              <CardContent className="p-3">
                <p className="text-xs text-muted-foreground">
                  Upload or select a contract to test this playbook against. The preview will show which clauses would be flagged.
                </p>
                <Button variant="outline" size="sm" className="mt-3 w-full text-xs">
                  Select test contract
                </Button>
              </CardContent>
            </Card>
            <Separator className="my-4" />
            <h3 className="mb-3 text-sm font-medium">Playbook info</h3>
            <div className="space-y-2 text-xs text-muted-foreground">
              <div className="flex justify-between"><span>Rules</span><span className="font-medium text-foreground">32</span></div>
              <div className="flex justify-between"><span>Used in reviews</span><span className="font-medium text-foreground">24</span></div>
              <div className="flex justify-between"><span>Last published</span><span className="font-medium text-foreground">May 10, 2026</span></div>
              <div className="flex justify-between"><span>Owner</span><span className="font-medium text-foreground">Sarah Chen</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
