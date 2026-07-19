import { NextResponse } from "next/server"
export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  // Return ticket details
  return NextResponse.json({
    id,
    subject: "Sample ticket",
    status: "open",
    responses: [],
  })
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { status } = await request.json()
  const { id } = await params

  return NextResponse.json({
    id,
    status,
    updatedAt: new Date(),
  })
}
