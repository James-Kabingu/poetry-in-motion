/**
 * CENTRAL PRODUCT CATALOG
 * ------------------------
 * This is the single source of truth for every product shown across the site:
 * /shop, /shop/[id], /search, /account/wishlist.
 *
 * TO ADD A NEW PRODUCT:
 * Just copy an existing object below, change the values, and give it a unique `id`.
 * No other file needs to change — every page reads from this array automatically.
 *
 * TO ADD A NEW CATEGORY:
 * Add the name to the `categories` array at the bottom too, so shop filters pick it up.
 */

export interface Product {
  id: string
  name: string
  price: number          // price in USD (base currency used by cart)
  priceKES?: number       // optional explicit KES price; if omitted, computed as price * 130
  image: string
  images?: string[]       // optional gallery; falls back to [image] if omitted
  rating: number
  reviews: number
  category: string
  colors?: string[]
  sizes?: string[]
  description?: string
  aiInsight?: string
  creator?: string
  inStock: boolean
}

export const products: Product[] = [
  {
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
    description: "Elevate your wardrobe with this timeless oversized blazer. Perfect for layering or wearing solo, this piece transitions seamlessly from office to evening.",
    aiInsight: "Based on your style preferences, this blazer matches your minimalist aesthetic while adding dimension to your wardrobe. The neutral colors work with 87% of your preferred color palette.",
    inStock: true,
  },
  {
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
    description: "Classic vintage-inspired denim that never goes out of style. Crafted from premium denim with a perfect fit.",
    aiInsight: "Perfect for your casual/everyday occasions. The classic silhouette complements your style preferences and works with 92% of your wardrobe.",
    inStock: true,
  },
  {
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
  {
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
  {
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
  {
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
  {
    id: "7",
    name: "Afro-Fusion Linen Blazer",
    price: 65.38,
    priceKES: 8500,
    image: "/images/categories/clothing.png",
    images: ["/images/categories/clothing.png"],
    rating: 4.7,
    reviews: 41,
    category: "Outerwear",
    creator: "Zawadi Designs",
    colors: ["Beige", "Olive"],
    sizes: ["S", "M", "L", "XL"],
    description: "A fusion of African print detailing and modern linen tailoring, hand-finished by Zawadi Designs.",
    aiInsight: "Locally crafted piece supporting independent East African designers.",
    inStock: true,
  },
  {
    id: "8",
    name: "Handwoven Tote Bag",
    price: 24.62,
    priceKES: 3200,
    image: "/images/categories/bags.png",
    images: ["/images/categories/bags.png"],
    rating: 4.9,
    reviews: 73,
    category: "Accessories",
    creator: "Mama Pima Studios",
    colors: ["Natural", "Black"],
    sizes: ["One Size"],
    description: "Handwoven from sustainable sisal fibre by artisans at Mama Pima Studios.",
    aiInsight: "Sustainably made accessory, pairs well with your minimalist and earthy tone pieces.",
    inStock: true,
  },
  {
    id: "9",
    name: "Beaded Leather Sandals",
    price: 43.08,
    priceKES: 5600,
    image: "/images/categories/shoes.png",
    images: ["/images/categories/shoes.png"],
    rating: 4.5,
    reviews: 28,
    category: "Shoes",
    creator: "Jua Kali Craft",
    colors: ["Brown", "Tan"],
    sizes: ["38", "39", "40", "41", "42", "43"],
    description: "Hand-beaded leather sandals crafted by Jua Kali Craft artisans using traditional techniques.",
    aiInsight: "Currently out of stock — high demand item, restocking soon.",
    inStock: false,
  },
]

export const categories = ["All", "Tops", "Bottoms", "Outerwear", "Accessories", "Shoes"]

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id)
}

export function getKESPrice(product: Product): number {
  return product.priceKES ?? Math.round(product.price * 130)
}
