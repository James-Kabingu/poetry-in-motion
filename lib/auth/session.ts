import "server-only"
import { SignJWT, jwtVerify } from "jose"
import { cookies } from "next/headers"

const SESSION_COOKIE = "pim_session"
const secret = new TextEncoder().encode(process.env.SESSION_SECRET!)
const MAX_AGE = 60 * 60 * 24 * 30 // 30 days

export async function createSession(userId: string) {
  const token = await new SignJWT({ userId })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${MAX_AGE}s`)
    .sign(secret)

  const cookieStore = await cookies()
  cookieStore.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: MAX_AGE,
    path: "/",
  })
}

export async function getSession(): Promise<{ userId: string } | null> {
  const cookieStore = await cookies()
  const token = cookieStore.get(SESSION_COOKIE)?.value
  if (!token) return null

  try {
    const { payload } = await jwtVerify(token, secret)
    return { userId: payload.userId as string }
  } catch {
    return null
  }
}

// Middleware-safe verification: does not use next/headers cookies(),
// so it can run in the Edge runtime. Takes the raw token string.
export async function verifySessionToken(token: string): Promise<{ userId: string } | null> {
  try {
    const { payload } = await jwtVerify(token, secret)
    return { userId: payload.userId as string }
  } catch {
    return null
  }
}

export async function destroySession() {
  const cookieStore = await cookies()
  cookieStore.delete(SESSION_COOKIE)
}
