import { getAnalytics } from "@/lib/analytics"

export async function GET() {
  try {
    const analytics = getAnalytics()
    return Response.json(analytics)
  } catch (error) {
    return Response.json({ error: "Failed to fetch analytics" }, { status: 500 })
  }
}
