"use client"

import { useState } from "react"
import { useCart } from "@/lib/cart-context"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Heart, ShoppingBag, Sparkles, Star, Truck, RotateCcw, Shield, ShoppingCart } from "lucide-react"
import Link from "next/link"

interface ProductDetail {
  id: string
  name: string
  price: number
  image: string
  images: string[]
  rating: number
  reviews: number
  category: string
  colors: string[]
  sizes: string[]
  description: string
  aiInsight: string
  inStock: boolean
}

const productDetails: Record<string, ProductDetail> = {
  "1": {
    id: "1",
    name: "Oversized Blazer",
    price: 65,
    image: "/images/banners/shopping.png",
    images: ["/images/banners/shopping.png", "/images/banners/hero.png"],
    rating: 4.8,
    reviews: 124,
    category: "Outerwear",
    colors: ["Black", "Navy", "Camel"],
    sizes: ["XS", "S", "M", "L", "XL"],
    description: "Elevate your wardrobe with this timeless oversized blazer. Perfect for layering or wearing solo, this piece transitions seamlessly from office to evening. The relaxed fit flatters all body types while maintaining a polished silhouette.",
    aiInsight: "Based on your style preferences, this blazer matches your minimalist aesthetic while adding dimension to your wardrobe. The neutral colors work with 87% of your preferred color palette.",
    inStock: true,
  },
  "2": {
    id: "2",
    name: "Vintage Denim",
    price: 55,
    image: "/images/banners/hero.png",
    images: ["/images/banners/hero.png"],
    rating: 4.9,
    reviews: 89,
    category: "Bottoms",
    colors: ["Light Blue", "Dark Blue", "Black"],
    sizes: ["24", "25", "26", "27", "28", "29", "30"],
    description: "Classic vintage-inspired denim that never goes out of style. Crafted from premium denim with a perfect fit, these jeans are designed to become your go-to everyday essential.",
    aiInsight: "Perfect for your casual/everyday occasions. The classic silhouette complements your style preferences and works with 92% of your wardrobe.",
    inStock: true,
  },
  "3": {
    id: "3",
    name: "Minimalist Tee",
    price: 28,
    image: "/images/banners/shopping.png",
    images: ["/images/banners/shopping.png"],
    rating: 4.7,
    reviews: 156,
    category: "Tops",
    colors: ["White", "Black", "Gray", "Cream"],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    description: "The perfect everyday tee. Clean lines, premium cotton, and a fit that works for everyone.",
    aiInsight: "A wardrobe essential that pairs with everything you own. High versatility score.",
    inStock: true,
  },
  "4": {
    id: "4",
    name: "Statement Jacket",
    price: 85,
    image: "/images/banners/community.png",
    images: ["/images/banners/community.png"],
    rating: 4.9,
    reviews: 67,
    category: "Outerwear",
    colors: ["Red", "Black", "Burgundy"],
    sizes: ["XS", "S", "M", "L", "XL"],
    description: "Make your entrance count. This statement jacket is designed to turn heads and start conversations.",
    aiInsight: "Bold choice that aligns with your taste for standout pieces. Pairs well with neutrals.",
    inStock: true,
  },
  "5": {
    id: "5",
    name: "Tailored Trousers",
    price: 72,
    image: "/images/banners/hero.png",
    images: ["/images/banners/hero.png"],
    rating: 4.8,
    reviews: 98,
    category: "Bottoms",
    colors: ["Black", "Navy", "Gray", "Beige"],
    sizes: ["24", "25", "26", "27", "28", "29", "30"],
    description: "Sharp, structured, and endlessly versatile. These tailored trousers work from boardroom to brunch.",
    aiInsight: "High compatibility with your existing wardrobe. Professional and smart-casual ready.",
    inStock: true,
  },
  "6": {
    id: "6",
    name: "Silk Camisole",
    price: 45,
    image: "/images/banners/shopping.png",
    images: ["/images/banners/shopping.png"],
    rating: 4.6,
    reviews: 112,
    category: "Tops",
    colors: ["Champagne", "Black", "Blush", "Emerald"],
    sizes: ["XS", "S", "M", "L", "XL"],
    description: "Effortless elegance in silk. Layer it or wear it alone — this camisole does both beautifully.",
    aiInsight: "Versatile piece that elevates both casual and formal looks in your wardrobe.",
    inStock: true,
  },
}

const colorMap: Record<string, string> = {
  Black: "#000", White: "#fff", Navy: "#001f3f", Camel: "#c19a6b",
  Gray: "#808080", Cream: "#fffdd0", Red: "#ff0000", Burgundy: "#800020",
  "Light Blue": "#add8e6", "Dark Blue": "#00008b", Champagne: "#f7e7ce",
  Blush: "#ffc0cb", Emerald: "#50c878", Beige: "#f5f5dc",
}

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const product = productDetails[params.id] || productDetails["1"]
  const { addItem, totalItems } = useCart()

  const [selectedColor, setSelectedColor] = useState(product.colors[0])
  const [selectedSize, setSelectedSize] = useState(product.sizes[0])
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
                src={product.images[selectedImage] || "/placeholder.svg"}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            {product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-3">
                {product.images.map((img, i) => (
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
              <div className="text-3xl font-bold text-foreground">${product.price}</div>
            </div>

            {/* AI Insight */}
            <div className="p-4 rounded-lg border border-accent/30 bg-accent/5">
              <div className="flex gap-3">
                <Sparkles className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-foreground mb-1 text-sm">AI Insight</p>
                  <p className="text-sm text-muted-foreground">{product.aiInsight}</p>
                </div>
              </div>
            </div>

            {/* Description */}
            <div>
              <h3 className="font-semibold text-foreground mb-2">About This Item</h3>
              <p className="text-muted-foreground leading-relaxed text-sm">{product.description}</p>
            </div>

            {/* Color */}
            <div>
              <h3 className="font-semibold text-foreground mb-3">
                Color: <span className="font-normal text-muted-foreground">{selectedColor}</span>
              </h3>
              <div className="flex gap-2 flex-wrap">
                {product.colors.map((color) => (
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
                {product.sizes.map((size) => (
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
                {isAdded ? "Added!" : "Add to Cart"}
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
