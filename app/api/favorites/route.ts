import { type NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"
import { wishlists, products } from "@/lib/db/schema"
import { eq, and } from "drizzle-orm"
import { requireUserId, isAuthError } from "@/lib/auth/require-user"

export async function GET(request: NextRequest) {
  try {
    const userId = await requireUserId()
    if (isAuthError(userId)) return userId

    const rows = await db
      .select({ productId: wishlists.productId })
      .from(wishlists)
      .where(eq(wishlists.userId, userId))

    return NextResponse.json({ success: true, data: rows.map((r) => r.productId) })
  } catch (error) {
    console.error(error)
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

    const product = await db.query.products.findFirst({ where: eq(products.id, productId) })
    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 })
    }

    const existing = await db.query.wishlists.findFirst({
      where: and(eq(wishlists.userId, userId), eq(wishlists.productId, productId)),
    })
    if (!existing) {
      await db.insert(wishlists).values({ userId, productId })
    }

    const rows = await db.select({ productId: wishlists.productId }).from(wishlists).where(eq(wishlists.userId, userId))
    return NextResponse.json({ success: true, data: rows.map((r) => r.productId) })
  } catch (error) {
    console.error(error)
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

    await db.delete(wishlists).where(and(eq(wishlists.userId, userId), eq(wishlists.productId, productId)))

    const rows = await db.select({ productId: wishlists.productId }).from(wishlists).where(eq(wishlists.userId, userId))
    return NextResponse.json({ success: true, data: rows.map((r) => r.productId) })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: "Failed to remove favorite" }, { status: 500 })
  }
}
