import { type NextRequest, NextResponse } from "next/server"
import type { User } from "@/lib/types"

export async function POST(request: NextRequest) {
  try {
    const { email, password, name } = await request.json()

    // Validate input
    if (!email || !password || !name) {
      return NextResponse.json({ error: "Email, password, and name are required" }, { status: 400 })
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 })
    }

    // Create new user (in real app, hash password and save to database)
    const newUser: User = {
      id: `user-${Date.now()}`,
      email,
      name,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    // In real app, create JWT token
    const token = Buffer.from(JSON.stringify({ userId: newUser.id, email: newUser.email })).toString("base64")

    return NextResponse.json(
      {
        success: true,
        user: newUser,
        token,
      },
      { status: 201 },
    )
  } catch (error) {
    return NextResponse.json({ error: "Signup failed" }, { status: 500 })
  }
}
