import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles, Users, Leaf, Palette, Award } from "lucide-react"
import Link from "next/link"
import { TestimonialsSection } from "@/components/testimonials-section"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-accent to-accent/60 flex items-center justify-center">
                <Sparkles className="h-5 w-5 text-accent-foreground" />
              </div>
              <span className="text-xl font-bold text-foreground">StyleAI</span>
            </div>
            <div className="hidden md:flex items-center gap-8">
              <Link href="#features" className="text-sm text-muted-foreground hover:text-foreground transition">
                Features
              </Link>
              <Link href="#testimonials" className="text-sm text-muted-foreground hover:text-foreground transition">
                Testimonials
              </Link>
              <Link href="/creators" className="text-sm text-muted-foreground hover:text-foreground transition">
                For Creators
              </Link>
              <Link href="#quiz" className="text-sm text-muted-foreground hover:text-foreground transition">
                Shop
              </Link>
            </div>
            <Button asChild>
              <Link href="#quiz">Get Started</Link>
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-8 items-center">
            {/* Left Content */}
            <div className="flex flex-col gap-6">
              <div className="inline-flex w-fit items-center gap-2 rounded-full border border-border bg-card px-4 py-2">
                <Sparkles className="h-4 w-4 text-accent" />
                <span className="text-sm text-muted-foreground">AI-Powered Personal Styling</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight text-balance">
                Your Style,{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-accent/60">
                  Amplified
                </span>
              </h1>

              <p className="text-lg text-muted-foreground leading-relaxed max-w-lg">
                Stop blending in. Discover AI-curated clothing that matches your unique taste, body type, and
                personality. Every piece tells your story—and supports African creators.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button size="lg" asChild className="gap-2">
                  <Link href="/quiz">
                    Start Your Style Quiz
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="#features">Learn More</Link>
                </Button>
              </div>

              {/* Social Proof */}
              <div className="flex items-center gap-4 pt-4">
                <div className="flex -space-x-2">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="h-10 w-10 rounded-full bg-gradient-to-br from-accent to-accent/60 border-2 border-background flex items-center justify-center text-sm font-semibold text-accent-foreground"
                    >
                      {i}
                    </div>
                  ))}
                </div>
                <div className="text-sm text-muted-foreground">
                  <span className="font-semibold text-foreground">500+</span> trendsetters already styling
                </div>
              </div>
            </div>

            {/* Right Visual */}
            <div className="relative h-96 lg:h-full min-h-96 rounded-2xl overflow-hidden bg-gradient-to-br from-accent/20 to-accent/5 border border-border flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-transparent" />
              <div className="relative z-10 text-center">
                <div className="inline-flex items-center justify-center h-24 w-24 rounded-full bg-accent/20 border border-accent/30 mb-4">
                  <Sparkles className="h-12 w-12 text-accent" />
                </div>
                <p className="text-muted-foreground">AI-Curated Fashion</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blue Ocean Features Section */}
      <section id="features" className="px-4 py-20 sm:px-6 lg:px-8 bg-card/50">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">Why StyleAI is Different</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We're not just another fashion app. We're building a movement.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Sparkles,
                title: "AI-Powered Curation",
                description: "Trained on African body types and aesthetics for recommendations that actually fit.",
              },
              {
                icon: Leaf,
                title: "Circular Fashion",
                description: "Trade in old pieces, buy pre-owned, and track your environmental impact.",
              },
              {
                icon: Users,
                title: "Creator Economy",
                description: "Support African designers directly. Vote on collections. Own your style.",
              },
              {
                icon: Award,
                title: "Verified Sustainability",
                description: "Transparent supply chain. Know exactly where your clothes come from.",
              },
            ].map((feature, i) => {
              const Icon = feature.icon
              return (
                <div key={i} className="p-6 rounded-xl border border-border bg-background hover:bg-card/50 transition">
                  <div className="h-12 w-12 rounded-lg bg-accent/20 flex items-center justify-center mb-4">
                    <Icon className="h-6 w-6 text-accent" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm">{feature.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* Creator & Sustainability CTA */}
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Creator CTA */}
            <div className="rounded-2xl border border-border bg-gradient-to-br from-accent/10 to-accent/5 p-8 sm:p-12">
              <div className="flex items-center gap-3 mb-4">
                <Palette className="h-6 w-6 text-accent" />
                <h3 className="text-2xl font-bold text-foreground">For Creators</h3>
              </div>
              <p className="text-muted-foreground mb-6">
                Design collections, get community feedback, and earn 40-50% revenue share. Your designs, your rules.
              </p>
              <Button asChild className="gap-2">
                <Link href="/creators">
                  Join Our Creator Network
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>

            {/* Sustainability CTA */}
            <div className="rounded-2xl border border-border bg-gradient-to-br from-green-500/10 to-green-500/5 p-8 sm:p-12">
              <div className="flex items-center gap-3 mb-4">
                <Leaf className="h-6 w-6 text-green-600" />
                <h3 className="text-2xl font-bold text-foreground">Circular Fashion</h3>
              </div>
              <p className="text-muted-foreground mb-6">
                Trade in pieces you've outgrown, buy authenticated pre-owned items, and track your environmental impact.
              </p>
              <Button asChild variant="outline" className="gap-2 bg-transparent">
                <Link href="/circular">
                  Learn About Circular Fashion
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="quiz" className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="rounded-2xl border border-border bg-gradient-to-br from-accent/10 to-accent/5 p-8 sm:p-12 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">Ready to Find Your Style?</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Take our 2-minute style quiz and get personalized AI recommendations tailored just for you.
            </p>
            <Button size="lg" asChild className="gap-2">
              <Link href="/quiz">
                Start Quiz Now
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card/50 px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-accent to-accent/60 flex items-center justify-center">
                  <Sparkles className="h-5 w-5 text-accent-foreground" />
                </div>
                <span className="font-bold text-foreground">StyleAI</span>
              </div>
              <p className="text-sm text-muted-foreground">Your style, amplified. Supporting African creators.</p>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="#" className="hover:text-foreground transition">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="/shop" className="hover:text-foreground transition">
                    Shop
                  </Link>
                </li>
                <li>
                  <Link href="/creators" className="hover:text-foreground transition">
                    For Creators
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="#" className="hover:text-foreground transition">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground transition">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="/circular" className="hover:text-foreground transition">
                    Sustainability
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="#" className="hover:text-foreground transition">
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground transition">
                    Terms
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2025 StyleAI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  )
}
