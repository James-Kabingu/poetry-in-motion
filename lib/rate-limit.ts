// Simple in-memory fixed-window rate limiter.
//
// CAVEAT: state lives in process memory. This works correctly on a single
// long-running server (e.g. `next start` on one machine). It does NOT
// enforce limits correctly across multiple serverless instances (e.g.
// Vercel functions), since each instance has its own memory. If this ever
// deploys to a multi-instance serverless environment, replace this with
// Upstash Redis (or similar shared store) — swap out the `hits` Map below
// for Redis INCR/EXPIRE calls; the checkRateLimit() signature can stay the
// same so callers don't need to change.

interface Bucket {
  count: number
  resetAt: number
}

const hits = new Map<string, Bucket>()

// Periodically clear stale buckets so this Map doesn't grow forever.
setInterval(() => {
  const now = Date.now()
  for (const [key, bucket] of hits) {
    if (bucket.resetAt < now) hits.delete(key)
  }
}, 60_000).unref?.()

export function checkRateLimit(
  key: string,
  limit: number,
  windowMs: number,
): { allowed: boolean; remaining: number; retryAfterSeconds: number } {
  const now = Date.now()
  const bucket = hits.get(key)

  if (!bucket || bucket.resetAt < now) {
    hits.set(key, { count: 1, resetAt: now + windowMs })
    return { allowed: true, remaining: limit - 1, retryAfterSeconds: 0 }
  }

  if (bucket.count >= limit) {
    return { allowed: false, remaining: 0, retryAfterSeconds: Math.ceil((bucket.resetAt - now) / 1000) }
  }

  bucket.count += 1
  return { allowed: true, remaining: limit - bucket.count, retryAfterSeconds: 0 }
}

export function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for")
  if (forwarded) return forwarded.split(",")[0].trim()
  const real = request.headers.get("x-real-ip")
  if (real) return real
  return "unknown"
}
