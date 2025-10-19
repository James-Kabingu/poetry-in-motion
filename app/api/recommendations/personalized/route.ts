import { type NextRequest, NextResponse } from "next/server"
import { mockProducts } from "@/lib/mock-data"

export async function GET(request: NextRequest) {
  try {
    const userId = request.headers.get("x-user-id")
    const limit = request.nextUrl.searchParams.get("limit") || "6"

    if (!userId) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 })
    }

    // In real app, fetch user's style profile from database
    // For now, use mock data
    const products = Object.values(mockProducts)

    // Score products based on various factors
    const scoredProducts = products.map((product) => {
      let score = 0

      // Base score from rating
      score += product.rating * 10

      // Popularity score
      score += Math.min(product.reviews / 10, 20)

      // Sustainability bonus
      if (product.sustainability) {
        score += 15
      }

      // Creator bonus (verified creators)
      if (product.creatorId) {
        score += 10
      }

      // Stock availability bonus
      if (product.inStock) {
        score += 5
      }

      return { ...product, aiScore: score }
    })

    // Sort by AI score and return top results
    const recommendations = scoredProducts.sort((a, b) => b.aiScore - a.aiScore).slice(0, Number(limit))

    return NextResponse.json({
      success: true,
      data: recommendations,
      algorithm: "collaborative-filtering-v1",
    })
  } catch (error) {
    return NextResponse.json({ error: "Failed to generate recommendations" }, { status: 500 })
  }
}
