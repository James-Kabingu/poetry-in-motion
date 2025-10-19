import { type NextRequest, NextResponse } from "next/server"
import { mockOrders } from "@/lib/mock-data"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const order = mockOrders[params.id]

    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      data: order,
    })
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch order" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const order = mockOrders[params.id]

    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 })
    }

    const updates = await request.json()

    // Update order status
    const updatedOrder = {
      ...order,
      ...updates,
      updatedAt: new Date(),
    }

    mockOrders[params.id] = updatedOrder

    return NextResponse.json({
      success: true,
      data: updatedOrder,
    })
  } catch (error) {
    return NextResponse.json({ error: "Failed to update order" }, { status: 500 })
  }
}
