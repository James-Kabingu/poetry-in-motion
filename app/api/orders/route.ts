import { type NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"
import { orders, orderItems, cartItems, products } from "@/lib/db/schema"
import { eq } from "drizzle-orm"
import { requireUserId, isAuthError } from "@/lib/auth/require-user"

export async function GET(request: NextRequest) {
  try {
    const userId = await requireUserId()
    if (isAuthError(userId)) return userId

    const userOrders = await db.query.orders.findMany({
      where: eq(orders.userId, userId),
      orderBy: (orders, { desc }) => [desc(orders.createdAt)],
    })

    const withItems = await Promise.all(
      userOrders.map(async (order) => {
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

        return {
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
        }
      }),
    )

    return NextResponse.json({ success: true, data: withItems })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const userId = await requireUserId()
    if (isAuthError(userId)) return userId

    const { shippingAddress, paymentMethod } = await request.json()
    if (!shippingAddress?.fullName || !shippingAddress?.phone || !shippingAddress?.email) {
      return NextResponse.json({ error: "Missing shipping details" }, { status: 400 })
    }

    const cart = await db
      .select({
        productId: cartItems.productId,
        quantity: cartItems.quantity,
        color: cartItems.color,
        size: cartItems.size,
        priceCents: products.priceCents,
        inStock: products.inStock,
      })
      .from(cartItems)
      .innerJoin(products, eq(cartItems.productId, products.id))
      .where(eq(cartItems.userId, userId))

    if (cart.length === 0) {
      return NextResponse.json({ error: "Cart is empty" }, { status: 400 })
    }

    const outOfStock = cart.filter((c) => !c.inStock)
    if (outOfStock.length > 0) {
      return NextResponse.json(
        { error: "Some items in your cart are no longer in stock", productIds: outOfStock.map((c) => c.productId) },
        { status: 409 },
      )
    }

    const totalCents = cart.reduce((sum, c) => sum + c.priceCents * c.quantity, 0)

    const [order] = await db
      .insert(orders)
      .values({
        userId,
        status: "pending",
        totalCents,
        currency: "USD",
        shippingAddress,
        paymentMethod: paymentMethod ?? null,
      })
      .returning()

    await db.insert(orderItems).values(
      cart.map((c) => ({
        orderId: order.id,
        productId: c.productId,
        quantity: c.quantity,
        unitPriceCents: c.priceCents,
        color: c.color,
        size: c.size,
      })),
    )

    await db.delete(cartItems).where(eq(cartItems.userId, userId))

    return NextResponse.json({ success: true, data: { id: order.id, totalPrice: totalCents / 100 } }, { status: 201 })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: "Failed to create order" }, { status: 500 })
  }
}
