import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const subProcessors = [
  { name: "Amazon Web Services (AWS)", purpose: "Cloud infrastructure and hosting", location: "United States", dataTypes: "All customer data" },
  { name: "Anthropic", purpose: "AI model inference for contract analysis", location: "United States", dataTypes: "Document content (processing only, no training)" },
  { name: "OpenAI", purpose: "AI model inference (alternative model)", location: "United States", dataTypes: "Document content (processing only, no training)" },
  { name: "Supabase", purpose: "Database and authentication", location: "United States", dataTypes: "Account data, application data" },
  { name: "Stripe", purpose: "Payment processing", location: "United States", dataTypes: "Billing and payment information" },
  { name: "SendGrid", purpose: "Transactional email delivery", location: "United States", dataTypes: "Email addresses, notification content" },
  { name: "Datadog", purpose: "Infrastructure monitoring and logging", location: "United States", dataTypes: "System logs, performance metrics" },
  { name: "Sentry", purpose: "Error tracking and application monitoring", location: "United States", dataTypes: "Error logs, stack traces" },
]

export function SubProcessorsPage() {
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

      <article className="mx-auto max-w-4xl px-6 py-20">
        <h1 className="text-4xl font-bold tracking-tight">Sub-processors</h1>
        <p className="mt-2 text-sm text-muted-foreground">Last updated: May 1, 2026</p>

        <div className="mt-6 text-sm leading-7 text-muted-foreground">
          <p>
            JurisOS uses the following sub-processors to provide our services. We notify customers at least 30 days before engaging a new sub-processor. To receive notifications of changes, contact privacy@jurisos.com.
          </p>
        </div>

        <div className="mt-10 space-y-4">
          {subProcessors.map((sp) => (
            <div key={sp.name} className="rounded-lg border border-border p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold">{sp.name}</h3>
                <Badge variant="outline" className="text-xs">{sp.location}</Badge>
              </div>
              <div className="grid gap-2 text-sm md:grid-cols-2">
                <div>
                  <span className="text-muted-foreground">Purpose: </span>
                  <span>{sp.purpose}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Data types: </span>
                  <span>{sp.dataTypes}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 rounded-lg border border-border bg-card p-6">
          <h2 className="mb-2 text-lg font-semibold text-foreground">AI Model Data Handling</h2>
          <p className="text-sm text-muted-foreground">
            All AI model providers (Anthropic, OpenAI) are contractually prohibited from using customer data for model training. Data is processed in isolated sessions, not retained after processing, and not shared between customers. Enterprise customers may opt for dedicated model instances.
          </p>
        </div>

        <div className="mt-8 text-sm text-muted-foreground">
          <p>
            For questions about our sub-processors or to object to a new sub-processor, contact us at privacy@jurisos.com. Objections must be raised within 30 days of notification.
          </p>
        </div>
      </article>

      <footer className="border-t border-border py-8">
        <div className="mx-auto max-w-7xl px-6 text-center text-sm text-muted-foreground">
          2026 JurisOS. All rights reserved.
        </div>
      </footer>
    </div>
  )
}
