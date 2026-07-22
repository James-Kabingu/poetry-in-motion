"use client"

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react"

export interface CartItem {
  id: string
  name: string
  price: number
  image: string
  color: string
  size: string
  quantity: number
  category: string
}

interface CartContextType {
  items: CartItem[]
  loading: boolean
  addItem: (item: Omit<CartItem, "quantity"> & { quantity?: number }) => Promise<void>
  removeItem: (id: string, color: string, size: string) => Promise<void>
  updateQuantity: (id: string, color: string, size: string, quantity: number) => Promise<void>
  clearCart: () => void
  refreshCart: () => Promise<void>
  totalItems: number
  totalPrice: number
}

const CartContext = createContext<CartContextType | null>(null)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [loading, setLoading] = useState(true)

  const refreshCart = useCallback(async () => {
    try {
      const res = await fetch("/api/cart")
      if (res.status === 401) {
        // not logged in — cart is empty client-side, nothing to show
        setItems([])
        return
      }
      const json = await res.json()
      if (json.success) setItems(json.data)
    } catch {
      // network issue — keep whatever's currently shown rather than clearing it
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    refreshCart()
  }, [refreshCart])

  const addItem = async (newItem: Omit<CartItem, "quantity"> & { quantity?: number }) => {
    const res = await fetch("/api/cart", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        productId: newItem.id,
        quantity: newItem.quantity ?? 1,
        color: newItem.color,
        size: newItem.size,
      }),
    })
    if (res.status === 401) {
      throw new Error("Please sign in to add items to your cart.")
    }
    const json = await res.json()
    if (json.success) setItems(json.data)
  }

  const removeItem = async (id: string, color: string, size: string) => {
    const res = await fetch("/api/cart", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId: id, color, size }),
    })
    const json = await res.json()
    if (json.success) setItems(json.data)
  }

  const updateQuantity = async (id: string, color: string, size: string, quantity: number) => {
    const res = await fetch("/api/cart", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId: id, color, size, quantity }),
    })
    const json = await res.json()
    if (json.success) setItems(json.data)
  }

  // Local-only clear for the checkout success screen — the server side is
  // already cleared by POST /api/orders, so this just resets what's shown.
  const clearCart = () => setItems([])

  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0)
  const totalPrice = items.reduce((sum, i) => sum + i.price * i.quantity, 0)

  return (
    <CartContext.Provider
      value={{ items, loading, addItem, removeItem, updateQuantity, clearCart, refreshCart, totalItems, totalPrice }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error("useCart must be used inside CartProvider")
  return ctx
}
