export interface SearchProduct {
  id: string
  name: string
  price: number
  image: string
  rating: number
  reviews: number
  category: string
}

export interface SearchResult extends SearchProduct {
  matchType: "text" | "image"
  matchConfidence?: number
}

export const allProducts: SearchProduct[] = [
  { id: "1", name: "Oversized Blazer", price: 65, image: "/images/banners/shopping.png", rating: 4.8, reviews: 124, category: "Outerwear" },
  { id: "2", name: "Vintage Denim", price: 55, image: "/images/banners/hero.png", rating: 4.9, reviews: 89, category: "Bottoms" },
  { id: "3", name: "Minimalist Tee", price: 28, image: "/images/banners/shopping.png", rating: 4.7, reviews: 156, category: "Tops" },
  { id: "4", name: "Statement Jacket", price: 85, image: "/images/banners/community.png", rating: 4.9, reviews: 67, category: "Outerwear" },
  { id: "5", name: "Tailored Trousers", price: 72, image: "/images/banners/hero.png", rating: 4.8, reviews: 98, category: "Bottoms" },
  { id: "6", name: "Silk Camisole", price: 45, image: "/images/banners/shopping.png", rating: 4.6, reviews: 112, category: "Tops" },
]

/**
 * Text-based product search.
 * Currently does local name/category matching.
 * Future: swap internals to call a real search API/index without changing the signature.
 */
export async function searchByText(query: string): Promise<SearchResult[]> {
  if (!query.trim()) return []
  const q = query.toLowerCase()
  return allProducts
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
  // Example future shape:
  // const formData = new FormData()
  // formData.append("image", imageFile)
  // const res = await fetch(SNAPFIND_API_URL, { method: "POST", body: formData })
  // const data = await res.json()
  // return data.matches.map(...)
  console.warn("searchByImage called but SnapFind is not yet integrated:", imageFile.name)
  return []
}
