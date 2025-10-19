export async function POST(request: Request, { params }: { params: { id: string } }) {
  const { userId } = await request.json()
  const { id } = params

  // Add user to session participants
  return Response.json({
    sessionId: id,
    userId,
    joinedAt: new Date(),
    status: "joined",
  })
}
