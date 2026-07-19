import { NextResponse } from "next/server"
// Subscription management API
const subscriptions: Record<string, any> = {}

const TIER_PRICES: Record<string, number> = { free: 0, premium: 15, vip: 50, elite: 75 }

export async function POST(request: Request) {
  const { userId, tier } = await request.json()

  if (!userId || !tier) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
  }

  const subscription = {
    id: `sub_${Date.now()}`,
    userId,
    tier,
    status: "active",
    startDate: new Date(),
    renewalDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    price: TIER_PRICES[tier] || 0,
  }

  subscriptions[userId] = subscription
  return NextResponse.json(subscription)
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const userId = searchParams.get("userId")

  if (!userId) {
    return NextResponse.json({ error: "Missing userId" }, { status: 400 })
  }

  const subscription = subscriptions[userId] || { tier: "free", status: "inactive" }
  return NextResponse.json(subscription)
}
