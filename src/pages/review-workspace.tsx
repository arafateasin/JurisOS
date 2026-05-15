import { Link } from "react-router-dom"
import { ArrowLeft, CircleCheck as CheckCircle2, X, CreditCard as Edit3, MessageSquare, Sparkles, Bot } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

const findings = [
  {
    id: 1,
    risk: "High",
    title: "Limitation of liability",
    issue: "No carve-out for confidentiality or data protection.",
    section: "12.2",
    quote: "Total liability shall not exceed fees paid in the prior three months.",
    playbook: "Liability cap must not apply to confidentiality, privacy, IP, fraud.",
    confidence: "Very likely",
    suggestion: "The liability cap shall not apply to breaches of confidentiality, data protection obligations, intellectual property infringement, fraud, willful misconduct, or indemnification obligations.",
  },
  {
    id: 2,
    risk: "High",
    title: "Indemnification",
    issue: "One-sided indemnification protecting only vendor.",
    section: "13.1",
    quote: "Customer shall indemnify and hold harmless Vendor from any claims...",
    playbook: "Indemnification must be mutual for IP infringement and data breaches.",
    confidence: "Very likely",
    suggestion: "Each party shall indemnify the other party against claims arising from (i) the indemnifying party's breach of its confidentiality obligations, (ii) infringement of third-party intellectual property rights, and (iii) data protection violations.",
  },
  {
    id: 3,
    risk: "Medium",
    title: "IP assignment clause",
    issue: "Overly broad IP assignment for customizations.",
    section: "8.4",
    quote: "All customizations, configurations, and derivative works shall be the sole property of Vendor.",
    playbook: "Customer retains ownership of customer-created configurations and data.",
    confidence: "Likely",
    suggestion: "Customer retains all rights in Customer Data and Customer-specific configurations. Vendor retains rights in the underlying platform and generic improvements.",
  },
  {
    id: 4,
    risk: "Medium",
    title: "Termination for convenience",
    issue: "Only vendor can terminate for convenience.",
    section: "15.2",
    quote: "Vendor may terminate this Agreement for any reason with 30 days written notice.",
    playbook: "Termination for convenience should be mutual with minimum 90 days notice.",
    confidence: "Likely",
    suggestion: "Either party may terminate this Agreement for convenience upon ninety (90) days' prior written notice to the other party.",
  },
  {
    id: 5,
    risk: "Low",
    title: "Force majeure",
    issue: "Force majeure clause is standard and acceptable.",
    section: "18.1",
    quote: "Neither party shall be liable for failure to perform obligations due to events beyond reasonable control.",
    playbook: "Standard force majeure is acceptable.",
    confidence: "Very likely",
    suggestion: null,
  },
]

function RiskIndicator({ risk }: { risk: string }) {
  if (risk === "High") return <div className="h-2 w-2 rounded-full bg-destructive" />
  if (risk === "Medium") return <div className="h-2 w-2 rounded-full bg-warning" />
  return <div className="h-2 w-2 rounded-full bg-success" />
}

export function ReviewWorkspacePage() {
  return (
    <div className="flex h-[calc(100vh-3.5rem)] flex-col">
      <div className="flex items-center justify-between border-b border-border bg-card px-4 py-2.5">
        <div className="flex items-center gap-3">
          <Link to="/review-queue" className="text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <Separator orientation="vertical" className="h-5" />
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Acme Corp MSA</span>
              <Badge variant="secondary" className="text-xs">v2</Badge>
            </div>
            <span className="text-xs text-muted-foreground">Matter: Acme Corp SaaS Agreement</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="gap-1 text-xs">
            <BookOpen className="h-3 w-3" />
            Standard SaaS Review
          </Badge>
          <Badge variant="secondary" className="gap-1 text-xs">
            <Bot className="h-3 w-3" />
            Legal-grounded AI
          </Badge>
          <Separator orientation="vertical" className="h-5" />
          <Button variant="outline" size="sm">Compare versions</Button>
          <Button variant="outline" size="sm">Export</Button>
          <Button size="sm">
            <Sparkles className="mr-1.5 h-3.5 w-3.5" />
            Generate redline
          </Button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        <div className="flex-1 border-r border-border">
          <div className="flex h-full flex-col">
            <div className="flex items-center justify-between border-b border-border px-4 py-2">
              <span className="text-sm font-medium">Document</span>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" className="h-7 text-xs">Search</Button>
                <Button variant="ghost" size="sm" className="h-7 text-xs">Page view</Button>
              </div>
            </div>
            <ScrollArea className="flex-1 p-6">
              <div className="mx-auto max-w-2xl space-y-6">
                <div>
                  <h2 className="mb-4 text-lg font-semibold">MASTER SERVICES AGREEMENT</h2>
                  <p className="text-sm text-muted-foreground">
                    This Master Services Agreement ("Agreement") is entered into as of January 1, 2026 between Acme Corp ("Vendor") and the undersigned customer ("Customer").
                  </p>
                </div>
                <Separator />
                <div>
                  <h3 className="mb-2 text-sm font-semibold">12. LIMITATION OF LIABILITY</h3>
                  <div className="mb-3">
                    <p className="text-sm text-muted-foreground">12.1 Subject to Section 12.2, neither party shall be liable for indirect, incidental, special, or consequential damages.</p>
                  </div>
                  <div className="rounded-md border-l-2 border-destructive bg-destructive/5 p-3">
                    <p className="text-sm">
                      12.2 <span className="bg-destructive/10 font-medium">Total liability shall not exceed fees paid in the prior three months.</span>
                    </p>
                    <div className="mt-2 flex items-center gap-1.5">
                      <Badge variant="destructive" className="text-xs">High risk</Badge>
                      <span className="text-xs text-muted-foreground">AI finding: Missing carve-outs</span>
                    </div>
                  </div>
                </div>
                <Separator />
                <div>
                  <h3 className="mb-2 text-sm font-semibold">13. INDEMNIFICATION</h3>
                  <div className="rounded-md border-l-2 border-destructive bg-destructive/5 p-3">
                    <p className="text-sm">
                      13.1 <span className="bg-destructive/10 font-medium">Customer shall indemnify and hold harmless Vendor from any claims, damages, losses, and expenses arising from Customer's use of the Services.</span>
                    </p>
                    <div className="mt-2 flex items-center gap-1.5">
                      <Badge variant="destructive" className="text-xs">High risk</Badge>
                      <span className="text-xs text-muted-foreground">AI finding: One-sided</span>
                    </div>
                  </div>
                </div>
                <Separator />
                <div>
                  <h3 className="mb-2 text-sm font-semibold">8. INTELLECTUAL PROPERTY</h3>
                  <div className="rounded-md border-l-2 border-warning bg-warning/5 p-3">
                    <p className="text-sm">
                      8.4 <span className="bg-warning/10 font-medium">All customizations, configurations, and derivative works shall be the sole property of Vendor.</span>
                    </p>
                    <div className="mt-2 flex items-center gap-1.5">
                      <Badge className="bg-warning/10 text-warning border-warning/20 text-xs">Medium risk</Badge>
                      <span className="text-xs text-muted-foreground">AI finding: Overly broad</span>
                    </div>
                  </div>
                </div>
                <Separator />
                <div>
                  <h3 className="mb-2 text-sm font-semibold">15. TERMINATION</h3>
                  <div className="rounded-md border-l-2 border-warning bg-warning/5 p-3">
                    <p className="text-sm">
                      15.2 <span className="bg-warning/10 font-medium">Vendor may terminate this Agreement for any reason with 30 days written notice.</span>
                    </p>
                    <div className="mt-2 flex items-center gap-1.5">
                      <Badge className="bg-warning/10 text-warning border-warning/20 text-xs">Medium risk</Badge>
                      <span className="text-xs text-muted-foreground">AI finding: Not mutual</span>
                    </div>
                  </div>
                </div>
                <Separator />
                <div>
                  <h3 className="mb-2 text-sm font-semibold">18. FORCE MAJEURE</h3>
                  <div className="rounded-md border-l-2 border-success bg-success/5 p-3">
                    <p className="text-sm">
                      18.1 Neither party shall be liable for failure to perform obligations due to events beyond reasonable control.
                    </p>
                    <div className="mt-2 flex items-center gap-1.5">
                      <Badge className="bg-success/10 text-success border-success/20 text-xs">Low risk</Badge>
                      <span className="text-xs text-muted-foreground">Standard clause</span>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollArea>
          </div>
        </div>

        <div className="w-[420px] flex flex-col">
          <div className="border-b border-border px-4 py-2">
            <Tabs defaultValue="findings">
              <TabsList className="h-8">
                <TabsTrigger value="findings" className="text-xs">Findings (5)</TabsTrigger>
                <TabsTrigger value="chat" className="text-xs">AI Chat</TabsTrigger>
                <TabsTrigger value="activity" className="text-xs">Activity</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <ScrollArea className="flex-1">
            <div className="p-4 space-y-1">
              <div className="mb-4 rounded-lg border border-border p-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Overall risk</span>
                  <Badge variant="destructive">High</Badge>
                </div>
                <div className="flex gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1"><RiskIndicator risk="High" /> 2 High</span>
                  <span className="flex items-center gap-1"><RiskIndicator risk="Medium" /> 2 Medium</span>
                  <span className="flex items-center gap-1"><RiskIndicator risk="Low" /> 1 Low</span>
                </div>
              </div>

              {findings.map((finding) => (
                <Card key={finding.id} className="mb-3">
                  <CardContent className="p-3 space-y-2.5">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2">
                        <RiskIndicator risk={finding.risk} />
                        <span className="text-sm font-medium">{finding.title}</span>
                      </div>
                      <Badge
                        variant={finding.risk === "High" ? "destructive" : "secondary"}
                        className={`text-xs ${finding.risk === "Medium" ? "bg-warning/10 text-warning border-warning/20" : finding.risk === "Low" ? "bg-success/10 text-success border-success/20" : ""}`}
                      >
                        {finding.risk}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">{finding.issue}</p>
                    <div className="rounded border border-border bg-muted/50 p-2">
                      <p className="text-xs text-muted-foreground">
                        <span className="font-medium">Source:</span> Section {finding.section}
                      </p>
                      <p className="mt-1 text-xs italic text-muted-foreground">"{finding.quote}"</p>
                    </div>
                    <div className="rounded border border-border bg-accent/30 p-2">
                      <p className="text-xs text-muted-foreground">
                        <span className="font-medium">Playbook:</span> {finding.playbook}
                      </p>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">Confidence: {finding.confidence}</span>
                    </div>
                    {finding.suggestion && (
                      <div className="rounded border border-primary/20 bg-primary/5 p-2">
                        <p className="mb-1 text-xs font-medium text-primary">Suggested language:</p>
                        <p className="text-xs text-muted-foreground">{finding.suggestion}</p>
                      </div>
                    )}
                    <div className="flex gap-1.5 pt-1">
                      {finding.suggestion && (
                        <Button size="sm" className="h-7 text-xs">
                          <CheckCircle2 className="mr-1 h-3 w-3" />
                          Accept
                        </Button>
                      )}
                      <Button variant="outline" size="sm" className="h-7 text-xs">
                        <Edit3 className="mr-1 h-3 w-3" />
                        Edit
                      </Button>
                      <Button variant="ghost" size="sm" className="h-7 text-xs">
                        <X className="mr-1 h-3 w-3" />
                        Dismiss
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </ScrollArea>

          <div className="border-t border-border bg-card p-3">
            <div className="flex gap-2">
              <Button className="flex-1" size="sm">
                <Sparkles className="mr-1.5 h-3.5 w-3.5" />
                Generate redline
              </Button>
              <Button variant="outline" size="sm">
                <MessageSquare className="mr-1.5 h-3.5 w-3.5" />
                Comment
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function BookOpen(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
    </svg>
  )
}
