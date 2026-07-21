import "server-only"
import { NextResponse } from "next/server"
import { getSession } from "@/lib/auth/session"

/**
 * Resolves the current user's id from the verified session cookie —
 * never from client-supplied headers/params, which can be spoofed.
 * Returns a 401 NextResponse if there is no valid session.
 */
export async function requireUserId(): Promise<string | NextResponse> {
  const session = await getSession()
  if (!session) {
    return NextResponse.json({ error: "Authentication required" }, { status: 401 })
  }
  return session.userId
}

/** Type guard for call sites: `if (isAuthError(userId)) return userId` */
export function isAuthError(value: string | NextResponse): value is NextResponse {
  return value instanceof NextResponse
}
