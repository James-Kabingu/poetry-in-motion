import { type NextRequest, NextResponse } from "next/server"

// In-memory storage for user sustainability metrics
const userImpact: Record<string, any> = {}

export async function GET(request: NextRequest) {
  try {
    const userId = request.headers.get("x-user-id")

    if (!userId) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 })
    }

    const impact = userImpact[userId] || {
      totalCO2Saved: 0,
      totalWaterSaved: 0,
      itemsTraded: 0,
      preOwnedPurchases: 0,
      sustainableItems: 0,
    }

    return NextResponse.json({
      success: true,
      data: impact,
    })
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch sustainability impact" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const userId = request.headers.get("x-user-id")
    const { co2Saved, waterSaved, action } = await request.json()

    if (!userId) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 })
    }

    if (!userImpact[userId]) {
      userImpact[userId] = {
        totalCO2Saved: 0,
        totalWaterSaved: 0,
        itemsTraded: 0,
        preOwnedPurchases: 0,
        sustainableItems: 0,
      }
    }

    // Update impact metrics
    if (co2Saved) userImpact[userId].totalCO2Saved += co2Saved
    if (waterSaved) userImpact[userId].totalWaterSaved += waterSaved

    if (action === "trade") userImpact[userId].itemsTraded += 1
    if (action === "preowned") userImpact[userId].preOwnedPurchases += 1
    if (action === "sustainable") userImpact[userId].sustainableItems += 1

    return NextResponse.json({
      success: true,
      data: userImpact[userId],
    })
  } catch (error) {
    return NextResponse.json({ error: "Failed to update sustainability impact" }, { status: 500 })
  }
}
