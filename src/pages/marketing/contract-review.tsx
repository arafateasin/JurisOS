import { Link } from "react-router-dom"
import { FileText, Bot, Shield, CircleCheck as CheckCircle, ArrowRight, Zap, Eye, BookOpen } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export function ContractReviewProductPage() {
  return (
    <div className="min-h-screen bg-background">
      <nav className="sticky top-0 z-50 border-b border-border bg-card/80 backdrop-blur-sm">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-6">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <span className="text-sm font-bold text-primary-foreground">J</span>
            </div>
            <span className="text-base font-semibold">JurisOS</span>
          </Link>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" asChild>
              <Link to="/login">Sign in</Link>
            </Button>
            <Button size="sm" asChild>
              <Link to="/signup">Book a demo</Link>
            </Button>
          </div>
        </div>
      </nav>

      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div className="flex flex-col gap-6">
            <Badge variant="secondary" className="w-fit gap-1.5">
              <FileText className="h-3 w-3" />
              Contract Review AI
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
              AI-powered contract review with clause-level risk analysis
            </h1>
            <p className="text-lg text-muted-foreground">
              Upload any contract and get detailed risk findings with source citations in under 2 minutes. Juris 1.0 identifies non-standard terms, missing protections, and compliance gaps.
            </p>
            <div className="flex items-center gap-3">
              <Button size="lg" asChild>
                <Link to="/signup">
                  Start reviewing
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/signup">Try sample contract</Link>
              </Button>
            </div>
          </div>
          <div className="rounded-xl border border-border bg-card p-6 shadow-lg">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-sm font-medium">
                <Bot className="h-4 w-4 text-primary" />
                Juris 1.0 Review Output
              </div>
              <div className="space-y-3">
                {[
                  { risk: "High", clause: "Limitation of Liability", desc: "No carve-out for data breach or IP infringement" },
                  { risk: "Medium", clause: "Termination for Convenience", desc: "30-day notice period below market standard (60 days)" },
                  { risk: "Low", clause: "Assignment", desc: "Silent on change of control provisions" },
                ].map((finding) => (
                  <div key={finding.clause} className="rounded-lg border border-border p-3">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium">{finding.clause}</span>
                      <Badge variant={finding.risk === "High" ? "destructive" : "secondary"} className={finding.risk === "Medium" ? "bg-warning/10 text-warning border-warning/20" : ""}>
                        {finding.risk}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">{finding.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-card py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold tracking-tight">How contract review works</h2>
            <p className="mt-3 text-muted-foreground">From upload to actionable findings in minutes</p>
          </div>
          <div className="grid gap-8 md:grid-cols-4">
            {[
              { step: "1", title: "Upload", description: "Upload a contract in PDF, DOCX, or connect your DMS." },
              { step: "2", title: "Extract", description: "Juris 1.0 extracts and classifies every clause automatically." },
              { step: "3", title: "Analyze", description: "Each clause is scored against your playbook and risk thresholds." },
              { step: "4", title: "Report", description: "Get a structured report with citations, risk levels, and suggested language." },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-lg font-bold text-primary-foreground">
                  {item.step}
                </div>
                <h3 className="mb-2 font-semibold">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight">Key capabilities</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[
            { icon: Zap, title: "2-minute reviews", description: "Full clause-level analysis in under 2 minutes for standard contracts." },
            { icon: BookOpen, title: "Playbook enforcement", description: "Automatically compare terms against your preferred positions and fallback language." },
            { icon: Eye, title: "Source citations", description: "Every finding links to the exact section and language in the original document." },
            { icon: Shield, title: "Risk scoring", description: "High, medium, and low risk classifications with customizable thresholds." },
            { icon: Bot, title: "Redline generation", description: "Auto-generate tracked changes based on your playbook rules." },
            { icon: CheckCircle, title: "Audit trail", description: "Every AI action, human decision, and approval is logged permanently." },
          ].map((feature) => (
            <Card key={feature.title}>
              <CardContent className="pt-6">
                <feature.icon className="mb-3 h-8 w-8 text-primary" />
                <h3 className="mb-1 font-semibold">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-20">
        <div className="rounded-xl bg-primary p-12 text-center">
          <h2 className="text-3xl font-bold text-primary-foreground">Start reviewing contracts today</h2>
          <p className="mt-3 text-primary-foreground/80">See how Juris 1.0 handles your most complex agreements</p>
          <div className="mt-6 flex items-center justify-center gap-3">
            <Button size="lg" variant="secondary" asChild>
              <Link to="/signup">Book a demo</Link>
            </Button>
          </div>
        </div>
      </section>

      <footer className="border-t border-border py-8">
        <div className="mx-auto max-w-7xl px-6 text-center text-sm text-muted-foreground">
          2026 JurisOS. All rights reserved.
        </div>
      </footer>
    </div>
  )
}
