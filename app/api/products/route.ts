import { type NextRequest, NextResponse } from "next/server"
import { mockProducts } from "@/lib/mock-data"

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const category = searchParams.get("category")
    const minPrice = searchParams.get("minPrice")
    const maxPrice = searchParams.get("maxPrice")
    const search = searchParams.get("search")

    let products = Object.values(mockProducts)

    // Filter by category
    if (category) {
      products = products.filter((p) => p.category === category)
    }

    // Filter by price range
    if (minPrice) {
      products = products.filter((p) => p.price >= Number(minPrice))
    }
    if (maxPrice) {
      products = products.filter((p) => p.price <= Number(maxPrice))
    }

    // Search by name or description
    if (search) {
      const searchLower = search.toLowerCase()
      products = products.filter(
        (p) => p.name.toLowerCase().includes(searchLower) || p.description.toLowerCase().includes(searchLower),
      )
    }

    return NextResponse.json({
      success: true,
      data: products,
      total: products.length,
    })
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 })
  }
}
