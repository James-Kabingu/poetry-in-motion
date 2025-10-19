// Mock data for development - easily replaceable with real database

import type { User, Product, Order, Creator, Collection } from "./types"

export const mockUsers: Record<string, User> = {
  "user-1": {
    id: "user-1",
    email: "alex@example.com",
    name: "Alex Kariuki",
    avatar: "/avatar-1.jpg",
    bodyType: "pear",
    skinTone: "deep",
    stylePreferences: ["minimalist", "trendy", "sustainable"],
    budget: 80,
    favoriteColors: ["black", "white", "purple"],
    occasions: ["casual", "work", "social"],
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2024-10-19"),
  },
}

export const mockProducts: Record<string, Product> = {
  "prod-1": {
    id: "prod-1",
    name: "Oversized Blazer",
    description: "Premium AI-designed oversized blazer perfect for any occasion",
    price: 65,
    originalPrice: 85,
    image: "/oversized-blazer.png",
    category: "outerwear",
    colors: ["black", "navy", "burgundy"],
    sizes: ["XS", "S", "M", "L", "XL"],
    rating: 4.8,
    reviews: 124,
    inStock: true,
    creatorId: "creator-1",
    sustainability: {
      carbonFootprint: 2.5,
      waterUsed: 450,
      materials: ["organic cotton", "recycled polyester"],
    },
    createdAt: new Date("2024-09-01"),
  },
  "prod-2": {
    id: "prod-2",
    name: "Vintage Denim Jeans",
    description: "Timeless denim with a modern twist",
    price: 55,
    image: "/vintage-denim-jeans.jpg",
    category: "bottoms",
    colors: ["light-blue", "dark-blue", "black"],
    sizes: ["24", "25", "26", "27", "28", "29", "30"],
    rating: 4.6,
    reviews: 89,
    inStock: true,
    creatorId: "creator-2",
    sustainability: {
      carbonFootprint: 3.2,
      waterUsed: 650,
      materials: ["organic cotton"],
    },
    createdAt: new Date("2024-08-15"),
  },
  "prod-3": {
    id: "prod-3",
    name: "Minimalist White Tee",
    description: "Essential white t-shirt for any wardrobe",
    price: 25,
    image: "/minimalist-white-tee.jpg",
    category: "tops",
    colors: ["white", "cream", "off-white"],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    rating: 4.9,
    reviews: 256,
    inStock: true,
    sustainability: {
      carbonFootprint: 1.2,
      waterUsed: 200,
      materials: ["organic cotton"],
    },
    createdAt: new Date("2024-07-20"),
  },
}

export const mockCreators: Record<string, Creator> = {
  "creator-1": {
    id: "creator-1",
    userId: "user-2",
    name: "Amara Designs",
    bio: "Sustainable fashion designer from Nairobi creating timeless pieces",
    avatar: "/avatar-2.jpg",
    collections: ["col-1"],
    totalEarnings: 12500,
    followers: 3400,
    verified: true,
    createdAt: new Date("2024-01-01"),
  },
  "creator-2": {
    id: "creator-2",
    userId: "user-3",
    name: "Urban Threads",
    bio: "Contemporary fashion with African heritage",
    avatar: "/avatar-3.jpg",
    collections: ["col-2"],
    totalEarnings: 8900,
    followers: 2100,
    verified: true,
    createdAt: new Date("2024-02-15"),
  },
}

export const mockCollections: Record<string, Collection> = {
  "col-1": {
    id: "col-1",
    creatorId: "creator-1",
    name: "Sustainable Summer 2024",
    description: "Eco-friendly collection for the modern African woman",
    products: ["prod-1", "prod-3"],
    votes: 1250,
    status: "available",
    createdAt: new Date("2024-08-01"),
  },
  "col-2": {
    id: "col-2",
    creatorId: "creator-2",
    name: "Heritage Reimagined",
    description: "Traditional patterns with contemporary cuts",
    products: ["prod-2"],
    votes: 890,
    status: "available",
    createdAt: new Date("2024-07-15"),
  },
}

export const mockOrders: Record<string, Order> = {
  "order-1": {
    id: "order-1",
    userId: "user-1",
    items: [{ productId: "prod-1", quantity: 1, price: 65, color: "black", size: "M" }],
    totalPrice: 65,
    status: "delivered",
    shippingAddress: {
      street: "123 Westlands Road",
      city: "Nairobi",
      state: "Nairobi",
      zipCode: "00100",
      country: "Kenya",
    },
    createdAt: new Date("2024-09-15"),
    updatedAt: new Date("2024-09-20"),
  },
}
