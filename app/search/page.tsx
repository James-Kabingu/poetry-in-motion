"use client"

import { useRef } from "react"
import { NavLogo } from "@/components/nav-logo"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Search, X, TrendingUp, Clock, Star, Camera } from "lucide-react"
import Link from "next/link"
import { useSearch } from "@/lib/search-context"

const trendingSearches = ["Oversized Blazer", "Vintage Denim", "Sustainable Fashion", "Silk Camisole", "Statement Jacket"]

export default function SearchPage() {
  const {
    query,
    setQuery,
    results,
    isSearching,
    hasSearched,
    imageFile,
    runTextSearch,
    runImageSearch,
    clearSearch,
    recentSearches,
    addRecentSearch,
    removeRecentSearch,
  } = useSearch()

  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleSubmit = () => {
    if (!query.trim()) return
    addRecentSearch(query)
    runTextSearch(query)
  }

  const handleChipClick = (term: string) => {
    addRecentSearch(term)
    runTextSearch(term)
  }

  const handleCameraClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      runImageSearch(file)
    }
  }

  return (
    <main className="min-h-screen bg-background">
      {/* Header - Google style search bar */}
      <div className="border-b border-border bg-card/50 sticky top-0 z-40">
        <div className="mx-auto max-w-3xl px-4 py-3 lg:px-8">
          <div className="flex items-center justify-between mb-3">
            <NavLogo size="sm" />
          </div>
          <div className="flex items-center gap-2 px-3 py-2.5 rounded-full border border-border bg-background focus-within:ring-2 focus-within:ring-accent transition">
            <Search className="h-4 w-4 text-muted-foreground flex-shrink-0" />
            <input
              type="text"
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
              placeholder="Search for products, categories..."
              className="flex-1 min-w-0 bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
            />
            {query && (
              <button onClick={clearSearch} className="text-muted-foreground hover:text-foreground flex-shrink-0">
                <X className="h-4 w-4" />
              </button>
            )}
            <div className="h-5 w-px bg-border flex-shrink-0" />
            <button
              onClick={handleCameraClick}
              title="Search by image"
              className="text-muted-foreground hover:text-accent transition flex-shrink-0"
            >
              <Camera className="h-5 w-5" />
            </button>
            <button
              onClick={handleSubmit}
              title="Search"
              className="text-muted-foreground hover:text-accent transition flex-shrink-0"
            >
              <Search className="h-5 w-5" />
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-4 py-6 lg:px-8">

        {/* No search yet: recent + trending */}
        {!hasSearched && (
          <div className="space-y-8">
            {recentSearches.length > 0 && (
              <div>
                <h2 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  Recent Searches
                </h2>
                <div className="flex flex-wrap gap-2">
                  {recentSearches.map((term) => (
                    <div key={term} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-muted text-sm text-foreground">
                      <button onClick={() => handleChipClick(term)} className="hover:text-accent transition">{term}</button>
                      <button onClick={() => removeRecentSearch(term)} className="text-muted-foreground hover:text-foreground">
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div>
              <h2 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
                Trending Searches
              </h2>
              <div className="flex flex-wrap gap-2">
                {trendingSearches.map((term) => (
                  <button
                    key={term}
                    onClick={() => handleChipClick(term)}
                    className="px-3 py-1.5 rounded-full border border-border text-sm text-foreground hover:border-accent hover:text-accent transition"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>

            <div className="text-center pt-4">
              <button
                onClick={handleCameraClick}
                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-accent transition"
              >
                <Camera className="h-4 w-4" />
                Or search using a photo
              </button>
            </div>
          </div>
        )}

        {/* Loading */}
        {isSearching && (
          <div className="text-center py-16">
            <p className="text-sm text-muted-foreground">Searching...</p>
          </div>
        )}

        {/* Image search placeholder result (SnapFind not yet integrated) */}
        {!isSearching && hasSearched && imageFile && results.length === 0 && (
          <div className="text-center py-16">
            <div className="flex justify-center mb-6">
              <img src="/images/illustrations/error/no-results.png" alt="Image search coming soon" className="h-40 w-40 object-contain" />
            </div>
            <h2 className="text-lg font-bold text-foreground mb-2">Image Search Coming Soon</h2>
            <p className="text-muted-foreground text-sm mb-1">You uploaded: {imageFile.name}</p>
            <p className="text-muted-foreground text-sm mb-6">Visual search is launching soon. Try a text search in the meantime.</p>
            <Button variant="outline" className="bg-transparent" onClick={clearSearch}>Clear and Try Text Search</Button>
          </div>
        )}

        {/* Text search results or empty state */}
        {!isSearching && hasSearched && !imageFile && (
          <div>
            {results.length > 0 ? (
              <>
                <p className="text-sm text-muted-foreground mb-4">{results.length} results for "{query}"</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
                  {results.map((product) => (
                    <Link key={product.id} href={`/shop/${product.id}`}>
                      <Card className="overflow-hidden hover:shadow-lg transition group cursor-pointer">
                        <div className="relative overflow-hidden bg-muted aspect-square">
                          <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition duration-300" />
                        </div>
                        <div className="p-3 space-y-1.5">
                          <p className="text-xs text-muted-foreground">{product.category}</p>
                          <h3 className="font-semibold text-sm text-foreground line-clamp-1">{product.name}</h3>
                          <div className="flex items-center gap-1">
                            <Star className="h-3 w-3 fill-accent text-accent" />
                            <span className="text-xs text-muted-foreground">{product.rating} ({product.reviews})</span>
                          </div>
                          <p className="font-bold text-foreground">${product.price}</p>
                        </div>
                      </Card>
                    </Link>
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center py-16">
                <div className="flex justify-center mb-6">
                  <img src="/images/illustrations/error/no-results.png" alt="No results" className="h-40 w-40 object-contain" />
                </div>
                <h2 className="text-lg font-bold text-foreground mb-2">No results for "{query}"</h2>
                <p className="text-muted-foreground text-sm mb-6">Try checking your spelling or use more general terms.</p>
                <Link href="/shop">
                  <Button variant="outline" className="bg-transparent">Browse All Products</Button>
                </Link>
              </div>
            )}
          </div>
        )}

      </div>
    </main>
  )
}
