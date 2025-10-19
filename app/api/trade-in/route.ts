import { type NextRequest, NextResponse } from "next/server"
import type { TradeIn } from "@/lib/types"

// In-memory storage for trade-ins
const tradeIns: Record<string, TradeIn> = {}

export async function GET(request: NextRequest) {
  try {
    const userId = request.headers.get("x-user-id")

    if (!userId) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 })
    }

    const userTradeIns = Object.values(tradeIns).filter((t) => t.userId === userId)

    return NextResponse.json({
      success: true,
      data: userTradeIns,
    })
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch trade-ins" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const userId = request.headers.get("x-user-id")
    const { productId, condition } = await request.json()

    if (!userId || !productId || !condition) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Calculate estimated value based on condition
    const conditionMultipliers: Record<string, number> = {
      "like-new": 0.7,
      good: 0.5,
      fair: 0.3,
    }

    // Mock product price (in real app, fetch from database)
    const originalPrice = 65
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

    tradeIns[newTradeIn.id] = newTradeIn

    return NextResponse.json(
      {
        success: true,
        data: newTradeIn,
      },
      { status: 201 },
    )
  } catch (error) {
    return NextResponse.json({ error: "Failed to create trade-in" }, { status: 500 })
  }
}
