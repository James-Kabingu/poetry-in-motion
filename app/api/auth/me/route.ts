import { NextResponse } from "next/server"
import { eq } from "drizzle-orm"
import { db } from "@/lib/db"
import { users, profiles } from "@/lib/db/schema"
import { getSession } from "@/lib/auth/session"

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
