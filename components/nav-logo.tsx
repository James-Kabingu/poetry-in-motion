import Link from "next/link"
import Image from "next/image"

interface NavLogoProps {
  theme?: "light" | "dark" | "auto"  // auto = light/dark image swap based on OS theme
  size?: "sm" | "md" | "lg"
}

const sizes = {
  sm: { img: 32, text: "text-xs", sub: "text-xs" },
  md: { img: 40, text: "text-sm", sub: "text-xs" },
  lg: { img: 48, text: "text-base", sub: "text-sm" },
}

/**
 * NavLogo — Poetry In Motion logo as a home button.
 * Use this on every page header/nav so the logo is consistent
 * and always links back to the homepage.
 *
 * Usage:
 *   <NavLogo />                    // auto theme, medium size
 *   <NavLogo theme="dark" />       // force gold logo (for dark backgrounds e.g. auth left panel)
 *   <NavLogo size="sm" />          // smaller logo for compact headers
 */
export function NavLogo({ theme = "auto", size = "md" }: NavLogoProps) {
  const s = sizes[size]

  return (
    <Link href="/" className="flex items-center gap-2.5 flex-shrink-0 group">
      <div className="relative flex-shrink-0" style={{ height: s.img, width: s.img }}>
        {theme === "dark" ? (
          <Image src="/images/logos/logo-dark.png" alt="Poetry In Motion" fill sizes={`${s.img}px`} className="object-contain" />
        ) : theme === "light" ? (
          <Image src="/images/logos/logo-light.png" alt="Poetry In Motion" fill sizes={`${s.img}px`} className="object-contain" />
        ) : (
          <>
            <Image src="/images/logos/logo-light.png" alt="Poetry In Motion" fill sizes={`${s.img}px`} className="object-contain dark:hidden" />
            <Image src="/images/logos/logo-dark.png" alt="Poetry In Motion" fill sizes={`${s.img}px`} className="object-contain hidden dark:block" />
          </>
        )}
      </div>
      <div className="flex flex-col leading-tight">
        <span className={`${s.text} font-bold tracking-widest text-[#3d2c1e] dark:text-[#c9a84c] uppercase group-hover:text-[#c9a84c] transition`}>
          Poetry In Motion
        </span>
        <span className={`${s.sub} text-[#c9a84c] italic`}>Mali Safi.</span>
      </div>
    </Link>
  )
}
