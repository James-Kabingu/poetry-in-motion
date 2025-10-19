"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  ArrowLeft,
  Heart,
  LogOut,
  Package,
  Settings,
  ShoppingBag,
  Sparkles,
  TrendingUp,
  User,
  Edit2,
  Leaf,
  RotateCcw,
} from "lucide-react"
import Link from "next/link"

interface Order {
  id: string
  date: string
  total: number
  status: "delivered" | "processing" | "shipped"
  items: number
  image: string
}

interface Favorite {
  id: string
  name: string
  price: number
  image: string
  category: string
}

const mockOrders: Order[] = [
  {
    id: "ORD-001",
    date: "Dec 15, 2024",
    total: 145.99,
    status: "delivered",
    items: 3,
    image: "/oversized-blazer.png",
  },
  {
    id: "ORD-002",
    date: "Dec 8, 2024",
    total: 89.5,
    status: "delivered",
    items: 2,
    image: "/vintage-denim-jeans.jpg",
  },
  {
    id: "ORD-003",
    date: "Dec 1, 2024",
    total: 234.75,
    status: "shipped",
    items: 4,
    image: "/statement-jacket.jpg",
  },
]

const mockFavorites: Favorite[] = [
  {
    id: "1",
    name: "Oversized Blazer",
    price: 65,
    image: "/oversized-blazer.png",
    category: "Outerwear",
  },
  {
    id: "2",
    name: "Vintage Denim",
    price: 55,
    image: "/vintage-denim-jeans.jpg",
    category: "Bottoms",
  },
  {
    id: "3",
    name: "Statement Jacket",
    price: 85,
    image: "/statement-jacket.jpg",
    category: "Outerwear",
  },
]

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<"overview" | "orders" | "favorites" | "profile" | "circular">("overview")
  const [isEditingProfile, setIsEditingProfile] = useState(false)
  const number = 0

  const totalSpent = mockOrders.reduce((sum, order) => sum + order.total, number)
  const totalOrders = mockOrders.length

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card/50 sticky top-0 z-40">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </Link>
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-accent to-accent/60 flex items-center justify-center">
                <Sparkles className="h-5 w-5 text-accent-foreground" />
              </div>
              <span className="font-bold text-foreground">My Account</span>
            </div>
            <Button variant="outline" size="sm" className="gap-2 bg-transparent">
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="p-6 sticky top-24">
              <div className="flex flex-col items-center text-center mb-6">
                <div className="h-16 w-16 rounded-full bg-gradient-to-br from-accent to-accent/60 flex items-center justify-center mb-4">
                  <User className="h-8 w-8 text-accent-foreground" />
                </div>
                <h3 className="font-semibold text-foreground">Amara K.</h3>
                <p className="text-sm text-muted-foreground">amara@example.com</p>
              </div>

              <div className="space-y-2 mb-6 border-t border-border pt-6">
                {[
                  { id: "overview", label: "Overview", icon: TrendingUp },
                  { id: "orders", label: "Orders", icon: Package },
                  { id: "favorites", label: "Favorites", icon: Heart },
                  { id: "circular", label: "Circular Fashion", icon: RotateCcw },
                  { id: "profile", label: "Profile", icon: Settings },
                ].map((item) => {
                  const Icon = item.icon
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveTab(item.id as any)}
                      className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg transition ${
                        activeTab === item.id
                          ? "bg-accent text-accent-foreground"
                          : "text-muted-foreground hover:text-foreground hover:bg-muted"
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      <span className="text-sm font-medium">{item.label}</span>
                    </button>
                  )
                })}
              </div>

              <Button variant="outline" className="w-full bg-transparent" asChild>
                <Link href="/quiz">Retake Style Quiz</Link>
              </Button>
            </Card>
          </div>

          {/* Content */}
          <div className="lg:col-span-3">
            {/* Overview Tab */}
            {activeTab === "overview" && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-6">Welcome back, Amara!</h2>

                  {/* Stats */}
                  <div className="grid md:grid-cols-3 gap-4 mb-8">
                    <Card className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">Total Spent</p>
                          <p className="text-2xl font-bold text-foreground">${totalSpent.toFixed(2)}</p>
                        </div>
                        <ShoppingBag className="h-8 w-8 text-accent/50" />
                      </div>
                    </Card>
                    <Card className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">Total Orders</p>
                          <p className="text-2xl font-bold text-foreground">{totalOrders}</p>
                        </div>
                        <Package className="h-8 w-8 text-accent/50" />
                      </div>
                    </Card>
                    <Card className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">Favorites</p>
                          <p className="text-2xl font-bold text-foreground">{mockFavorites.length}</p>
                        </div>
                        <Heart className="h-8 w-8 text-accent/50" />
                      </div>
                    </Card>
                  </div>
                </div>

                {/* Recent Orders */}
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-4">Recent Orders</h3>
                  <div className="space-y-3">
                    {mockOrders.slice(0, 2).map((order) => (
                      <Card key={order.id} className="p-4">
                        <div className="flex items-center gap-4">
                          <img
                            src={order.image || "/placeholder.svg"}
                            alt="Order"
                            className="h-16 w-16 rounded-lg object-cover"
                          />
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-1">
                              <p className="font-semibold text-foreground">{order.id}</p>
                              <span
                                className={`text-xs font-semibold px-2 py-1 rounded-full ${
                                  order.status === "delivered"
                                    ? "bg-green-100 text-green-700"
                                    : "bg-blue-100 text-blue-700"
                                }`}
                              >
                                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                              </span>
                            </div>
                            <p className="text-sm text-muted-foreground">{order.date}</p>
                            <p className="text-sm text-muted-foreground">{order.items} items</p>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-foreground">${order.total.toFixed(2)}</p>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                  <Button
                    variant="outline"
                    className="w-full mt-4 bg-transparent"
                    onClick={() => setActiveTab("orders")}
                  >
                    View All Orders
                  </Button>
                </div>
              </div>
            )}

            {/* Orders Tab */}
            {activeTab === "orders" && (
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-6">Order History</h2>
                <div className="space-y-3">
                  {mockOrders.map((order) => (
                    <Card key={order.id} className="p-4 hover:shadow-lg transition">
                      <div className="flex items-center gap-4">
                        <img
                          src={order.image || "/placeholder.svg"}
                          alt="Order"
                          className="h-20 w-20 rounded-lg object-cover"
                        />
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <p className="font-semibold text-foreground">{order.id}</p>
                            <span
                              className={`text-xs font-semibold px-3 py-1 rounded-full ${
                                order.status === "delivered"
                                  ? "bg-green-100 text-green-700"
                                  : order.status === "shipped"
                                    ? "bg-blue-100 text-blue-700"
                                    : "bg-yellow-100 text-yellow-700"
                              }`}
                            >
                              {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground mb-1">{order.date}</p>
                          <p className="text-sm text-muted-foreground">{order.items} items</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-foreground text-lg">${order.total.toFixed(2)}</p>
                          <Button size="sm" variant="outline" className="mt-2 bg-transparent">
                            View Details
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Favorites Tab */}
            {activeTab === "favorites" && (
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-6">Saved Items</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {mockFavorites.map((item) => (
                    <Card key={item.id} className="overflow-hidden hover:shadow-lg transition group">
                      <div className="relative overflow-hidden bg-muted h-48">
                        <img
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition"
                        />
                        <button className="absolute top-3 right-3 p-2 rounded-full bg-background/80 hover:bg-background transition">
                          <Heart className="h-5 w-5 fill-destructive text-destructive" />
                        </button>
                      </div>
                      <div className="p-4">
                        <p className="text-xs text-muted-foreground mb-1">{item.category}</p>
                        <h3 className="font-semibold text-foreground mb-3">{item.name}</h3>
                        <div className="flex items-center justify-between">
                          <span className="text-lg font-bold text-foreground">${item.price}</span>
                          <Button size="sm" className="gap-2">
                            <ShoppingBag className="h-4 w-4" />
                            Add
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Circular Fashion Tab */}
            {activeTab === "circular" && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-6">Your Circular Fashion Journey</h2>
                  <div className="grid md:grid-cols-3 gap-4 mb-8">
                    <Card className="p-6 border-green-500/50 bg-green-500/5">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">Items Traded</p>
                          <p className="text-2xl font-bold text-foreground">8</p>
                        </div>
                        <RotateCcw className="h-8 w-8 text-green-600/50" />
                      </div>
                    </Card>
                    <Card className="p-6 border-green-500/50 bg-green-500/5">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">CO₂ Saved (kg)</p>
                          <p className="text-2xl font-bold text-foreground">24</p>
                        </div>
                        <Leaf className="h-8 w-8 text-green-600/50" />
                      </div>
                    </Card>
                    <Card className="p-6 border-green-500/50 bg-green-500/5">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">Water Saved (L)</p>
                          <p className="text-2xl font-bold text-foreground">1,920</p>
                        </div>
                        <Sparkles className="h-8 w-8 text-green-600/50" />
                      </div>
                    </Card>
                  </div>
                </div>

                <Card className="p-6">
                  <h3 className="font-semibold text-foreground mb-4">Trade In Items</h3>
                  <p className="text-muted-foreground mb-4">
                    Send us pieces you've outgrown. We'll authenticate, clean, and resell them. You get store credit!
                  </p>
                  <Button asChild>
                    <Link href="/circular">Start Trading In</Link>
                  </Button>
                </Card>

                <Card className="p-6">
                  <h3 className="font-semibold text-foreground mb-4">Buy Pre-Owned</h3>
                  <p className="text-muted-foreground mb-4">
                    Browse authenticated pre-owned pieces at 30-50% off original prices.
                  </p>
                  <Button variant="outline" asChild className="bg-transparent">
                    <Link href="/circular">Shop Pre-Owned</Link>
                  </Button>
                </Card>
              </div>
            )}

            {/* Profile Tab */}
            {activeTab === "profile" && (
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-6">Profile Settings</h2>

                <div className="space-y-6">
                  {/* Personal Info */}
                  <Card className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-foreground">Personal Information</h3>
                      <Button
                        size="sm"
                        variant="outline"
                        className="gap-2 bg-transparent"
                        onClick={() => setIsEditingProfile(!isEditingProfile)}
                      >
                        <Edit2 className="h-4 w-4" />
                        {isEditingProfile ? "Cancel" : "Edit"}
                      </Button>
                    </div>

                    {isEditingProfile ? (
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-foreground mb-2">Full Name</label>
                          <input
                            type="text"
                            defaultValue="Amara K."
                            className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-foreground mb-2">Email</label>
                          <input
                            type="email"
                            defaultValue="amara@example.com"
                            className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-foreground mb-2">Phone</label>
                          <input
                            type="tel"
                            defaultValue="+254 712 345 678"
                            className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                          />
                        </div>
                        <Button className="w-full">Save Changes</Button>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <div>
                          <p className="text-sm text-muted-foreground">Full Name</p>
                          <p className="font-medium text-foreground">Amara K.</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Email</p>
                          <p className="font-medium text-foreground">amara@example.com</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Phone</p>
                          <p className="font-medium text-foreground">+254 712 345 678</p>
                        </div>
                      </div>
                    )}
                  </Card>

                  {/* Style Preferences */}
                  <Card className="p-6">
                    <h3 className="text-lg font-semibold text-foreground mb-4">Style Preferences</h3>
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm text-muted-foreground mb-2">Preferred Styles</p>
                        <div className="flex flex-wrap gap-2">
                          {["Minimalist", "Streetwear", "Bohemian"].map((style) => (
                            <span
                              key={style}
                              className="px-3 py-1 rounded-full bg-accent/20 text-accent text-sm font-medium"
                            >
                              {style}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-2">Budget Range</p>
                        <p className="font-medium text-foreground">$50-80 per piece</p>
                      </div>
                      <Button
                        variant="outline"
                        className="w-full bg-transparent"
                        onClick={() => (window.location.href = "/quiz")}
                      >
                        Update Style Preferences
                      </Button>
                    </div>
                  </Card>

                  {/* Notifications */}
                  <Card className="p-6">
                    <h3 className="text-lg font-semibold text-foreground mb-4">Notifications</h3>
                    <div className="space-y-3">
                      {[
                        { label: "New recommendations", checked: true },
                        { label: "Order updates", checked: true },
                        { label: "Promotional emails", checked: false },
                      ].map((item) => (
                        <label key={item.label} className="flex items-center gap-3 cursor-pointer">
                          <input
                            type="checkbox"
                            defaultChecked={item.checked}
                            className="w-4 h-4 rounded border-border accent-accent"
                          />
                          <span className="text-foreground">{item.label}</span>
                        </label>
                      ))}
                    </div>
                  </Card>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
