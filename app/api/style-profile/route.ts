import { type NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"
import { profiles } from "@/lib/db/schema"
import { eq } from "drizzle-orm"
import { requireUserId, isAuthError } from "@/lib/auth/require-user"

function toStyleProfile(profile: typeof profiles.$inferSelect) {
  return {
    userId: profile.userId,
    bodyType: profile.bodyType,
    skinTone: profile.skinTone,
    stylePreferences: profile.styleTags ?? [],
    budget: profile.budgetCents ? profile.budgetCents / 100 : null,
    favoriteColors: profile.favoriteColors ?? [],
    occasions: profile.occasions ?? [],
  }
}

export async function GET(request: NextRequest) {
  try {
    const userId = await requireUserId()
    if (isAuthError(userId)) return userId

    const profile = await db.query.profiles.findFirst({ where: eq(profiles.userId, userId) })
    if (!profile) {
      return NextResponse.json({ error: "Style profile not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true, data: toStyleProfile(profile) })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: "Failed to fetch style profile" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const userId = await requireUserId()
    if (isAuthError(userId)) return userId

    const { bodyType, skinTone, stylePreferences, budget, favoriteColors, occasions } = await request.json()

    const [updated] = await db
      .update(profiles)
      .set({
        ...(bodyType !== undefined && { bodyType }),
        ...(skinTone !== undefined && { skinTone }),
        ...(stylePreferences !== undefined && { styleTags: stylePreferences }),
        ...(budget !== undefined && { budgetCents: Math.round(budget * 100) }),
        ...(favoriteColors !== undefined && { favoriteColors }),
        ...(occasions !== undefined && { occasions }),
        updatedAt: new Date(),
      })
      .where(eq(profiles.userId, userId))
      .returning()

    if (!updated) {
      return NextResponse.json({ error: "Profile not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true, data: toStyleProfile(updated) })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: "Failed to update style profile" }, { status: 500 })
  }
}
