import { type NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"
import { cartItems, products } from "@/lib/db/schema"
import { eq, and } from "drizzle-orm"
import { requireUserId, isAuthError } from "@/lib/auth/require-user"

async function getCartWithProducts(userId: string) {
  const rows = await db
    .select({
      id: cartItems.id,
      productId: cartItems.productId,
      quantity: cartItems.quantity,
      color: cartItems.color,
      size: cartItems.size,
      name: products.name,
      image: products.images,
      priceCents: products.priceCents,
      category: products.description,
    })
    .from(cartItems)
    .innerJoin(products, eq(cartItems.productId, products.id))
    .where(eq(cartItems.userId, userId))

  return rows.map((r) => ({
    id: r.productId,
    cartItemId: r.id,
    name: r.name,
    image: Array.isArray(r.image) && r.image.length > 0 ? r.image[0] : "",
    price: r.priceCents / 100,
    color: r.color ?? "Default",
    size: r.size ?? "One Size",
    quantity: r.quantity,
  }))
}

export async function GET(request: NextRequest) {
  try {
    const userId = await requireUserId()
    if (isAuthError(userId)) return userId

    const cart = await getCartWithProducts(userId)
    return NextResponse.json({ success: true, data: cart })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: "Failed to fetch cart" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const userId = await requireUserId()
    if (isAuthError(userId)) return userId

    const { productId, quantity, color, size } = await request.json()
    if (!productId || !quantity) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const product = await db.query.products.findFirst({ where: eq(products.id, productId) })
    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 })
    }

    const existing = await db.query.cartItems.findFirst({
      where: and(
        eq(cartItems.userId, userId),
        eq(cartItems.productId, productId),
        eq(cartItems.color, color ?? "Default"),
        eq(cartItems.size, size ?? "One Size"),
      ),
    })

    if (existing) {
      await db
        .update(cartItems)
        .set({ quantity: existing.quantity + quantity })
        .where(eq(cartItems.id, existing.id))
    } else {
      await db.insert(cartItems).values({
        userId,
        productId,
        quantity,
        color: color ?? "Default",
        size: size ?? "One Size",
      })
    }

    const cart = await getCartWithProducts(userId)
    return NextResponse.json({ success: true, data: cart })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: "Failed to add to cart" }, { status: 500 })
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const userId = await requireUserId()
    if (isAuthError(userId)) return userId

    const { productId, color, size, quantity } = await request.json()
    if (!productId || quantity == null) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const match = and(
      eq(cartItems.userId, userId),
      eq(cartItems.productId, productId),
      eq(cartItems.color, color ?? "Default"),
      eq(cartItems.size, size ?? "One Size"),
    )

    if (quantity < 1) {
      await db.delete(cartItems).where(match)
    } else {
      await db.update(cartItems).set({ quantity }).where(match)
    }

    const cart = await getCartWithProducts(userId)
    return NextResponse.json({ success: true, data: cart })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: "Failed to update cart" }, { status: 500 })
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

    await db
      .delete(cartItems)
      .where(
        and(
          eq(cartItems.userId, userId),
          eq(cartItems.productId, productId),
          eq(cartItems.color, color ?? "Default"),
          eq(cartItems.size, size ?? "One Size"),
        ),
      )

    const cart = await getCartWithProducts(userId)
    return NextResponse.json({ success: true, data: cart })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: "Failed to remove from cart" }, { status: 500 })
  }
}
