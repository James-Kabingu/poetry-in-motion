"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Copy, Gift, Users, TrendingUp } from "lucide-react"

export default function ReferralsPage() {
  const [referralCode] = useState("STYLE_USER123")
  const [referralLink] = useState(`https://styleai.com?ref=${referralCode}`)
  const [copied, setCopied] = useState(false)
  const [referredUsers] = useState([
    { email: "friend1@example.com", status: "completed", reward: 25 },
    { email: "friend2@example.com", status: "pending", reward: 0 },
    { email: "friend3@example.com", status: "completed", reward: 25 },
  ])

  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const totalRewards = referredUsers.filter((u) => u.status === "completed").length * 25

  return (
    <main className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-foreground mb-2">Referral Program</h1>
        <p className="text-lg text-muted-foreground mb-8">
          Invite friends and earn rewards for every successful referral
        </p>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Users className="h-4 w-4" />
                Friends Referred
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{referredUsers.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Gift className="h-4 w-4" />
                Total Rewards
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">${totalRewards}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                Conversion Rate
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {referredUsers.length > 0
                  ? Math.round(
                      (referredUsers.filter((u) => u.status === "completed").length / referredUsers.length) * 100,
                    )
                  : 0}
                %
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Share Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Share Your Referral Link</CardTitle>
            <CardDescription>Share this link with friends and earn $25 for each successful referral</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Input value={referralLink} readOnly className="flex-1" />
              <Button onClick={handleCopy} variant="outline">
                <Copy className="h-4 w-4 mr-2" />
                {copied ? "Copied!" : "Copy"}
              </Button>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <Button className="w-full bg-transparent" variant="outline">
                Share on WhatsApp
              </Button>
              <Button className="w-full bg-transparent" variant="outline">
                Share on Instagram
              </Button>
              <Button className="w-full bg-transparent" variant="outline">
                Share on Twitter
              </Button>
              <Button className="w-full bg-transparent" variant="outline">
                Copy Referral Code
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Referral History */}
        <Card>
          <CardHeader>
            <CardTitle>Referral History</CardTitle>
            <CardDescription>Track your referrals and rewards</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {referredUsers.map((user, i) => (
                <div key={i} className="flex items-center justify-between p-4 border border-border rounded-lg">
                  <div>
                    <p className="font-medium text-foreground">{user.email}</p>
                    <p className="text-sm text-muted-foreground capitalize">{user.status}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-foreground">${user.reward}</p>
                    <p className="text-sm text-muted-foreground">
                      {user.status === "completed" ? "Earned" : "Pending"}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* How It Works */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>How It Works</CardTitle>
          </CardHeader>
          <CardContent>
            <ol className="space-y-4">
              <li className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-accent text-accent-foreground flex items-center justify-center font-semibold">
                  1
                </div>
                <div>
                  <p className="font-medium text-foreground">Share Your Link</p>
                  <p className="text-sm text-muted-foreground">Send your unique referral link to friends</p>
                </div>
              </li>
              <li className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-accent text-accent-foreground flex items-center justify-center font-semibold">
                  2
                </div>
                <div>
                  <p className="font-medium text-foreground">They Sign Up</p>
                  <p className="text-sm text-muted-foreground">Your friend creates an account using your link</p>
                </div>
              </li>
              <li className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-accent text-accent-foreground flex items-center justify-center font-semibold">
                  3
                </div>
                <div>
                  <p className="font-medium text-foreground">They Make a Purchase</p>
                  <p className="text-sm text-muted-foreground">Your friend completes their first purchase</p>
                </div>
              </li>
              <li className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-accent text-accent-foreground flex items-center justify-center font-semibold">
                  4
                </div>
                <div>
                  <p className="font-medium text-foreground">You Earn $25</p>
                  <p className="text-sm text-muted-foreground">Get $25 store credit instantly</p>
                </div>
              </li>
            </ol>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
