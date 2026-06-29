"use client"

import { useState } from "react"
import { useCart } from "@/lib/cart-context"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowLeft, CheckCircle, CreditCard, Phone, ShoppingBag } from "lucide-react"
import Link from "next/link"

type Step = "address" | "payment" | "success"
type PaymentMethod = "mpesa" | "card"

export default function CheckoutPage() {
  const { items, totalItems, totalPrice, clearCart } = useCart()
  const [step, setStep] = useState<Step>("address")
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("mpesa")
  const [mpesaLoading, setMpesaLoading] = useState(false)
  const [mpesaSent, setMpesaSent] = useState(false)

  const shipping = totalPrice >= 50 ? 0 : 5
  const total = totalPrice + shipping

  const [address, setAddress] = useState({
    fullName: "",
    phone: "",
    email: "",
    county: "",
    town: "",
    street: "",
    building: "",
  })

  const [card, setCard] = useState({
    number: "",
    name: "",
    expiry: "",
    cvv: "",
  })

  const handleAddressSubmit = () => {
    if (!address.fullName || !address.phone || !address.email || !address.county || !address.town) return
    setStep("payment")
  }

  const handleMpesaPay = () => {
    setMpesaLoading(true)
    setTimeout(() => {
      setMpesaLoading(false)
      setMpesaSent(true)
    }, 2000)
    setTimeout(() => {
      setMpesaSent(false)
      clearCart()
      setStep("success")
    }, 5000)
  }

  const handleCardPay = () => {
    if (!card.number || !card.name || !card.expiry || !card.cvv) return
    clearCart()
    setStep("success")
  }

  if (items.length === 0 && step !== "success") {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <ShoppingBag className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h1 className="text-xl font-bold text-foreground mb-2">Your cart is empty</h1>
          <Link href="/shop"><Button className="mt-4">Go to Shop</Button></Link>
        </div>
      </main>
    )
  }

  if (step === "success") {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="text-center max-w-md mx-auto">
          <div className="flex justify-center mb-6">
            <img src="/images/illustrations/success/order-placed.png" alt="Order placed" className="h-48 w-48 object-contain" />
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-3">Order Placed!</h1>
          <p className="text-muted-foreground mb-2">Thank you, {address.fullName || "valued customer"}.</p>
          <p className="text-muted-foreground mb-8">
            Your order has been confirmed. You will receive a confirmation on {address.phone || "your phone"}.
          </p>
          <div className="space-y-3">
            <Link href="/account/orders"><Button size="lg" className="w-full">Track My Order</Button></Link>
            <Link href="/shop"><Button size="lg" variant="outline" className="w-full bg-transparent">Continue Shopping</Button></Link>
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
          <button
            onClick={() => step === "payment" ? setStep("address") : history.back()}
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition"
          >
            <ArrowLeft className="h-4 w-4" />
            {step === "payment" ? "Back" : "Back to Cart"}
          </button>
          <h1 className="font-bold text-foreground">Checkout</h1>
          <div className="w-24" />
        </div>

        {/* Steps */}
        <div className="mx-auto max-w-7xl px-4 pb-3 lg:px-8">
          <div className="flex items-center gap-2 text-xs">
            <span className={step === "address" ? "text-foreground font-semibold" : "text-muted-foreground"}>1. Delivery</span>
            <span className="text-muted-foreground">›</span>
            <span className={step === "payment" ? "text-foreground font-semibold" : "text-muted-foreground"}>2. Payment</span>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8 lg:px-8">
        <div className="grid lg:grid-cols-3 gap-8">

          {/* Left: Form */}
          <div className="lg:col-span-2 space-y-6">

            {/* Step 1: Address */}
            {step === "address" && (
              <Card className="p-6">
                <h2 className="font-bold text-foreground text-lg mb-6">Delivery Details</h2>
                <div className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-foreground mb-1 block">Full Name *</label>
                      <input
                        type="text"
                        value={address.fullName}
                        onChange={(e) => setAddress({ ...address, fullName: e.target.value })}
                        placeholder="Jane Wanjiru"
                        className="w-full px-3 py-2 text-sm rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground mb-1 block">Phone Number *</label>
                      <input
                        type="tel"
                        value={address.phone}
                        onChange={(e) => setAddress({ ...address, phone: e.target.value })}
                        placeholder="0712 345 678"
                        className="w-full px-3 py-2 text-sm rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1 block">Email Address *</label>
                    <input
                      type="email"
                      value={address.email}
                      onChange={(e) => setAddress({ ...address, email: e.target.value })}
                      placeholder="jane@example.com"
                      className="w-full px-3 py-2 text-sm rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                    />
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-foreground mb-1 block">County *</label>
                      <input
                        type="text"
                        value={address.county}
                        onChange={(e) => setAddress({ ...address, county: e.target.value })}
                        placeholder="Nairobi"
                        className="w-full px-3 py-2 text-sm rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground mb-1 block">Town / Area *</label>
                      <input
                        type="text"
                        value={address.town}
                        onChange={(e) => setAddress({ ...address, town: e.target.value })}
                        placeholder="Westlands"
                        className="w-full px-3 py-2 text-sm rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                      />
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-foreground mb-1 block">Street / Road</label>
                      <input
                        type="text"
                        value={address.street}
                        onChange={(e) => setAddress({ ...address, street: e.target.value })}
                        placeholder="Waiyaki Way"
                        className="w-full px-3 py-2 text-sm rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground mb-1 block">Building / Apartment</label>
                      <input
                        type="text"
                        value={address.building}
                        onChange={(e) => setAddress({ ...address, building: e.target.value })}
                        placeholder="Apt 4B"
                        className="w-full px-3 py-2 text-sm rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                      />
                    </div>
                  </div>
                  <Button
                    size="lg"
                    className="w-full mt-2"
                    onClick={handleAddressSubmit}
                    disabled={!address.fullName || !address.phone || !address.email || !address.county || !address.town}
                  >
                    Continue to Payment
                  </Button>
                </div>
              </Card>
            )}

            {/* Step 2: Payment */}
            {step === "payment" && (
              <Card className="p-6">
                <h2 className="font-bold text-foreground text-lg mb-6">Payment Method</h2>

                {/* Toggle */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                  <button
                    onClick={() => setPaymentMethod("mpesa")}
                    className={`flex items-center justify-center gap-2 py-3 px-4 rounded-lg border-2 transition font-medium text-sm ${
                      paymentMethod === "mpesa"
                        ? "border-accent bg-accent/10 text-foreground"
                        : "border-border text-muted-foreground hover:border-accent"
                    }`}
                  >
                    <Phone className="h-4 w-4" />
                    M-Pesa
                  </button>
                  <button
                    onClick={() => setPaymentMethod("card")}
                    className={`flex items-center justify-center gap-2 py-3 px-4 rounded-lg border-2 transition font-medium text-sm ${
                      paymentMethod === "card"
                        ? "border-accent bg-accent/10 text-foreground"
                        : "border-border text-muted-foreground hover:border-accent"
                    }`}
                  >
                    <CreditCard className="h-4 w-4" />
                    Card
                  </button>
                </div>

                {/* M-Pesa */}
                {paymentMethod === "mpesa" && (
                  <div className="space-y-4">
                    <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20">
                      <p className="text-sm text-foreground font-medium mb-1">Pay via M-Pesa STK Push</p>
                      <p className="text-xs text-muted-foreground">
                        An M-Pesa prompt will be sent to <strong>{address.phone}</strong>. Enter your PIN to complete payment of <strong>KES {(total * 130).toFixed(0)}</strong>.
                      </p>
                    </div>
                    {mpesaSent && (
                      <div className="p-3 rounded-lg bg-accent/10 border border-accent/20 text-sm text-foreground text-center">
                        STK Push sent to {address.phone}. Check your phone and enter your M-Pesa PIN.
                      </div>
                    )}
                    <Button
                      size="lg"
                      className="w-full bg-green-600 hover:bg-green-700 text-white"
                      onClick={handleMpesaPay}
                      disabled={mpesaLoading || mpesaSent}
                    >
                      {mpesaLoading ? "Sending prompt..." : mpesaSent ? "Waiting for PIN..." : `Pay KES ${(total * 130).toFixed(0)}`}
                    </Button>
                  </div>
                )}

                {/* Card */}
                {paymentMethod === "card" && (
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-foreground mb-1 block">Card Number</label>
                      <input
                        type="text"
                        value={card.number}
                        onChange={(e) => setCard({ ...card, number: e.target.value.replace(/\D/g, "").slice(0, 16) })}
                        placeholder="1234 5678 9012 3456"
                        className="w-full px-3 py-2 text-sm rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground mb-1 block">Name on Card</label>
                      <input
                        type="text"
                        value={card.name}
                        onChange={(e) => setCard({ ...card, name: e.target.value })}
                        placeholder="JANE WANJIRU"
                        className="w-full px-3 py-2 text-sm rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-foreground mb-1 block">Expiry</label>
                        <input
                          type="text"
                          value={card.expiry}
                          onChange={(e) => setCard({ ...card, expiry: e.target.value })}
                          placeholder="MM/YY"
                          className="w-full px-3 py-2 text-sm rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-foreground mb-1 block">CVV</label>
                        <input
                          type="password"
                          value={card.cvv}
                          onChange={(e) => setCard({ ...card, cvv: e.target.value.slice(0, 4) })}
                          placeholder="•••"
                          className="w-full px-3 py-2 text-sm rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                        />
                      </div>
                    </div>
                    <Button
                      size="lg"
                      className="w-full"
                      onClick={handleCardPay}
                      disabled={!card.number || !card.name || !card.expiry || !card.cvv}
                    >
                      Pay ${total.toFixed(2)}
                    </Button>
                  </div>
                )}
              </Card>
            )}
          </div>

          {/* Right: Order Summary */}
          <div className="lg:col-span-1">
            <Card className="p-6 sticky top-24">
              <h2 className="font-bold text-foreground text-lg mb-4">Order Summary</h2>
              <div className="space-y-3 mb-4">
                {items.map((item) => (
                  <div key={`${item.id}-${item.color}-${item.size}`} className="flex gap-3">
                    <div className="h-12 w-12 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                      <img src={item.image || "/placeholder.svg"} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">{item.name}</p>
                      <p className="text-xs text-muted-foreground">{item.color} · {item.size} · x{item.quantity}</p>
                    </div>
                    <p className="text-sm font-semibold text-foreground flex-shrink-0">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                ))}
              </div>
              <div className="border-t border-border pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className={shipping === 0 ? "text-green-600 font-medium" : ""}>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between font-bold pt-2 border-t border-border">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            </Card>
          </div>

        </div>
      </div>
    </main>
  )
}
