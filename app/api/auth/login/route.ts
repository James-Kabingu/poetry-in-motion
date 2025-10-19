import { type NextRequest, NextResponse } from "next/server"
import { mockUsers } from "@/lib/mock-data"

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    // Validate input
    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 })
    }

    // Find user by email (in real app, verify password hash)
    const user = Object.values(mockUsers).find((u) => u.email === email)

    if (!user) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 })
    }

    // In real app, create JWT token
    const token = Buffer.from(JSON.stringify({ userId: user.id, email: user.email })).toString("base64")

    return NextResponse.json({
      success: true,
      user,
      token,
    })
  } catch (error) {
    return NextResponse.json({ error: "Authentication failed" }, { status: 500 })
  }
}
