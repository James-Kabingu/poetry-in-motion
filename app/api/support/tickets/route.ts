import { NextResponse } from "next/server"
import { db } from "@/lib/db"
import { supportTickets } from "@/lib/db/schema"
import { eq } from "drizzle-orm"
import { requireUserId, isAuthError } from "@/lib/auth/require-user"

export async function POST(request: Request) {
  const userId = await requireUserId()
  if (isAuthError(userId)) return userId

  const { subject, description, category, priority } = await request.json()
  if (!subject) {
    return NextResponse.json({ error: "Subject is required" }, { status: 400 })
  }

  const [ticket] = await db
    .insert(supportTickets)
    .values({ userId, subject, description, category, priority: priority || "medium", status: "open" })
    .returning()

  return NextResponse.json(ticket)
}

export async function GET(request: Request) {
  const userId = await requireUserId()
  if (isAuthError(userId)) return userId

  const tickets = await db.query.supportTickets.findMany({
    where: eq(supportTickets.userId, userId),
    orderBy: (t, { desc }) => [desc(t.createdAt)],
  })
  return NextResponse.json(tickets)
}
