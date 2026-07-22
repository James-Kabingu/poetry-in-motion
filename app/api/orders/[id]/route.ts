import { type NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"
import { orders, orderItems, products } from "@/lib/db/schema"
import { eq, and } from "drizzle-orm"
import { requireUserId, isAuthError } from "@/lib/auth/require-user"

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const userId = await requireUserId()
    if (isAuthError(userId)) return userId

    const { id } = await params
    const order = await db.query.orders.findFirst({ where: and(eq(orders.id, id), eq(orders.userId, userId)) })
    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 })
    }

    const items = await db
      .select({
        productId: orderItems.productId,
        quantity: orderItems.quantity,
        unitPriceCents: orderItems.unitPriceCents,
        color: orderItems.color,
        size: orderItems.size,
        name: products.name,
        image: products.images,
      })
      .from(orderItems)
      .innerJoin(products, eq(orderItems.productId, products.id))
      .where(eq(orderItems.orderId, order.id))

    return NextResponse.json({
      success: true,
      data: {
        id: order.id,
        status: order.status,
        totalPrice: order.totalCents / 100,
        currency: order.currency,
        shippingAddress: order.shippingAddress,
        paymentMethod: order.paymentMethod,
        createdAt: order.createdAt,
        items: items.map((i) => ({
          productId: i.productId,
          name: i.name,
          image: Array.isArray(i.image) && i.image.length > 0 ? i.image[0] : "",
          quantity: i.quantity,
          price: i.unitPriceCents / 100,
          color: i.color,
          size: i.size,
        })),
      },
    })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: "Failed to fetch order" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const userId = await requireUserId()
    if (isAuthError(userId)) return userId

    const { id } = await params
    const order = await db.query.orders.findFirst({ where: and(eq(orders.id, id), eq(orders.userId, userId)) })
    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 })
    }

    const { status } = await request.json()
    const allowed = ["pending", "processing", "shipped", "delivered", "cancelled"]
    if (!allowed.includes(status)) {
      return NextResponse.json({ error: "Invalid status" }, { status: 400 })
    }

    const [updated] = await db
      .update(orders)
      .set({ status, updatedAt: new Date() })
      .where(eq(orders.id, id))
      .returning()

    return NextResponse.json({ success: true, data: updated })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: "Failed to update order" }, { status: 500 })
  }
}
