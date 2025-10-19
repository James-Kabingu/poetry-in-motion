import { type NextRequest, NextResponse } from "next/server"

// In-memory storage for outfit posts
const outfitPosts: Record<string, any> = {}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const userId = searchParams.get("userId")
    const limit = searchParams.get("limit") || "20"

    let posts = Object.values(outfitPosts)

    if (userId) {
      posts = posts.filter((p) => p.userId === userId)
    }

    // Sort by likes and date
    posts = posts.sort((a, b) => {
      if (b.likes !== a.likes) return b.likes - a.likes
      return b.createdAt.getTime() - a.createdAt.getTime()
    })

    return NextResponse.json({
      success: true,
      data: posts.slice(0, Number(limit)),
    })
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch outfit posts" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const userId = request.headers.get("x-user-id")
    const { caption, images, products, tags } = await request.json()

    if (!userId || !images || !products) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const newPost = {
      id: `outfit-${Date.now()}`,
      userId,
      caption,
      images,
      products,
      tags: tags || [],
      likes: 0,
      comments: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    outfitPosts[newPost.id] = newPost

    return NextResponse.json(
      {
        success: true,
        data: newPost,
      },
      { status: 201 },
    )
  } catch (error) {
    return NextResponse.json({ error: "Failed to create outfit post" }, { status: 500 })
  }
}
