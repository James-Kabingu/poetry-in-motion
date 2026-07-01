"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X, Search, ShoppingCart, User } from "lucide-react"
import { ThemeToggle } from "./theme-toggle"
import { useCart } from "@/lib/cart-context"
import { NavLogo } from "./nav-logo"

export function MobileHeader() {
  const [isOpen, setIsOpen] = useState(false)
  const { totalItems } = useCart()

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-background border-b border-border md:hidden">
        <div className="flex items-center justify-between h-16 px-4">
          <NavLogo size="sm" />

          {/* Right Icons */}
          <div className="flex items-center gap-1">
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

        {/* Mobile Menu */}
        {isOpen && (
          <nav className="border-t border-border bg-background shadow-lg">
            <div className="px-4 py-3 space-y-1">
              <Link href="/shop" onClick={() => setIsOpen(false)} className="block px-3 py-2.5 rounded-lg hover:bg-muted transition-colors text-sm font-medium">
                Shop
              </Link>
              <Link href="/creators" onClick={() => setIsOpen(false)} className="block px-3 py-2.5 rounded-lg hover:bg-muted transition-colors text-sm font-medium">
                Creators
              </Link>
              <Link href="/community" onClick={() => setIsOpen(false)} className="block px-3 py-2.5 rounded-lg hover:bg-muted transition-colors text-sm font-medium">
                Community
              </Link>
              <Link href="/pricing" onClick={() => setIsOpen(false)} className="block px-3 py-2.5 rounded-lg hover:bg-muted transition-colors text-sm font-medium">
                Pricing
              </Link>
              <Link href="/testimonials" onClick={() => setIsOpen(false)} className="block px-3 py-2.5 rounded-lg hover:bg-muted transition-colors text-sm font-medium">
                Testimonials
              </Link>
              <div className="pt-2 border-t border-border space-y-1">
                <Link href="/auth/login" onClick={() => setIsOpen(false)} className="block px-3 py-2.5 rounded-lg hover:bg-muted transition-colors text-sm font-medium text-accent">
                  Sign In
                </Link>
                <Link href="/auth/signup" onClick={() => setIsOpen(false)} className="block px-3 py-2.5 rounded-lg bg-accent text-accent-foreground hover:bg-accent/90 transition-colors text-sm font-medium text-center">
                  Create Account
                </Link>
              </div>
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
