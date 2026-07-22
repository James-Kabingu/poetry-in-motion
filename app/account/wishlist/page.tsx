"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ShoppingBag, X } from "lucide-react"
import { useCart } from "@/lib/cart-context"
import { getProductById, type Product } from "@/lib/products"

export default function WishlistPage() {
  const [productIds, setProductIds] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { addItem } = useCart()
  const [addedId, setAddedId] = useState<string | null>(null)

  useEffect(() => {
    fetch("/api/favorites")
      .then((res) => {
        if (res.status === 401) throw new Error("Please sign in to view your wishlist.")
        return res.json()
      })
      .then((json) => {
        if (json.success) setProductIds(json.data)
      })
      .catch((err) => setError(err instanceof Error ? err.message : "Failed to load wishlist."))
      .finally(() => setLoading(false))
  }, [])

  const wishlistProducts = productIds
    .map((id) => getProductById(id))
    .filter((p): p is Product => Boolean(p))

  const removeItem = async (id: string) => {
    setProductIds((prev) => prev.filter((pid) => pid !== id)) // optimistic
    try {
      await fetch("/api/favorites", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId: id }),
      })
    } catch {
      // revert on failure
      setProductIds((prev) => [...prev, id])
    }
  }

  const handleAddToCart = async (product: Product) => {
    if (!product.inStock) return
    try {
      await addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        color: product.colors?.[0] ?? "Default",
        size: product.sizes?.[0] ?? "One Size",
        category: product.category,
      })
      setAddedId(product.id)
      setTimeout(() => setAddedId(null), 1500)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not add to cart.")
      setTimeout(() => setError(null), 3000)
    }
  }

  const handleAddAllToCart = () => {
    wishlistProducts.filter((p) => p.inStock).forEach((p) => handleAddToCart(p))
  }

  if (loading) {
    return <div className="text-center py-12 text-[#a89070]">Loading wishlist...</div>
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-[#1a1108] dark:text-[#faf8f5]">
          Wishlist <span className="text-[#a89070] font-normal text-lg">({wishlistProducts.length})</span>
        </h1>
        {wishlistProducts.length > 0 && (
          <Button
            variant="outline"
            size="sm"
            onClick={handleAddAllToCart}
            className="rounded-xl border-[#e8e0d4] dark:border-[#2a1f14] text-[#3d2c1e] dark:text-[#faf8f5] hover:border-[#c9a84c] text-sm gap-2"
          >
            <ShoppingBag className="h-3.5 w-3.5" /> Add all to cart
          </Button>
        )}
      </div>

      {error && (
        <div className="rounded-xl border border-destructive/30 bg-destructive/5 px-4 py-2 text-sm text-destructive">
          {error}
        </div>
      )}

      {wishlistProducts.length === 0 ? (
        <div className="bg-white dark:bg-[#1a1108] rounded-2xl border border-[#e8e0d4] dark:border-[#2a1f14] p-12 flex flex-col items-center gap-4">
          <div className="relative h-32 w-32">
            <Image src="/images/illustrations/empty/wishlist.png" alt="Empty wishlist" fill sizes="128px" className="object-contain" />
          </div>
          <p className="font-semibold text-[#1a1108] dark:text-[#faf8f5]">Your wishlist is empty</p>
          <p className="text-sm text-[#a89070] text-center">Save items you love and come back to them anytime.</p>
          <Button asChild className="rounded-xl bg-[#3d2c1e] text-white hover:bg-[#2a1f14] dark:bg-[#c9a84c] dark:text-black mt-2">
            <Link href="/shop">Explore Shop</Link>
          </Button>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {wishlistProducts.map((item) => (
            <div key={item.id} className="bg-white dark:bg-[#1a1108] rounded-2xl border border-[#e8e0d4] dark:border-[#2a1f14] overflow-hidden group hover:border-[#c9a84c]/40 transition">
              {/* Image */}
              <div className="relative h-48 bg-[#faf8f5] dark:bg-[#0e0a06]">
                <Image src={item.image} alt={item.name} fill sizes="(max-width: 640px) 100vw, 33vw" className="object-contain p-4 group-hover:scale-105 transition-transform duration-300" />
                <button
                  onClick={() => removeItem(item.id)}
                  className="absolute top-3 right-3 h-8 w-8 rounded-full bg-white dark:bg-[#1a1108] border border-[#e8e0d4] dark:border-[#2a1f14] flex items-center justify-center hover:border-red-300 hover:text-red-500 transition"
                >
                  <X className="h-3.5 w-3.5 text-[#a89070]" />
                </button>
                {!item.inStock && (
                  <div className="absolute inset-0 bg-[#1a1108]/50 flex items-center justify-center">
                    <span className="text-xs font-semibold text-white bg-[#3d2c1e] px-3 py-1 rounded-full">Out of stock</span>
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="p-4">
                <p className="text-xs text-[#c9a84c] mb-1">{item.category}</p>
                <p className="font-semibold text-sm text-[#1a1108] dark:text-[#faf8f5] mb-2 leading-snug">{item.name}</p>
                <div className="flex items-center gap-2 mb-3">
                  <span className="font-bold text-[#3d2c1e] dark:text-[#faf8f5]">${item.price.toFixed(2)}</span>
                </div>
                <Button
                  disabled={!item.inStock}
                  onClick={() => handleAddToCart(item)}
                  className="w-full rounded-xl bg-[#3d2c1e] text-white hover:bg-[#2a1f14] dark:bg-[#c9a84c] dark:text-black dark:hover:bg-[#b8973b] text-sm disabled:opacity-40 disabled:cursor-not-allowed gap-2"
                >
                  <ShoppingBag className="h-3.5 w-3.5" />
                  {!item.inStock ? "Notify Me" : addedId === item.id ? "Added!" : "Add to Cart"}
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
