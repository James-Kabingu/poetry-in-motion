import { NextResponse } from "next/server"
import { mockProducts } from "@/lib/mock-data"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get("q") || ""
  const category = searchParams.get("category")
  const minPrice = Number.parseFloat(searchParams.get("minPrice") || "0")
  const maxPrice = Number.parseFloat(searchParams.get("maxPrice") || "999")
  const colors = searchParams.getAll("colors")
  const sizes = searchParams.getAll("sizes")
  const sortBy = searchParams.get("sortBy") || "relevance"

  let results = Object.values(mockProducts)

  // Text search with relevance scoring
  if (query) {
    results = results
      .map((product) => {
        let score = 0
        const lowerQuery = query.toLowerCase()

        if (product.name.toLowerCase().includes(lowerQuery)) score += 10
        if (product.description.toLowerCase().includes(lowerQuery)) score += 5
        if (product.category.toLowerCase().includes(lowerQuery)) score += 3

        return { product, score }
      })
      .filter((item) => item.score > 0)
      .sort((a, b) => b.score - a.score)
      .map((item) => item.product)
  }

  // Category filter
  if (category) {
    results = results.filter((p) => p.category.toLowerCase() === category.toLowerCase())
  }

  // Price range filter
  results = results.filter((p) => p.price >= minPrice && p.price <= maxPrice)

  // Color filter
  if (colors.length > 0) {
    results = results.filter((p) => colors.some((c) => p.colors.includes(c)))
  }

  // Size filter
  if (sizes.length > 0) {
    results = results.filter((p) => sizes.some((s) => p.sizes.includes(s)))
  }

  // Sorting
  switch (sortBy) {
    case "price-low":
      results.sort((a, b) => a.price - b.price)
      break
    case "price-high":
      results.sort((a, b) => b.price - a.price)
      break
    case "rating":
      results.sort((a, b) => b.rating - a.rating)
      break
    case "newest":
      results.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      break
    case "trending":
      results.sort((a, b) => b.reviews - a.reviews)
      break
  }

  return NextResponse.json({
    results,
    total: results.length,
    filters: {
      query,
      category,
      priceRange: { min: minPrice, max: maxPrice },
      colors,
      sizes,
      sortBy,
    },
  })
}
