// Analytics tracking utility for user behavior, conversions, and business metrics
export interface AnalyticsEvent {
  eventName: string
  userId?: string
  properties?: Record<string, any>
  timestamp: Date
}

// In-memory analytics storage (replace with real analytics service like Mixpanel/Amplitude)
const analyticsEvents: AnalyticsEvent[] = []

export const trackEvent = (eventName: string, userId?: string, properties?: Record<string, any>) => {
  const event: AnalyticsEvent = {
    eventName,
    userId,
    properties,
    timestamp: new Date(),
  }
  analyticsEvents.push(event)
  console.log("[Analytics]", eventName, properties)
}

export const getAnalytics = () => {
  return {
    totalEvents: analyticsEvents.length,
    events: analyticsEvents,
    conversionFunnel: {
      quizStarted: analyticsEvents.filter((e) => e.eventName === "quiz_started").length,
      quizCompleted: analyticsEvents.filter((e) => e.eventName === "quiz_completed").length,
      productViewed: analyticsEvents.filter((e) => e.eventName === "product_viewed").length,
      cartAdded: analyticsEvents.filter((e) => e.eventName === "cart_added").length,
      orderCompleted: analyticsEvents.filter((e) => e.eventName === "order_completed").length,
    },
    userEngagement: {
      uniqueUsers: new Set(analyticsEvents.map((e) => e.userId)).size,
      averageEventsPerUser: analyticsEvents.length / new Set(analyticsEvents.map((e) => e.userId)).size || 0,
    },
  }
}

export const trackPageView = (page: string, userId?: string) => {
  trackEvent("page_view", userId, { page })
}

export const trackQuizStart = (userId?: string) => {
  trackEvent("quiz_started", userId)
}

export const trackQuizComplete = (userId: string, styleProfile: any) => {
  trackEvent("quiz_completed", userId, { styleProfile })
}

export const trackProductView = (userId: string, productId: string, productName: string) => {
  trackEvent("product_viewed", userId, { productId, productName })
}

export const trackAddToCart = (userId: string, productId: string, quantity: number, price: number) => {
  trackEvent("cart_added", userId, { productId, quantity, price, total: quantity * price })
}

export const trackOrderComplete = (userId: string, orderId: string, total: number, itemCount: number) => {
  trackEvent("order_completed", userId, { orderId, total, itemCount })
}

export const trackCreatorSignup = (creatorId: string, creatorName: string) => {
  trackEvent("creator_signup", creatorId, { creatorName })
}

export const trackCollectionVote = (userId: string, collectionId: string) => {
  trackEvent("collection_voted", userId, { collectionId })
}

export const trackTradeIn = (userId: string, itemId: string, valuationAmount: number) => {
  trackEvent("trade_in_submitted", userId, { itemId, valuationAmount })
}

export const trackReferral = (referrerId: string, referredUserId: string) => {
  trackEvent("referral_completed", referrerId, { referredUserId })
}
