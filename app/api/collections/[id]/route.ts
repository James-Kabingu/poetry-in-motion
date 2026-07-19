import { type NextRequest, NextResponse } from "next/server"
import { mockCollections } from "@/lib/mock-data"

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const collection = mockCollections[id]

    if (!collection) {
      return NextResponse.json({ error: "Collection not found" }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      data: collection,
    })
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch collection" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const collection = mockCollections[id]

    if (!collection) {
      return NextResponse.json({ error: "Collection not found" }, { status: 404 })
    }

    const updates = await request.json()

    const updatedCollection = {
      ...collection,
      ...updates,
    }

    mockCollections[id] = updatedCollection

    return NextResponse.json({
      success: true,
      data: updatedCollection,
    })
  } catch (error) {
    return NextResponse.json({ error: "Failed to update collection" }, { status: 500 })
  }
}
