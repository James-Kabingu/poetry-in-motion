export async function PUT(request: Request, { params }: { params: { userId: string } }) {
  const { tier } = await request.json()
  const { userId } = params

  // Update subscription tier
  const subscription = {
    userId,
    tier,
    status: "active",
    updatedAt: new Date(),
  }

  return Response.json(subscription)
}

export async function DELETE(request: Request, { params }: { params: { userId: string } }) {
  const { userId } = params

  // Cancel subscription
  return Response.json({ message: "Subscription cancelled", userId })
}
