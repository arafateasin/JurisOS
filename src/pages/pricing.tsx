import { Link } from "react-router-dom"
import { CircleCheck as CheckCircle2, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export function PricingPage() {
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
        <Link to="/" className="mb-8 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4" />
          Back to home
        </Link>
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold tracking-tight">Simple, transparent pricing</h1>
          <p className="mt-3 text-lg text-muted-foreground">Start with contract review. Expand as you grow.</p>
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
      </section>

      <footer className="border-t border-border py-12">
        <div className="mx-auto max-w-7xl px-6 text-center text-sm text-muted-foreground">
          2026 JurisOS. All rights reserved.
        </div>
      </footer>
    </div>
  )
}
