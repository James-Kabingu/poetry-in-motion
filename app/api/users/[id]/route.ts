import { type NextRequest, NextResponse } from "next/server"
import { mockUsers } from "@/lib/mock-data"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const user = mockUsers[params.id]

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    return NextResponse.json(user)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch user" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const user = mockUsers[params.id]

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    const updates = await request.json()

    // Update user (in real app, validate and save to database)
    const updatedUser = {
      ...user,
      ...updates,
      updatedAt: new Date(),
    }

    mockUsers[params.id] = updatedUser

    return NextResponse.json(updatedUser)
  } catch (error) {
    return NextResponse.json({ error: "Failed to update user" }, { status: 500 })
  }
}
