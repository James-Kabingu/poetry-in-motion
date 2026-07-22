import { NextResponse } from "next/server"
import { db } from "@/lib/db"
import { subscriptions } from "@/lib/db/schema"
import { eq } from "drizzle-orm"
import { requireUserId, isAuthError } from "@/lib/auth/require-user"

const TIER_PRICES_CENTS: Record<string, number> = { free: 0, premium: 1500, vip: 5000, elite: 7500 }

export async function POST(request: Request) {
  const userId = await requireUserId()
  if (isAuthError(userId)) return userId

  const { tier } = await request.json()
  if (!tier || !(tier in TIER_PRICES_CENTS)) {
    return NextResponse.json({ error: "Missing or invalid tier" }, { status: 400 })
  }

  const existing = await db.query.subscriptions.findFirst({ where: eq(subscriptions.userId, userId) })

  const values = {
    tier,
    status: "active",
    priceCents: TIER_PRICES_CENTS[tier],
    startDate: new Date(),
    renewalDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(),
  }

  const subscription = existing
    ? (await db.update(subscriptions).set(values).where(eq(subscriptions.userId, userId)).returning())[0]
    : (await db.insert(subscriptions).values({ userId, ...values }).returning())[0]

  return NextResponse.json(subscription)
}

export async function GET(request: Request) {
  const userId = await requireUserId()
  if (isAuthError(userId)) return userId

  const subscription = await db.query.subscriptions.findFirst({ where: eq(subscriptions.userId, userId) })
  return NextResponse.json(subscription ?? { tier: "free", status: "inactive" })
}
