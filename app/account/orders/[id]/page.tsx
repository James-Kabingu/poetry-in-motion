"use client"

import { use, useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, MapPin, Truck, Package, ShieldCheck, CheckCircle2, Clock, XCircle, Loader2 } from "lucide-react"

interface OrderItem {
  productId: string
  name: string
  image: string
  quantity: number
  price: number
  color?: string
  size?: string
}

interface ShippingAddress {
  fullName?: string
  phone?: string
  email?: string
  street?: string
  city?: string
  state?: string
  zipCode?: string
  country?: string
}

interface OrderDetail {
  id: string
  status: string
  totalPrice: number
  currency: string
  shippingAddress: ShippingAddress | null
  paymentMethod: string | null
  createdAt: string
  items: OrderItem[]
}

const statusMeta: Record<string, { icon: typeof CheckCircle2; label: string; timeline: string }> = {
  pending: { icon: Clock, label: "Processing", timeline: "Order confirmed, preparing for dispatch." },
  processing: { icon: Clock, label: "Processing", timeline: "Order confirmed, preparing for dispatch." },
  shipped: { icon: Truck, label: "On the way", timeline: "Processing complete and awaiting last-mile delivery." },
  delivered: { icon: CheckCircle2, label: "Delivered", timeline: "Delivered successfully." },
  cancelled: { icon: XCircle, label: "Cancelled", timeline: "This order was cancelled." },
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

function formatAddress(address: ShippingAddress | null) {
  if (!address) return "No shipping address on file"
  const line = [address.street, address.city, address.state, address.zipCode, address.country].filter(Boolean).join(", ")
  return line || address.fullName || "No shipping address on file"
}

export default function OrderDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const [order, setOrder] = useState<OrderDetail | null>(null)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false

    async function loadOrder() {
      try {
        const res = await fetch(`/api/orders/${id}`)
        if (res.status === 404) {
          if (!cancelled) setNotFound(true)
          return
        }
        if (!res.ok) throw new Error("Failed to load order")
        const json = await res.json()
        if (!cancelled) setOrder(json.data)
      } catch (err) {
        if (!cancelled) setError("Couldn't load this order. Please try again.")
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    loadOrder()
    return () => {
      cancelled = true
    }
  }, [id])

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16">
        <Loader2 className="h-6 w-6 animate-spin text-[#c9a84c]" />
      </div>
    )
  }

  if (notFound || (!order && !error)) {
    return (
      <div className="flex flex-col gap-6 items-start">
        <Link href="/account/orders" className="inline-flex items-center gap-2 text-sm text-[#a89070] hover:text-[#c9a84c] transition w-fit">
          <ArrowLeft className="h-3.5 w-3.5" /> Back to orders
        </Link>
        <p className="text-[#1a1108] dark:text-[#faf8f5]">Order {id} not found.</p>
      </div>
    )
  }

  if (error || !order) {
    return (
      <div className="flex flex-col gap-6 items-start">
        <Link href="/account/orders" className="inline-flex items-center gap-2 text-sm text-[#a89070] hover:text-[#c9a84c] transition w-fit">
          <ArrowLeft className="h-3.5 w-3.5" /> Back to orders
        </Link>
        <p className="text-[#1a1108] dark:text-[#faf8f5]">{error ?? "Something went wrong."}</p>
      </div>
    )
  }

  const meta = statusMeta[order.status] || statusMeta.pending
  const StatusIcon = meta.icon

  return (
    <div className="flex flex-col gap-6">
      <Link href="/account/orders" className="inline-flex items-center gap-2 text-sm text-[#a89070] hover:text-[#c9a84c] transition w-fit">
        <ArrowLeft className="h-3.5 w-3.5" /> Back to orders
      </Link>
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#1a1108] dark:text-[#faf8f5]">Order {order.id.slice(0, 8).toUpperCase()}</h1>
          <p className="text-sm text-[#a89070] mt-1">Placed {formatDate(order.createdAt)}</p>
        </div>
        <Button variant="outline" className="rounded-xl border-[#e8e0d4] dark:border-[#2a1f14] text-[#3d2c1e] dark:text-[#faf8f5] gap-2">
          <ShieldCheck className="h-3.5 w-3.5" /> Download receipt
        </Button>
      </div>
      <div className="grid lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 bg-white dark:bg-[#1a1108] rounded-2xl border border-[#e8e0d4] dark:border-[#2a1f14] p-6">
          <h2 className="font-semibold text-[#1a1108] dark:text-[#faf8f5] mb-4">Items</h2>
          <div className="space-y-4">
            {order.items.map((item, idx) => (
              <div key={`${item.productId}-${idx}`} className="flex items-center justify-between gap-4 border-b border-[#e8e0d4] dark:border-[#2a1f14] pb-4 last:border-0 last:pb-0">
                <div>
                  <p className="font-medium text-[#1a1108] dark:text-[#faf8f5]">{item.name}</p>
                  <p className="text-sm text-[#a89070]">
                    Qty {item.quantity}
                    {item.color ? ` · ${item.color}` : ""}
                    {item.size ? ` · ${item.size}` : ""}
                  </p>
                </div>
                <p className="font-semibold text-[#c9a84c]">{formatMoney(item.price * item.quantity, order.currency)}</p>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between pt-4 mt-4 border-t border-[#e8e0d4] dark:border-[#2a1f14]">
            <p className="font-semibold text-[#1a1108] dark:text-[#faf8f5]">Total</p>
            <p className="font-bold text-[#c9a84c]">{formatMoney(order.totalPrice, order.currency)}</p>
          </div>
        </div>
        <div className="bg-white dark:bg-[#1a1108] rounded-2xl border border-[#e8e0d4] dark:border-[#2a1f14] p-6 space-y-4">
          <div>
            <p className="text-xs uppercase tracking-wider text-[#a89070] mb-2">Delivery</p>
            <div className="flex items-center gap-3 text-sm text-[#1a1108] dark:text-[#faf8f5]">
              <StatusIcon className="h-4 w-4 text-[#c9a84c]" /> {meta.label}
            </div>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wider text-[#a89070] mb-2">Shipping address</p>
            <div className="flex items-start gap-3 text-sm text-[#1a1108] dark:text-[#faf8f5]">
              <MapPin className="h-4 w-4 text-[#c9a84c] mt-0.5" />
              <span>{formatAddress(order.shippingAddress)}</span>
            </div>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wider text-[#a89070] mb-2">Timeline</p>
            <div className="flex items-start gap-3 text-sm text-[#1a1108] dark:text-[#faf8f5]">
              <Package className="h-4 w-4 text-[#c9a84c] mt-0.5" />
              <span>{meta.timeline}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
