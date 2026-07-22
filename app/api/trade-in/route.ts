import { type NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"
import { tradeIns, products } from "@/lib/db/schema"
import { eq } from "drizzle-orm"
import { requireUserId, isAuthError } from "@/lib/auth/require-user"

const CONDITION_MULTIPLIERS: Record<string, number> = { "like-new": 0.7, good: 0.5, fair: 0.3 }

export async function GET(request: NextRequest) {
  try {
    const userId = await requireUserId()
    if (isAuthError(userId)) return userId

    const rows = await db.query.tradeIns.findMany({ where: eq(tradeIns.userId, userId) })
    return NextResponse.json({ success: true, data: rows })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: "Failed to fetch trade-ins" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const userId = await requireUserId()
    if (isAuthError(userId)) return userId

    const { productId, condition } = await request.json()
    if (!productId || !condition || !(condition in CONDITION_MULTIPLIERS)) {
      return NextResponse.json({ error: "Missing or invalid fields" }, { status: 400 })
    }

    const product = await db.query.products.findFirst({ where: eq(products.id, productId) })
    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 })
    }

    const estimatedValueCents = Math.round(product.priceCents * CONDITION_MULTIPLIERS[condition])

    const [tradeIn] = await db
      .insert(tradeIns)
      .values({ userId, productId, condition, estimatedValueCents, status: "pending" })
      .returning()

    return NextResponse.json({ success: true, data: tradeIn }, { status: 201 })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: "Failed to create trade-in" }, { status: 500 })
  }
}
