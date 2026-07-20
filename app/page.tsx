"use client"

import Image from "next/image"
import Link from "next/link"
import { NavLogo } from "@/components/nav-logo"
import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles, Users, Leaf, ShoppingBag, ShoppingCart, Search, Camera, Heart, Menu, User } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { useCart } from "@/lib/cart-context"

export default function Home() {
  const { totalItems } = useCart()
  return (
    <main className="min-h-screen bg-[#faf8f5] dark:bg-[#0e0a06]">

      {/* Navigation */}
      <nav className="hidden md:block sticky top-0 z-50 border-b border-[#e8e0d4] dark:border-[#2a1f14] bg-[#faf8f5]/95 dark:bg-[#0e0a06]/95 backdrop-blur supports-[backdrop-filter]:bg-[#faf8f5]/60">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <NavLogo />

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              {[
                { label: "Shop", href: "/shop" },
                { label: "AI Styling", href: "/quiz" },
                { label: "Creators", href: "/creators" },
                { label: "Community", href: "/community/live-sessions" },
                { label: "Sustainability", href: "/circular" },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-sm text-[#6b5744] dark:text-[#a89070] hover:text-[#3d2c1e] dark:hover:text-[#c9a84c] transition font-medium"
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {/* Right actions */}
            <div className="flex items-center gap-3">
              <ThemeToggle />
              <Link href="/search" className="p-2 rounded-full hover:bg-[#f0e8dc] dark:hover:bg-[#1a1108] transition">
                <Search className="h-4 w-4 text-[#6b5744] dark:text-[#a89070]" />
              </Link>
              <Link href="/search?mode=image" title="Search by image" className="p-2 rounded-full hover:bg-[#f0e8dc] dark:hover:bg-[#1a1108] transition">
                <Camera className="h-4 w-4 text-[#6b5744] dark:text-[#a89070]" />
              </Link>
              <Link href="/cart" className="relative p-2 rounded-full hover:bg-[#f0e8dc] dark:hover:bg-[#1a1108] transition">
                <ShoppingCart className="h-4 w-4 text-[#6b5744] dark:text-[#a89070]" />
                {totalItems > 0 && (
                  <span className="absolute top-0 right-0 h-4 w-4 bg-[#c9a84c] text-black text-xs rounded-full flex items-center justify-center font-bold">
                    {totalItems > 9 ? "9+" : totalItems}
                  </span>
                )}
              </Link>
              <Link href="/account" className="p-2 rounded-full hover:bg-[#f0e8dc] dark:hover:bg-[#1a1108] transition">
                <User className="h-4 w-4 text-[#6b5744] dark:text-[#a89070]" />
              </Link>
              <Link href="/auth/login">
                <Button variant="outline" size="sm" className="hidden sm:flex border-[#3d2c1e] text-[#3d2c1e] hover:bg-[#3d2c1e] hover:text-white dark:border-[#c9a84c] dark:text-[#c9a84c] dark:hover:bg-[#c9a84c] dark:hover:text-black">
                  Sign In
                </Button>
              </Link>
              <Link href="/auth/signup">
                <Button size="sm" className="hidden sm:flex bg-[#3d2c1e] text-white hover:bg-[#2a1f14] dark:bg-[#c9a84c] dark:text-black dark:hover:bg-[#b8973b]">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 min-h-[85vh] items-center gap-8">
            {/* Left content */}
            <div className="flex flex-col gap-6 py-16 lg:py-0">
              <div className="inline-flex w-fit items-center gap-2 rounded-full border border-[#c9a84c]/40 bg-[#c9a84c]/10 px-4 py-2">
                <Sparkles className="h-3.5 w-3.5 text-[#c9a84c]" />
                <span className="text-xs font-medium text-[#3d2c1e] dark:text-[#c9a84c] tracking-wider uppercase">AI-Powered Personal Styling</span>
              </div>

              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-[#1a1108] dark:text-[#faf8f5] leading-[1.05] tracking-tight">
                Style that{" "}
                <span className="text-[#c9a84c]">moves</span>{" "}
                with you.
              </h1>

              <p className="text-lg text-[#6b5744] dark:text-[#a89070] leading-relaxed max-w-md">
                AI-powered fashion that understands your vibe, fits your life, and moves the world forward.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <Button size="lg" asChild className="gap-2 bg-[#3d2c1e] text-white hover:bg-[#2a1f14] dark:bg-[#c9a84c] dark:text-black dark:hover:bg-[#b8973b] rounded-full px-8">
                  <Link href="/shop">
                    Shop Now
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild className="gap-2 border-[#3d2c1e] text-[#3d2c1e] dark:border-[#c9a84c] dark:text-[#c9a84c] rounded-full px-8">
                  <Link href="/quiz">
                    <Sparkles className="h-4 w-4" />
                    Discover Your Style
                  </Link>
                </Button>
              </div>

              {/* Mini feature icons */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-[#e8e0d4] dark:border-[#2a1f14]">
                {[
                  { icon: Sparkles, label: "AI Styling", sub: "Looks made just for you." },
                  { icon: ShoppingBag, label: "Curated Finds", sub: "Handpicked styles you'll love." },
                  { icon: Users, label: "Creator Community", sub: "Connect. Collaborate. Inspire." },
                  { icon: Leaf, label: "Sustainable Fashion", sub: "Better for people, the planet." },
                ].map((item, i) => {
                  const Icon = item.icon
                  return (
                    <div key={i} className="flex flex-col gap-1">
                      <Icon className="h-5 w-5 text-[#c9a84c]" />
                      <span className="text-xs font-semibold text-[#3d2c1e] dark:text-[#faf8f5] uppercase tracking-wide">{item.label}</span>
                      <span className="text-xs text-[#6b5744] dark:text-[#a89070]">{item.sub}</span>
                    </div>
                  )
                })}
              </div>

              {/* Stats bar */}
              <div className="flex items-center gap-6 pt-2">
                {[
                  { value: "5,000+", label: "Happy Customers" },
                  { value: "10,000+", label: "Styles Available" },
                  { value: "50+", label: "Creators" },
                ].map((stat, i) => (
                  <div key={i} className="flex flex-col">
                    <span className="text-lg font-bold text-[#3d2c1e] dark:text-[#c9a84c]">{stat.value}</span>
                    <span className="text-xs text-[#6b5744] dark:text-[#a89070]">{stat.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right hero image */}
            <div className="relative h-[60vh] lg:h-screen">
              <Image
                src="/images/banners/hero.png"
                alt="Poetry In Motion — Style that moves with you"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-top"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="px-4 py-16 sm:px-6 lg:px-8 bg-white dark:bg-[#120d07]">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-2xl font-bold text-[#1a1108] dark:text-[#faf8f5] tracking-tight">Shop by Category</h2>
            <Link href="/shop" className="text-sm text-[#c9a84c] hover:underline font-medium flex items-center gap-1">
              View all <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
            {[
              { label: "Clothing", img: "/images/categories/clothing.png", href: "/shop?category=clothing" },
              { label: "Bags", img: "/images/categories/bags.png", href: "/shop?category=bags" },
              { label: "Shoes", img: "/images/categories/shoes.png", href: "/shop?category=shoes" },
              { label: "Accessories", img: "/images/categories/accessories.png", href: "/shop?category=accessories" },
              { label: "New Arrivals", img: "/images/categories/new-arrivals.png", href: "/shop?category=new" },
              { label: "Sale", img: "/images/categories/sale.png", href: "/shop?category=sale" },
              { label: "Best Sellers", img: "/images/categories/best-seller.png", href: "/shop?category=best" },
              { label: "Sustainable", img: "/images/categories/sustainable.png", href: "/shop?category=sustainable" },
            ].map((cat, i) => (
              <Link key={i} href={cat.href} className="flex flex-col items-center gap-2 group">
                <div className="relative h-20 w-20 rounded-2xl overflow-hidden bg-[#faf8f5] dark:bg-[#1a1108] border border-[#e8e0d4] dark:border-[#2a1f14] group-hover:border-[#c9a84c] group-hover:scale-105 transition-all duration-300">
                  <Image src={cat.img} alt={cat.label} fill sizes="80px" className="object-contain p-2" />
                </div>
                <span className="text-xs font-medium text-[#3d2c1e] dark:text-[#a89070] group-hover:text-[#c9a84c] transition text-center">{cat.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Shopping Banner */}
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="relative rounded-3xl overflow-hidden h-72 sm:h-96 group">
            <Image
              src="/images/banners/shopping.png"
              alt="Shop Poetry In Motion"
              fill
              sizes="(max-width: 768px) 100vw, 80vw"
              className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#1a1108]/70 to-transparent flex items-center px-10">
              <div className="flex flex-col gap-4 max-w-sm">
                <h3 className="text-3xl font-bold text-white">New Collection</h3>
                <p className="text-[#e8d9c4] text-sm">Curated styles for every story. Discover what moves you.</p>
                <Button asChild className="w-fit rounded-full bg-[#c9a84c] text-black hover:bg-[#b8973b]">
                  <Link href="/shop">Shop Now <ArrowRight className="h-4 w-4 ml-1" /></Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Community + Sustainability side by side */}
      <section className="px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl grid md:grid-cols-2 gap-6">
          {/* Community */}
          <div className="relative rounded-3xl overflow-hidden h-64 group">
            <Image src="/images/banners/community.png" alt="Community" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover object-center transition-transform duration-500 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1a1108]/80 via-transparent to-transparent flex items-end p-8">
              <div className="flex flex-col gap-2">
                <h3 className="text-2xl font-bold text-white">Join the Community</h3>
                <p className="text-[#e8d9c4] text-sm">Connect with creators and trendsetters across Africa.</p>
                <Link href="/community/live-sessions" className="text-[#c9a84c] text-sm font-medium flex items-center gap-1 mt-1">
                  Explore <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </div>

          {/* Sustainability */}
          <div className="relative rounded-3xl overflow-hidden h-64 group">
            <Image src="/images/banners/sustainability.png" alt="Sustainability" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover object-center transition-transform duration-500 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a1a08]/80 via-transparent to-transparent flex items-end p-8">
              <div className="flex flex-col gap-2">
                <h3 className="text-2xl font-bold text-white">Wear Better. Choose Better.</h3>
                <p className="text-[#d4e8d4] text-sm">Circular fashion that gives back to the planet.</p>
                <Link href="/circular" className="text-[#7ec87e] text-sm font-medium flex items-center gap-1 mt-1">
                  Learn more <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Referral Banner */}
      <section className="px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="relative rounded-3xl overflow-hidden h-48 sm:h-64 group">
            <Image src="/images/banners/referral.png" alt="Referral program" fill sizes="(max-width: 768px) 100vw, 80vw" className="object-cover object-top transition-transform duration-500 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#1a1108]/60 to-transparent flex items-center px-10">
              <div className="flex flex-col gap-3 max-w-xs">
                <h3 className="text-2xl font-bold text-white">Refer & Earn</h3>
                <p className="text-[#e8d9c4] text-sm">Share Poetry In Motion. Earn rewards for every friend you bring.</p>
                <Button asChild variant="outline" className="w-fit rounded-full border-white text-white hover:bg-white hover:text-black">
                  <Link href="/referrals">Get Your Link</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 py-20 sm:px-6 lg:px-8 bg-[#1a1108] dark:bg-[#0a0704]">
        <div className="mx-auto max-w-4xl text-center flex flex-col items-center gap-6">
          <div className="relative h-16 w-16">
            <Image src="/images/logos/logo-dark.png" alt="Poetry In Motion" fill className="object-contain" />
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-[#faf8f5] leading-tight">
            Ready to find your style?
          </h2>
          <p className="text-lg text-[#a89070] max-w-xl">
            Take our 2-minute style quiz and get AI-curated recommendations tailored to your vibe, body, and culture.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" asChild className="rounded-full px-8 bg-[#c9a84c] text-black hover:bg-[#b8973b]">
              <Link href="/quiz">Start Style Quiz <ArrowRight className="h-4 w-4 ml-2" /></Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="rounded-full px-8 border-[#a89070] text-[#a89070] hover:bg-[#2a1f14]">
              <Link href="/auth/signup">Create Account</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#2a1f14] bg-[#120d07] px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid md:grid-cols-4 gap-8 mb-10">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="relative h-10 w-10">
                  <Image src="/images/logos/logo-dark.png" alt="Poetry In Motion" fill className="object-contain" />
                </div>
                <div className="flex flex-col leading-tight">
                  <span className="text-sm font-bold tracking-widest text-[#c9a84c] uppercase">Poetry In Motion</span>
                  <span className="text-xs text-[#a89070] italic">Mali Safi.</span>
                </div>
              </div>
              <p className="text-sm text-[#6b5744]">Style. Culture. Commerce. In Motion.</p>
            </div>
            <div>
              <h4 className="font-semibold text-[#faf8f5] mb-4 text-sm uppercase tracking-wider">Shop</h4>
              <ul className="space-y-2 text-sm text-[#6b5744]">
                {["New Arrivals", "Best Sellers", "Sale", "Sustainable"].map((item) => (
                  <li key={item}><Link href="/shop" className="hover:text-[#c9a84c] transition">{item}</Link></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-[#faf8f5] mb-4 text-sm uppercase tracking-wider">Company</h4>
              <ul className="space-y-2 text-sm text-[#6b5744]">
                {[
                  { label: "For Creators", href: "/creators" },
                  { label: "Community", href: "/community/live-sessions" },
                  { label: "Sustainability", href: "/circular" },
                  { label: "Referrals", href: "/referrals" },
                ].map((item) => (
                  <li key={item.label}><Link href={item.href} className="hover:text-[#c9a84c] transition">{item.label}</Link></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-[#faf8f5] mb-4 text-sm uppercase tracking-wider">Legal</h4>
              <ul className="space-y-2 text-sm text-[#6b5744]">
                {[
                  { label: "Privacy Policy", href: "/privacy" },
                  { label: "Terms of Service", href: "/terms" },
                  { label: "Security", href: "/security" },
                  { label: "Support", href: "/support" },
                ].map((item) => (
                  <li key={item.label}><Link href={item.href} className="hover:text-[#c9a84c] transition">{item.label}</Link></li>
                ))}
              </ul>
            </div>
          </div>
          <div className="border-t border-[#2a1f14] pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#6b5744]">
            <p>&copy; 2025 Poetry In Motion. All rights reserved.</p>
            <p className="italic text-[#c9a84c]">Mali Safi.</p>
          </div>
        </div>
      </footer>
    </main>
  )
}
