import { NextResponse } from "next/server"
// Real-time notifications
const notifications: Record<string, any[]> = {}

export async function POST(request: Request) {
  const { userId, type, message, data } = await request.json()

  const notification = {
    id: `notif_${Date.now()}`,
    userId,
    type,
    message,
    data,
    read: false,
    createdAt: new Date(),
  }

  if (!notifications[userId]) {
    notifications[userId] = []
  }
  notifications[userId].push(notification)

  return NextResponse.json(notification)
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const userId = searchParams.get("userId")

  if (!userId) {
    return NextResponse.json({ error: "Missing userId" }, { status: 400 })
  }

  const userNotifications = notifications[userId] || []
  return NextResponse.json(userNotifications)
}
