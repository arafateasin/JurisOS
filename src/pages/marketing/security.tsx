import { Link } from "react-router-dom"
import { Shield, Lock, Eye, Users, Server, FileCheck, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export function SecurityPage() {
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
            <Shield className="h-3 w-3" />
            Security
          </Badge>
          <h1 className="max-w-3xl text-4xl font-bold tracking-tight md:text-5xl">
            Enterprise-grade security built for legal confidentiality
          </h1>
          <p className="max-w-2xl text-lg text-muted-foreground">
            JurisOS is designed from the ground up to meet the security requirements of legal departments handling privileged, confidential, and regulated information.
          </p>
        </div>
      </section>

      <section className="border-y border-border bg-card py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold tracking-tight">Security certifications</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              { title: "SOC 2 Type II", description: "Annual audit covering security, availability, and confidentiality." },
              { title: "ISO 27001", description: "Certified information security management system." },
              { title: "GDPR Compliant", description: "Full compliance with EU data protection regulation." },
              { title: "HIPAA Ready", description: "BAA available for healthcare and life sciences customers." },
            ].map((cert) => (
              <Card key={cert.title} className="text-center">
                <CardContent className="pt-6">
                  <Shield className="mx-auto mb-3 h-8 w-8 text-primary" />
                  <h3 className="mb-1 font-semibold">{cert.title}</h3>
                  <p className="text-sm text-muted-foreground">{cert.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight">How we protect your data</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[
            { icon: Lock, title: "Encryption at rest and in transit", description: "AES-256 encryption for stored data. TLS 1.3 for all data in transit. Customer-managed keys available." },
            { icon: Eye, title: "Zero-training guarantee", description: "Your data is never used to train AI models. Contractual commitment with all LLM providers." },
            { icon: Users, title: "SSO & RBAC", description: "SAML 2.0 SSO, SCIM provisioning, and granular role-based access controls." },
            { icon: Server, title: "Data residency", description: "Choose where your data is stored. Available regions: US, EU, UK, Australia, Canada." },
            { icon: FileCheck, title: "Complete audit trails", description: "Every AI action, user action, and system event is logged with immutable audit trails." },
            { icon: Globe, title: "Tenant isolation", description: "Full multi-tenant isolation. No data mixing between organizations at any layer." },
          ].map((feature) => (
            <Card key={feature.title}>
              <CardContent className="pt-6">
                <feature.icon className="mb-3 h-8 w-8 text-primary" />
                <h3 className="mb-2 font-semibold">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="border-t border-border bg-card py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold tracking-tight">AI security practices</h2>
            <p className="mt-3 text-muted-foreground">Purpose-built controls for AI-powered legal workflows</p>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {[
              { title: "Model governance", description: "All AI models are version-controlled, tested, and monitored. Model outputs are validated before presentation to users." },
              { title: "Human-in-the-loop", description: "No AI-generated content is acted upon without explicit human approval. All suggestions require review." },
              { title: "Prompt injection protection", description: "Multi-layer guardrails prevent prompt injection attacks and ensure AI operates within defined boundaries." },
              { title: "Output monitoring", description: "Continuous monitoring of AI outputs for hallucinations, bias, and quality degradation with automated alerts." },
            ].map((item) => (
              <Card key={item.title}>
                <CardContent className="pt-6">
                  <h3 className="mb-2 font-semibold">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="rounded-xl bg-primary p-12 text-center">
          <h2 className="text-3xl font-bold text-primary-foreground">Need our security documentation?</h2>
          <p className="mt-3 text-primary-foreground/80">Request our SOC 2 report, penetration test results, or security questionnaire responses</p>
          <div className="mt-6">
            <Button size="lg" variant="secondary" asChild>
              <Link to="/signup">Request security docs</Link>
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
