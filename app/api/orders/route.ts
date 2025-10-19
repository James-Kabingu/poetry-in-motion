import { type NextRequest, NextResponse } from "next/server"
import { mockOrders } from "@/lib/mock-data"
import type { Order } from "@/lib/types"

export async function GET(request: NextRequest) {
  try {
    const userId = request.headers.get("x-user-id")

    if (!userId) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 })
    }

    const userOrders = Object.values(mockOrders).filter((order) => order.userId === userId)

    return NextResponse.json({
      success: true,
      data: userOrders,
    })
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const userId = request.headers.get("x-user-id")
    const { items, shippingAddress } = await request.json()

    if (!userId || !items || !shippingAddress) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Calculate total price
    const totalPrice = items.reduce((sum: number, item: any) => sum + item.price * item.quantity, 0)

    // Create new order
    const newOrder: Order = {
      id: `order-${Date.now()}`,
      userId,
      items,
      totalPrice,
      status: "pending",
      shippingAddress,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    mockOrders[newOrder.id] = newOrder

    return NextResponse.json(
      {
        success: true,
        data: newOrder,
      },
      { status: 201 },
    )
  } catch (error) {
    return NextResponse.json({ error: "Failed to create order" }, { status: 500 })
  }
}
