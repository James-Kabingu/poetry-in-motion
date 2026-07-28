import { type NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"
import { products } from "@/lib/db/schema"
import { eq } from "drizzle-orm"

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const product = await db.query.products.findFirst({ where: eq(products.id, id) })

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      data: {
        id: product.id,
        name: product.name,
        description: product.description,
        price: product.priceCents / 100,
        currency: product.currency,
        image: Array.isArray(product.images) && product.images.length > 0 ? product.images[0] : "",
        images: product.images,
        colors: product.colors,
        sizes: product.sizes,
        rating: product.rating / 10,
        reviews: product.reviews,
        inStock: product.inStock,
        stock: product.stock,
        aiInsight: product.aiInsight,
      },
    })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: "Failed to fetch product" }, { status: 500 })
  }
}
