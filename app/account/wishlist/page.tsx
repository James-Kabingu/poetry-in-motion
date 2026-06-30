"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ShoppingBag, X } from "lucide-react"
import { useCart } from "@/lib/cart-context"

interface WishlistItem {
  id: number
  name: string
  creator: string
  price: number
  originalPrice: number | null
  category: string
  inStock: boolean
  image: string
}

const initialWishlist: WishlistItem[] = [
  {
    id: 1,
    name: "Afro-Fusion Linen Blazer",
    creator: "Zawadi Designs",
    price: 8500,
    originalPrice: 11000,
    category: "Clothing",
    inStock: true,
    image: "/images/categories/clothing.png",
  },
  {
    id: 2,
    name: "Handwoven Tote Bag",
    creator: "Mama Pima Studios",
    price: 3200,
    originalPrice: null,
    category: "Bags",
    inStock: true,
    image: "/images/categories/bags.png",
  },
  {
    id: 3,
    name: "Beaded Leather Sandals",
    creator: "Jua Kali Craft",
    price: 5600,
    originalPrice: 6000,
    category: "Shoes",
    inStock: false,
    image: "/images/categories/shoes.png",
  },
]

const formatKES = (amount: number) => `KES ${amount.toLocaleString()}`

export default function WishlistPage() {
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>(initialWishlist)
  const { addItem } = useCart()
  const [addedId, setAddedId] = useState<number | null>(null)

  const removeItem = (id: number) => {
    setWishlistItems((prev) => prev.filter((item) => item.id !== id))
  }

  const handleAddToCart = (item: WishlistItem) => {
    if (!item.inStock) return
    addItem({
      id: `wishlist-${item.id}`,
      name: item.name,
      price: item.price / 130, // convert KES to USD baseline used by cart context
      image: item.image,
      color: "Default",
      size: "One Size",
      category: item.category,
    })
    setAddedId(item.id)
    setTimeout(() => setAddedId(null), 1500)
  }

  const handleAddAllToCart = () => {
    wishlistItems.filter((i) => i.inStock).forEach((item) => handleAddToCart(item))
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-[#1a1108] dark:text-[#faf8f5]">
          Wishlist <span className="text-[#a89070] font-normal text-lg">({wishlistItems.length})</span>
        </h1>
        {wishlistItems.length > 0 && (
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

      {wishlistItems.length === 0 ? (
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
          {wishlistItems.map((item) => (
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
                <p className="text-xs text-[#c9a84c] mb-1">{item.creator}</p>
                <p className="font-semibold text-sm text-[#1a1108] dark:text-[#faf8f5] mb-2 leading-snug">{item.name}</p>
                <div className="flex items-center gap-2 mb-3">
                  <span className="font-bold text-[#3d2c1e] dark:text-[#faf8f5]">{formatKES(item.price)}</span>
                  {item.originalPrice && (
                    <span className="text-xs text-[#a89070] line-through">{formatKES(item.originalPrice)}</span>
                  )}
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
