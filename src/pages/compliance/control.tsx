import { Link } from "react-router-dom"
import { ArrowLeft, Upload, CircleCheck as CheckCircle2, TriangleAlert as AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

export function ComplianceControlPage() {
  return (
    <div className="p-6">
      <Link to="/compliance" className="mb-4 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-4 w-4" />
        Back to compliance
      </Link>

      <div className="mb-6 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold tracking-tight">AC-2.1: Access Review</h1>
            <Badge variant="destructive">Failing</Badge>
          </div>
          <p className="mt-1 text-sm text-muted-foreground">SOC 2 · CC6.1 Logical Access · Owner: IT Security</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">Add exception</Button>
          <Button>Mark reviewed</Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Control description</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-muted-foreground">
              <p>
                The organization performs quarterly access reviews for all production systems to ensure access is appropriate and aligned with job responsibilities. Terminated users must be removed within 24 hours.
              </p>
              <Separator />
              <div>
                <p className="font-medium text-foreground">Framework mapping</p>
                <div className="mt-2 flex gap-2">
                  <Badge variant="secondary">SOC 2 CC6.1</Badge>
                  <Badge variant="secondary">ISO 27001 A.9.2.5</Badge>
                  <Badge variant="secondary">NIST AC-2</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Evidence</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between rounded-lg border border-destructive/20 bg-destructive/5 p-3">
                  <div className="flex items-center gap-3">
                    <AlertTriangle className="h-4 w-4 text-destructive" />
                    <div>
                      <p className="text-sm font-medium">Q1 2026 Access Review Report</p>
                      <p className="text-xs text-muted-foreground">Required · Not uploaded · Due: May 20, 2026</p>
                    </div>
                  </div>
                  <Button size="sm" variant="outline">
                    <Upload className="mr-1.5 h-3.5 w-3.5" />
                    Upload
                  </Button>
                </div>
                <div className="flex items-center justify-between rounded-lg border border-border p-3">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="h-4 w-4 text-success" />
                    <div>
                      <p className="text-sm font-medium">Q4 2025 Access Review Report</p>
                      <p className="text-xs text-muted-foreground">Uploaded Dec 15, 2025 · Approved by Sarah Chen</p>
                    </div>
                  </div>
                  <Badge className="bg-success/10 text-success border-success/20">Accepted</Badge>
                </div>
                <div className="flex items-center justify-between rounded-lg border border-border p-3">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="h-4 w-4 text-success" />
                    <div>
                      <p className="text-sm font-medium">Access Review Procedure Document</p>
                      <p className="text-xs text-muted-foreground">Uploaded Jan 5, 2026 · v2.1</p>
                    </div>
                  </div>
                  <Badge className="bg-success/10 text-success border-success/20">Accepted</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <CardTitle className="text-base">AI sufficiency analysis</CardTitle>
                <Badge variant="secondary" className="text-xs">
                  <span className="mr-1 inline-block h-1.5 w-1.5 rounded-full bg-ai" />
                  AI generated
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-lg border border-warning/20 bg-warning/5 p-4 space-y-2">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-warning" />
                  <span className="text-sm font-medium">Needs review</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  The Q1 2026 access review report is missing. The last completed review was Q4 2025, which means the quarterly cadence has been broken. This will be flagged during audit.
                </p>
                <Separator />
                <div className="text-sm">
                  <p className="font-medium">Required:</p>
                  <p className="text-muted-foreground">Completed access review report showing all production systems reviewed, exceptions documented, and remediation actions taken.</p>
                </div>
                <div className="text-sm">
                  <p className="font-medium">Suggested next step:</p>
                  <p className="text-muted-foreground">Request Q1 2026 access review completion from IT Security team. Deadline: May 20, 2026.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Control details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              {[
                { label: "Status", value: "Failing" },
                { label: "Owner", value: "IT Security" },
                { label: "Frequency", value: "Quarterly" },
                { label: "Last tested", value: "Dec 15, 2025" },
                { label: "Next due", value: "May 20, 2026" },
                { label: "Risk if missing", value: "High" },
              ].map((item) => (
                <div key={item.label} className="flex justify-between">
                  <span className="text-muted-foreground">{item.label}</span>
                  <span className="font-medium">{item.value}</span>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Test history</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { date: "Dec 15, 2025", result: "Pass", tester: "Sarah Chen" },
                { date: "Sep 12, 2025", result: "Pass", tester: "Mike Park" },
                { date: "Jun 8, 2025", result: "Fail", tester: "Sarah Chen" },
              ].map((test) => (
                <div key={test.date} className="flex items-center justify-between text-sm">
                  <div>
                    <p className="font-medium">{test.date}</p>
                    <p className="text-xs text-muted-foreground">{test.tester}</p>
                  </div>
                  <Badge
                    className={test.result === "Pass" ? "bg-success/10 text-success border-success/20" : ""}
                    variant={test.result === "Fail" ? "destructive" : "secondary"}
                  >
                    {test.result}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
