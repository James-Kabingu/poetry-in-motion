import { NextResponse } from "next/server"
import { db } from "@/lib/db"
import { referrals } from "@/lib/db/schema"
import { eq } from "drizzle-orm"
import { requireUserId, isAuthError } from "@/lib/auth/require-user"

const REWARD_CENTS = 2500

export async function POST(request: Request, { params }: { params: Promise<{ code: string }> }) {
  const userId = await requireUserId()
  if (isAuthError(userId)) return userId

  const { code } = await params
  const referral = await db.query.referrals.findFirst({ where: eq(referrals.id, code) })
  if (!referral) {
    return NextResponse.json({ error: "Referral not found" }, { status: 404 })
  }
  if (referral.status === "completed") {
    return NextResponse.json({ error: "Referral already claimed" }, { status: 409 })
  }

  await db.update(referrals).set({ status: "completed", rewardCents: REWARD_CENTS }).where(eq(referrals.id, code))

  return NextResponse.json({
    referralCode: code,
    userId,
    amount: REWARD_CENTS / 100,
    type: "store_credit",
    claimedAt: new Date(),
  })
}
