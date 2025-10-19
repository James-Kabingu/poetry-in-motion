import { type NextRequest, NextResponse } from "next/server"

// In-memory storage for shopping carts
const userCarts: Record<string, any[]> = {}

export async function GET(request: NextRequest) {
  try {
    const userId = request.headers.get("x-user-id")

    if (!userId) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 })
    }

    const cart = userCarts[userId] || []

    return NextResponse.json({
      success: true,
      data: cart,
    })
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch cart" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const userId = request.headers.get("x-user-id")
    const { productId, quantity, color, size, price } = await request.json()

    if (!userId || !productId || !quantity) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    if (!userCarts[userId]) {
      userCarts[userId] = []
    }

    // Check if item already in cart
    const existingItem = userCarts[userId].find(
      (item) => item.productId === productId && item.color === color && item.size === size,
    )

    if (existingItem) {
      existingItem.quantity += quantity
    } else {
      userCarts[userId].push({
        productId,
        quantity,
        color,
        size,
        price,
      })
    }

    return NextResponse.json({
      success: true,
      data: userCarts[userId],
    })
  } catch (error) {
    return NextResponse.json({ error: "Failed to add to cart" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const userId = request.headers.get("x-user-id")
    const { productId, color, size } = await request.json()

    if (!userId || !productId) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    if (userCarts[userId]) {
      userCarts[userId] = userCarts[userId].filter(
        (item) => !(item.productId === productId && item.color === color && item.size === size),
      )
    }

    return NextResponse.json({
      success: true,
      data: userCarts[userId],
    })
  } catch (error) {
    return NextResponse.json({ error: "Failed to remove from cart" }, { status: 500 })
  }
}
