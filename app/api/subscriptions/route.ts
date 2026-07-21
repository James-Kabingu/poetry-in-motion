import { NextResponse } from "next/server"
import { requireUserId, isAuthError } from "@/lib/auth/require-user"
import { subscriptionStore } from "@/lib/store"

const TIER_PRICES: Record<string, number> = { free: 0, premium: 15, vip: 50, elite: 75 }

export async function POST(request: Request) {
  const userId = await requireUserId()
  if (isAuthError(userId)) return userId

  const { tier } = await request.json()
  if (!tier) {
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

  subscriptionStore[userId] = subscription
  return NextResponse.json(subscription)
}

export async function GET(request: Request) {
  const userId = await requireUserId()
  if (isAuthError(userId)) return userId

  const subscription = subscriptionStore[userId] || { tier: "free", status: "inactive" }
  return NextResponse.json(subscription)
}
