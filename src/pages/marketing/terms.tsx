import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"

export function TermsOfServicePage() {
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
        <h1 className="text-4xl font-bold tracking-tight">Terms of Service</h1>
        <p className="mt-2 text-sm text-muted-foreground">Last updated: May 1, 2026</p>

        <div className="mt-10 space-y-8 text-sm leading-7 text-muted-foreground">
          <section>
            <h2 className="mb-3 text-lg font-semibold text-foreground">1. Acceptance of Terms</h2>
            <p>By accessing or using JurisOS (the "Service"), you agree to be bound by these Terms of Service. If you are using the Service on behalf of an organization, you represent that you have authority to bind that organization to these terms.</p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-semibold text-foreground">2. Description of Service</h2>
            <p>JurisOS provides AI-powered legal operations tools including contract review, playbook enforcement, compliance monitoring, and audit trail management. The Service is provided on a subscription basis as described in your Order Form.</p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-semibold text-foreground">3. Your Data</h2>
            <p>You retain all rights to your data. You grant JurisOS a limited license to process your data solely to provide the Service. We will not use your data to train AI models or share it with third parties except as required to deliver the Service (see our DPA and Sub-processor list).</p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-semibold text-foreground">4. AI-Generated Outputs</h2>
            <p>AI-generated content (risk findings, suggested redlines, compliance recommendations) is provided for informational purposes only. It does not constitute legal advice. You are responsible for reviewing all AI outputs before acting upon them. JurisOS is not liable for decisions made based on AI-generated content.</p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-semibold text-foreground">5. Acceptable Use</h2>
            <p className="mb-2">You agree not to:</p>
            <ul className="ml-6 list-disc space-y-1">
              <li>Use the Service to process data you do not have the right to process</li>
              <li>Attempt to reverse-engineer, extract, or replicate our AI models</li>
              <li>Circumvent security controls or access other tenants' data</li>
              <li>Use the Service for any unlawful purpose</li>
              <li>Resell or sublicense the Service without written consent</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-semibold text-foreground">6. Service Level Agreement</h2>
            <p>JurisOS commits to 99.9% uptime for Enterprise customers (see your Order Form). Service credits are issued for qualifying downtime events. Scheduled maintenance windows are excluded from uptime calculations.</p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-semibold text-foreground">7. Limitation of Liability</h2>
            <p>To the maximum extent permitted by law, JurisOS's total liability under these terms shall not exceed the fees paid by you in the twelve (12) months preceding the claim. This limitation does not apply to breaches of confidentiality, data protection obligations, or intellectual property infringement.</p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-semibold text-foreground">8. Termination</h2>
            <p>Either party may terminate with 30 days written notice. Upon termination, we will provide data export within 30 days. Your data will be deleted within 60 days of termination unless retention is required by law.</p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-semibold text-foreground">9. Governing Law</h2>
            <p>These terms are governed by the laws of the State of Delaware, without regard to conflict of law principles. Any disputes will be resolved in the state or federal courts located in Delaware.</p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-semibold text-foreground">10. Contact</h2>
            <p>For questions about these terms, contact us at legal@jurisos.com.</p>
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
