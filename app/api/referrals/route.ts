import { NextResponse } from "next/server"
import { db } from "@/lib/db"
import { referrals } from "@/lib/db/schema"
import { eq } from "drizzle-orm"
import { requireUserId, isAuthError } from "@/lib/auth/require-user"

export async function POST(request: Request) {
  const userId = await requireUserId()
  if (isAuthError(userId)) return userId

  const { referredEmail } = await request.json()
  if (!referredEmail) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
  }

  const [referral] = await db.insert(referrals).values({ referrerId: userId, referredEmail, status: "pending" }).returning()
  return NextResponse.json(referral)
}

export async function GET(request: Request) {
  const userId = await requireUserId()
  if (isAuthError(userId)) return userId

  const userReferrals = await db.query.referrals.findMany({ where: eq(referrals.referrerId, userId) })
  const totalRewardsCents = userReferrals.reduce((sum, r) => sum + r.rewardCents, 0)
  const completedReferrals = userReferrals.filter((r) => r.status === "completed").length

  return NextResponse.json({
    referrals: userReferrals,
    totalRewards: totalRewardsCents / 100,
    completedReferrals,
    referralCode: `STYLE_${userId}`,
  })
}
