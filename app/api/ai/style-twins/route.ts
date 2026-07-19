import { NextResponse } from "next/server"
// Find users with similar style profiles
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const userId = searchParams.get("userId")

  if (!userId) {
    return NextResponse.json({ error: "Missing userId" }, { status: 400 })
  }

  // Mock style twins
  const styleTwins = [
    {
      id: "user_456",
      name: "Amara K.",
      similarity: 0.94,
      sharedPreferences: ["minimalist", "sustainable", "neutral colors"],
      mutualFollowers: 12,
      avatar: "/avatar-1.jpg",
    },
    {
      id: "user_789",
      name: "Zainab M.",
      similarity: 0.88,
      sharedPreferences: ["trendy", "bold colors", "statement pieces"],
      mutualFollowers: 8,
      avatar: "/avatar-2.jpg",
    },
  ]

  return NextResponse.json(styleTwins)
}
