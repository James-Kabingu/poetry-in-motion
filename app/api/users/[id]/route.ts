import { type NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"
import { users, profiles } from "@/lib/db/schema"
import { eq } from "drizzle-orm"
import { requireUserId, isAuthError } from "@/lib/auth/require-user"

async function getUserProfile(id: string) {
  const user = await db.query.users.findFirst({ where: eq(users.id, id) })
  if (!user) return null
  const profile = await db.query.profiles.findFirst({ where: eq(profiles.userId, id) })

  return {
    id: user.id,
    email: user.email,
    phone: user.phone,
    name: profile?.name ?? "",
    avatar: profile?.avatarUrl ?? null,
    bodyType: profile?.bodyType ?? null,
    skinTone: profile?.skinTone ?? null,
    stylePreferences: profile?.styleTags ?? [],
    budget: profile?.budgetCents ? profile.budgetCents / 100 : null,
    favoriteColors: profile?.favoriteColors ?? [],
    occasions: profile?.occasions ?? [],
    createdAt: user.createdAt,
    updatedAt: profile?.updatedAt ?? user.createdAt,
  }
}

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const userId = await requireUserId()
    if (isAuthError(userId)) return userId

    const { id } = await params
    if (id !== userId) {
      return NextResponse.json({ error: "Not found" }, { status: 404 })
    }

    const profile = await getUserProfile(id)
    if (!profile) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    return NextResponse.json(profile)
  } catch (error) {
    console.error(error)
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

    const { name, avatar, phone, ...styleUpdates } = await request.json()

    if (phone !== undefined) {
      await db.update(users).set({ phone }).where(eq(users.id, id))
    }

    const profileUpdates: Record<string, unknown> = { updatedAt: new Date() }
    if (name !== undefined) profileUpdates.name = name
    if (avatar !== undefined) profileUpdates.avatarUrl = avatar
    if (styleUpdates.bodyType !== undefined) profileUpdates.bodyType = styleUpdates.bodyType
    if (styleUpdates.skinTone !== undefined) profileUpdates.skinTone = styleUpdates.skinTone
    if (styleUpdates.stylePreferences !== undefined) profileUpdates.styleTags = styleUpdates.stylePreferences
    if (styleUpdates.budget !== undefined) profileUpdates.budgetCents = Math.round(styleUpdates.budget * 100)
    if (styleUpdates.favoriteColors !== undefined) profileUpdates.favoriteColors = styleUpdates.favoriteColors
    if (styleUpdates.occasions !== undefined) profileUpdates.occasions = styleUpdates.occasions

    await db.update(profiles).set(profileUpdates).where(eq(profiles.userId, id))

    const updated = await getUserProfile(id)
    return NextResponse.json(updated)
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: "Failed to update user" }, { status: 500 })
  }
}
