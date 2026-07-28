"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ChevronRight, Clock, CheckCircle2, Truck, XCircle, Loader2 } from "lucide-react"

type StatusConfigEntry = {
  icon: React.ComponentType<{ className?: string }>
  color: string
  bg: string
  label: string
}

type OrderItem = {
  productId: string
  name: string
  image: string
  quantity: number
  price: number
  color?: string
  size?: string
}

type Order = {
  id: string
  status: string
  totalPrice: number
  currency: string
  createdAt: string
  items: OrderItem[]
}

const statusConfig: Record<string, StatusConfigEntry> = {
  pending: { icon: Clock, color: "text-[#c9a84c]", bg: "bg-[#c9a84c]/10", label: "Processing" },
  processing: { icon: Clock, color: "text-[#c9a84c]", bg: "bg-[#c9a84c]/10", label: "Processing" },
  shipped: { icon: Truck, color: "text-blue-600", bg: "bg-blue-50 dark:bg-blue-950/30", label: "On the way" },
  delivered: { icon: CheckCircle2, color: "text-green-600", bg: "bg-green-50 dark:bg-green-950/30", label: "Delivered" },
  cancelled: { icon: XCircle, color: "text-red-500", bg: "bg-red-50 dark:bg-red-950/30", label: "Cancelled" },
}

function formatMoney(amount: number, currency: string) {
  try {
    return new Intl.NumberFormat("en-US", { style: "currency", currency }).format(amount)
  } catch {
    return `${currency} ${amount.toFixed(2)}`
  }
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false

    async function loadOrders() {
      try {
        const res = await fetch("/api/orders")
        if (!res.ok) throw new Error("Failed to load orders")
        const json = await res.json()
        if (!cancelled) setOrders(json.data ?? [])
      } catch (err) {
        if (!cancelled) setError("Couldn't load your orders. Please try again.")
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    loadOrders()
    return () => {
      cancelled = true
    }
  }, [])

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold text-[#1a1108] dark:text-[#faf8f5]">My Orders</h1>

      {loading ? (
        <div className="flex items-center justify-center py-16">
          <Loader2 className="h-6 w-6 animate-spin text-[#c9a84c]" />
        </div>
      ) : error ? (
        <div className="bg-white dark:bg-[#1a1108] rounded-2xl border border-[#e8e0d4] dark:border-[#2a1f14] p-12 flex flex-col items-center gap-3">
          <p className="text-sm text-[#a89070] text-center">{error}</p>
          <Button
            variant="outline"
            className="rounded-xl"
            onClick={() => {
              setLoading(true)
              setError(null)
              window.location.reload()
            }}
          >
            Retry
          </Button>
        </div>
      ) : orders.length === 0 ? (
        <div className="bg-white dark:bg-[#1a1108] rounded-2xl border border-[#e8e0d4] dark:border-[#2a1f14] p-12 flex flex-col items-center gap-4">
          <div className="relative h-32 w-32">
            <Image src="/images/illustrations/empty/shopping-bag.png" alt="No orders" fill sizes="128px" className="object-contain" />
          </div>
          <p className="font-semibold text-[#1a1108] dark:text-[#faf8f5]">No orders yet</p>
          <p className="text-sm text-[#a89070] text-center">When you place your first order, it will appear here.</p>
          <Button asChild className="rounded-xl bg-[#3d2c1e] text-white hover:bg-[#2a1f14] dark:bg-[#c9a84c] dark:text-black mt-2">
            <Link href="/shop">Start Shopping</Link>
          </Button>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {orders.map((order) => {
            const status = statusConfig[order.status] || statusConfig.pending
            const StatusIcon = status.icon
            const firstItem = order.items[0]
            const itemCount = order.items.reduce((sum, i) => sum + i.quantity, 0)

            return (
              <div key={order.id} className="bg-white dark:bg-[#1a1108] rounded-2xl border border-[#e8e0d4] dark:border-[#2a1f14] p-5 hover:border-[#c9a84c]/40 transition">
                <div className="flex items-center gap-4">
                  {/* Order image */}
                  <div className="relative h-16 w-16 rounded-xl overflow-hidden flex-shrink-0 bg-[#faf8f5] dark:bg-[#0e0a06]">
                    <Image
                      src={firstItem?.image || "/images/banners/shopping.png"}
                      alt="Order"
                      fill
                      sizes="64px"
                      className="object-cover"
                    />
                  </div>

                  {/* Order info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <p className="font-semibold text-sm text-[#1a1108] dark:text-[#faf8f5]">{order.id.slice(0, 8).toUpperCase()}</p>
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${status.color} ${status.bg}`}>
                        <StatusIcon className="h-3 w-3" />
                        {status.label}
                      </span>
                    </div>
                    <p className="text-xs text-[#a89070] mb-2">{formatDate(order.createdAt)} &middot; {itemCount} item{itemCount > 1 ? "s" : ""}</p>
                    <div className="flex items-center justify-between">
                      <p className="font-bold text-[#c9a84c]">{formatMoney(order.totalPrice, order.currency)}</p>
                      <Link href={`/account/orders/${order.id}`} className="flex items-center gap-1 text-xs text-[#a89070] hover:text-[#c9a84c] transition">
                        View details <ChevronRight className="h-3 w-3" />
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Progress bar for active orders */}
                {order.status === "shipped" && (
                  <div className="mt-4 pt-4 border-t border-[#e8e0d4] dark:border-[#2a1f14]">
                    <div className="flex items-center justify-between mb-2">
                      {["Order placed", "Processing", "Shipped", "Delivered"].map((step, i) => (
                        <span key={step} className={`text-xs ${i <= 2 ? "text-[#c9a84c] font-medium" : "text-[#a89070]"}`}>{step}</span>
                      ))}
                    </div>
                    <div className="h-1.5 bg-[#e8e0d4] dark:bg-[#2a1f14] rounded-full overflow-hidden">
                      <div className="h-full w-3/4 bg-[#c9a84c] rounded-full" />
                    </div>
                  </div>
                )}

                {/* Success illustration for delivered */}
                {order.status === "delivered" && (
                  <div className="mt-3 pt-3 border-t border-[#e8e0d4] dark:border-[#2a1f14] flex items-center justify-between">
                    <p className="text-xs text-[#a89070]">Delivered successfully</p>
                    <button className="text-xs text-[#c9a84c] hover:underline">Write a review</button>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
