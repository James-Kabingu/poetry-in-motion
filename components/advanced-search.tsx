"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Search, X } from "lucide-react"

interface SearchFilters {
  query: string
  category?: string
  minPrice: number
  maxPrice: number
  colors: string[]
  sizes: string[]
  sortBy: string
}

interface AdvancedSearchProps {
  onSearch: (filters: SearchFilters) => void
}

export function AdvancedSearch({ onSearch }: AdvancedSearchProps) {
  const [query, setQuery] = useState("")
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [filters, setFilters] = useState<SearchFilters>({
    query: "",
    minPrice: 0,
    maxPrice: 200,
    colors: [],
    sizes: [],
    sortBy: "relevance",
  })

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (query.length < 2) {
        setSuggestions([])
        return
      }

      try {
        const response = await fetch(`/api/search/suggestions?q=${encodeURIComponent(query)}`)
        const data = await response.json()
        setSuggestions(data.suggestions)
        setShowSuggestions(true)
      } catch (error) {
        console.error("Failed to fetch suggestions:", error)
      }
    }

    const timer = setTimeout(fetchSuggestions, 300)
    return () => clearTimeout(timer)
  }, [query])

  const handleSearch = () => {
    setFilters({ ...filters, query })
    onSearch({ ...filters, query })
    setShowSuggestions(false)
  }

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion)
    setFilters({ ...filters, query: suggestion })
    onSearch({ ...filters, query: suggestion })
    setShowSuggestions(false)
  }

  const toggleColor = (color: string) => {
    const newColors = filters.colors.includes(color)
      ? filters.colors.filter((c) => c !== color)
      : [...filters.colors, color]
    setFilters({ ...filters, colors: newColors })
  }

  const toggleSize = (size: string) => {
    const newSizes = filters.sizes.includes(size) ? filters.sizes.filter((s) => s !== size) : [...filters.sizes, size]
    setFilters({ ...filters, sizes: newSizes })
  }

  return (
    <div className="space-y-6">
      {/* Search Bar */}
      <div className="relative">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search by style, color, or trend..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              className="pl-10"
            />
            {showSuggestions && suggestions.length > 0 && (
              <Card className="absolute top-full left-0 right-0 mt-2 z-50">
                <div className="p-2">
                  {suggestions.map((suggestion) => (
                    <button
                      key={suggestion}
                      onClick={() => handleSuggestionClick(suggestion)}
                      className="w-full text-left px-3 py-2 hover:bg-accent/10 rounded transition"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </Card>
            )}
          </div>
          <Button onClick={handleSearch}>Search</Button>
        </div>
      </div>

      {/* Filters */}
      <div className="grid md:grid-cols-4 gap-4">
        {/* Price Range */}
        <div>
          <label className="text-sm font-medium text-foreground mb-2 block">Price Range</label>
          <div className="space-y-2">
            <input
              type="range"
              min="0"
              max="200"
              value={filters.maxPrice}
              onChange={(e) => setFilters({ ...filters, maxPrice: Number.parseInt(e.target.value) })}
              className="w-full"
            />
            <div className="text-sm text-muted-foreground">
              ${filters.minPrice} - ${filters.maxPrice}
            </div>
          </div>
        </div>

        {/* Colors */}
        <div>
          <label className="text-sm font-medium text-foreground mb-2 block">Colors</label>
          <div className="flex flex-wrap gap-2">
            {["Black", "White", "Purple", "Blue", "Red"].map((color) => (
              <button
                key={color}
                onClick={() => toggleColor(color)}
                className={`px-3 py-1 rounded-full text-sm transition ${
                  filters.colors.includes(color)
                    ? "bg-accent text-accent-foreground"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                {color}
              </button>
            ))}
          </div>
        </div>

        {/* Sizes */}
        <div>
          <label className="text-sm font-medium text-foreground mb-2 block">Sizes</label>
          <div className="flex flex-wrap gap-2">
            {["XS", "S", "M", "L", "XL"].map((size) => (
              <button
                key={size}
                onClick={() => toggleSize(size)}
                className={`px-3 py-1 rounded-full text-sm transition ${
                  filters.sizes.includes(size)
                    ? "bg-accent text-accent-foreground"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Sort */}
        <div>
          <label className="text-sm font-medium text-foreground mb-2 block">Sort By</label>
          <select
            value={filters.sortBy}
            onChange={(e) => setFilters({ ...filters, sortBy: e.target.value })}
            className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground"
          >
            <option value="relevance">Relevance</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
            <option value="newest">Newest</option>
            <option value="trending">Trending</option>
          </select>
        </div>
      </div>

      {/* Active Filters */}
      {(filters.colors.length > 0 || filters.sizes.length > 0) && (
        <div className="flex flex-wrap gap-2">
          {filters.colors.map((color) => (
            <div key={color} className="flex items-center gap-2 bg-accent/10 px-3 py-1 rounded-full">
              <span className="text-sm">{color}</span>
              <button onClick={() => toggleColor(color)}>
                <X className="h-4 w-4" />
              </button>
            </div>
          ))}
          {filters.sizes.map((size) => (
            <div key={size} className="flex items-center gap-2 bg-accent/10 px-3 py-1 rounded-full">
              <span className="text-sm">{size}</span>
              <button onClick={() => toggleSize(size)}>
                <X className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
