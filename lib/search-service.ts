import { products, getProductById, Product } from "@/lib/products"
import { callSnapFind, isSnapFindConfigured } from "@/lib/snapfind-adapter"

export interface SearchResult extends Product {
  matchType: "text" | "image"
  matchConfidence?: number
}

/**
 * Text-based product search.
 *
 * If SnapFind is configured, this calls SnapFind's text-to-image search
 * (semantic matching, e.g. "red ankara dress" finds visually/conceptually
 * similar items, not just keyword matches) and maps results back to the
 * local product catalog by itemId.
 *
 * If SnapFind is not configured (current default), falls back to a simple
 * local name/category substring match against lib/products.ts.
 */
export async function searchByText(query: string): Promise<SearchResult[]> {
  if (!query.trim()) return []

  if (isSnapFindConfigured()) {
    const matches = await callSnapFind({ mode: "text", query, k: 20 })
    return matches.reduce<SearchResult[]>((acc, m) => {
      const product = getProductById(m.itemId)
      if (product) {
        acc.push({ ...product, matchType: "text" as const, matchConfidence: m.score })
      }
      return acc
    }, [])
  }

  // Fallback: local substring match
  const q = query.toLowerCase()
  return products
    .filter((p) => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q))
    .map((p) => ({ ...p, matchType: "text" as const }))
}

/**
 * Image-based product search (reverse image / visual search).
 *
 * If SnapFind is configured, sends the uploaded image to SnapFind's
 * image-to-image search and maps results back to the local catalog.
 *
 * If SnapFind is not configured, returns an empty array — there is no
 * local fallback for image search, since that capability does not exist
 * without SnapFind. The UI should show a "coming soon" state in this case.
 */
export async function searchByImage(imageFile: File): Promise<SearchResult[]> {
  if (!isSnapFindConfigured()) {
    console.warn("searchByImage called but SnapFind is not yet configured:", imageFile.name)
    return []
  }

  const matches = await callSnapFind({ mode: "image", imageFile, k: 20 })
  return matches.reduce<SearchResult[]>((acc, m) => {
    const product = getProductById(m.itemId)
    if (product) {
      acc.push({ ...product, matchType: "image" as const, matchConfidence: m.score })
    }
    return acc
  }, [])
}
