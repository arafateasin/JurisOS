import { Link } from "react-router-dom"
import { FileText, Shield, BookOpen, Bot, CircleCheck as CheckCircle2, ArrowRight, Lock, Zap, Eye, Users, Radio } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export function LandingPage() {
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
          <div className="hidden items-center gap-6 md:flex">
            <a href="#features" className="text-sm text-muted-foreground hover:text-foreground">Features</a>
            <a href="#workflow" className="text-sm text-muted-foreground hover:text-foreground">How it works</a>
            <a href="#security" className="text-sm text-muted-foreground hover:text-foreground">Security</a>
            <a href="#pricing" className="text-sm text-muted-foreground hover:text-foreground">Pricing</a>
          </div>
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

      <section className="mx-auto max-w-7xl px-6 py-20 md:py-28">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div className="flex flex-col gap-6">
            <Badge variant="secondary" className="w-fit gap-1.5">
              <Bot className="h-3 w-3" />
              AI-powered legal operations
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight text-foreground md:text-5xl">
              Legal and compliance AI agents that review contracts, enforce playbooks, and preserve audit trails
            </h1>
            <p className="text-lg text-muted-foreground">
              JurisOS turns manual contract review into controlled agentic workflows. Upload a contract, get risk findings with source citations, generate redlines against your playbook, and preserve full audit trails.
            </p>
            <div className="flex items-center gap-3">
              <Button size="lg" asChild>
                <Link to="/signup">
                  Book a demo
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/signup">Try sample contract review</Link>
              </Button>
            </div>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <Lock className="h-3.5 w-3.5" />
                SOC 2 compliant
              </span>
              <span className="flex items-center gap-1.5">
                <Eye className="h-3.5 w-3.5" />
                Human-in-the-loop
              </span>
              <span className="flex items-center gap-1.5">
                <Zap className="h-3.5 w-3.5" />
                Review in under 2 min
              </span>
            </div>
          </div>
          <div className="rounded-xl border border-border bg-card p-2 shadow-lg">
            <div className="rounded-lg bg-muted/50 p-6">
              <div className="mb-4 flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-destructive/60" />
                <div className="h-3 w-3 rounded-full bg-warning/60" />
                <div className="h-3 w-3 rounded-full bg-success/60" />
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Badge variant="destructive" className="text-xs">High risk</Badge>
                  <span className="text-sm font-medium">Limitation of liability</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  No carve-out for confidentiality or data protection. Section 12.2 caps all damages at fees paid in the prior 3 months.
                </p>
                <div className="rounded-md border border-border bg-card p-3">
                  <p className="text-xs font-medium text-foreground">Playbook rule:</p>
                  <p className="text-xs text-muted-foreground">Liability cap must not apply to confidentiality, privacy, IP, fraud.</p>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="default" className="text-xs">Accept suggestion</Button>
                  <Button size="sm" variant="outline" className="text-xs">Edit</Button>
                  <Button size="sm" variant="ghost" className="text-xs">Dismiss</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-card py-12">
        <div className="mx-auto max-w-7xl px-6">
          <p className="mb-6 text-center text-sm text-muted-foreground">Trusted by legal and compliance teams</p>
          <div className="flex flex-wrap items-center justify-center gap-8 opacity-60">
            {["Series B SaaS", "Mid-market Fintech", "Healthcare AI", "GovCon"].map((name) => (
              <span key={name} className="text-sm font-medium text-muted-foreground">{name}</span>
            ))}
          </div>
        </div>
      </section>

      <section id="features" className="mx-auto max-w-7xl px-6 py-20">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight">One platform for legal and compliance workflows</h2>
          <p className="mt-3 text-muted-foreground">From contract intake to audit-ready compliance reporting</p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[
            { icon: FileText, title: "Contract Review AI", description: "Upload contracts and get clause-level risk analysis with source citations and playbook enforcement." },
            { icon: BookOpen, title: "Playbook Builder", description: "Define preferred positions, fallback language, and escalation rules. AI enforces them automatically." },
            { icon: Shield, title: "Compliance Evidence", description: "Map controls to policies and contracts. Collect evidence automatically from connected systems." },
            { icon: Radio, title: "Regulatory Monitor", description: "Track regulatory changes and understand impact on your contracts, policies, and compliance posture." },
            { icon: Bot, title: "AI Agents", description: "Specialized agents for review, redlining, memo drafting, and evidence collection with full audit trails." },
            { icon: CheckCircle2, title: "Approval Workflows", description: "Human-in-the-loop approvals for redlines, memos, and compliance status changes." },
          ].map((feature) => (
            <Card key={feature.title} className="border-border">
              <CardHeader>
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent">
                  <feature.icon className="h-5 w-5 text-primary" />
                </div>
                <CardTitle className="text-base">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section id="workflow" className="border-y border-border bg-card py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold tracking-tight">How it works</h2>
            <p className="mt-3 text-muted-foreground">From upload to approved redline in minutes, not days</p>
          </div>
          <div className="grid gap-8 md:grid-cols-4">
            {[
              { step: "1", title: "Upload", description: "Upload a contract or connect your document management system." },
              { step: "2", title: "AI Review", description: "JurisOS extracts clauses, detects risks, and compares against your playbook." },
              { step: "3", title: "Human Review", description: "Review findings, accept or edit suggestions, and generate redlines." },
              { step: "4", title: "Export", description: "Export approved redlines, risk memos, and preserve full audit trail." },
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

      <section id="security" className="mx-auto max-w-7xl px-6 py-20">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight">Enterprise-grade security</h2>
          <p className="mt-3 text-muted-foreground">Built for legal confidentiality and compliance requirements</p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: Lock, title: "SOC 2 Type II", description: "Continuous security monitoring" },
            { icon: Users, title: "SSO & RBAC", description: "Enterprise identity and access control" },
            { icon: Eye, title: "Audit Trails", description: "Every AI action logged and traceable" },
            { icon: Shield, title: "Zero Training", description: "Your data never trains our models" },
          ].map((item) => (
            <Card key={item.title} className="text-center">
              <CardContent className="pt-6">
                <item.icon className="mx-auto mb-3 h-8 w-8 text-primary" />
                <h3 className="mb-1 font-semibold">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section id="pricing" className="border-y border-border bg-card py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold tracking-tight">Simple, transparent pricing</h2>
            <p className="mt-3 text-muted-foreground">Start with contract review. Expand as you grow.</p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              { name: "Starter", price: "$299", period: "/user/month", description: "For solo GCs and small legal teams", features: ["Contract review AI", "Basic playbooks", "5 reviews/month", "Email support"] },
              { name: "Team", price: "$199", period: "/user/month", description: "For mid-market legal and compliance teams", features: ["Everything in Starter", "Custom playbooks", "Unlimited reviews", "Integrations", "Compliance module", "Priority support"], featured: true },
              { name: "Enterprise", price: "Custom", period: "", description: "For large legal departments and regulated industries", features: ["Everything in Team", "SSO/SAML", "Data residency", "Private deployment", "SLA & dedicated CSM", "Audit evidence export"] },
            ].map((plan) => (
              <Card key={plan.name} className={plan.featured ? "border-primary shadow-md" : ""}>
                <CardHeader>
                  {plan.featured && <Badge className="w-fit mb-2">Most popular</Badge>}
                  <CardTitle>{plan.name}</CardTitle>
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-bold">{plan.price}</span>
                    <span className="text-sm text-muted-foreground">{plan.period}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{plan.description}</p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-sm">
                        <CheckCircle2 className="h-4 w-4 text-success" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button className="mt-6 w-full" variant={plan.featured ? "default" : "outline"} asChild>
                    <Link to="/signup">{plan.name === "Enterprise" ? "Contact sales" : "Start free trial"}</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="rounded-xl bg-primary p-12 text-center">
          <h2 className="text-3xl font-bold text-primary-foreground">Ready to modernize your legal operations?</h2>
          <p className="mt-3 text-primary-foreground/80">Join legal teams already saving 50% of review time with JurisOS</p>
          <div className="mt-6 flex items-center justify-center gap-3">
            <Button size="lg" variant="secondary" asChild>
              <Link to="/signup">Book a demo</Link>
            </Button>
            <Button size="lg" variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10" asChild>
              <Link to="/signup">Try sample review</Link>
            </Button>
          </div>
        </div>
      </section>

      <footer className="border-t border-border py-12">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-8 md:grid-cols-4">
            <div>
              <div className="flex items-center gap-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary">
                  <span className="text-xs font-bold text-primary-foreground">J</span>
                </div>
                <span className="font-semibold">JurisOS</span>
              </div>
              <p className="mt-3 text-sm text-muted-foreground">AI-powered legal and compliance operating system.</p>
            </div>
            <div>
              <h4 className="mb-3 text-sm font-semibold">Product</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#features">Contract Review</a></li>
                <li><a href="#features">Playbooks</a></li>
                <li><a href="#features">Compliance</a></li>
                <li><a href="#features">Integrations</a></li>
              </ul>
            </div>
            <div>
              <h4 className="mb-3 text-sm font-semibold">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#security">Security</a></li>
                <li><a href="#pricing">Pricing</a></li>
                <li><a href="#">Blog</a></li>
                <li><a href="#">Careers</a></li>
              </ul>
            </div>
            <div>
              <h4 className="mb-3 text-sm font-semibold">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#">Privacy policy</a></li>
                <li><a href="#">Terms of service</a></li>
                <li><a href="#">DPA</a></li>
                <li><a href="#">Sub-processors</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t border-border pt-8 text-center text-sm text-muted-foreground">
            2026 JurisOS. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}
