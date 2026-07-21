import { type NextRequest, NextResponse } from "next/server"
import { requireUserId, isAuthError } from "@/lib/auth/require-user"
import { tradeInStore } from "@/lib/store"

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const userId = await requireUserId()
    if (isAuthError(userId)) return userId

    const tradeIn = tradeInStore[(await params).id]
    if (!tradeIn || tradeIn.userId !== userId) {
      return NextResponse.json({ error: "Trade-in not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true, data: tradeIn })
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch trade-in" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const userId = await requireUserId()
    if (isAuthError(userId)) return userId

    const id = (await params).id
    const tradeIn = tradeInStore[id]
    if (!tradeIn || tradeIn.userId !== userId) {
      return NextResponse.json({ error: "Trade-in not found" }, { status: 404 })
    }

    const updates = await request.json()
    const { userId: _ignored, id: _ignoredId, ...safeUpdates } = updates

    const updatedTradeIn = { ...tradeIn, ...safeUpdates }
    tradeInStore[id] = updatedTradeIn

    return NextResponse.json({ success: true, data: updatedTradeIn })
  } catch (error) {
    return NextResponse.json({ error: "Failed to update trade-in" }, { status: 500 })
  }
}
