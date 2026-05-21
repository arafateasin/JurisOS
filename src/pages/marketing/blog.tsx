import { Link } from "react-router-dom"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const posts = [
  {
    title: "Introducing Juris 1.0: AI-powered contract review for legal teams",
    excerpt: "Today we are launching Juris 1.0, our purpose-built AI model for contract review that delivers clause-level risk analysis in under 2 minutes.",
    date: "May 15, 2026",
    category: "Product",
    slug: "introducing-juris-1-0",
  },
  {
    title: "How AI agents can enforce legal playbooks at scale",
    excerpt: "Manual playbook enforcement breaks down at scale. Here is how AI agents can consistently apply your preferred positions across hundreds of contracts.",
    date: "May 8, 2026",
    category: "AI & Legal",
    slug: "ai-agents-enforce-playbooks",
  },
  {
    title: "Building SOC 2 compliance into AI-powered legal tools",
    excerpt: "A deep dive into how we built JurisOS to meet SOC 2 Type II requirements while handling privileged legal documents.",
    date: "April 28, 2026",
    category: "Security",
    slug: "soc2-ai-legal-tools",
  },
  {
    title: "The case for human-in-the-loop AI in legal operations",
    excerpt: "Why full automation is the wrong goal for legal AI, and how human-in-the-loop workflows deliver better outcomes for legal teams.",
    date: "April 20, 2026",
    category: "Thought Leadership",
    slug: "human-in-the-loop-legal-ai",
  },
  {
    title: "Continuous compliance: moving beyond point-in-time audits",
    excerpt: "Annual compliance audits are insufficient for modern security postures. Here is how continuous monitoring changes the game.",
    date: "April 12, 2026",
    category: "Compliance",
    slug: "continuous-compliance",
  },
  {
    title: "Contract review benchmarks: AI vs. manual review accuracy",
    excerpt: "We ran 500 contracts through both AI and manual review processes. Here are the results on accuracy, consistency, and speed.",
    date: "April 5, 2026",
    category: "Research",
    slug: "contract-review-benchmarks",
  },
]

export function BlogPage() {
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
        <div className="mb-12">
          <h1 className="text-4xl font-bold tracking-tight">Blog</h1>
          <p className="mt-3 text-lg text-muted-foreground">Insights on AI, legal operations, and compliance automation</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <Card key={post.slug} className="group cursor-pointer transition-colors hover:border-primary">
              <CardContent className="pt-6">
                <div className="mb-3 flex items-center gap-2">
                  <Badge variant="secondary" className="text-xs">{post.category}</Badge>
                  <span className="text-xs text-muted-foreground">{post.date}</span>
                </div>
                <h3 className="mb-2 font-semibold leading-snug group-hover:text-primary transition-colors">
                  {post.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-4">{post.excerpt}</p>
                <span className="inline-flex items-center gap-1 text-sm font-medium text-primary">
                  Read more
                  <ArrowRight className="h-3 w-3" />
                </span>
              </CardContent>
            </Card>
          ))}
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
