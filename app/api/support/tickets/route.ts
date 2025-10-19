// Support ticket management
const supportTickets: Record<string, any> = {}

export async function POST(request: Request) {
  const { userId, subject, description, category, priority } = await request.json()

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

  supportTickets[ticket.id] = ticket
  return Response.json(ticket)
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const userId = searchParams.get("userId")

  if (!userId) {
    return Response.json({ error: "Missing userId" }, { status: 400 })
  }

  const userTickets = Object.values(supportTickets).filter((t: any) => t.userId === userId)
  return Response.json(userTickets)
}
