import { type NextRequest, NextResponse } from "next/server"
import { requireUserId, isAuthError } from "@/lib/auth/require-user"
import { favoritesStore } from "@/lib/store"

export async function GET(request: NextRequest) {
  try {
    const userId = await requireUserId()
    if (isAuthError(userId)) return userId

    return NextResponse.json({ success: true, data: favoritesStore[userId] || [] })
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch favorites" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const userId = await requireUserId()
    if (isAuthError(userId)) return userId

    const { productId } = await request.json()
    if (!productId) {
      return NextResponse.json({ error: "Product ID is required" }, { status: 400 })
    }

    if (!favoritesStore[userId]) favoritesStore[userId] = []
    if (!favoritesStore[userId].includes(productId)) favoritesStore[userId].push(productId)

    return NextResponse.json({ success: true, data: favoritesStore[userId] })
  } catch (error) {
    return NextResponse.json({ error: "Failed to add favorite" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const userId = await requireUserId()
    if (isAuthError(userId)) return userId

    const { productId } = await request.json()
    if (!productId) {
      return NextResponse.json({ error: "Product ID is required" }, { status: 400 })
    }

    if (favoritesStore[userId]) {
      favoritesStore[userId] = favoritesStore[userId].filter((id) => id !== productId)
    }

    return NextResponse.json({ success: true, data: favoritesStore[userId] || [] })
  } catch (error) {
    return NextResponse.json({ error: "Failed to remove favorite" }, { status: 500 })
  }
}
