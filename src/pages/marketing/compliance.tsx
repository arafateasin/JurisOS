import { Link } from "react-router-dom"
import { Shield, ArrowRight, FileCheck, Database, RefreshCw, ChartBar as BarChart3, Lock, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

export function ComplianceProductPage() {
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
              <Shield className="h-3 w-3" />
              Compliance Module
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
              Continuous compliance monitoring with automated evidence collection
            </h1>
            <p className="text-lg text-muted-foreground">
              Map controls to policies, collect evidence automatically from connected systems, and maintain audit-ready posture across SOC 2, ISO 27001, GDPR, and custom frameworks.
            </p>
            <div className="flex items-center gap-3">
              <Button size="lg" asChild>
                <Link to="/signup">
                  See compliance in action
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
          <div className="rounded-xl border border-border bg-card p-6 shadow-lg">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Compliance Readiness</span>
                <Badge variant="secondary" className="bg-success/10 text-success border-success/20">87%</Badge>
              </div>
              <div className="space-y-3">
                {[
                  { name: "SOC 2 Type II", progress: 92 },
                  { name: "ISO 27001", progress: 84 },
                  { name: "GDPR", progress: 78 },
                  { name: "HIPAA", progress: 95 },
                ].map((fw) => (
                  <div key={fw.name} className="space-y-1">
                    <div className="flex items-center justify-between text-sm">
                      <span>{fw.name}</span>
                      <span className="text-muted-foreground">{fw.progress}%</span>
                    </div>
                    <Progress value={fw.progress} className="h-2" />
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
            <h2 className="text-3xl font-bold tracking-tight">Compliance capabilities</h2>
            <p className="mt-3 text-muted-foreground">Everything you need to maintain audit-ready compliance</p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              { icon: Database, title: "Framework library", description: "Pre-built control mappings for SOC 2, ISO 27001, GDPR, HIPAA, and more." },
              { icon: FileCheck, title: "Evidence collection", description: "Automatically collect and link evidence from connected systems." },
              { icon: RefreshCw, title: "Continuous monitoring", description: "Real-time control status updates as your environment changes." },
              { icon: BarChart3, title: "Readiness dashboards", description: "Visual compliance posture across all frameworks at a glance." },
              { icon: Lock, title: "Audit-ready exports", description: "Generate auditor-ready packages with control matrices and evidence." },
              { icon: Globe, title: "Regulatory tracking", description: "Monitor regulatory changes and understand impact on your compliance." },
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
          <h2 className="text-3xl font-bold text-primary-foreground">Stay audit-ready, always</h2>
          <p className="mt-3 text-primary-foreground/80">Eliminate last-minute audit scrambles with continuous compliance</p>
          <div className="mt-6">
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
