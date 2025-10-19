import { type NextRequest, NextResponse } from "next/server"
import { mockProducts } from "@/lib/mock-data"

export async function GET(request: NextRequest) {
  try {
    const limit = request.nextUrl.searchParams.get("limit") || "6"

    const products = Object.values(mockProducts)

    // Score products based on trending metrics
    const scoredProducts = products.map((product) => {
      let trendScore = 0

      // Recent products score higher
      const daysSinceCreated = Math.floor((Date.now() - product.createdAt.getTime()) / (1000 * 60 * 60 * 24))
      trendScore += Math.max(50 - daysSinceCreated, 0)

      // High review velocity
      trendScore += product.reviews * 2

      // High rating
      trendScore += product.rating * 15

      // In stock items
      if (product.inStock) {
        trendScore += 20
      }

      return { ...product, trendScore }
    })

    const trending = scoredProducts.sort((a, b) => b.trendScore - a.trendScore).slice(0, Number(limit))

    return NextResponse.json({
      success: true,
      data: trending,
      category: "trending",
    })
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch trending products" }, { status: 500 })
  }
}
