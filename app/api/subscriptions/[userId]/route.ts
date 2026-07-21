import { NextResponse } from "next/server"
import { requireUserId, isAuthError } from "@/lib/auth/require-user"
import { subscriptionStore } from "@/lib/store"

export async function PUT(request: Request, { params }: { params: Promise<{ userId: string }> }) {
  const userId = await requireUserId()
  if (isAuthError(userId)) return userId

  const { userId: routeUserId } = await params
  if (routeUserId !== userId) {
    return NextResponse.json({ error: "Not found" }, { status: 404 })
  }

  const { tier } = await request.json()
  const existing = subscriptionStore[userId] || {}
  const subscription = { ...existing, userId, tier, status: "active", updatedAt: new Date() }
  subscriptionStore[userId] = subscription

  return NextResponse.json(subscription)
}

export async function DELETE(request: Request, { params }: { params: Promise<{ userId: string }> }) {
  const userId = await requireUserId()
  if (isAuthError(userId)) return userId

  const { userId: routeUserId } = await params
  if (routeUserId !== userId) {
    return NextResponse.json({ error: "Not found" }, { status: 404 })
  }

  delete subscriptionStore[userId]
  return NextResponse.json({ message: "Subscription cancelled", userId })
}
