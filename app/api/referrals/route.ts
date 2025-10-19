// Referral program management
const referrals: Record<string, any> = {}
const referralRewards: Record<string, number> = {}

export async function POST(request: Request) {
  const { referrerId, referredEmail } = await request.json()

  if (!referrerId || !referredEmail) {
    return Response.json({ error: "Missing required fields" }, { status: 400 })
  }

  const referralCode = `REF_${referrerId}_${Date.now()}`
  const referral = {
    id: referralCode,
    referrerId,
    referredEmail,
    status: "pending",
    createdAt: new Date(),
    reward: 0,
  }

  referrals[referralCode] = referral
  return Response.json(referral)
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const referrerId = searchParams.get("referrerId")

  if (!referrerId) {
    return Response.json({ error: "Missing referrerId" }, { status: 400 })
  }

  const userReferrals = Object.values(referrals).filter((r: any) => r.referrerId === referrerId)
  const totalRewards = referralRewards[referrerId] || 0
  const completedReferrals = userReferrals.filter((r: any) => r.status === "completed").length

  return Response.json({
    referrals: userReferrals,
    totalRewards,
    completedReferrals,
    referralCode: `STYLE_${referrerId}`,
  })
}
