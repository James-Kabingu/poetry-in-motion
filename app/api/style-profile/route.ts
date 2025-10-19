import { type NextRequest, NextResponse } from "next/server"
import type { StyleProfile } from "@/lib/types"

// In-memory storage for style profiles
const styleProfiles: Record<string, StyleProfile> = {}

export async function GET(request: NextRequest) {
  try {
    const userId = request.headers.get("x-user-id")

    if (!userId) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 })
    }

    const profile = styleProfiles[userId]

    if (!profile) {
      return NextResponse.json({ error: "Style profile not found" }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      data: profile,
    })
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch style profile" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const userId = request.headers.get("x-user-id")
    const { bodyType, skinTone, stylePreferences, budget, favoriteColors, occasions } = await request.json()

    if (!userId) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 })
    }

    const profile: StyleProfile = {
      userId,
      bodyType,
      skinTone,
      stylePreferences,
      budget,
      favoriteColors,
      occasions,
    }

    styleProfiles[userId] = profile

    return NextResponse.json(
      {
        success: true,
        data: profile,
      },
      { status: 201 },
    )
  } catch (error) {
    return NextResponse.json({ error: "Failed to create style profile" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const userId = request.headers.get("x-user-id")

    if (!userId) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 })
    }

    const updates = await request.json()

    const profile = styleProfiles[userId] || { userId }

    const updatedProfile: StyleProfile = {
      ...profile,
      ...updates,
      userId,
    }

    styleProfiles[userId] = updatedProfile

    return NextResponse.json({
      success: true,
      data: updatedProfile,
    })
  } catch (error) {
    return NextResponse.json({ error: "Failed to update style profile" }, { status: 500 })
  }
}
