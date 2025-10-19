"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, Users, Video } from "lucide-react"

interface LiveSession {
  id: string
  hostId: string
  title: string
  description: string
  scheduledTime: string
  status: string
  participants: string[]
}

export default function LiveSessionsPage() {
  const [sessions, setSessions] = useState<LiveSession[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const response = await fetch("/api/community/live-sessions")
        const data = await response.json()
        setSessions(data)
      } catch (error) {
        console.error("Failed to fetch sessions:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchSessions()
    const interval = setInterval(fetchSessions, 10000)
    return () => clearInterval(interval)
  }, [])

  const handleJoinSession = async (sessionId: string) => {
    try {
      await fetch(`/api/community/live-sessions/${sessionId}/join`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: "user123" }),
      })
      alert("Joined session!")
    } catch (error) {
      console.error("Failed to join session:", error)
    }
  }

  if (loading) return <div className="p-8">Loading sessions...</div>

  return (
    <main className="min-h-screen bg-background p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Live Styling Sessions</h1>
          <p className="text-lg text-muted-foreground">
            Join our community stylists for real-time fashion advice and styling tips
          </p>
        </div>

        {sessions.length === 0 ? (
          <Card>
            <CardContent className="pt-8 text-center">
              <p className="text-muted-foreground mb-4">No live sessions scheduled right now</p>
              <Button>Schedule a Session</Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {sessions.map((session) => (
              <Card key={session.id} className="flex flex-col">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <Video className="h-5 w-5 text-accent" />
                        {session.title}
                      </CardTitle>
                      <CardDescription>{session.description}</CardDescription>
                    </div>
                    <div className="px-3 py-1 rounded-full bg-accent/20 text-accent text-sm font-semibold">
                      {session.status}
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="flex-1 flex flex-col">
                  <div className="space-y-3 mb-6 flex-1">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      {new Date(session.scheduledTime).toLocaleString()}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Users className="h-4 w-4" />
                      {session.participants.length} participants
                    </div>
                  </div>

                  <Button onClick={() => handleJoinSession(session.id)} className="w-full">
                    Join Session
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
