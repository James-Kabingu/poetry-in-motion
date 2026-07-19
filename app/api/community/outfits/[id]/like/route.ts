import { type NextRequest, NextResponse } from "next/server"

// In-memory storage for outfit posts
const outfitPosts: Record<string, any> = {}
const userLikes: Record<string, Set<string>> = {}

export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const userId = request.headers.get("x-user-id")

    if (!userId) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 })
    }

    const post = outfitPosts[(await params).id]

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 })
    }

    if (!userLikes[userId]) {
      userLikes[userId] = new Set()
    }

    if (userLikes[userId].has((await params).id)) {
      // Unlike
      userLikes[userId].delete((await params).id)
      post.likes -= 1
    } else {
      // Like
      userLikes[userId].add((await params).id)
      post.likes += 1
    }

    return NextResponse.json({
      success: true,
      data: {
        postId: (await params).id,
        likes: post.likes,
        liked: userLikes[userId].has((await params).id),
      },
    })
  } catch (error) {
    return NextResponse.json({ error: "Failed to like post" }, { status: 500 })
  }
}
