import { mockProducts } from "@/lib/mock-data"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get("q") || ""

  if (!query || query.length < 2) {
    return Response.json({ suggestions: [] })
  }

  const lowerQuery = query.toLowerCase()

  // Get unique suggestions from products
  const suggestions = new Set<string>()

  mockProducts.forEach((product) => {
    if (product.name.toLowerCase().includes(lowerQuery)) {
      suggestions.add(product.name)
    }
    if (product.category.toLowerCase().includes(lowerQuery)) {
      suggestions.add(product.category)
    }
    product.colors.forEach((color) => {
      if (color.toLowerCase().includes(lowerQuery)) {
        suggestions.add(color)
      }
    })
  })

  // Add trending searches
  const trendingSearches = [
    "oversized blazer",
    "vintage denim",
    "minimalist style",
    "statement jacket",
    "sustainable fashion",
  ]
  trendingSearches.forEach((search) => {
    if (search.includes(lowerQuery)) {
      suggestions.add(search)
    }
  })

  return Response.json({
    suggestions: Array.from(suggestions).slice(0, 10),
  })
}
