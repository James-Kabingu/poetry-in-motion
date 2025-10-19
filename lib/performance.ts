// Performance monitoring utilities
export const reportWebVitals = (metric: any) => {
  console.log("[Performance]", metric.name, metric.value)

  // Send to analytics service
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", metric.name, {
      value: Math.round(metric.value),
      event_category: "Web Vitals",
      event_label: metric.id,
      non_interaction: true,
    })
  }
}

export const optimizeImage = (src: string, width: number, height: number) => {
  // Return optimized image URL with proper sizing
  return `${src}?w=${width}&h=${height}&q=80&auto=format`
}

export const prefetchRoute = (href: string) => {
  if (typeof window !== "undefined") {
    const link = document.createElement("link")
    link.rel = "prefetch"
    link.href = href
    document.head.appendChild(link)
  }
}
