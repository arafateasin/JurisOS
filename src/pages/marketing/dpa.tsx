import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"

export function DpaPage() {
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

      <article className="mx-auto max-w-3xl px-6 py-20">
        <h1 className="text-4xl font-bold tracking-tight">Data Processing Agreement</h1>
        <p className="mt-2 text-sm text-muted-foreground">Last updated: May 1, 2026</p>

        <div className="mt-10 space-y-8 text-sm leading-7 text-muted-foreground">
          <section>
            <h2 className="mb-3 text-lg font-semibold text-foreground">1. Scope and Purpose</h2>
            <p>This Data Processing Agreement ("DPA") forms part of the Agreement between JurisOS, Inc. ("Processor") and the customer ("Controller") and applies to all processing of personal data by JurisOS on behalf of the Controller in connection with the provision of the Service.</p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-semibold text-foreground">2. Definitions</h2>
            <p>"Personal Data," "Processing," "Data Subject," "Controller," and "Processor" have the meanings given in applicable Data Protection Laws, including the GDPR, UK GDPR, and CCPA as applicable.</p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-semibold text-foreground">3. Processing Instructions</h2>
            <p>JurisOS will process personal data only on documented instructions from the Controller, including transfers to third countries. Processing is limited to what is necessary to provide the Service as described in the Agreement.</p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-semibold text-foreground">4. Security Measures</h2>
            <p className="mb-2">JurisOS implements appropriate technical and organizational measures including:</p>
            <ul className="ml-6 list-disc space-y-1">
              <li>Encryption of personal data at rest (AES-256) and in transit (TLS 1.3)</li>
              <li>Logical separation of customer data (multi-tenant isolation)</li>
              <li>Regular security testing including penetration tests</li>
              <li>Access controls with least-privilege principles</li>
              <li>Incident response procedures with defined notification timelines</li>
              <li>Employee security training and background checks</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-semibold text-foreground">5. Sub-processors</h2>
            <p>JurisOS may engage sub-processors to assist in providing the Service. The current list of sub-processors is available at <Link to="/legal/sub-processors" className="text-primary underline">jurisos.com/legal/sub-processors</Link>. JurisOS will notify the Controller at least 30 days before engaging a new sub-processor.</p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-semibold text-foreground">6. Data Subject Rights</h2>
            <p>JurisOS will assist the Controller in fulfilling data subject requests (access, correction, deletion, portability) through appropriate technical and organizational measures. Requests will be processed within 72 hours.</p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-semibold text-foreground">7. Data Breach Notification</h2>
            <p>JurisOS will notify the Controller without undue delay (and in any event within 72 hours) upon becoming aware of a personal data breach. Notification will include the nature of the breach, categories of data affected, likely consequences, and measures taken.</p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-semibold text-foreground">8. International Transfers</h2>
            <p>Where personal data is transferred outside the EEA/UK, JurisOS ensures appropriate safeguards through Standard Contractual Clauses (SCCs) as approved by the European Commission. Data residency options are available for Enterprise customers.</p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-semibold text-foreground">9. Audit Rights</h2>
            <p>The Controller may audit JurisOS's compliance with this DPA upon 30 days written notice, no more than once per year. JurisOS will make available SOC 2 Type II reports and other compliance documentation upon request.</p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-semibold text-foreground">10. Data Deletion</h2>
            <p>Upon termination of the Agreement, JurisOS will delete all personal data within 30 days, unless retention is required by applicable law. A certificate of deletion will be provided upon request.</p>
          </section>
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
