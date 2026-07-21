import "server-only"
import type { TradeIn } from "./types"

// Centralized in-memory stores so a resource's list route and its
// [id]/[userId] route share the same data instead of each file holding
// its own disconnected copy (that was causing GET-by-id to 404 on things
// that were just created). Resets on server restart/redeploy — fine for
// the prototype, but don't treat this as durable data until it's a real DB.

export const tradeInStore: Record<string, TradeIn> = {}
export const subscriptionStore: Record<string, any> = {}
export const supportTicketStore: Record<string, any> = {}
export const cartStore: Record<string, any[]> = {}
export const favoritesStore: Record<string, string[]> = {}
export const styleProfileStore: Record<string, any> = {}
export const referralStore: Record<string, any> = {}
export const referralRewardStore: Record<string, number> = {}
