import { products, Product } from "@/lib/products"

export interface SearchResult extends Product {
  matchType: "text" | "image"
  matchConfidence?: number
}

/**
 * Text-based product search.
 * Currently does local name/category matching against the shared product catalog.
 * Future: swap internals to call a real search API/index without changing the signature.
 */
export async function searchByText(query: string): Promise<SearchResult[]> {
  if (!query.trim()) return []
  const q = query.toLowerCase()
  return products
    .filter((p) => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q))
    .map((p) => ({ ...p, matchType: "text" as const }))
}

/**
 * Image-based product search (reverse image / visual search).
 * Placeholder until SnapFind integration is wired in.
 * Future: send `imageFile` to SnapFind's API, map response into SearchResult[]
 * with real matchConfidence scores.
 */
export async function searchByImage(imageFile: File): Promise<SearchResult[]> {
  // TODO: integrate SnapFind here.
  console.warn("searchByImage called but SnapFind is not yet integrated:", imageFile.name)
  return []
}
