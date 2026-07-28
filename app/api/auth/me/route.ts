import { type NextRequest, NextResponse } from "next/server"
import { eq } from "drizzle-orm"
import { db } from "@/lib/db"
import { users, profiles } from "@/lib/db/schema"
import { getSession } from "@/lib/auth/session"
import { requireUserId, isAuthError } from "@/lib/auth/require-user"

export async function GET() {
  const session = await getSession()

  if (!session) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
  }

  const userRows = await db.select().from(users).where(eq(users.id, session.userId)).limit(1)
  const user = userRows[0]

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 })
  }

  const profileRows = await db.select().from(profiles).where(eq(profiles.userId, user.id)).limit(1)
  const profile = profileRows[0]

  return NextResponse.json({
    user: {
      id: user.id,
      email: user.email,
      name: profile?.name ?? "",
      avatar: profile?.avatarUrl ?? undefined,
      dob: profile?.dob ?? undefined,
      phone: user.phone ?? undefined,
      stylePreferences: profile?.styleTags ?? [],
      createdAt: user.createdAt,
      updatedAt: profile?.updatedAt ?? user.createdAt,
    },
  })
}

export async function PATCH(request: NextRequest) {
  try {
    const userId = await requireUserId()
    if (isAuthError(userId)) return userId

    const { name, phone, dob } = await request.json()

    if (phone !== undefined) {
      await db.update(users).set({ phone }).where(eq(users.id, userId))
    }

    if (name !== undefined || dob !== undefined) {
      await db
        .update(profiles)
        .set({
          ...(name !== undefined && { name }),
          ...(dob !== undefined && { dob }),
          updatedAt: new Date(),
        })
        .where(eq(profiles.userId, userId))
    }

    const userRows = await db.select().from(users).where(eq(users.id, userId)).limit(1)
    const user = userRows[0]
    const profileRows = await db.select().from(profiles).where(eq(profiles.userId, userId)).limit(1)
    const profile = profileRows[0]

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: profile?.name ?? "",
        avatar: profile?.avatarUrl ?? undefined,
        dob: profile?.dob ?? undefined,
        phone: user.phone ?? undefined,
        stylePreferences: profile?.styleTags ?? [],
        createdAt: user.createdAt,
        updatedAt: profile?.updatedAt ?? user.createdAt,
      },
    })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: "Failed to update profile" }, { status: 500 })
  }
}
