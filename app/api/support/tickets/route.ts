import { NextResponse } from "next/server"
import { requireUserId, isAuthError } from "@/lib/auth/require-user"
import { supportTicketStore } from "@/lib/store"

export async function POST(request: Request) {
  const userId = await requireUserId()
  if (isAuthError(userId)) return userId

  const { subject, description, category, priority } = await request.json()

  const ticket = {
    id: `ticket_${Date.now()}`,
    userId,
    subject,
    description,
    category,
    priority: priority || "medium",
    status: "open",
    createdAt: new Date(),
    updatedAt: new Date(),
    responses: [],
  }

  supportTicketStore[ticket.id] = ticket
  return NextResponse.json(ticket)
}

export async function GET(request: Request) {
  const userId = await requireUserId()
  if (isAuthError(userId)) return userId

  const userTickets = Object.values(supportTicketStore).filter((t: any) => t.userId === userId)
  return NextResponse.json(userTickets)
}
