"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowLeft, Leaf, RotateCcw, Award, Sparkles } from "lucide-react"
import Link from "next/link"

interface UserImpact {
  itemsTraded: number
  co2Saved: number
  waterSaved: number
  pointsEarned: number
}

const mockUserImpact: UserImpact = {
  itemsTraded: 8,
  co2Saved: 24,
  waterSaved: 1920,
  pointsEarned: 450,
}

export default function CircularPage() {
  const [activeTab, setActiveTab] = useState<"overview" | "trade" | "resale" | "impact">("overview")

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card/50 sticky top-0 z-40">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </Link>
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-lg bg-green-600 flex items-center justify-center">
                <Leaf className="h-5 w-5 text-white" />
              </div>
              <span className="font-bold text-foreground">Circular Fashion</span>
            </div>
            <div className="w-20" />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">Fashion That Gives Back</h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Trade in pieces you've outgrown, buy authenticated pre-owned items, and track your environmental impact in
            real-time.
          </p>
        </div>

        {/* Impact Stats */}
        <div className="grid md:grid-cols-4 gap-4 mb-12">
          <Card className="p-6 border-green-500/50 bg-green-500/5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Items Traded</p>
                <p className="text-3xl font-bold text-foreground">{mockUserImpact.itemsTraded}</p>
              </div>
              <RotateCcw className="h-8 w-8 text-green-600/50" />
            </div>
          </Card>
          <Card className="p-6 border-green-500/50 bg-green-500/5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">CO₂ Saved (kg)</p>
                <p className="text-3xl font-bold text-foreground">{mockUserImpact.co2Saved}</p>
              </div>
              <Leaf className="h-8 w-8 text-green-600/50" />
            </div>
          </Card>
          <Card className="p-6 border-green-500/50 bg-green-500/5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Water Saved (L)</p>
                <p className="text-3xl font-bold text-foreground">{mockUserImpact.waterSaved.toLocaleString()}</p>
              </div>
              <Sparkles className="h-8 w-8 text-green-600/50" />
            </div>
          </Card>
          <Card className="p-6 border-green-500/50 bg-green-500/5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Rewards Points</p>
                <p className="text-3xl font-bold text-foreground">{mockUserImpact.pointsEarned}</p>
              </div>
              <Award className="h-8 w-8 text-green-600/50" />
            </div>
          </Card>
        </div>

        {/* Tabs */}
        <div className="mb-8 border-b border-border">
          <div className="flex gap-8">
            {[
              { id: "overview", label: "How It Works" },
              { id: "trade", label: "Trade In" },
              { id: "resale", label: "Buy Pre-Owned" },
              { id: "impact", label: "Your Impact" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-3 border-b-2 transition text-sm font-medium ${
                  activeTab === tab.id
                    ? "border-green-600 text-foreground"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === "overview" && (
          <div className="space-y-8">
            <Card className="p-8">
              <h2 className="text-2xl font-bold text-foreground mb-6">The Circular Fashion Model</h2>
              <div className="grid md:grid-cols-3 gap-8">
                <div>
                  <div className="h-12 w-12 rounded-lg bg-green-600/20 flex items-center justify-center mb-4">
                    <RotateCcw className="h-6 w-6 text-green-600" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">Trade In</h3>
                  <p className="text-muted-foreground text-sm">
                    Send us pieces you've outgrown. We authenticate, clean, and resell them.
                  </p>
                </div>
                <div>
                  <div className="h-12 w-12 rounded-lg bg-green-600/20 flex items-center justify-center mb-4">
                    <Leaf className="h-6 w-6 text-green-600" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">Reduce Waste</h3>
                  <p className="text-muted-foreground text-sm">
                    Every traded item keeps 24kg of CO₂ and 1,920L of water out of landfills.
                  </p>
                </div>
                <div>
                  <div className="h-12 w-12 rounded-lg bg-green-600/20 flex items-center justify-center mb-4">
                    <Award className="h-6 w-6 text-green-600" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">Earn Rewards</h3>
                  <p className="text-muted-foreground text-sm">
                    Get store credit and rewards points for every item you trade in.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-8 border-green-500/50 bg-green-500/5">
              <h3 className="text-xl font-bold text-foreground mb-4">Environmental Impact</h3>
              <p className="text-muted-foreground mb-6">
                The fashion industry is the second largest polluter globally. By choosing circular fashion, you're
                making a real difference.
              </p>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-foreground font-medium">Your CO₂ Savings</span>
                    <span className="text-green-600 font-bold">{mockUserImpact.co2Saved}kg</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-green-600 h-2 rounded-full" style={{ width: "60%" }} />
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-foreground font-medium">Your Water Savings</span>
                    <span className="text-green-600 font-bold">{mockUserImpact.waterSaved.toLocaleString()}L</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-green-600 h-2 rounded-full" style={{ width: "75%" }} />
                  </div>
                </div>
              </div>
            </Card>
          </div>
        )}

        {activeTab === "trade" && (
          <Card className="p-8">
            <h2 className="text-2xl font-bold text-foreground mb-6">Trade In Your Items</h2>
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-foreground mb-4">How to Trade In</h3>
                <ol className="space-y-3 text-muted-foreground">
                  <li className="flex gap-3">
                    <span className="font-bold text-accent">1.</span>
                    <span>Select items from your closet or upload photos</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="font-bold text-accent">2.</span>
                    <span>We'll assess condition and provide instant valuation</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="font-bold text-accent">3.</span>
                    <span>Ship items to us (free shipping label included)</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="font-bold text-accent">4.</span>
                    <span>Get store credit or cash within 5 business days</span>
                  </li>
                </ol>
              </div>
              <Button className="w-full">Start Trading In</Button>
            </div>
          </Card>
        )}

        {activeTab === "resale" && (
          <div className="space-y-6">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-foreground">Vintage Denim Jacket</h3>
                  <p className="text-sm text-muted-foreground">Authenticated • Excellent Condition</p>
                </div>
                <span className="text-lg font-bold text-foreground">$35</span>
              </div>
              <p className="text-sm text-muted-foreground mb-4">Original price: $55 (36% off)</p>
              <Button className="w-full">Add to Cart</Button>
            </Card>
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-foreground">Minimalist White Tee</h3>
                  <p className="text-sm text-muted-foreground">Authenticated • Like New</p>
                </div>
                <span className="text-lg font-bold text-foreground">$18</span>
              </div>
              <p className="text-sm text-muted-foreground mb-4">Original price: $28 (36% off)</p>
              <Button className="w-full">Add to Cart</Button>
            </Card>
          </div>
        )}

        {activeTab === "impact" && (
          <Card className="p-8">
            <h2 className="text-2xl font-bold text-foreground mb-6">Your Sustainability Journey</h2>
            <div className="space-y-6">
              <div className="p-6 rounded-lg bg-green-500/5 border border-green-500/50">
                <h3 className="font-semibold text-foreground mb-2">You're an Eco-Warrior!</h3>
                <p className="text-muted-foreground mb-4">
                  By trading in {mockUserImpact.itemsTraded} items, you've saved {mockUserImpact.co2Saved}kg of CO₂ and{" "}
                  {mockUserImpact.waterSaved.toLocaleString()}L of water.
                </p>
                <p className="text-sm text-green-600 font-medium">
                  That's equivalent to planting {Math.floor(mockUserImpact.co2Saved / 20)} trees!
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-4">Leaderboard</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-4 rounded-lg bg-muted">
                    <div>
                      <p className="font-semibold text-foreground">You</p>
                      <p className="text-sm text-muted-foreground">{mockUserImpact.co2Saved}kg CO₂ saved</p>
                    </div>
                    <span className="text-lg font-bold text-accent">#47</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        )}
      </div>
    </main>
  )
}
