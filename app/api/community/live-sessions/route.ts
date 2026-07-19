import { NextResponse } from "next/server"
// Live styling sessions management
const liveSessions: Record<string, any> = {}

export async function POST(request: Request) {
  const { hostId, title, description, scheduledTime } = await request.json()

  const session = {
    id: `session_${Date.now()}`,
    hostId,
    title,
    description,
    scheduledTime,
    status: "scheduled",
    participants: [],
    createdAt: new Date(),
  }

  liveSessions[session.id] = session
  return NextResponse.json(session)
}

export async function GET() {
  const sessions = Object.values(liveSessions).filter((s: any) => s.status === "scheduled" || s.status === "live")
  return NextResponse.json(sessions)
}
