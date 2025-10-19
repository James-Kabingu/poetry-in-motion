"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Check, Sparkles } from "lucide-react"
import Link from "next/link"

const tiers = [
  {
    name: "Free",
    price: 0,
    description: "Perfect for getting started",
    features: [
      "Basic AI recommendations",
      "Community access",
      "Limited favorites (10)",
      "Standard shipping",
      "Email support",
    ],
    cta: "Get Started",
    highlighted: false,
  },
  {
    name: "Premium",
    price: 15,
    description: "For serious style enthusiasts",
    features: [
      "Everything in Free",
      "Monthly curated box (3-4 pieces)",
      "Priority access to drops",
      "Unlimited favorites",
      "Free shipping",
      "Styling sessions (2/month)",
      "Priority support",
    ],
    cta: "Subscribe Now",
    highlighted: true,
  },
  {
    name: "VIP",
    price: 50,
    description: "For the ultimate fashionista",
    features: [
      "Everything in Premium",
      "Bi-weekly curated boxes",
      "Personal AI stylist",
      "Exclusive designer access",
      "Unlimited trade-in credits",
      "Styling sessions (4/month)",
      "VIP events access",
      "24/7 priority support",
    ],
    cta: "Subscribe Now",
    highlighted: false,
  },
  {
    name: "Elite",
    price: 75,
    description: "For fashion influencers",
    features: [
      "Everything in VIP",
      "Weekly curated boxes",
      "Custom design consultations",
      "Exclusive collaborations",
      "Unlimited everything",
      "Personal stylist on call",
      "Influencer perks",
      "Dedicated account manager",
    ],
    cta: "Subscribe Now",
    highlighted: false,
  },
]

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <section className="px-4 py-20 sm:px-6 lg:px-8 text-center">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">Simple, Transparent Pricing</h1>
          <p className="text-lg text-muted-foreground mb-8">
            Choose the plan that fits your style. Upgrade or downgrade anytime.
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {tiers.map((tier) => (
              <Card
                key={tier.name}
                className={`relative flex flex-col ${tier.highlighted ? "ring-2 ring-accent md:scale-105" : ""}`}
              >
                {tier.highlighted && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-accent text-accent-foreground px-4 py-1 rounded-full text-sm font-semibold flex items-center gap-2">
                    <Sparkles className="h-4 w-4" />
                    Most Popular
                  </div>
                )}

                <CardHeader>
                  <CardTitle>{tier.name}</CardTitle>
                  <CardDescription>{tier.description}</CardDescription>
                  <div className="mt-4">
                    <span className="text-4xl font-bold text-foreground">${tier.price}</span>
                    <span className="text-muted-foreground">/month</span>
                  </div>
                </CardHeader>

                <CardContent className="flex-1 flex flex-col">
                  <ul className="space-y-3 mb-8 flex-1">
                    {tier.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3">
                        <Check className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    asChild
                    className={tier.highlighted ? "" : "variant-outline"}
                    variant={tier.highlighted ? "default" : "outline"}
                  >
                    <Link href={`/subscribe?tier=${tier.name.toLowerCase()}`}>{tier.cta}</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-4 py-20 sm:px-6 lg:px-8 bg-card/50">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-foreground mb-12 text-center">Frequently Asked Questions</h2>

          <div className="space-y-6">
            {[
              {
                q: "Can I change my subscription tier?",
                a: "Yes! You can upgrade or downgrade your subscription anytime. Changes take effect on your next billing cycle.",
              },
              {
                q: "What payment methods do you accept?",
                a: "We accept all major credit cards, mobile money (M-Pesa), and bank transfers.",
              },
              {
                q: "Is there a free trial?",
                a: "Yes! Start with our Free tier to explore the platform. Upgrade anytime to unlock premium features.",
              },
              {
                q: "Can I cancel anytime?",
                a: "Absolutely. Cancel your subscription anytime with no penalties. You'll keep access until the end of your billing period.",
              },
            ].map((faq, i) => (
              <div key={i} className="border-b border-border pb-6">
                <h3 className="font-semibold text-foreground mb-2">{faq.q}</h3>
                <p className="text-muted-foreground">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
