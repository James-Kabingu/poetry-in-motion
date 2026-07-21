import { type NextRequest, NextResponse } from "next/server"
import type { StyleProfile } from "@/lib/types"
import { requireUserId, isAuthError } from "@/lib/auth/require-user"
import { styleProfileStore } from "@/lib/store"

export async function GET(request: NextRequest) {
  try {
    const userId = await requireUserId()
    if (isAuthError(userId)) return userId

    const profile = styleProfileStore[userId]
    if (!profile) {
      return NextResponse.json({ error: "Style profile not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true, data: profile })
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch style profile" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const userId = await requireUserId()
    if (isAuthError(userId)) return userId

    const { bodyType, skinTone, stylePreferences, budget, favoriteColors, occasions } = await request.json()

    const profile: StyleProfile = {
      userId,
      bodyType,
      skinTone,
      stylePreferences,
      budget,
      favoriteColors,
      occasions,
    }

    styleProfileStore[userId] = profile
    return NextResponse.json({ success: true, data: profile }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create style profile" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const userId = await requireUserId()
    if (isAuthError(userId)) return userId

    const updates = await request.json()
    const profile = styleProfileStore[userId] || { userId }
    const updatedProfile: StyleProfile = { ...profile, ...updates, userId }

    styleProfileStore[userId] = updatedProfile
    return NextResponse.json({ success: true, data: updatedProfile })
  } catch (error) {
    return NextResponse.json({ error: "Failed to update style profile" }, { status: 500 })
  }
}
