import { type NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"
import { products } from "@/lib/db/schema"
import { and, gte, lte, or, ilike } from "drizzle-orm"

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const minPrice = searchParams.get("minPrice")
    const maxPrice = searchParams.get("maxPrice")
    const search = searchParams.get("search")
    // NOTE: `category` is intentionally not filtered here. The real `products`
    // table has no `category` column — only the static catalog in
    // lib/products.ts does. Filtering by category against Postgres would need
    // a schema migration (add `category` column) + a backfill from that
    // static catalog before this can work. No current caller passes
    // `?category=`, so this is a known gap rather than a regression.

    const conditions = []
    if (minPrice) conditions.push(gte(products.priceCents, Math.round(Number(minPrice) * 100)))
    if (maxPrice) conditions.push(lte(products.priceCents, Math.round(Number(maxPrice) * 100)))
    if (search) {
      const term = `%${search}%`
      conditions.push(or(ilike(products.name, term), ilike(products.description, term)))
    }

    const rows = await db
      .select()
      .from(products)
      .where(conditions.length ? and(...conditions) : undefined)

    const data = rows.map((p) => ({
      id: p.id,
      name: p.name,
      description: p.description,
      price: p.priceCents / 100,
      currency: p.currency,
      image: Array.isArray(p.images) && p.images.length > 0 ? p.images[0] : "",
      images: p.images,
      colors: p.colors,
      sizes: p.sizes,
      rating: p.rating / 10,
      reviews: p.reviews,
      inStock: p.inStock,
      stock: p.stock,
      aiInsight: p.aiInsight,
    }))

    return NextResponse.json({ success: true, data, total: data.length })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 })
  }
}
