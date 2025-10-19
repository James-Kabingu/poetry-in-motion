"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowLeft, Upload, TrendingUp, Users, Award, Sparkles, DollarSign } from "lucide-react"
import Link from "next/link"

interface CreatorStats {
  totalDesigns: number
  totalVotes: number
  producedCollections: number
  totalEarnings: number
}

const mockCreatorStats: CreatorStats = {
  totalDesigns: 12,
  totalVotes: 3450,
  producedCollections: 3,
  totalEarnings: 4250,
}

export default function CreatorsPage() {
  const [activeTab, setActiveTab] = useState<"overview" | "upload" | "voting" | "earnings">("overview")

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
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-accent to-accent/60 flex items-center justify-center">
                <Sparkles className="h-5 w-5 text-accent-foreground" />
              </div>
              <span className="font-bold text-foreground">Creator Dashboard</span>
            </div>
            <div className="w-20" />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">Design Collections That Matter</h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Upload your designs, get community feedback, and earn 40-50% revenue share when your collection gets
            produced.
          </p>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-4 mb-12">
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Total Designs</p>
                <p className="text-3xl font-bold text-foreground">{mockCreatorStats.totalDesigns}</p>
              </div>
              <Upload className="h-8 w-8 text-accent/50" />
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Community Votes</p>
                <p className="text-3xl font-bold text-foreground">{mockCreatorStats.totalVotes.toLocaleString()}</p>
              </div>
              <Users className="h-8 w-8 text-accent/50" />
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Produced</p>
                <p className="text-3xl font-bold text-foreground">{mockCreatorStats.producedCollections}</p>
              </div>
              <Award className="h-8 w-8 text-accent/50" />
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Total Earnings</p>
                <p className="text-3xl font-bold text-foreground">${mockCreatorStats.totalEarnings.toLocaleString()}</p>
              </div>
              <DollarSign className="h-8 w-8 text-accent/50" />
            </div>
          </Card>
        </div>

        {/* Tabs */}
        <div className="mb-8 border-b border-border">
          <div className="flex gap-8">
            {[
              { id: "overview", label: "Overview", icon: TrendingUp },
              { id: "upload", label: "Upload Design", icon: Upload },
              { id: "voting", label: "Community Voting", icon: Users },
              { id: "earnings", label: "Earnings", icon: DollarSign },
            ].map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-2 px-4 py-3 border-b-2 transition ${
                    activeTab === tab.id
                      ? "border-accent text-foreground"
                      : "border-transparent text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span className="text-sm font-medium">{tab.label}</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === "overview" && (
          <div className="space-y-8">
            <Card className="p-8">
              <h2 className="text-2xl font-bold text-foreground mb-6">How It Works</h2>
              <div className="grid md:grid-cols-3 gap-8">
                <div>
                  <div className="h-12 w-12 rounded-lg bg-accent/20 flex items-center justify-center mb-4">
                    <span className="text-lg font-bold text-accent">1</span>
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">Upload Your Design</h3>
                  <p className="text-muted-foreground text-sm">
                    Submit your collection concept with sketches, mood boards, and descriptions.
                  </p>
                </div>
                <div>
                  <div className="h-12 w-12 rounded-lg bg-accent/20 flex items-center justify-center mb-4">
                    <span className="text-lg font-bold text-accent">2</span>
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">Community Votes</h3>
                  <p className="text-muted-foreground text-sm">
                    Our community votes on which designs get produced. More votes = higher priority.
                  </p>
                </div>
                <div>
                  <div className="h-12 w-12 rounded-lg bg-accent/20 flex items-center justify-center mb-4">
                    <span className="text-lg font-bold text-accent">3</span>
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">Earn Revenue Share</h3>
                  <p className="text-muted-foreground text-sm">
                    Get 40-50% revenue share on every piece sold from your collection.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-8 border-accent/50 bg-accent/5">
              <h3 className="text-xl font-bold text-foreground mb-4">Revenue Model</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Creator Revenue Share</span>
                  <span className="font-bold text-foreground">40-50%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Platform & Operations</span>
                  <span className="font-bold text-foreground">40-50%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Artisan/Manufacturing</span>
                  <span className="font-bold text-foreground">10-15%</span>
                </div>
              </div>
            </Card>
          </div>
        )}

        {activeTab === "upload" && (
          <Card className="p-8">
            <h2 className="text-2xl font-bold text-foreground mb-6">Upload New Design</h2>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Collection Name</label>
                <input
                  type="text"
                  placeholder="e.g., Urban Minimalist SS25"
                  className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Description</label>
                <textarea
                  placeholder="Tell us about your collection, inspiration, and target audience..."
                  rows={4}
                  className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Upload Images</label>
                <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                  <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                  <p className="text-muted-foreground">Drag and drop your design images here</p>
                </div>
              </div>
              <Button className="w-full">Submit Design for Review</Button>
            </div>
          </Card>
        )}

        {activeTab === "voting" && (
          <div className="space-y-6">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-foreground">Urban Minimalist SS25</h3>
                <span className="text-sm font-bold text-accent">1,234 votes</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2 mb-4">
                <div className="bg-accent h-2 rounded-full" style={{ width: "78%" }} />
              </div>
              <p className="text-sm text-muted-foreground mb-4">78% of votes needed to produce</p>
              <Button variant="outline" className="w-full bg-transparent">
                View Details
              </Button>
            </Card>
          </div>
        )}

        {activeTab === "earnings" && (
          <Card className="p-8">
            <h2 className="text-2xl font-bold text-foreground mb-6">Earnings Breakdown</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-lg bg-muted">
                <div>
                  <p className="font-semibold text-foreground">Urban Minimalist SS25</p>
                  <p className="text-sm text-muted-foreground">234 pieces sold</p>
                </div>
                <p className="text-lg font-bold text-foreground">$2,340</p>
              </div>
              <div className="flex items-center justify-between p-4 rounded-lg bg-muted">
                <div>
                  <p className="font-semibold text-foreground">Streetwear Vibes FW24</p>
                  <p className="text-sm text-muted-foreground">156 pieces sold</p>
                </div>
                <p className="text-lg font-bold text-foreground">$1,560</p>
              </div>
              <div className="flex items-center justify-between p-4 rounded-lg bg-muted">
                <div>
                  <p className="font-semibold text-foreground">Bohemian Dreams SS24</p>
                  <p className="text-sm text-muted-foreground">89 pieces sold</p>
                </div>
                <p className="text-lg font-bold text-foreground">$890</p>
              </div>
            </div>
          </Card>
        )}
      </div>
    </main>
  )
}
