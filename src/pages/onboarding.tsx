import { useState } from "react"
import { Link } from "react-router-dom"
import { Upload, FileText, BookOpen, Sparkles, CircleCheck as CheckCircle2, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"

const steps = [
  { id: 1, title: "Workspace ready", description: "Your workspace has been created" },
  { id: 2, title: "Choose use case", description: "Select your primary workflow" },
  { id: 3, title: "Upload document", description: "Upload a contract or use a sample" },
  { id: 4, title: "Select playbook", description: "Choose a review playbook" },
  { id: 5, title: "First review", description: "Run your first AI review" },
]

export function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(2)

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <div className="border-b border-border bg-card px-6 py-4">
        <div className="mx-auto flex max-w-3xl items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <span className="text-sm font-bold text-primary-foreground">J</span>
            </div>
            <span className="font-semibold">JurisOS</span>
          </div>
          <Button variant="ghost" size="sm" asChild>
            <Link to="/dashboard">Skip setup</Link>
          </Button>
        </div>
      </div>

      <div className="mx-auto w-full max-w-3xl flex-1 px-6 py-8">
        <div className="mb-8">
          <div className="mb-2 flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Step {currentStep} of {steps.length}</span>
            <span className="font-medium">{Math.round((currentStep / steps.length) * 100)}% complete</span>
          </div>
          <Progress value={(currentStep / steps.length) * 100} className="h-2" />
          <div className="mt-4 flex gap-2">
            {steps.map((step) => (
              <div key={step.id} className="flex items-center gap-1.5">
                {step.id < currentStep ? (
                  <CheckCircle2 className="h-4 w-4 text-success" />
                ) : step.id === currentStep ? (
                  <div className="h-4 w-4 rounded-full border-2 border-primary" />
                ) : (
                  <div className="h-4 w-4 rounded-full border-2 border-border" />
                )}
                <span className={`text-xs ${step.id === currentStep ? "font-medium" : "text-muted-foreground"}`}>
                  {step.title}
                </span>
              </div>
            ))}
          </div>
        </div>

        {currentStep === 2 && (
          <div>
            <h1 className="mb-2 text-2xl font-bold">What would you like to do first?</h1>
            <p className="mb-6 text-muted-foreground">Choose your primary use case. You can access all features later.</p>
            <div className="grid gap-4 md:grid-cols-2">
              {[
                { icon: FileText, title: "Review a contract", description: "Upload an NDA, MSA, or SaaS agreement for AI-powered risk review." },
                { icon: BookOpen, title: "Create a playbook", description: "Define your legal positions and risk tolerance for automated review." },
                { icon: Upload, title: "Import contracts", description: "Connect Google Drive or SharePoint to import existing agreements." },
                { icon: Sparkles, title: "Explore with sample data", description: "Try a pre-loaded demo with sample contracts and playbooks." },
              ].map((option) => (
                <Card
                  key={option.title}
                  className="cursor-pointer transition-colors hover:border-primary"
                  onClick={() => setCurrentStep(3)}
                >
                  <CardHeader>
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent">
                      <option.icon className="h-5 w-5 text-primary" />
                    </div>
                    <CardTitle className="text-base">{option.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>{option.description}</CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div>
            <h1 className="mb-2 text-2xl font-bold">Upload your first contract</h1>
            <p className="mb-6 text-muted-foreground">Upload a document to review, or use one of our sample contracts.</p>
            <Card className="mb-6">
              <CardContent className="flex flex-col items-center gap-4 py-12">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-accent">
                  <Upload className="h-8 w-8 text-primary" />
                </div>
                <div className="text-center">
                  <p className="font-medium">Drag and drop your contract here</p>
                  <p className="text-sm text-muted-foreground">Supports PDF, DOCX, DOC. Max 50MB.</p>
                </div>
                <Button variant="outline" onClick={() => setCurrentStep(4)}>Browse files</Button>
              </CardContent>
            </Card>
            <div>
              <p className="mb-3 text-sm font-medium">Or start with a sample</p>
              <div className="grid gap-3 md:grid-cols-3">
                {["SaaS MSA (Vendor)", "Mutual NDA", "Data Processing Agreement"].map((name) => (
                  <Card
                    key={name}
                    className="cursor-pointer transition-colors hover:border-primary"
                    onClick={() => setCurrentStep(4)}
                  >
                    <CardContent className="flex items-center gap-3 py-4">
                      <FileText className="h-5 w-5 text-muted-foreground" />
                      <span className="text-sm font-medium">{name}</span>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        )}

        {currentStep === 4 && (
          <div>
            <h1 className="mb-2 text-2xl font-bold">Select a review playbook</h1>
            <p className="mb-6 text-muted-foreground">The playbook defines what JurisOS looks for during review.</p>
            <div className="grid gap-4">
              {[
                { title: "Standard SaaS Agreement Review", description: "Covers liability, indemnity, IP, data protection, termination, and payment terms.", tags: ["MSA", "SaaS", "Vendor"] },
                { title: "NDA Review (Mutual)", description: "Focuses on scope, carve-outs, term, survival, and remedies.", tags: ["NDA", "Confidentiality"] },
                { title: "DPA Compliance Check", description: "Validates GDPR and privacy requirements against standard DPA clauses.", tags: ["DPA", "Privacy", "GDPR"] },
              ].map((playbook) => (
                <Card
                  key={playbook.title}
                  className="cursor-pointer transition-colors hover:border-primary"
                  onClick={() => setCurrentStep(5)}
                >
                  <CardContent className="flex items-center justify-between py-4">
                    <div>
                      <p className="font-medium">{playbook.title}</p>
                      <p className="text-sm text-muted-foreground">{playbook.description}</p>
                      <div className="mt-2 flex gap-1.5">
                        {playbook.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>
                        ))}
                      </div>
                    </div>
                    <ArrowRight className="h-5 w-5 text-muted-foreground" />
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {currentStep === 5 && (
          <div className="text-center">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-success/10">
              <CheckCircle2 className="h-8 w-8 text-success" />
            </div>
            <h1 className="mb-2 text-2xl font-bold">Review complete</h1>
            <p className="mb-6 text-muted-foreground">JurisOS found 7 findings across 3 risk levels.</p>
            <div className="mx-auto mb-8 grid max-w-md gap-3">
              <div className="flex items-center justify-between rounded-lg border border-border p-3">
                <span className="text-sm">High risk findings</span>
                <Badge variant="destructive">2</Badge>
              </div>
              <div className="flex items-center justify-between rounded-lg border border-border p-3">
                <span className="text-sm">Medium risk findings</span>
                <Badge className="bg-warning text-warning-foreground">3</Badge>
              </div>
              <div className="flex items-center justify-between rounded-lg border border-border p-3">
                <span className="text-sm">Low risk findings</span>
                <Badge className="bg-success text-success-foreground">2</Badge>
              </div>
            </div>
            <div className="flex items-center justify-center gap-3">
              <Button asChild>
                <Link to="/review/demo">
                  Open review workspace
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link to="/dashboard">Go to dashboard</Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
