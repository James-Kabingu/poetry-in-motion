"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

interface Analytics {
  totalEvents: number
  events: any[]
  conversionFunnel: {
    quizStarted: number
    quizCompleted: number
    productViewed: number
    cartAdded: number
    orderCompleted: number
  }
  userEngagement: {
    uniqueUsers: number
    averageEventsPerUser: number
  }
}

export default function AnalyticsPage() {
  const [analytics, setAnalytics] = useState<Analytics | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const response = await fetch("/api/analytics/events")
        const data = await response.json()
        setAnalytics(data)
      } catch (error) {
        console.error("Failed to fetch analytics:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchAnalytics()
    const interval = setInterval(fetchAnalytics, 5000)
    return () => clearInterval(interval)
  }, [])

  if (loading) return <div className="p-8">Loading analytics...</div>
  if (!analytics) return <div className="p-8">No analytics data available</div>

  const conversionData = [
    { stage: "Quiz Started", count: analytics.conversionFunnel.quizStarted },
    { stage: "Quiz Completed", count: analytics.conversionFunnel.quizCompleted },
    { stage: "Product Viewed", count: analytics.conversionFunnel.productViewed },
    { stage: "Cart Added", count: analytics.conversionFunnel.cartAdded },
    { stage: "Order Completed", count: analytics.conversionFunnel.orderCompleted },
  ]

  const conversionRate =
    analytics.conversionFunnel.quizStarted > 0
      ? ((analytics.conversionFunnel.orderCompleted / analytics.conversionFunnel.quizStarted) * 100).toFixed(2)
      : 0

  return (
    <main className="min-h-screen bg-background p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-foreground mb-8">Analytics Dashboard</h1>

        {/* Key Metrics */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Events</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{analytics.totalEvents}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Unique Users</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{analytics.userEngagement.uniqueUsers}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Avg Events/User</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{analytics.userEngagement.averageEventsPerUser.toFixed(1)}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Conversion Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{conversionRate}%</div>
            </CardContent>
          </Card>
        </div>

        {/* Conversion Funnel */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Conversion Funnel</CardTitle>
            <CardDescription>User journey from quiz start to order completion</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={conversionData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="stage" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="hsl(var(--accent))" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Recent Events */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Events</CardTitle>
            <CardDescription>Last 10 tracked events</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {analytics.events
                .slice(-10)
                .reverse()
                .map((event, i) => (
                  <div key={i} className="flex justify-between items-center p-2 border-b border-border">
                    <div>
                      <p className="font-medium text-foreground">{event.eventName}</p>
                      <p className="text-sm text-muted-foreground">{event.userId || "Anonymous"}</p>
                    </div>
                    <p className="text-xs text-muted-foreground">{new Date(event.timestamp).toLocaleTimeString()}</p>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
