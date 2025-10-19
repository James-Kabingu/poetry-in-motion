import { type NextRequest, NextResponse } from "next/server"

// In-memory storage for favorites (replace with database in production)
const userFavorites: Record<string, string[]> = {}

export async function GET(request: NextRequest) {
  try {
    const userId = request.headers.get("x-user-id")

    if (!userId) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 })
    }

    const favorites = userFavorites[userId] || []

    return NextResponse.json({
      success: true,
      data: favorites,
    })
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch favorites" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const userId = request.headers.get("x-user-id")
    const { productId } = await request.json()

    if (!userId || !productId) {
      return NextResponse.json({ error: "User ID and product ID are required" }, { status: 400 })
    }

    if (!userFavorites[userId]) {
      userFavorites[userId] = []
    }

    if (!userFavorites[userId].includes(productId)) {
      userFavorites[userId].push(productId)
    }

    return NextResponse.json({
      success: true,
      data: userFavorites[userId],
    })
  } catch (error) {
    return NextResponse.json({ error: "Failed to add favorite" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const userId = request.headers.get("x-user-id")
    const { productId } = await request.json()

    if (!userId || !productId) {
      return NextResponse.json({ error: "User ID and product ID are required" }, { status: 400 })
    }

    if (userFavorites[userId]) {
      userFavorites[userId] = userFavorites[userId].filter((id) => id !== productId)
    }

    return NextResponse.json({
      success: true,
      data: userFavorites[userId],
    })
  } catch (error) {
    return NextResponse.json({ error: "Failed to remove favorite" }, { status: 500 })
  }
}
