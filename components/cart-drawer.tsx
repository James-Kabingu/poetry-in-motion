"use client"

import { useCart } from "@/lib/cart-context"
import { X, ShoppingCart, Minus, Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface CartDrawerProps {
  open: boolean
  onClose: () => void
}

export function CartDrawer({ open, onClose }: CartDrawerProps) {
  const { items, removeItem, updateQuantity, totalItems, totalPrice } = useCart()
  const shipping = totalPrice >= 50 ? 0 : 5
  const total = totalPrice + shipping

  return (
    <>
      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-50 transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Drawer */}
      <div className={`fixed top-0 right-0 h-full w-full max-w-sm bg-background border-l border-border z-50 flex flex-col shadow-2xl transition-transform duration-300 ${open ? "translate-x-0" : "translate-x-full"}`}>

        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-border">
          <div className="flex items-center gap-2">
            <ShoppingCart className="h-5 w-5 text-foreground" />
            <h2 className="font-bold text-foreground">Cart ({totalItems})</h2>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-muted transition">
            <X className="h-5 w-5 text-muted-foreground" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
              <img src="/images/illustrations/empty/cart.png" alt="Empty cart" className="h-32 w-32 object-contain" />
              <p className="font-semibold text-foreground">Your cart is empty</p>
              <p className="text-sm text-muted-foreground">Add items to get started.</p>
              <Button onClick={onClose} variant="outline" className="bg-transparent">Continue Shopping</Button>
            </div>
          ) : (
            items.map((item) => (
              <div key={`${item.id}-${item.color}-${item.size}`} className="flex gap-3">
                <div className="h-18 w-16 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                  <img src={item.image || "/placeholder.svg"} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-foreground line-clamp-1">{item.name}</p>
                  <p className="text-xs text-muted-foreground">{item.color} · {item.size}</p>
                  <p className="text-sm font-bold text-foreground mt-1">${(item.price * item.quantity).toFixed(2)}</p>
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center gap-1 border border-border rounded-lg">
                      <button onClick={() => updateQuantity(item.id, item.color, item.size, item.quantity - 1)} className="p-1 hover:bg-muted transition rounded-l-lg">
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="text-xs font-medium w-5 text-center">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.color, item.size, item.quantity + 1)} className="p-1 hover:bg-muted transition rounded-r-lg">
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>
                    <button onClick={() => removeItem(item.id, item.color, item.size)} className="p-1 text-muted-foreground hover:text-destructive transition">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="px-5 py-4 border-t border-border space-y-3 bg-background">
            <div className="space-y-1.5 text-sm">
              <div className="flex justify-between text-muted-foreground">
                <span>Subtotal</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Shipping</span>
                <span className={shipping === 0 ? "text-green-600 font-medium" : ""}>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
              </div>
              <div className="flex justify-between font-bold text-foreground pt-1.5 border-t border-border">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
            <Link href="/checkout" onClick={onClose}>
              <Button size="lg" className="w-full">Checkout</Button>
            </Link>
            <Link href="/cart" onClick={onClose}>
              <Button size="lg" variant="outline" className="w-full bg-transparent">View Cart</Button>
            </Link>
          </div>
        )}
      </div>
    </>
  )
}
