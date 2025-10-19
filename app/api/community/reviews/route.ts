import { type NextRequest, NextResponse } from "next/server"

// In-memory storage for product reviews
const reviews: Record<string, any[]> = {}

export async function GET(request: NextRequest) {
  try {
    const productId = request.nextUrl.searchParams.get("productId")

    if (!productId) {
      return NextResponse.json({ error: "Product ID is required" }, { status: 400 })
    }

    const productReviews = reviews[productId] || []

    return NextResponse.json({
      success: true,
      data: productReviews,
    })
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch reviews" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const userId = request.headers.get("x-user-id")
    const { productId, rating, title, content, bodyType, skinTone } = await request.json()

    if (!userId || !productId || !rating) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    if (!reviews[productId]) {
      reviews[productId] = []
    }

    const newReview = {
      id: `review-${Date.now()}`,
      userId,
      productId,
      rating,
      title,
      content,
      bodyType,
      skinTone,
      helpful: 0,
      createdAt: new Date(),
    }

    reviews[productId].push(newReview)

    return NextResponse.json(
      {
        success: true,
        data: newReview,
      },
      { status: 201 },
    )
  } catch (error) {
    return NextResponse.json({ error: "Failed to create review" }, { status: 500 })
  }
}
