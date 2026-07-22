import { type NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"
import { tradeIns } from "@/lib/db/schema"
import { eq, and } from "drizzle-orm"
import { requireUserId, isAuthError } from "@/lib/auth/require-user"

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const userId = await requireUserId()
    if (isAuthError(userId)) return userId

    const { id } = await params
    const tradeIn = await db.query.tradeIns.findFirst({ where: and(eq(tradeIns.id, id), eq(tradeIns.userId, userId)) })
    if (!tradeIn) {
      return NextResponse.json({ error: "Trade-in not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true, data: tradeIn })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: "Failed to fetch trade-in" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const userId = await requireUserId()
    if (isAuthError(userId)) return userId

    const { id } = await params
    const tradeIn = await db.query.tradeIns.findFirst({ where: and(eq(tradeIns.id, id), eq(tradeIns.userId, userId)) })
    if (!tradeIn) {
      return NextResponse.json({ error: "Trade-in not found" }, { status: 404 })
    }

    const { status } = await request.json()
    const allowed = ["pending", "approved", "rejected", "completed"]
    if (!allowed.includes(status)) {
      return NextResponse.json({ error: "Invalid status" }, { status: 400 })
    }

    const [updated] = await db.update(tradeIns).set({ status }).where(eq(tradeIns.id, id)).returning()
    return NextResponse.json({ success: true, data: updated })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: "Failed to update trade-in" }, { status: 500 })
  }
}
