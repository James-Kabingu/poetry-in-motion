import { type NextRequest, NextResponse } from "next/server"
import { mockCreators } from "@/lib/mock-data"

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const creator = mockCreators[(await params).id]

    if (!creator) {
      return NextResponse.json({ error: "Creator not found" }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      data: creator,
    })
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch creator" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const creator = mockCreators[(await params).id]

    if (!creator) {
      return NextResponse.json({ error: "Creator not found" }, { status: 404 })
    }

    const updates = await request.json()

    const updatedCreator = {
      ...creator,
      ...updates,
    }

    mockCreators[(await params).id] = updatedCreator

    return NextResponse.json({
      success: true,
      data: updatedCreator,
    })
  } catch (error) {
    return NextResponse.json({ error: "Failed to update creator" }, { status: 500 })
  }
}
