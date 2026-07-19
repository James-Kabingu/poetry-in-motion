import { NextResponse } from "next/server"
export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { userId } = await request.json()
  const { id } = await params

  // Add user to session participants
  return NextResponse.json({
    sessionId: id,
    userId,
    joinedAt: new Date(),
    status: "joined",
  })
}
