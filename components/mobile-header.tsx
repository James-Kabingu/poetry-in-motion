"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X, Search, Camera, ShoppingCart, User } from "lucide-react"
import { ThemeToggle } from "./theme-toggle"
import { useCart } from "@/lib/cart-context"

export function MobileHeader() {
  const [isOpen, setIsOpen] = useState(false)
  const { totalItems } = useCart()

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-background border-b border-border md:hidden">
        <div className="flex items-center justify-between h-16 px-3">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 min-w-0">
            <img src="/images/logos/logo-light.png" alt="Poetry In Motion" className="h-7 w-7 object-contain flex-shrink-0" />
            <span className="font-bold text-xs text-foreground leading-tight truncate">
              Poetry<br />In Motion
            </span>
          </Link>

          {/* Right Icons — only 4, matches original working layout */}
          <div className="flex items-center gap-0.5 flex-shrink-0">
            <Link href="/search" className="p-2 hover:bg-muted rounded-lg transition-colors">
              <Search className="w-5 h-5" />
            </Link>
            <Link href="/cart" className="p-2 hover:bg-muted rounded-lg transition-colors relative">
              <ShoppingCart className="w-5 h-5" />
              {totalItems > 0 && (
                <span className="absolute top-1 right-1 h-4 w-4 bg-accent text-accent-foreground text-xs rounded-full flex items-center justify-center font-bold">
                  {totalItems > 9 ? "9+" : totalItems}
                </span>
              )}
            </Link>
            <Link href="/account" className="p-2 hover:bg-muted rounded-lg transition-colors">
              <User className="w-5 h-5" />
            </Link>
            <button onClick={() => setIsOpen(!isOpen)} className="p-2 hover:bg-muted rounded-lg transition-colors">
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu — camera search and theme toggle live here now */}
        {isOpen && (
          <nav className="border-t border-border bg-background shadow-lg">
            <div className="px-4 py-3 space-y-2">
              <Link href="/search?mode=image" onClick={() => setIsOpen(false)} className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-muted transition-colors">
                <Camera className="w-4 h-4" />
                Search by Image
              </Link>
              <Link href="/quiz" onClick={() => setIsOpen(false)} className="block px-3 py-2 rounded-lg hover:bg-muted transition-colors">
                Take Style Quiz
              </Link>
              <Link href="/shop" onClick={() => setIsOpen(false)} className="block px-3 py-2 rounded-lg hover:bg-muted transition-colors">
                Shop
              </Link>
              <Link href="/creators" onClick={() => setIsOpen(false)} className="block px-3 py-2 rounded-lg hover:bg-muted transition-colors">
                Creators
              </Link>
              <Link href="/circular" onClick={() => setIsOpen(false)} className="block px-3 py-2 rounded-lg hover:bg-muted transition-colors">
                Circular Fashion
              </Link>
              <Link href="/pricing" onClick={() => setIsOpen(false)} className="block px-3 py-2 rounded-lg hover:bg-muted transition-colors">
                Pricing
              </Link>
              <Link href="/community/live-sessions" onClick={() => setIsOpen(false)} className="block px-3 py-2 rounded-lg hover:bg-muted transition-colors">
                Community
              </Link>
              <div className="pt-2 border-t border-border">
                <ThemeToggle />
              </div>
            </div>
          </nav>
        )}
      </header>

      {/* Spacer */}
      <div className="h-16 md:hidden"></div>
    </>
  )
}
