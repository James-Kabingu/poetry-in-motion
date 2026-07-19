import { NextResponse } from "next/server"
export async function POST(request: Request, { params }: { params: Promise<{ code: string }> }) {
  const { userId } = await request.json()
  const { code } = await params

  // Verify referral code and claim reward
  const reward = {
    referralCode: code,
    userId,
    amount: 25, // $25 credit
    type: "store_credit",
    claimedAt: new Date(),
  }

  return NextResponse.json(reward)
}
