import { type NextRequest, NextResponse } from "next/server"
import { mockProducts } from "@/lib/mock-data"

export async function POST(request: NextRequest) {
  try {
    const { styleProfile, limit = 6 } = await request.json()

    if (!styleProfile) {
      return NextResponse.json({ error: "Style profile is required" }, { status: 400 })
    }

    const products = Object.values(mockProducts)

    // Score products based on style profile match
    const scoredProducts = products.map((product) => {
      let score = 0

      // Match by style preferences
      if (styleProfile.stylePreferences) {
        const categoryMatch = styleProfile.stylePreferences.some((pref: string) =>
          product.category.toLowerCase().includes(pref.toLowerCase()),
        )
        if (categoryMatch) score += 30
      }

      // Match by favorite colors
      if (styleProfile.favoriteColors) {
        const colorMatch = product.colors.some((color) => styleProfile.favoriteColors.includes(color))
        if (colorMatch) score += 25
      }

      // Match by budget
      if (styleProfile.budget && product.price <= styleProfile.budget) {
        score += 20
      }

      // Match by rating (higher rated products score higher)
      score += product.rating * 5

      return { ...product, matchPercentage: Math.min(score, 100) }
    })

    // Sort by match percentage and return top results
    const recommendations = scoredProducts.sort((a, b) => b.matchPercentage - a.matchPercentage).slice(0, limit)

    return NextResponse.json({
      success: true,
      data: recommendations,
    })
  } catch (error) {
    return NextResponse.json({ error: "Failed to generate recommendations" }, { status: 500 })
  }
}
