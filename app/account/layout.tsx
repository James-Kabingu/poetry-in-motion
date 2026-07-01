import Image from "next/image"
import Link from "next/link"
import { User, ShoppingBag, Heart, MapPin, Settings, LogOut, ChevronRight } from "lucide-react"
import { NavLogo } from "@/components/nav-logo"

const navItems = [
  { href: "/account", label: "My Profile", icon: User },
  { href: "/account/orders", label: "Orders", icon: ShoppingBag },
  { href: "/account/wishlist", label: "Wishlist", icon: Heart },
  { href: "/account/addresses", label: "Addresses", icon: MapPin },
  { href: "/account/settings", label: "Settings", icon: Settings },
]

export default function AccountLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#faf8f5] dark:bg-[#0e0a06]">

      {/* Top nav */}
      <nav className="sticky top-0 z-50 border-b border-[#e8e0d4] dark:border-[#2a1f14] bg-[#faf8f5]/95 dark:bg-[#0e0a06]/95 backdrop-blur">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <NavLogo size="sm" />
            <Link href="/" className="text-sm text-[#6b5744] dark:text-[#a89070] hover:text-[#c9a84c] transition">
              Back to shop
            </Link>
          </div>
        </div>
      </nav>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">

          {/* Sidebar */}
          <aside className="lg:w-64 flex-shrink-0">
            {/* Profile card */}
            <div className="bg-white dark:bg-[#1a1108] rounded-2xl border border-[#e8e0d4] dark:border-[#2a1f14] p-6 mb-4">
              <div className="flex items-center gap-4">
                <div className="relative h-14 w-14 rounded-full overflow-hidden bg-[#c9a84c]/20 flex items-center justify-center border-2 border-[#c9a84c]/30">
                  <Image src="/images/illustrations/empty/profile.png" alt="Profile" fill sizes="56px" className="object-cover" />
                </div>
                <div>
                  <p className="font-semibold text-[#1a1108] dark:text-[#faf8f5] text-sm">James Kabingu</p>
                  <p className="text-xs text-[#a89070]">james@example.com</p>
                  <span className="inline-flex items-center gap-1 mt-1 text-xs text-[#c9a84c] font-medium">
                    Customer
                  </span>
                </div>
              </div>
            </div>

            {/* Nav links */}
            <div className="bg-white dark:bg-[#1a1108] rounded-2xl border border-[#e8e0d4] dark:border-[#2a1f14] overflow-hidden">
              {navItems.map((item, i) => {
                const Icon = item.icon
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center justify-between px-5 py-3.5 hover:bg-[#faf8f5] dark:hover:bg-[#2a1f14] transition group ${i !== navItems.length - 1 ? "border-b border-[#e8e0d4] dark:border-[#2a1f14]" : ""}`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="h-4 w-4 text-[#a89070] group-hover:text-[#c9a84c] transition" />
                      <span className="text-sm text-[#3d2c1e] dark:text-[#faf8f5] group-hover:text-[#c9a84c] transition">{item.label}</span>
                    </div>
                    <ChevronRight className="h-3.5 w-3.5 text-[#a89070] group-hover:text-[#c9a84c] transition" />
                  </Link>
                )
              })}
              <button className="w-full flex items-center gap-3 px-5 py-3.5 hover:bg-red-50 dark:hover:bg-red-950/20 transition group border-t border-[#e8e0d4] dark:border-[#2a1f14]">
                <LogOut className="h-4 w-4 text-red-400 group-hover:text-red-500 transition" />
                <span className="text-sm text-red-400 group-hover:text-red-500 transition">Sign Out</span>
              </button>
            </div>
          </aside>

          {/* Main content */}
          <main className="flex-1 min-w-0">
            {children}
          </main>
        </div>
      </div>
    </div>
  )
}
