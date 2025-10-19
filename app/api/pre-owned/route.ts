import { type NextRequest, NextResponse } from "next/server"
import type { PreOwnedListing } from "@/lib/types"

// In-memory storage for pre-owned listings
const preOwnedListings: Record<string, PreOwnedListing> = {}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const status = searchParams.get("status") || "available"

    const listings = Object.values(preOwnedListings).filter((l) => l.status === status)

    return NextResponse.json({
      success: true,
      data: listings,
    })
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch pre-owned listings" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const userId = request.headers.get("x-user-id")
    const { originalProductId, condition, price, images } = await request.json()

    if (!userId || !originalProductId || !condition || !price) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const newListing: PreOwnedListing = {
      id: `preowned-${Date.now()}`,
      originalProductId,
      sellerId: userId,
      condition: condition as "like-new" | "good" | "fair",
      price,
      images: images || [],
      status: "available",
      createdAt: new Date(),
    }

    preOwnedListings[newListing.id] = newListing

    return NextResponse.json(
      {
        success: true,
        data: newListing,
      },
      { status: 201 },
    )
  } catch (error) {
    return NextResponse.json({ error: "Failed to create pre-owned listing" }, { status: 500 })
  }
}
