import { NextResponse } from "next/server"
import { db } from "@/lib/db"
import { supportTickets, supportTicketResponses } from "@/lib/db/schema"
import { eq, and } from "drizzle-orm"
import { requireUserId, isAuthError } from "@/lib/auth/require-user"

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const userId = await requireUserId()
  if (isAuthError(userId)) return userId

  const { id } = await params
  const ticket = await db.query.supportTickets.findFirst({
    where: and(eq(supportTickets.id, id), eq(supportTickets.userId, userId)),
  })
  if (!ticket) {
    return NextResponse.json({ error: "Ticket not found" }, { status: 404 })
  }

  const responses = await db.query.supportTicketResponses.findMany({
    where: eq(supportTicketResponses.ticketId, id),
    orderBy: (r, { asc }) => [asc(r.createdAt)],
  })

  return NextResponse.json({ ...ticket, responses })
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const userId = await requireUserId()
  if (isAuthError(userId)) return userId

  const { id } = await params
  const ticket = await db.query.supportTickets.findFirst({
    where: and(eq(supportTickets.id, id), eq(supportTickets.userId, userId)),
  })
  if (!ticket) {
    return NextResponse.json({ error: "Ticket not found" }, { status: 404 })
  }

  const { status } = await request.json()
  const allowed = ["open", "in_progress", "resolved", "closed"]
  if (!allowed.includes(status)) {
    return NextResponse.json({ error: "Invalid status" }, { status: 400 })
  }

  const [updated] = await db
    .update(supportTickets)
    .set({ status, updatedAt: new Date() })
    .where(eq(supportTickets.id, id))
    .returning()

  return NextResponse.json(updated)
}
