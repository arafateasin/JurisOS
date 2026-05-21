import { Link } from "react-router-dom"
import { MapPin, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const openings = [
  { title: "Senior Backend Engineer", team: "Engineering", location: "Remote (US)", type: "Full-time" },
  { title: "ML Engineer - Legal NLP", team: "AI", location: "Remote (US/EU)", type: "Full-time" },
  { title: "Product Designer", team: "Design", location: "Remote (US)", type: "Full-time" },
  { title: "Enterprise Account Executive", team: "Sales", location: "New York, NY", type: "Full-time" },
  { title: "Customer Success Manager", team: "Customer Success", location: "Remote (US)", type: "Full-time" },
  { title: "Security Engineer", team: "Engineering", location: "Remote (US)", type: "Full-time" },
  { title: "Technical Writer", team: "Product", location: "Remote (US/EU)", type: "Full-time" },
  { title: "Solutions Engineer", team: "Sales", location: "San Francisco, CA", type: "Full-time" },
]

const values = [
  { title: "Ship with conviction", description: "We move quickly and make decisions with incomplete information. We ship, learn, and iterate." },
  { title: "Trust by default", description: "We extend trust first. Autonomy and ownership are the norm, not the exception." },
  { title: "Protect the craft", description: "Legal work demands precision. We hold our product to the same standard our customers hold their work." },
  { title: "Build in the open", description: "We share context generously. Good decisions come from informed people." },
]

export function CareersPage() {
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
          <h1 className="max-w-3xl text-4xl font-bold tracking-tight md:text-5xl">
            Build the future of legal operations
          </h1>
          <p className="max-w-2xl text-lg text-muted-foreground">
            We are building AI-powered tools that transform how legal teams work. Join us if you want to ship software that matters for an underserved industry.
          </p>
          <Button size="lg" asChild>
            <a href="#openings">
              View open roles
              <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </div>
      </section>

      <section className="border-y border-border bg-card py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold tracking-tight">Our values</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {values.map((value) => (
              <Card key={value.title}>
                <CardContent className="pt-6">
                  <h3 className="mb-2 font-semibold">{value.title}</h3>
                  <p className="text-sm text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold tracking-tight">Benefits</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[
            "Competitive salary + equity",
            "Remote-first culture",
            "Unlimited PTO",
            "Health, dental & vision",
            "Home office stipend",
            "Learning budget",
            "Annual team offsites",
            "Parental leave",
          ].map((benefit) => (
            <div key={benefit} className="rounded-lg border border-border bg-card p-4 text-center text-sm font-medium">
              {benefit}
            </div>
          ))}
        </div>
      </section>

      <section id="openings" className="border-t border-border bg-card py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-8">
            <h2 className="text-3xl font-bold tracking-tight">Open positions</h2>
            <p className="mt-2 text-muted-foreground">{openings.length} open roles across the company</p>
          </div>
          <div className="space-y-3">
            {openings.map((job) => (
              <div key={job.title} className="flex items-center justify-between rounded-lg border border-border bg-background p-4 hover:border-primary transition-colors cursor-pointer">
                <div>
                  <p className="font-medium">{job.title}</p>
                  <div className="mt-1 flex items-center gap-3 text-sm text-muted-foreground">
                    <span>{job.team}</span>
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {job.location}
                    </span>
                  </div>
                </div>
                <Badge variant="outline">{job.type}</Badge>
              </div>
            ))}
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
