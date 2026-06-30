"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowLeft, Filter, Heart, Search, ShoppingBag, Sparkles, Star, X } from "lucide-react"
import Link from "next/link"
import { products, categories } from "@/lib/products"
const priceRanges = [
  { label: "Under $30", min: 0, max: 30 },
  { label: "$30-50", min: 30, max: 50 },
  { label: "$50-80", min: 50, max: 80 },
  { label: "$80+", min: 80, max: 999 },
]

export default function ShopPage() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedPrice, setSelectedPrice] = useState<{ min: number; max: number } | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [showFilters, setShowFilters] = useState(false)
  const [favorites, setFavorites] = useState<string[]>([])

  const filteredProducts = products.filter((product) => {
    const matchesCategory = selectedCategory === "All" || product.category === selectedCategory
    const matchesPrice = !selectedPrice || (product.price >= selectedPrice.min && product.price <= selectedPrice.max)
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesPrice && matchesSearch
  })

  const toggleFavorite = (productId: string) => {
    setFavorites((prev) => (prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]))
  }

  return (
    <main className="min-h-screen bg-background">
      {/* Header - optimized for mobile */}
      <div className="border-b border-border bg-card/50 sticky top-16 md:top-0 z-40">
        <div className="mx-auto max-w-7xl px-4 py-3 sm:py-4 lg:px-8">
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-xs sm:text-sm text-muted-foreground hover:text-foreground transition"
            >
              <ArrowLeft className="h-4 w-4" />
              <span className="hidden sm:inline">Back</span>
            </Link>
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-accent to-accent/60 flex items-center justify-center flex-shrink-0">
                <Sparkles className="h-5 w-5 text-accent-foreground" />
              </div>
              <span className="font-bold text-foreground text-sm sm:text-base">Shop</span>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="gap-2 md:hidden bg-transparent h-9"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="h-4 w-4" />
              <span className="text-xs">Filters</span>
            </Button>
          </div>

          {/* Search Bar - optimized for mobile */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-sm rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-4 py-6 sm:py-8 lg:px-8">
        <div className="grid lg:grid-cols-4 gap-6 lg:gap-8">
          {/* Sidebar Filters - mobile drawer style */}
          <div className={`fixed inset-0 z-50 lg:static lg:z-auto ${showFilters ? "block" : "hidden"} lg:block`}>
            {/* Mobile overlay */}
            {showFilters && (
              <div className="fixed inset-0 bg-black/50 lg:hidden" onClick={() => setShowFilters(false)} />
            )}

            {/* Filter panel */}
            <div className="fixed left-0 top-0 bottom-0 w-64 bg-background border-r border-border overflow-y-auto lg:static lg:w-auto lg:border-r lg:border-b-0 lg:overflow-visible p-4 lg:p-0 lg:pr-8 space-y-6">
              <div className="flex items-center justify-between lg:hidden mb-4">
                <h3 className="font-semibold text-foreground">Filters</h3>
                <button onClick={() => setShowFilters(false)} className="p-1">
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Category Filter */}
              <div>
                <h3 className="font-semibold text-foreground mb-3 text-sm">Category</h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => {
                        setSelectedCategory(category)
                        setShowFilters(false)
                      }}
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

              {/* Price Filter */}
              <div>
                <h3 className="font-semibold text-foreground mb-3 text-sm">Price</h3>
                <div className="space-y-2">
                  {priceRanges.map((range) => (
                    <button
                      key={range.label}
                      onClick={() => {
                        setSelectedPrice(selectedPrice?.min === range.min ? null : range)
                        setShowFilters(false)
                      }}
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

              {/* Clear Filters */}
              {(selectedCategory !== "All" || selectedPrice) && (
                <Button
                  variant="outline"
                  className="w-full bg-transparent text-sm"
                  onClick={() => {
                    setSelectedCategory("All")
                    setSelectedPrice(null)
                    setShowFilters(false)
                  }}
                >
                  Clear Filters
                </Button>
              )}
            </div>
          </div>

          {/* Products Grid - responsive columns */}
          <div className="lg:col-span-3">
            <div className="mb-4 sm:mb-6 flex items-center justify-between">
              <h2 className="text-xl sm:text-2xl font-bold text-foreground">
                {selectedCategory === "All" ? "All Products" : selectedCategory}
              </h2>
              <p className="text-xs sm:text-sm text-muted-foreground">{filteredProducts.length} items</p>
            </div>

            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
                {filteredProducts.map((product) => (
                  <Link key={product.id} href={`/shop/${product.id}`}>
                    <Card className="overflow-hidden hover:shadow-lg transition group h-full flex flex-col cursor-pointer">
                      {/* Image */}
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
                        {/* Favorite Button */}
                        <button
                          onClick={(e) => {
                            e.preventDefault()
                            toggleFavorite(product.id)
                          }}
                          className="absolute top-2 right-2 p-1.5 sm:p-2 rounded-full bg-background/80 hover:bg-background transition"
                        >
                          <Heart
                            className={`h-4 w-4 sm:h-5 sm:w-5 ${
                              favorites.includes(product.id)
                                ? "fill-destructive text-destructive"
                                : "text-muted-foreground"
                            }`}
                          />
                        </button>
                      </div>

                      {/* Content */}
                      <div className="p-2 sm:p-4 space-y-2 sm:space-y-4 flex-1 flex flex-col">
                        <div>
                          <p className="text-xs text-muted-foreground mb-0.5 sm:mb-1">{product.category}</p>
                          <h3 className="font-semibold text-xs sm:text-sm text-foreground group-hover:text-accent transition line-clamp-2">
                            {product.name}
                          </h3>
                        </div>

                        {/* Rating */}
                        <div className="flex items-center gap-1 sm:gap-2">
                          <div className="flex items-center gap-0.5">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-3 w-3 sm:h-4 sm:w-4 ${
                                  i < Math.floor(product.rating) ? "fill-accent text-accent" : "text-muted-foreground"
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-xs text-muted-foreground">({product.reviews})</span>
                        </div>

                        {/* Colors */}
                        <div className="flex gap-1 sm:gap-2">
                          {product.colors.slice(0, 3).map((color) => (
                            <div
                              key={color}
                              className="h-3 w-3 sm:h-4 sm:w-4 rounded-full border border-border"
                              title={color}
                              style={{
                                backgroundColor:
                                  color === "Black"
                                    ? "#000"
                                    : color === "White"
                                      ? "#fff"
                                      : color === "Navy"
                                        ? "#001f3f"
                                        : color === "Camel"
                                          ? "#c19a6b"
                                          : color === "Gray"
                                            ? "#808080"
                                            : color === "Cream"
                                              ? "#fffdd0"
                                              : color === "Red"
                                                ? "#ff0000"
                                                : color === "Burgundy"
                                                  ? "#800020"
                                                  : color === "Light Blue"
                                                    ? "#add8e6"
                                                    : color === "Dark Blue"
                                                      ? "#00008b"
                                                      : color === "Champagne"
                                                        ? "#f7e7ce"
                                                        : color === "Blush"
                                                          ? "#ffc0cb"
                                                          : color === "Emerald"
                                                            ? "#50c878"
                                                            : color === "Beige"
                                                              ? "#f5f5dc"
                                                              : "#ccc",
                              }}
                            />
                          ))}
                          {product.colors.length > 3 && (
                            <span className="text-xs text-muted-foreground">+{product.colors.length - 3}</span>
                          )}
                        </div>

                        {/* Price and CTA */}
                        <div className="flex items-center justify-between pt-2 border-t border-border mt-auto gap-2">
                          <span className="text-sm sm:text-lg font-bold text-foreground">${product.price}</span>
                          <Button size="sm" className="gap-1 h-8 sm:h-9 px-2 sm:px-3" disabled={!product.inStock}>
                            <ShoppingBag className="h-3 w-3 sm:h-4 sm:w-4" />
                            <span className="hidden sm:inline">Add</span>
                          </Button>
                        </div>
                      </div>
                    </Card>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground mb-4 text-sm">No products found matching your filters.</p>
                <Button
                  variant="outline"
                  className="text-sm bg-transparent"
                  onClick={() => {
                    setSelectedCategory("All")
                    setSelectedPrice(null)
                    setSearchQuery("")
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
