import { NextResponse } from "next/server"
export async function PUT(request: Request, { params }: { params: Promise<{ userId: string }> }) {
  const { tier } = await request.json()
  const { userId } = await params

  // Update subscription tier
  const subscription = {
    userId,
    tier,
    status: "active",
    updatedAt: new Date(),
  }

  return NextResponse.json(subscription)
}

export async function DELETE(request: Request, { params }: { params: Promise<{ userId: string }> }) {
  const { userId } = await params

  // Cancel subscription
  return NextResponse.json({ message: "Subscription cancelled", userId })
}
