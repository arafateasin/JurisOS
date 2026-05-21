import { Link } from "react-router-dom"
import { BookOpen, ArrowRight, Shield, Layers, Settings, FileText, Bot, CircleCheck as CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export function PlaybooksProductPage() {
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
              <BookOpen className="h-3 w-3" />
              Playbook Builder
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
              Define your legal standards. Let AI enforce them consistently.
            </h1>
            <p className="text-lg text-muted-foreground">
              Build playbooks that encode your preferred positions, fallback language, and escalation rules. Juris 1.0 enforces them automatically on every contract review.
            </p>
            <div className="flex items-center gap-3">
              <Button size="lg" asChild>
                <Link to="/signup">
                  Build a playbook
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
          <div className="rounded-xl border border-border bg-card p-6 shadow-lg">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-sm font-medium">
                <BookOpen className="h-4 w-4 text-primary" />
                SaaS Agreement Playbook
              </div>
              <div className="space-y-3">
                {[
                  { clause: "Limitation of Liability", position: "Cap at 12 months fees; carve-outs for IP, data, confidentiality" },
                  { clause: "Indemnification", position: "Mutual indemnification; IP infringement, data breach, gross negligence" },
                  { clause: "Termination", position: "60-day notice; cure period for material breach; survival clauses" },
                  { clause: "Data Protection", position: "DPA required; sub-processor notification; data residency controls" },
                ].map((rule) => (
                  <div key={rule.clause} className="rounded-lg border border-border p-3">
                    <p className="text-sm font-medium">{rule.clause}</p>
                    <p className="text-xs text-muted-foreground mt-1">{rule.position}</p>
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
            <h2 className="text-3xl font-bold tracking-tight">Playbook capabilities</h2>
            <p className="mt-3 text-muted-foreground">Encode institutional knowledge into reusable, enforceable rules</p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              { icon: Layers, title: "Multi-tier positions", description: "Define preferred, acceptable, and fallback positions for every clause type." },
              { icon: Shield, title: "Risk thresholds", description: "Set custom risk tolerances that trigger automatic escalation." },
              { icon: Settings, title: "Rule conditions", description: "Apply different rules based on contract type, value, or counterparty." },
              { icon: FileText, title: "Template language", description: "Attach preferred language templates that AI uses to generate redlines." },
              { icon: Bot, title: "Auto-enforcement", description: "Every review automatically checks against applicable playbook rules." },
              { icon: CheckCircle, title: "Version control", description: "Track playbook changes over time with full revision history." },
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
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="rounded-xl bg-primary p-12 text-center">
          <h2 className="text-3xl font-bold text-primary-foreground">Standardize your legal review process</h2>
          <p className="mt-3 text-primary-foreground/80">Build your first playbook in under 30 minutes</p>
          <div className="mt-6">
            <Button size="lg" variant="secondary" asChild>
              <Link to="/signup">Get started</Link>
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
