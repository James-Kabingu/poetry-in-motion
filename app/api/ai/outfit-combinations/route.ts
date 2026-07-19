import { NextResponse } from "next/server"
// AI-powered outfit combination suggestions
export async function POST(request: Request) {
  const { productIds, occasion } = await request.json()

  if (!productIds || productIds.length === 0) {
    return NextResponse.json({ error: "No products provided" }, { status: 400 })
  }

  // Mock outfit combinations
  const combinations = [
    {
      id: "combo_1",
      products: productIds.slice(0, 3),
      occasion,
      score: 0.95,
      reason: "Perfect color coordination and style balance",
      tips: ["Layer the blazer over the tee", "Add statement jewelry"],
    },
    {
      id: "combo_2",
      products: productIds.slice(1, 4),
      occasion,
      score: 0.87,
      reason: "Great texture mix with complementary silhouettes",
      tips: ["Tuck in the shirt for a polished look"],
    },
  ]

  return NextResponse.json(combinations)
}
