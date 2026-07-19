import { type NextRequest, NextResponse } from "next/server"

// In-memory storage for trade-ins
const tradeIns: Record<string, any> = {}

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const tradeIn = tradeIns[(await params).id]

    if (!tradeIn) {
      return NextResponse.json({ error: "Trade-in not found" }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      data: tradeIn,
    })
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch trade-in" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const tradeIn = tradeIns[(await params).id]

    if (!tradeIn) {
      return NextResponse.json({ error: "Trade-in not found" }, { status: 404 })
    }

    const updates = await request.json()

    const updatedTradeIn = {
      ...tradeIn,
      ...updates,
    }

    tradeIns[(await params).id] = updatedTradeIn

    return NextResponse.json({
      success: true,
      data: updatedTradeIn,
    })
  } catch (error) {
    return NextResponse.json({ error: "Failed to update trade-in" }, { status: 500 })
  }
}
