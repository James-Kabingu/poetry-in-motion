import { pgTable, uuid, text, timestamp, integer, boolean, jsonb } from "drizzle-orm/pg-core"

export const users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  email: text("email").notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  phone: text("phone"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
})

export const profiles = pgTable("profiles", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id").notNull().references(() => users.id, { onDelete: "cascade" }).unique(),
  name: text("name").notNull(),
  avatarUrl: text("avatar_url"),
  dob: text("dob"),
  styleTags: jsonb("style_tags").$type<string[]>().default([]),
  bodyType: text("body_type"),
  skinTone: text("skin_tone"),
  budgetCents: integer("budget_cents"),
  favoriteColors: jsonb("favorite_colors").$type<string[]>().default([]),
  occasions: jsonb("occasions").$type<string[]>().default([]),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
})

export const addresses = pgTable("addresses", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  label: text("label").notNull(),
  recipientName: text("recipient_name").notNull(),
  line1: text("line1").notNull(),
  line2: text("line2"),
  city: text("city").notNull(),
  region: text("region"),
  postalCode: text("postal_code"),
  country: text("country").notNull().default("Kenya"),
  isDefault: boolean("is_default").default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
})

export const creators = pgTable("creators", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id").references(() => users.id, { onDelete: "set null" }),
  displayName: text("display_name").notNull(),
  bio: text("bio"),
  avatarUrl: text("avatar_url"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
})

export const products = pgTable("products", {
  id: text("id").primaryKey(),
  creatorId: text("creator_id"),
  name: text("name").notNull(),
  description: text("description"),
  priceCents: integer("price_cents").notNull(),
  currency: text("currency").notNull().default("USD"),
  colors: jsonb("colors").$type<string[]>().default([]),
  sizes: jsonb("sizes").$type<string[]>().default([]),
  images: jsonb("images").$type<string[]>().default([]),
  stock: integer("stock").notNull().default(0),
  rating: integer("rating_x10").notNull().default(0),
  reviews: integer("reviews").notNull().default(0),
  aiInsight: text("ai_insight"),
  inStock: boolean("in_stock").notNull().default(true),
  createdAt: timestamp("created_at").defaultNow().notNull(),
})

export const wishlists = pgTable("wishlists", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  productId: text("product_id").notNull().references(() => products.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
})

export const orders = pgTable("orders", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  status: text("status").notNull().default("pending"),
  totalCents: integer("total_cents").notNull(),
  currency: text("currency").notNull().default("USD"),
  addressId: uuid("address_id").references(() => addresses.id, { onDelete: "set null" }),
  shippingAddress: jsonb("shipping_address").$type<{
    fullName: string
    phone: string
    email: string
    county: string
    town: string
    street?: string
    building?: string
  }>(),
  paymentMethod: text("payment_method"),
  mpesaReceiptNumber: text("mpesa_receipt_number"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
})

export const orderItems = pgTable("order_items", {
  id: uuid("id").defaultRandom().primaryKey(),
  orderId: uuid("order_id").notNull().references(() => orders.id, { onDelete: "cascade" }),
  productId: text("product_id").notNull().references(() => products.id, { onDelete: "restrict" }),
  quantity: integer("quantity").notNull().default(1),
  unitPriceCents: integer("unit_price_cents").notNull(),
  color: text("color"),
  size: text("size"),
})

export const cartItems = pgTable("cart_items", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  productId: text("product_id").notNull().references(() => products.id, { onDelete: "cascade" }),
  quantity: integer("quantity").notNull().default(1),
  color: text("color"),
  size: text("size"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
})

export const tradeIns = pgTable("trade_ins", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  productId: text("product_id").notNull().references(() => products.id, { onDelete: "cascade" }),
  condition: text("condition").notNull(),
  estimatedValueCents: integer("estimated_value_cents").notNull(),
  status: text("status").notNull().default("pending"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
})

export const supportTickets = pgTable("support_tickets", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  subject: text("subject").notNull(),
  description: text("description"),
  category: text("category"),
  priority: text("priority").notNull().default("medium"),
  status: text("status").notNull().default("open"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
})

export const supportTicketResponses = pgTable("support_ticket_responses", {
  id: uuid("id").defaultRandom().primaryKey(),
  ticketId: uuid("ticket_id").notNull().references(() => supportTickets.id, { onDelete: "cascade" }),
  authorId: uuid("author_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  body: text("body").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
})

export const subscriptions = pgTable("subscriptions", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id").notNull().references(() => users.id, { onDelete: "cascade" }).unique(),
  tier: text("tier").notNull().default("free"),
  status: text("status").notNull().default("active"),
  priceCents: integer("price_cents").notNull().default(0),
  startDate: timestamp("start_date").defaultNow().notNull(),
  renewalDate: timestamp("renewal_date"),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
})

export const referrals = pgTable("referrals", {
  id: uuid("id").defaultRandom().primaryKey(),
  referrerId: uuid("referrer_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  referredEmail: text("referred_email").notNull(),
  status: text("status").notNull().default("pending"),
  rewardCents: integer("reward_cents").notNull().default(0),
  createdAt: timestamp("created_at").defaultNow().notNull(),
})
