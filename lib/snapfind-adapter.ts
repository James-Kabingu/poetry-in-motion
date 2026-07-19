/**
 * SNAPFIND ADAPTER
 * -----------------
 * This file is the ONLY place that should know about SnapFind's API shape.
 * Everything else in the app (search-service.ts, search-context.tsx, the UI)
 * talks to the generic SearchResult type and never imports this directly.
 *
 * CURRENT STATE: stub. Returns empty results. No network calls made.
 *
 * TO GO LIVE:
 * 1. Host SnapFind (uvicorn api.main:app) and get a base URL + API key.
 * 2. Run scripts/build_index.py against this site's real product images
 *    (see lib/products.ts `image` / `images` fields) so the FAISS index
 *    contains Poetry In Motion products, not the sample Unsplash set.
 * 3. Set SNAPFIND_BASE_URL and SNAPFIND_API_KEY as environment variables.
 * 4. Replace the body of `callSnapFind` below with a real fetch() to
 *    SnapFind's hosted API. The request/response shapes are documented
 *    inline below based on the SnapFind SDK (vektasafe/SnapFind).
 *
 * SnapFind's own Python SDK call looks like:
 *   from core import SnapFind
 *   sf = SnapFind(api_key="...", base_url="...")
 *   sf.search(query="red ankara dress", k=10)   # text-to-image
 *   sf.search(image=open("query.jpg","rb"), k=10)  # image-to-image
 *
 * The hosted FastAPI server (api/main.py in that repo) exposes this over
 * HTTP, so from Next.js we POST to its REST endpoint instead of importing
 * Python directly. Exact endpoint path/payload should be confirmed against
 * api/main.py once SnapFind is deployed — the shape below is the expected
 * contract based on the SDK's `.search()` signature and is what this
 * adapter should be updated to match exactly.
 */

export interface SnapFindMatch {
  itemId: string          // should map 1:1 to Product.id in lib/products.ts
  score: number           // similarity score, 0-1, higher = closer match
  imageUrl?: string       // the indexed image SnapFind matched against
}

export interface SnapFindSearchParams {
  mode: "text" | "image"
  query?: string           // required when mode === "text"
  imageFile?: File          // required when mode === "image"
  k?: number                // number of results to return, default 10
}

const SNAPFIND_BASE_URL = process.env.NEXT_PUBLIC_SNAPFIND_BASE_URL ?? ""
const SNAPFIND_API_KEY = process.env.SNAPFIND_API_KEY ?? ""

/**
 * Whether SnapFind is actually configured and reachable.
 * Used by search-service.ts to decide whether to call SnapFind
 * or fall back to local matching.
 */
export function isSnapFindConfigured(): boolean {
  return Boolean(SNAPFIND_BASE_URL && SNAPFIND_API_KEY)
}

/**
 * Calls SnapFind's hosted search API.
 * Returns an empty array if SnapFind is not configured, so callers
 * can safely call this unconditionally and fall back gracefully.
 */
export async function callSnapFind(_params: SnapFindSearchParams): Promise<SnapFindMatch[]> {
  if (!isSnapFindConfigured()) {
    console.warn("SnapFind not configured (missing base URL or API key). Returning no matches.")
    return []
  }

  // --- STUB: replace with real call once SnapFind is hosted ---
  //
  // Expected real implementation (text mode):
  //
  // const res = await fetch(`${SNAPFIND_BASE_URL}/search`, {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //     "Authorization": `Bearer ${SNAPFIND_API_KEY}`,
  //   },
  //   body: JSON.stringify({ query: params.query, k: params.k ?? 10 }),
  // })
  // const data = await res.json()
  // return data.results.map((r: any) => ({
  //   itemId: r.metadata.item_id,
  //   score: r.score,
  //   imageUrl: r.metadata.image_url,
  // }))
  //
  // Expected real implementation (image mode):
  //
  // const formData = new FormData()
  // formData.append("image", params.imageFile!)
  // formData.append("k", String(params.k ?? 10))
  // const res = await fetch(`${SNAPFIND_BASE_URL}/search`, {
  //   method: "POST",
  //   headers: { "Authorization": `Bearer ${SNAPFIND_API_KEY}` },
  //   body: formData,
  // })
  // const data = await res.json()
  // return data.results.map((r: any) => ({
  //   itemId: r.metadata.item_id,
  //   score: r.score,
  //   imageUrl: r.metadata.image_url,
  // }))

  return []
}
