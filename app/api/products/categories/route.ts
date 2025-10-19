import { NextResponse } from "next/server"
import { mockProducts } from "@/lib/mock-data"

export async function GET() {
  try {
    const categories = [...new Set(Object.values(mockProducts).map((p) => p.category))]

    return NextResponse.json({
      success: true,
      data: categories,
    })
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch categories" }, { status: 500 })
  }
}
