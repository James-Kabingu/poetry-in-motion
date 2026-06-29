"use client"

import { useCart } from "@/lib/cart-context"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowLeft, Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function CartPage() {
  const { items, removeItem, updateQuantity, totalItems, totalPrice } = useCart()

  const shipping = totalPrice >= 50 ? 0 : 5
  const total = totalPrice + shipping

  if (items.length === 0) {
    return (
      <main className="min-h-screen bg-background">
        <div className="border-b border-border bg-card/50 sticky top-0 z-40">
          <div className="mx-auto max-w-7xl px-4 py-4 lg:px-8">
            <Link href="/shop" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition">
              <ArrowLeft className="h-4 w-4" />
              Continue Shopping
            </Link>
          </div>
        </div>
        <div className="mx-auto max-w-7xl px-4 py-24 lg:px-8 text-center">
          <div className="mx-auto max-w-sm">
            <div className="mb-6 flex justify-center">
              <div className="h-24 w-24 rounded-full bg-muted flex items-center justify-center">
                <ShoppingBag className="h-12 w-12 text-muted-foreground" />
              </div>
            </div>
            <h1 className="text-2xl font-bold text-foreground mb-3">Your cart is empty</h1>
            <p className="text-muted-foreground mb-8">Looks like you have not added anything yet. Start shopping and find something you love.</p>
            <Link href="/shop">
              <Button size="lg" className="w-full">Browse the Shop</Button>
            </Link>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card/50 sticky top-0 z-40">
        <div className="mx-auto max-w-7xl px-4 py-4 lg:px-8 flex items-center justify-between">
          <Link href="/shop" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition">
            <ArrowLeft className="h-4 w-4" />
            Continue Shopping
          </Link>
          <h1 className="font-bold text-foreground">Cart ({totalItems})</h1>
          <div className="w-28" />
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8 lg:px-8">
        <div className="grid lg:grid-cols-3 gap-8">

          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <Card key={`${item.id}-${item.color}-${item.size}`} className="p-4">
                <div className="flex gap-4">
                  {/* Image */}
                  <div className="relative h-24 w-24 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="text-xs text-muted-foreground">{item.category}</p>
                        <h3 className="font-semibold text-foreground text-sm sm:text-base">{item.name}</h3>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {item.color} · Size {item.size}
                        </p>
                      </div>
                      <button
                        onClick={() => removeItem(item.id, item.color, item.size)}
                        className="p-1 rounded hover:bg-muted transition text-muted-foreground hover:text-foreground flex-shrink-0"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      {/* Quantity */}
                      <div className="flex items-center gap-2 border border-border rounded-lg">
                        <button
                          onClick={() => updateQuantity(item.id, item.color, item.size, item.quantity - 1)}
                          className="p-1.5 hover:bg-muted transition rounded-l-lg"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="text-sm font-medium w-6 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.color, item.size, item.quantity + 1)}
                          className="p-1.5 hover:bg-muted transition rounded-r-lg"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>

                      {/* Price */}
                      <p className="font-bold text-foreground">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="p-6 sticky top-24">
              <h2 className="font-bold text-foreground text-lg mb-6">Order Summary</h2>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal ({totalItems} items)</span>
                  <span className="text-foreground">${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className={shipping === 0 ? "text-green-600 font-medium" : "text-foreground"}>
                    {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
                  </span>
                </div>
                {shipping > 0 && (
                  <p className="text-xs text-muted-foreground">
                    Add ${(50 - totalPrice).toFixed(2)} more for free shipping
                  </p>
                )}
                <div className="border-t border-border pt-3 flex justify-between font-bold">
                  <span className="text-foreground">Total</span>
                  <span className="text-foreground">${total.toFixed(2)}</span>
                </div>
              </div>

              <Link href="/checkout">
                <Button size="lg" className="w-full mb-3">
                  Proceed to Checkout
                </Button>
              </Link>
              <Link href="/shop">
                <Button variant="outline" size="lg" className="w-full bg-transparent">
                  Continue Shopping
                </Button>
              </Link>

              {/* Trust */}
              <p className="text-xs text-muted-foreground text-center mt-4">
                Secure checkout · M-Pesa & Card accepted
              </p>
            </Card>
          </div>

        </div>
      </div>
    </main>
  )
}
