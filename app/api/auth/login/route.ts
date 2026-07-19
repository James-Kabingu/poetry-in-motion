import { type NextRequest, NextResponse } from "next/server"
import { eq } from "drizzle-orm"
import bcrypt from "bcryptjs"
import { db } from "@/lib/db"
import { users, profiles } from "@/lib/db/schema"
import { createSession } from "@/lib/auth/session"

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 })
    }

    const userRows = await db.select().from(users).where(eq(users.email, email.toLowerCase())).limit(1)
    const user = userRows[0]

    if (!user) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 })
    }

    const passwordMatches = await bcrypt.compare(password, user.passwordHash)

    if (!passwordMatches) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 })
    }

    const profileRows = await db.select().from(profiles).where(eq(profiles.userId, user.id)).limit(1)
    const profile = profileRows[0]

    await createSession(user.id)

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: profile?.name ?? "",
        avatar: profile?.avatarUrl ?? undefined,
        stylePreferences: profile?.styleTags ?? [],
        createdAt: user.createdAt,
        updatedAt: profile?.updatedAt ?? user.createdAt,
      },
    })
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ error: "Authentication failed" }, { status: 500 })
  }
}
