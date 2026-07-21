import { NextResponse } from "next/server"
import { requireUserId, isAuthError } from "@/lib/auth/require-user"
import { referralStore, referralRewardStore } from "@/lib/store"

export async function POST(request: Request, { params }: { params: Promise<{ code: string }> }) {
  const userId = await requireUserId()
  if (isAuthError(userId)) return userId

  const { code } = await params
  const referral = referralStore[code]
  if (!referral) {
    return NextResponse.json({ error: "Referral code not found" }, { status: 404 })
  }
  if (referral.status === "completed") {
    return NextResponse.json({ error: "Referral already claimed" }, { status: 409 })
  }

  referral.status = "completed"
  const rewardAmount = 25
  referralRewardStore[referral.referrerId] = (referralRewardStore[referral.referrerId] || 0) + rewardAmount

  const reward = {
    referralCode: code,
    userId,
    amount: rewardAmount,
    type: "store_credit",
    claimedAt: new Date(),
  }

  return NextResponse.json(reward)
}
