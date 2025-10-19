import { type NextRequest, NextResponse } from "next/server"
import type { StylingSession } from "@/lib/types"

// In-memory storage for styling sessions
const stylingSessions: Record<string, StylingSession> = {}

export async function GET(request: NextRequest) {
  try {
    const userId = request.headers.get("x-user-id")

    if (!userId) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 })
    }

    const userSessions = Object.values(stylingSessions).filter((s) => s.userId === userId || s.stylistId === userId)

    return NextResponse.json({
      success: true,
      data: userSessions,
    })
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch styling sessions" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const userId = request.headers.get("x-user-id")
    const { stylistId, scheduledAt, duration, recommendations } = await request.json()

    if (!userId || !stylistId || !scheduledAt) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const newSession: StylingSession = {
      id: `session-${Date.now()}`,
      userId,
      stylistId,
      scheduledAt: new Date(scheduledAt),
      duration: duration || 30,
      status: "scheduled",
      recommendations: recommendations || [],
    }

    stylingSessions[newSession.id] = newSession

    return NextResponse.json(
      {
        success: true,
        data: newSession,
      },
      { status: 201 },
    )
  } catch (error) {
    return NextResponse.json({ error: "Failed to create styling session" }, { status: 500 })
  }
}
