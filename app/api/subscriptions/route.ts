// Subscription management API
const subscriptions: Record<string, any> = {}

export async function POST(request: Request) {
  const { userId, tier } = await request.json()

  if (!userId || !tier) {
    return Response.json({ error: "Missing required fields" }, { status: 400 })
  }

  const subscription = {
    id: `sub_${Date.now()}`,
    userId,
    tier,
    status: "active",
    startDate: new Date(),
    renewalDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    price: { free: 0, premium: 15, vip: 50, elite: 75 }[tier] || 0,
  }

  subscriptions[userId] = subscription
  return Response.json(subscription)
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const userId = searchParams.get("userId")

  if (!userId) {
    return Response.json({ error: "Missing userId" }, { status: 400 })
  }

  const subscription = subscriptions[userId] || { tier: "free", status: "inactive" }
  return Response.json(subscription)
}
