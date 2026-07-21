"use client"

import { useState, useMemo, Suspense, useRef } from "react"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowLeft, Camera, Filter, Heart, Search, ShoppingBag, Sparkles, Star, X } from "lucide-react"
import Link from "next/link"
import { products, categories } from "@/lib/products"
import { creators, getCreatorById } from "@/lib/creators"
import { useCart } from "@/lib/cart-context"
import { NavLogo } from "@/components/nav-logo"
import { CartDrawer } from "@/components/cart-drawer"
import { useRouter } from "next/navigation"

const priceRanges = [
  { label: "Under $30", min: 0, max: 30 },
  { label: "$30-50", min: 30, max: 50 },
  { label: "$50-80", min: 50, max: 80 },
  { label: "$80+", min: 80, max: 999 },
]

const colorMap: Record<string, string> = {
  Black: "#000", White: "#fff", Navy: "#001f3f", Camel: "#c19a6b",
  Gray: "#808080", Cream: "#fffdd0", Red: "#ff0000", Burgundy: "#800020",
  "Light Blue": "#add8e6", "Dark Blue": "#00008b", Champagne: "#f7e7ce",
  Blush: "#ffc0cb", Emerald: "#50c878", Beige: "#f5f5dc", Olive: "#708238",
  Natural: "#e8dcc4", Brown: "#6f4e37", Tan: "#d2b48c",
}

function ShopContent() {
  const searchParams = useSearchParams()
  const creatorParam = searchParams.get("creator")
  const { addItem } = useCart()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  const handleCameraClick = () => {
    router.push("/search?mode=image")
  }
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedPrice, setSelectedPrice] = useState<{ min: number; max: number } | null>(null)
  const [selectedCreator, setSelectedCreator] = useState<string | null>(creatorParam)
  const [searchQuery, setSearchQuery] = useState("")
  const [showFilters, setShowFilters] = useState(false)
  const [favorites, setFavorites] = useState<string[]>([])
  const [addedId, setAddedId] = useState<string | null>(null)
  const [drawerOpen, setDrawerOpen] = useState(false)

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory = selectedCategory === "All" || product.category === selectedCategory
      const matchesPrice = !selectedPrice || (product.price >= selectedPrice.min && product.price <= selectedPrice.max)
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesCreator = !selectedCreator || product.creatorId === selectedCreator
      return matchesCategory && matchesPrice && matchesSearch && matchesCreator
    })
  }, [selectedCategory, selectedPrice, selectedCreator, searchQuery])

  const toggleFavorite = (productId: string) => {
    setFavorites((prev) => (prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]))
  }

  const handleQuickAdd = (e: React.MouseEvent, product: typeof products[number]) => {
    e.preventDefault()
    if (!product.inStock) return
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      color: product.colors?.[0] ?? "Default",
      size: product.sizes?.[0] ?? "One Size",
      category: product.category,
    })
    setAddedId(product.id)
    setDrawerOpen(true)
    setTimeout(() => setAddedId(null), 1200)
  }

  const activeCreator = selectedCreator ? getCreatorById(selectedCreator) : null
  const hasActiveFilters = selectedCategory !== "All" || selectedPrice || selectedCreator

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card/50 sticky top-16 z-40">
        <div className="mx-auto max-w-7xl px-4 py-3 sm:py-4 lg:px-8">
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <NavLogo size="sm" />
            <Button variant="outline" size="sm" className="gap-2 md:hidden bg-transparent h-9" onClick={() => setShowFilters(!showFilters)}>
              <Filter className="h-4 w-4" />
              <span className="text-xs">Filters</span>
            </Button>
          </div>

          {/* Search Bar - Google style pill */}
          <div className="flex items-center gap-2 px-3 py-2 rounded-full border border-border bg-background focus-within:ring-2 focus-within:ring-accent transition">
            <Search className="h-4 w-4 text-muted-foreground flex-shrink-0" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 min-w-0 bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery("")} className="text-muted-foreground hover:text-foreground flex-shrink-0">
                <X className="h-4 w-4" />
              </button>
            )}
            <div className="h-5 w-px bg-border flex-shrink-0" />
            <button
              onClick={handleCameraClick}
              title="Search by image"
              className="text-muted-foreground hover:text-accent transition flex-shrink-0"
            >
              <Camera className="h-5 w-5" />
            </button>
            <button
              onClick={() => {}}
              title="Search"
              className="text-muted-foreground hover:text-accent transition flex-shrink-0"
            >
              <Search className="h-5 w-5" />
            </button>
          </div>

          {/* Active creator filter chip */}
          {activeCreator && (
            <div className="mt-3 flex items-center gap-2">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/10 border border-accent/30 text-sm">
                <img src={activeCreator.avatar} alt={activeCreator.name} className="h-4 w-4 rounded-full object-cover" />
                <span className="text-foreground">Shopping {activeCreator.name}</span>
                <button onClick={() => setSelectedCreator(null)} className="text-muted-foreground hover:text-foreground">
                  <X className="h-3 w-3" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-4 py-6 sm:py-8 lg:px-8">
        <div className="grid lg:grid-cols-4 gap-6 lg:gap-8">
          {/* Sidebar Filters */}
          <div className={`fixed inset-0 z-50 lg:static lg:z-auto ${showFilters ? "block" : "hidden"} lg:block`}>
            {showFilters && (
              <div className="fixed inset-0 bg-black/50 lg:hidden" onClick={() => setShowFilters(false)} />
            )}

            <div className="fixed left-0 top-0 bottom-0 w-64 bg-background border-r border-border overflow-y-auto lg:static lg:w-auto lg:border-r lg:border-b-0 lg:overflow-visible p-4 lg:p-0 lg:pr-8 space-y-6">
              <div className="flex items-center justify-between lg:hidden mb-4">
                <h3 className="font-semibold text-foreground">Filters</h3>
                <button onClick={() => setShowFilters(false)} className="p-1">
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Category */}
              <div>
                <h3 className="font-semibold text-foreground mb-3 text-sm">Category</h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => { setSelectedCategory(category); setShowFilters(false) }}
                      className={`block w-full text-left px-3 py-2 rounded-lg transition text-sm ${
                        selectedCategory === category
                          ? "bg-accent text-accent-foreground font-medium"
                          : "text-muted-foreground hover:text-foreground hover:bg-muted"
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              {/* Creator */}
              <div>
                <h3 className="font-semibold text-foreground mb-3 text-sm">Creator</h3>
                <div className="space-y-2">
                  <button
                    onClick={() => { setSelectedCreator(null); setShowFilters(false) }}
                    className={`block w-full text-left px-3 py-2 rounded-lg transition text-sm ${
                      !selectedCreator
                        ? "bg-accent text-accent-foreground font-medium"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted"
                    }`}
                  >
                    All Creators
                  </button>
                  {creators.map((creator) => (
                    <button
                      key={creator.id}
                      onClick={() => { setSelectedCreator(creator.id); setShowFilters(false) }}
                      className={`flex items-center gap-2 w-full text-left px-3 py-2 rounded-lg transition text-sm ${
                        selectedCreator === creator.id
                          ? "bg-accent text-accent-foreground font-medium"
                          : "text-muted-foreground hover:text-foreground hover:bg-muted"
                      }`}
                    >
                      <img src={creator.avatar} alt={creator.name} className="h-4 w-4 rounded-full object-cover flex-shrink-0" />
                      <span className="truncate">{creator.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Price */}
              <div>
                <h3 className="font-semibold text-foreground mb-3 text-sm">Price</h3>
                <div className="space-y-2">
                  {priceRanges.map((range) => (
                    <button
                      key={range.label}
                      onClick={() => { setSelectedPrice(selectedPrice?.min === range.min ? null : range); setShowFilters(false) }}
                      className={`block w-full text-left px-3 py-2 rounded-lg transition text-sm ${
                        selectedPrice?.min === range.min
                          ? "bg-accent text-accent-foreground font-medium"
                          : "text-muted-foreground hover:text-foreground hover:bg-muted"
                      }`}
                    >
                      {range.label}
                    </button>
                  ))}
                </div>
              </div>

              {hasActiveFilters && (
                <Button
                  variant="outline"
                  className="w-full bg-transparent text-sm"
                  onClick={() => { setSelectedCategory("All"); setSelectedPrice(null); setSelectedCreator(null); setShowFilters(false) }}
                >
                  Clear Filters
                </Button>
              )}
            </div>
          </div>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            <div className="mb-4 sm:mb-6 flex items-center justify-between">
              <h2 className="text-xl sm:text-2xl font-bold text-foreground">
                {activeCreator ? activeCreator.name : selectedCategory === "All" ? "All Products" : selectedCategory}
              </h2>
              <p className="text-xs sm:text-sm text-muted-foreground">{filteredProducts.length} items</p>
            </div>

            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
                {filteredProducts.map((product) => {
                  const colors = product.colors ?? []
                  return (
                    <Link key={product.id} href={`/shop/${product.id}`}>
                      <Card className="overflow-hidden hover:shadow-lg transition group h-full flex flex-col cursor-pointer">
                        <div className="relative overflow-hidden bg-muted aspect-square">
                          <img
                            src={product.image || "/placeholder.svg"}
                            alt={product.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                          />
                          {!product.inStock && (
                            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                              <span className="text-white font-semibold text-xs sm:text-sm">Out of Stock</span>
                            </div>
                          )}
                          <button
                            onClick={(e) => { e.preventDefault(); toggleFavorite(product.id) }}
                            className="absolute top-2 right-2 p-1.5 sm:p-2 rounded-full bg-background/80 hover:bg-background transition"
                          >
                            <Heart className={`h-4 w-4 sm:h-5 sm:w-5 ${favorites.includes(product.id) ? "fill-destructive text-destructive" : "text-muted-foreground"}`} />
                          </button>
                        </div>

                        <div className="p-2 sm:p-4 space-y-2 sm:space-y-4 flex-1 flex flex-col">
                          <div>
                            <p className="text-xs text-muted-foreground mb-0.5 sm:mb-1">{product.category}</p>
                            <h3 className="font-semibold text-xs sm:text-sm text-foreground group-hover:text-accent transition line-clamp-2">
                              {product.name}
                            </h3>
                          </div>

                          <div className="flex items-center gap-1 sm:gap-2">
                            <div className="flex items-center gap-0.5">
                              {[...Array(5)].map((_, i) => (
                                <Star key={i} className={`h-3 w-3 sm:h-4 sm:w-4 ${i < Math.floor(product.rating) ? "fill-accent text-accent" : "text-muted-foreground"}`} />
                              ))}
                            </div>
                            <span className="text-xs text-muted-foreground">({product.reviews})</span>
                          </div>

                          {colors.length > 0 && (
                            <div className="flex gap-1 sm:gap-2">
                              {colors.slice(0, 3).map((color) => (
                                <div
                                  key={color}
                                  className="h-3 w-3 sm:h-4 sm:w-4 rounded-full border border-border"
                                  title={color}
                                  style={{ backgroundColor: colorMap[color] || "#ccc" }}
                                />
                              ))}
                              {colors.length > 3 && (
                                <span className="text-xs text-muted-foreground">+{colors.length - 3}</span>
                              )}
                            </div>
                          )}

                          <div className="flex items-center justify-between pt-2 border-t border-border mt-auto gap-2">
                            <span className="text-sm sm:text-lg font-bold text-foreground">${product.price.toFixed(2)}</span>
                            <Button
                              size="sm"
                              className="gap-1 h-8 sm:h-9 px-2 sm:px-3"
                              disabled={!product.inStock}
                              onClick={(e) => handleQuickAdd(e, product)}
                            >
                              <ShoppingBag className="h-3 w-3 sm:h-4 sm:w-4" />
                              <span className="hidden sm:inline">{addedId === product.id ? "Added!" : "Add"}</span>
                            </Button>
                          </div>
                        </div>
                      </Card>
                    </Link>
                  )
                })}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground mb-4 text-sm">No products found matching your filters.</p>
                <Button
                  variant="outline"
                  className="text-sm bg-transparent"
                  onClick={() => { setSelectedCategory("All"); setSelectedPrice(null); setSelectedCreator(null); setSearchQuery("") }}
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
      <CartDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </main>
  )
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background" />}>
      <ShopContent />
    </Suspense>
  )
}
