import { type NextRequest, NextResponse } from "next/server"
import { mockCollections } from "@/lib/mock-data"
import type { Collection } from "@/lib/types"

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const creatorId = searchParams.get("creatorId")
    const status = searchParams.get("status")

    let collections = Object.values(mockCollections)

    if (creatorId) {
      collections = collections.filter((c) => c.creatorId === creatorId)
    }

    if (status) {
      collections = collections.filter((c) => c.status === status)
    }

    return NextResponse.json({
      success: true,
      data: collections,
    })
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch collections" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const { creatorId, name, description, products } = await request.json()

    if (!creatorId || !name || !description) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const newCollection: Collection = {
      id: `col-${Date.now()}`,
      creatorId,
      name,
      description,
      products: products || [],
      votes: 0,
      status: "draft",
      createdAt: new Date(),
    }

    mockCollections[newCollection.id] = newCollection

    return NextResponse.json(
      {
        success: true,
        data: newCollection,
      },
      { status: 201 },
    )
  } catch (error) {
    return NextResponse.json({ error: "Failed to create collection" }, { status: 500 })
  }
}
