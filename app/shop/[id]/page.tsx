"use client"

import { use, useState } from "react"
import { useCart } from "@/lib/cart-context"
import { getProductById, products } from "@/lib/products"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Heart, ShoppingBag, Sparkles, Star, Truck, RotateCcw, Shield, ShoppingCart } from "lucide-react"
import Link from "next/link"

const colorMap: Record<string, string> = {
  Black: "#000", White: "#fff", Navy: "#001f3f", Camel: "#c19a6b",
  Gray: "#808080", Cream: "#fffdd0", Red: "#ff0000", Burgundy: "#800020",
  "Light Blue": "#add8e6", "Dark Blue": "#00008b", Champagne: "#f7e7ce",
  Blush: "#ffc0cb", Emerald: "#50c878", Beige: "#f5f5dc", Olive: "#708238",
  Natural: "#e8dcc4", Brown: "#6f4e37", Tan: "#d2b48c",
}

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const product = getProductById(id) || products[0]
  const { addItem, totalItems } = useCart()

  const colors = product.colors ?? ["Default"]
  const sizes = product.sizes ?? ["One Size"]
  const images = product.images ?? [product.image]

  const [selectedColor, setSelectedColor] = useState(colors[0])
  const [selectedSize, setSelectedSize] = useState(sizes[0])
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [isFavorite, setIsFavorite] = useState(false)
  const [isAdded, setIsAdded] = useState(false)

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      color: selectedColor,
      size: selectedSize,
      quantity,
      category: product.category,
    })
    setIsAdded(true)
    setTimeout(() => setIsAdded(false), 2000)
  }

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card/50 sticky top-0 z-40">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <Link href="/shop" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition">
            <ArrowLeft className="h-4 w-4" />
            Back to Shop
          </Link>
          <Link href="/cart" className="relative inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition">
            <ShoppingCart className="h-5 w-5" />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 h-4 w-4 rounded-full bg-accent text-accent-foreground text-xs flex items-center justify-center font-bold">
                {totalItems}
              </span>
            )}
          </Link>
        </div>
      </div>

      {/* Product Content */}
      <div className="mx-auto max-w-7xl px-4 py-8 sm:py-12 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">

          {/* Images */}
          <div className="space-y-4">
            <div className="relative overflow-hidden rounded-xl bg-muted aspect-square lg:aspect-auto lg:h-[520px]">
              <img
                src={images[selectedImage] || "/placeholder.svg"}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            {images.length > 1 && (
              <div className="grid grid-cols-4 gap-3">
                {images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={`relative overflow-hidden rounded-lg bg-muted aspect-square border-2 transition ${
                      selectedImage === i ? "border-accent" : "border-transparent hover:border-accent/50"
                    }`}
                  >
                    <img src={img || "/placeholder.svg"} alt={`${product.name} ${i + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details */}
          <div className="space-y-6">
            <div>
              {product.creator && (
                <p className="text-sm text-accent font-medium mb-1">{product.creator}</p>
              )}
              <p className="text-sm text-muted-foreground mb-1">{product.category}</p>
              <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-3">{product.name}</h1>
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`h-4 w-4 ${i < Math.floor(product.rating) ? "fill-accent text-accent" : "text-muted-foreground"}`} />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">{product.rating} ({product.reviews} reviews)</span>
              </div>
              <div className="text-3xl font-bold text-foreground">${product.price.toFixed(2)}</div>
            </div>

            {/* AI Insight */}
            {product.aiInsight && (
              <div className="p-4 rounded-lg border border-accent/30 bg-accent/5">
                <div className="flex gap-3">
                  <Sparkles className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-foreground mb-1 text-sm">AI Insight</p>
                    <p className="text-sm text-muted-foreground">{product.aiInsight}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Description */}
            {product.description && (
              <div>
                <h3 className="font-semibold text-foreground mb-2">About This Item</h3>
                <p className="text-muted-foreground leading-relaxed text-sm">{product.description}</p>
              </div>
            )}

            {/* Color */}
            <div>
              <h3 className="font-semibold text-foreground mb-3">
                Color: <span className="font-normal text-muted-foreground">{selectedColor}</span>
              </h3>
              <div className="flex gap-2 flex-wrap">
                {colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    title={color}
                    className={`h-8 w-8 rounded-full border-2 transition ${
                      selectedColor === color ? "border-accent scale-110" : "border-border hover:border-accent/60"
                    }`}
                    style={{ backgroundColor: colorMap[color] || "#ccc" }}
                  />
                ))}
              </div>
            </div>

            {/* Size */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-foreground">
                  Size: <span className="font-normal text-muted-foreground">{selectedSize}</span>
                </h3>
                <button className="text-sm text-accent hover:underline">Size Guide</button>
              </div>
              <div className="flex gap-2 flex-wrap">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-3 py-2 rounded-lg border-2 transition font-medium text-sm min-w-[48px] ${
                      selectedSize === size
                        ? "border-accent bg-accent/10 text-foreground"
                        : "border-border text-muted-foreground hover:border-accent"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div>
              <h3 className="font-semibold text-foreground mb-3">Quantity</h3>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="h-9 w-9 rounded-lg border border-border hover:bg-muted transition flex items-center justify-center font-bold"
                >
                  -
                </button>
                <span className="text-lg font-semibold text-foreground w-8 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="h-9 w-9 rounded-lg border border-border hover:bg-muted transition flex items-center justify-center font-bold"
                >
                  +
                </button>
              </div>
            </div>

            {/* CTA */}
            <div className="flex gap-3 pt-2">
              <Button size="lg" className="flex-1 gap-2" onClick={handleAddToCart} disabled={!product.inStock}>
                <ShoppingBag className="h-5 w-5" />
                {!product.inStock ? "Out of Stock" : isAdded ? "Added!" : "Add to Cart"}
              </Button>
              <Button size="lg" variant="outline" className="gap-2 bg-transparent" onClick={() => setIsFavorite(!isFavorite)}>
                <Heart className={`h-5 w-5 ${isFavorite ? "fill-destructive text-destructive" : ""}`} />
              </Button>
              {isAdded && (
                <Link href="/cart">
                  <Button size="lg" variant="outline" className="gap-2 bg-transparent">
                    View Cart
                  </Button>
                </Link>
              )}
            </div>

            {/* Trust */}
            <div className="grid grid-cols-3 gap-3 pt-4 border-t border-border">
              <div className="flex flex-col items-center gap-1.5 text-center">
                <Truck className="h-5 w-5 text-accent" />
                <span className="text-xs font-medium text-foreground">Free Shipping</span>
                <span className="text-xs text-muted-foreground">Orders over $50</span>
              </div>
              <div className="flex flex-col items-center gap-1.5 text-center">
                <RotateCcw className="h-5 w-5 text-accent" />
                <span className="text-xs font-medium text-foreground">Easy Returns</span>
                <span className="text-xs text-muted-foreground">30-day guarantee</span>
              </div>
              <div className="flex flex-col items-center gap-1.5 text-center">
                <Shield className="h-5 w-5 text-accent" />
                <span className="text-xs font-medium text-foreground">Secure</span>
                <span className="text-xs text-muted-foreground">Safe checkout</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
