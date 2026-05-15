import { FileText, Download, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const reportTemplates = [
  { name: "Contract Risk Report", description: "Summary of all contract risks by severity and counterparty", format: "PDF, DOCX" },
  { name: "Matter Summary", description: "Status report for all active matters with next actions", format: "PDF, DOCX" },
  { name: "Compliance Readiness Report", description: "Framework compliance status with evidence gaps", format: "PDF, CSV" },
  { name: "Audit Evidence Packet", description: "Export all evidence for a specific control or framework", format: "ZIP" },
  { name: "AI Activity Report", description: "Agent runs, approvals, and accuracy metrics", format: "PDF, CSV" },
  { name: "Negotiation History", description: "Position changes and counterparty communication log", format: "PDF, DOCX" },
]

const recentReports = [
  { name: "SOC 2 Readiness - May 2026", generated: "May 14, 2026", by: "Sarah Chen", format: "PDF" },
  { name: "Q2 Contract Risk Overview", generated: "May 10, 2026", by: "System (scheduled)", format: "PDF" },
  { name: "Acme Corp Negotiation Summary", generated: "May 8, 2026", by: "James Lee", format: "DOCX" },
]

export function ReportsPage() {
  return (
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Reports</h1>
          <p className="text-sm text-muted-foreground">Generate board, audit, legal, and business reports</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Create report
        </Button>
      </div>

      <div className="mb-8">
        <h2 className="mb-4 text-lg font-semibold">Report templates</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {reportTemplates.map((template) => (
            <Card key={template.name} className="cursor-pointer transition-colors hover:border-primary">
              <CardHeader>
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent">
                  <FileText className="h-4 w-4 text-primary" />
                </div>
                <CardTitle className="text-base">{template.name}</CardTitle>
                <CardDescription>{template.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <Badge variant="secondary" className="text-xs">{template.format}</Badge>
                  <Button variant="ghost" size="sm" className="h-7 text-xs">Generate</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div>
        <h2 className="mb-4 text-lg font-semibold">Recent reports</h2>
        <Card>
          <CardContent className="p-0">
            <div className="divide-y divide-border">
              {recentReports.map((report) => (
                <div key={report.name} className="flex items-center justify-between p-4">
                  <div className="flex items-center gap-3">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">{report.name}</p>
                      <p className="text-xs text-muted-foreground">Generated {report.generated} by {report.by}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="text-xs">{report.format}</Badge>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
