import { NextResponse } from "next/server"
import { requireUserId, isAuthError } from "@/lib/auth/require-user"
import { referralStore, referralRewardStore } from "@/lib/store"

export async function POST(request: Request) {
  const userId = await requireUserId()
  if (isAuthError(userId)) return userId

  const { referredEmail } = await request.json()
  if (!referredEmail) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
  }

  const referralCode = `REF_${userId}_${Date.now()}`
  const referral = {
    id: referralCode,
    referrerId: userId,
    referredEmail,
    status: "pending",
    createdAt: new Date(),
    reward: 0,
  }

  referralStore[referralCode] = referral
  return NextResponse.json(referral)
}

export async function GET(request: Request) {
  const userId = await requireUserId()
  if (isAuthError(userId)) return userId

  const userReferrals = Object.values(referralStore).filter((r: any) => r.referrerId === userId)
  const totalRewards = referralRewardStore[userId] || 0
  const completedReferrals = userReferrals.filter((r: any) => r.status === "completed").length

  return NextResponse.json({
    referrals: userReferrals,
    totalRewards,
    completedReferrals,
    referralCode: `STYLE_${userId}`,
  })
}
