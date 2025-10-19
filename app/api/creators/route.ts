import { type NextRequest, NextResponse } from "next/server"
import { mockCreators } from "@/lib/mock-data"
import type { Creator } from "@/lib/types"

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const verified = searchParams.get("verified")

    let creators = Object.values(mockCreators)

    if (verified === "true") {
      creators = creators.filter((c) => c.verified)
    }

    return NextResponse.json({
      success: true,
      data: creators,
    })
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch creators" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const userId = request.headers.get("x-user-id")
    const { name, bio, avatar } = await request.json()

    if (!userId || !name || !bio) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const newCreator: Creator = {
      id: `creator-${Date.now()}`,
      userId,
      name,
      bio,
      avatar: avatar || "/avatar-default.jpg",
      collections: [],
      totalEarnings: 0,
      followers: 0,
      verified: false,
      createdAt: new Date(),
    }

    mockCreators[newCreator.id] = newCreator

    return NextResponse.json(
      {
        success: true,
        data: newCreator,
      },
      { status: 201 },
    )
  } catch (error) {
    return NextResponse.json({ error: "Failed to create creator profile" }, { status: 500 })
  }
}
