import { type NextRequest, NextResponse } from "next/server"

// In-memory storage for follower relationships
const followers: Record<string, Set<string>> = {}

export async function GET(request: NextRequest) {
  try {
    const userId = request.headers.get("x-user-id")

    if (!userId) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 })
    }

    const userFollowers = followers[userId] ? Array.from(followers[userId]) : []

    return NextResponse.json({
      success: true,
      data: {
        userId,
        followers: userFollowers,
        followerCount: userFollowers.length,
      },
    })
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch followers" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const userId = request.headers.get("x-user-id")
    const { targetUserId } = await request.json()

    if (!userId || !targetUserId) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    if (!followers[targetUserId]) {
      followers[targetUserId] = new Set()
    }

    if (followers[targetUserId].has(userId)) {
      // Unfollow
      followers[targetUserId].delete(userId)
    } else {
      // Follow
      followers[targetUserId].add(userId)
    }

    return NextResponse.json({
      success: true,
      data: {
        targetUserId,
        isFollowing: followers[targetUserId].has(userId),
        followerCount: followers[targetUserId].size,
      },
    })
  } catch (error) {
    return NextResponse.json({ error: "Failed to follow user" }, { status: 500 })
  }
}
