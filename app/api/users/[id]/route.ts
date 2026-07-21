import { type NextRequest, NextResponse } from "next/server"
import { mockUsers } from "@/lib/mock-data"
import { requireUserId, isAuthError } from "@/lib/auth/require-user"

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const userId = await requireUserId()
    if (isAuthError(userId)) return userId

    const { id } = await params
    if (id !== userId) {
      return NextResponse.json({ error: "Not found" }, { status: 404 })
    }

    const user = mockUsers[id]
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    return NextResponse.json(user)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch user" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const userId = await requireUserId()
    if (isAuthError(userId)) return userId

    const { id } = await params
    if (id !== userId) {
      return NextResponse.json({ error: "Not found" }, { status: 404 })
    }

    const user = mockUsers[id]
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    const updates = await request.json()
    const { id: _ignoredId, ...safeUpdates } = updates

    const updatedUser = { ...user, ...safeUpdates, updatedAt: new Date() }
    mockUsers[id] = updatedUser

    return NextResponse.json(updatedUser)
  } catch (error) {
    return NextResponse.json({ error: "Failed to update user" }, { status: 500 })
  }
}
