import { type NextRequest, NextResponse } from "next/server"
import { mockProducts } from "@/lib/mock-data"

export async function GET(request: NextRequest) {
  try {
    const productId = request.nextUrl.searchParams.get("productId")
    const limit = request.nextUrl.searchParams.get("limit") || "4"

    if (!productId) {
      return NextResponse.json({ error: "Product ID is required" }, { status: 400 })
    }

    const baseProduct = mockProducts[productId]

    if (!baseProduct) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 })
    }

    const products = Object.values(mockProducts).filter((p) => p.id !== productId)

    // Score products based on similarity
    const scoredProducts = products.map((product) => {
      let similarityScore = 0

      // Same category
      if (product.category === baseProduct.category) {
        similarityScore += 30
      }

      // Overlapping colors
      const colorOverlap = product.colors.filter((c) => baseProduct.colors.includes(c)).length
      similarityScore += colorOverlap * 10

      // Similar price range (within 30%)
      const priceDiff = Math.abs(product.price - baseProduct.price)
      if (priceDiff <= baseProduct.price * 0.3) {
        similarityScore += 20
      }

      // Similar rating
      const ratingDiff = Math.abs(product.rating - baseProduct.rating)
      if (ratingDiff <= 0.5) {
        similarityScore += 15
      }

      // Same creator
      if (product.creatorId === baseProduct.creatorId) {
        similarityScore += 25
      }

      return { ...product, similarityScore }
    })

    const similar = scoredProducts.sort((a, b) => b.similarityScore - a.similarityScore).slice(0, Number(limit))

    return NextResponse.json({
      success: true,
      data: similar,
      baseProductId: productId,
    })
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch similar products" }, { status: 500 })
  }
}
