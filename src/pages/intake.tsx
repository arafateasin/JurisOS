import { Link } from "react-router-dom"
import { ArrowLeft, Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function IntakePage() {
  return (
    <div className="p-6">
      <Link to="/dashboard" className="mb-4 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-4 w-4" />
        Back to dashboard
      </Link>

      <div className="mx-auto max-w-3xl">
        <div className="mb-6">
          <h1 className="text-2xl font-bold tracking-tight">New legal request</h1>
          <p className="text-sm text-muted-foreground">Submit a request for legal review, contract analysis, or compliance help</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <Card>
              <CardContent className="space-y-4 pt-6">
                <div className="space-y-2">
                  <Label>Request type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="What do you need?" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="review">Contract review</SelectItem>
                      <SelectItem value="nda">NDA request</SelectItem>
                      <SelectItem value="vendor">Vendor assessment</SelectItem>
                      <SelectItem value="compliance">Compliance question</SelectItem>
                      <SelectItem value="policy">Policy review</SelectItem>
                      <SelectItem value="other">Other legal request</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Counterparty</Label>
                    <Input placeholder="Company name" />
                  </div>
                  <div className="space-y-2">
                    <Label>Business owner</Label>
                    <Input placeholder="Your name" />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Contract value (if applicable)</Label>
                    <Input placeholder="$0" type="text" />
                  </div>
                  <div className="space-y-2">
                    <Label>Deadline</Label>
                    <Input type="date" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Description</Label>
                  <Textarea
                    placeholder="Describe what you need help with..."
                    className="min-h-[100px]"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Upload document (optional)</Label>
                  <div className="flex items-center justify-center rounded-lg border-2 border-dashed border-border p-6">
                    <div className="text-center">
                      <Upload className="mx-auto mb-2 h-6 w-6 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">Drag and drop or click to upload</p>
                      <p className="text-xs text-muted-foreground">PDF, DOCX, DOC up to 50MB</p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2 pt-2">
                  <Button>Submit request</Button>
                  <Button variant="outline">Save draft</Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Estimated path</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { step: "1", label: "AI review", description: "Document analyzed by JurisOS" },
                    { step: "2", label: "Legal review", description: "Findings reviewed by legal team" },
                    { step: "3", label: "Approval", description: "Redlines approved" },
                    { step: "4", label: "Signature", description: "Sent for execution" },
                  ].map((item) => (
                    <div key={item.step} className="flex items-start gap-3">
                      <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-medium text-primary-foreground">
                        {item.step}
                      </div>
                      <div>
                        <p className="text-sm font-medium">{item.label}</p>
                        <p className="text-xs text-muted-foreground">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
