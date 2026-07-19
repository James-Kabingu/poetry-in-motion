import { type NextRequest, NextResponse } from "next/server"
import { eq } from "drizzle-orm"
import bcrypt from "bcryptjs"
import { db } from "@/lib/db"
import { users, profiles } from "@/lib/db/schema"
import { createSession } from "@/lib/auth/session"

export async function POST(request: NextRequest) {
  try {
    const { email, password, name } = await request.json()

    if (!email || !password || !name) {
      return NextResponse.json({ error: "Email, password, and name are required" }, { status: 400 })
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 })
    }

    if (password.length < 8) {
      return NextResponse.json({ error: "Password must be at least 8 characters" }, { status: 400 })
    }

    const existingRows = await db.select().from(users).where(eq(users.email, email.toLowerCase())).limit(1)
    const existing = existingRows[0]

    if (existing) {
      return NextResponse.json({ error: "An account with this email already exists" }, { status: 409 })
    }

    const passwordHash = await bcrypt.hash(password, 10)

    const [newUser] = await db
      .insert(users)
      .values({
        email: email.toLowerCase(),
        passwordHash,
      })
      .returning()

    const [newProfile] = await db
      .insert(profiles)
      .values({
        userId: newUser.id,
        name,
      })
      .returning()

    await createSession(newUser.id)

    return NextResponse.json(
      {
        success: true,
        user: {
          id: newUser.id,
          email: newUser.email,
          name: newProfile.name,
          avatar: newProfile.avatarUrl ?? undefined,
          stylePreferences: newProfile.styleTags ?? [],
          createdAt: newUser.createdAt,
          updatedAt: newProfile.updatedAt,
        },
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Signup error:", error)
    return NextResponse.json({ error: "Signup failed" }, { status: 500 })
  }
}
