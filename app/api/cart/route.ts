import { type NextRequest, NextResponse } from "next/server"
import { requireUserId, isAuthError } from "@/lib/auth/require-user"
import { cartStore } from "@/lib/store"

export async function GET(request: NextRequest) {
  try {
    const userId = await requireUserId()
    if (isAuthError(userId)) return userId

    const cart = cartStore[userId] || []
    return NextResponse.json({ success: true, data: cart })
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch cart" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const userId = await requireUserId()
    if (isAuthError(userId)) return userId

    const { productId, quantity, color, size, price } = await request.json()
    if (!productId || !quantity) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    if (!cartStore[userId]) cartStore[userId] = []

    const existingItem = cartStore[userId].find(
      (item) => item.productId === productId && item.color === color && item.size === size,
    )

    if (existingItem) {
      existingItem.quantity += quantity
    } else {
      cartStore[userId].push({ productId, quantity, color, size, price })
    }

    return NextResponse.json({ success: true, data: cartStore[userId] })
  } catch (error) {
    return NextResponse.json({ error: "Failed to add to cart" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const userId = await requireUserId()
    if (isAuthError(userId)) return userId

    const { productId, color, size } = await request.json()
    if (!productId) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    if (cartStore[userId]) {
      cartStore[userId] = cartStore[userId].filter(
        (item) => !(item.productId === productId && item.color === color && item.size === size),
      )
    }

    return NextResponse.json({ success: true, data: cartStore[userId] || [] })
  } catch (error) {
    return NextResponse.json({ error: "Failed to remove from cart" }, { status: 500 })
  }
}
