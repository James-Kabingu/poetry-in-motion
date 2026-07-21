import { type NextRequest, NextResponse } from "next/server"
import type { TradeIn } from "@/lib/types"
import { requireUserId, isAuthError } from "@/lib/auth/require-user"
import { tradeInStore } from "@/lib/store"

export async function GET(request: NextRequest) {
  try {
    const userId = await requireUserId()
    if (isAuthError(userId)) return userId

    const userTradeIns = Object.values(tradeInStore).filter((t) => t.userId === userId)
    return NextResponse.json({ success: true, data: userTradeIns })
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch trade-ins" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const userId = await requireUserId()
    if (isAuthError(userId)) return userId

    const { productId, condition } = await request.json()
    if (!productId || !condition) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const conditionMultipliers: Record<string, number> = { "like-new": 0.7, good: 0.5, fair: 0.3 }
    const originalPrice = 65 // mock product price
    const estimatedValue = originalPrice * (conditionMultipliers[condition] || 0.3)

    const newTradeIn: TradeIn = {
      id: `trade-${Date.now()}`,
      userId,
      productId,
      condition: condition as "like-new" | "good" | "fair",
      estimatedValue,
      status: "pending",
      createdAt: new Date(),
    }

    tradeInStore[newTradeIn.id] = newTradeIn

    return NextResponse.json({ success: true, data: newTradeIn }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create trade-in" }, { status: 500 })
  }
}
