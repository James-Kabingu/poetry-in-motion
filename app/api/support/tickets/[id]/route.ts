import { NextResponse } from "next/server"
import { requireUserId, isAuthError } from "@/lib/auth/require-user"
import { supportTicketStore } from "@/lib/store"

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const userId = await requireUserId()
  if (isAuthError(userId)) return userId

  const { id } = await params
  const ticket = supportTicketStore[id]
  if (!ticket || ticket.userId !== userId) {
    return NextResponse.json({ error: "Ticket not found" }, { status: 404 })
  }

  return NextResponse.json(ticket)
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const userId = await requireUserId()
  if (isAuthError(userId)) return userId

  const { id } = await params
  const ticket = supportTicketStore[id]
  if (!ticket || ticket.userId !== userId) {
    return NextResponse.json({ error: "Ticket not found" }, { status: 404 })
  }

  const { status } = await request.json()
  const updated = { ...ticket, status, updatedAt: new Date() }
  supportTicketStore[id] = updated

  return NextResponse.json(updated)
}
