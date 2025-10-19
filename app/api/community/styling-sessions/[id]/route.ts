import { type NextRequest, NextResponse } from "next/server"

// In-memory storage for styling sessions
const stylingSessions: Record<string, any> = {}

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = stylingSessions[params.id]

    if (!session) {
      return NextResponse.json({ error: "Session not found" }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      data: session,
    })
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch session" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = stylingSessions[params.id]

    if (!session) {
      return NextResponse.json({ error: "Session not found" }, { status: 404 })
    }

    const updates = await request.json()

    const updatedSession = {
      ...session,
      ...updates,
    }

    stylingSessions[params.id] = updatedSession

    return NextResponse.json({
      success: true,
      data: updatedSession,
    })
  } catch (error) {
    return NextResponse.json({ error: "Failed to update session" }, { status: 500 })
  }
}
