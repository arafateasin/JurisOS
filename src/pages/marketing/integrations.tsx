import { Link } from "react-router-dom"
import { Cable, ArrowRight, FileText, Mail, Cloud, Database, Lock, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export function IntegrationsProductPage() {
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
        <div className="flex flex-col items-center gap-6 text-center">
          <Badge variant="secondary" className="w-fit gap-1.5">
            <Cable className="h-3 w-3" />
            Integrations
          </Badge>
          <h1 className="max-w-3xl text-4xl font-bold tracking-tight md:text-5xl">
            Connect JurisOS to your existing legal tech stack
          </h1>
          <p className="max-w-2xl text-lg text-muted-foreground">
            Pull contracts from your DMS, sync with your CLM, push approvals to Slack, and collect compliance evidence from cloud providers.
          </p>
          <Button size="lg" asChild>
            <Link to="/signup">
              Explore integrations
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>

      <section className="border-y border-border bg-card py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold tracking-tight">Integration categories</h2>
            <p className="mt-3 text-muted-foreground">Native connectors for the tools your team already uses</p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              { icon: FileText, title: "Document Management", systems: ["SharePoint", "Google Drive", "iManage", "NetDocuments"], description: "Pull contracts directly from your document management system." },
              { icon: Mail, title: "Communication", systems: ["Slack", "Microsoft Teams", "Email"], description: "Send approval requests and notifications where your team works." },
              { icon: Cloud, title: "Cloud Providers", systems: ["AWS", "Azure", "GCP"], description: "Collect compliance evidence from cloud infrastructure." },
              { icon: Database, title: "CLM Systems", systems: ["Ironclad", "DocuSign CLM", "Agiloft"], description: "Bi-directional sync with your contract lifecycle management tool." },
              { icon: Lock, title: "Identity & Access", systems: ["Okta", "Azure AD", "OneLogin"], description: "SSO, SCIM provisioning, and access control integration." },
              { icon: RefreshCw, title: "Workflow", systems: ["Jira", "ServiceNow", "Asana"], description: "Trigger workflows and track legal requests in your project tools." },
            ].map((category) => (
              <Card key={category.title}>
                <CardContent className="pt-6">
                  <category.icon className="mb-3 h-8 w-8 text-primary" />
                  <h3 className="mb-1 font-semibold">{category.title}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{category.description}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {category.systems.map((sys) => (
                      <Badge key={sys} variant="outline" className="text-xs">{sys}</Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight">API-first architecture</h2>
          <p className="mt-3 text-muted-foreground">Build custom integrations with our REST API and webhooks</p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {[
            { title: "REST API", description: "Full API access to contracts, reviews, playbooks, and compliance data." },
            { title: "Webhooks", description: "Real-time event notifications for review completions, approvals, and status changes." },
            { title: "Custom connectors", description: "Build custom integrations using our SDK and connector framework." },
          ].map((item) => (
            <Card key={item.title}>
              <CardContent className="pt-6">
                <h3 className="mb-2 font-semibold">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-20">
        <div className="rounded-xl bg-primary p-12 text-center">
          <h2 className="text-3xl font-bold text-primary-foreground">Need a custom integration?</h2>
          <p className="mt-3 text-primary-foreground/80">Our team can help connect JurisOS to any system in your stack</p>
          <div className="mt-6">
            <Button size="lg" variant="secondary" asChild>
              <Link to="/signup">Talk to us</Link>
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
