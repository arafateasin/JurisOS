import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"

export function PrivacyPolicyPage() {
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
        <h1 className="text-4xl font-bold tracking-tight">Privacy Policy</h1>
        <p className="mt-2 text-sm text-muted-foreground">Last updated: May 1, 2026</p>

        <div className="mt-10 space-y-8 text-sm leading-7 text-muted-foreground">
          <section>
            <h2 className="mb-3 text-lg font-semibold text-foreground">1. Introduction</h2>
            <p>JurisOS, Inc. ("JurisOS," "we," "us," or "our") respects your privacy and is committed to protecting your personal data. This privacy policy explains how we collect, use, disclose, and safeguard your information when you use our platform.</p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-semibold text-foreground">2. Information We Collect</h2>
            <p className="mb-2">We collect information that you provide directly to us, including:</p>
            <ul className="ml-6 list-disc space-y-1">
              <li>Account information (name, email address, organization)</li>
              <li>Documents and contracts you upload for review</li>
              <li>Playbook configurations and compliance settings</li>
              <li>Usage data and interaction logs</li>
              <li>Communications with our support team</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-semibold text-foreground">3. How We Use Your Information</h2>
            <p className="mb-2">We use collected information to:</p>
            <ul className="ml-6 list-disc space-y-1">
              <li>Provide and maintain our services</li>
              <li>Process and analyze contracts using our AI models</li>
              <li>Improve our platform and develop new features</li>
              <li>Communicate with you about your account</li>
              <li>Comply with legal obligations</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-semibold text-foreground">4. AI and Your Data</h2>
            <p>Your documents and data are never used to train our AI models or any third-party models. AI processing occurs within isolated environments with strict access controls. All AI outputs are logged and auditable.</p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-semibold text-foreground">5. Data Sharing</h2>
            <p className="mb-2">We do not sell your personal data. We may share information with:</p>
            <ul className="ml-6 list-disc space-y-1">
              <li>Service providers who assist in operating our platform (see Sub-processors)</li>
              <li>AI model providers under strict data processing agreements</li>
              <li>Legal authorities when required by law</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-semibold text-foreground">6. Data Retention</h2>
            <p>We retain your data for as long as your account is active or as needed to provide services. Upon account termination, we delete your data within 30 days, unless retention is required by law or for legitimate business purposes.</p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-semibold text-foreground">7. Security</h2>
            <p>We implement industry-standard security measures including encryption at rest (AES-256), encryption in transit (TLS 1.3), multi-tenant isolation, and regular security audits. See our <Link to="/security" className="text-primary underline">Security page</Link> for details.</p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-semibold text-foreground">8. Your Rights</h2>
            <p className="mb-2">Depending on your jurisdiction, you may have rights to:</p>
            <ul className="ml-6 list-disc space-y-1">
              <li>Access your personal data</li>
              <li>Correct inaccurate data</li>
              <li>Delete your data</li>
              <li>Port your data to another service</li>
              <li>Object to or restrict processing</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-semibold text-foreground">9. Contact Us</h2>
            <p>For privacy inquiries, contact our Data Protection Officer at privacy@jurisos.com.</p>
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
