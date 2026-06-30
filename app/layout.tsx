import type React from "react"
import type { Metadata } from "next"
import { Geist } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { ThemeProvider } from "@/components/theme-provider"
import { CartProvider } from "@/lib/cart-context"
import { SearchProvider } from "@/lib/search-context"
import { MobileHeader } from "@/components/mobile-header"
import { MobileBottomNav } from "@/components/mobile-bottom-nav"
import "./globals.css"

const geist = Geist({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Poetry In Motion — Mali Safi.",
  description: "Style. Culture. Commerce. In Motion. AI-powered fashion that understands your vibe, fits your life, and moves the world forward.",
  generator: "v0.app",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Poetry In Motion",
  },
  formatDetection: {
    telephone: false,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#3d2c1e" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/icon-192.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5, viewport-fit=cover" />
      </head>
      <body className={`${geist.className} font-sans antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <CartProvider>
          <SearchProvider>
            <MobileHeader />
            <main className="pb-16 md:pb-0">
              {children}
            </main>
            <MobileBottomNav />
          </SearchProvider>
          </CartProvider>
        </ThemeProvider>
        <Analytics />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                navigator.serviceWorker.register('/sw.js').catch(err => console.log('SW registration failed:', err))
              }
            `,
          }}
        />
      </body>
    </html>
  )
}
