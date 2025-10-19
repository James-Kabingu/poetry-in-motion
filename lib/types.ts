// Core type definitions for the entire application

export interface User {
  id: string
  email: string
  name: string
  avatar?: string
  bodyType?: string
  skinTone?: string
  stylePreferences?: string[]
  budget?: number
  favoriteColors?: string[]
  occasions?: string[]
  createdAt: Date
  updatedAt: Date
}

export interface Product {
  id: string
  name: string
  description: string
  price: number
  originalPrice?: number
  image: string
  images?: string[]
  category: string
  colors: string[]
  sizes: string[]
  rating: number
  reviews: number
  inStock: boolean
  creatorId?: string
  isPreOwned?: boolean
  sustainability?: {
    carbonFootprint: number
    waterUsed: number
    materials: string[]
  }
  createdAt: Date
}

export interface Order {
  id: string
  userId: string
  items: OrderItem[]
  totalPrice: number
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled"
  shippingAddress: Address
  createdAt: Date
  updatedAt: Date
}

export interface OrderItem {
  productId: string
  quantity: number
  price: number
  color?: string
  size?: string
}

export interface Address {
  street: string
  city: string
  state: string
  zipCode: string
  country: string
}

export interface Creator {
  id: string
  userId: string
  name: string
  bio: string
  avatar: string
  collections: string[]
  totalEarnings: number
  followers: number
  verified: boolean
  createdAt: Date
}

export interface Collection {
  id: string
  creatorId: string
  name: string
  description: string
  products: string[]
  votes: number
  status: "draft" | "voting" | "production" | "available"
  createdAt: Date
}

export interface TradeIn {
  id: string
  userId: string
  productId: string
  condition: "like-new" | "good" | "fair"
  estimatedValue: number
  status: "pending" | "approved" | "rejected" | "completed"
  createdAt: Date
}

export interface PreOwnedListing {
  id: string
  originalProductId: string
  sellerId: string
  condition: "like-new" | "good" | "fair"
  price: number
  images: string[]
  status: "available" | "sold"
  createdAt: Date
}

export interface StyleProfile {
  userId: string
  bodyType: string
  skinTone: string
  stylePreferences: string[]
  budget: number
  favoriteColors: string[]
  occasions: string[]
  matchPercentages?: Record<string, number>
}

export interface CommunityVote {
  id: string
  userId: string
  collectionId: string
  voteType: "upvote" | "downvote"
  createdAt: Date
}

export interface StylingSession {
  id: string
  userId: string
  stylistId: string
  scheduledAt: Date
  duration: number
  status: "scheduled" | "completed" | "cancelled"
  notes?: string
  recommendations?: string[]
}
