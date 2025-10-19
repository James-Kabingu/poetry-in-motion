export async function GET(request: Request, { params }: { params: { id: string } }) {
  const { id } = params
  // Return ticket details
  return Response.json({
    id,
    subject: "Sample ticket",
    status: "open",
    responses: [],
  })
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const { status } = await request.json()
  const { id } = params

  return Response.json({
    id,
    status,
    updatedAt: new Date(),
  })
}
