"use client"

import { createContext, useContext, useState, ReactNode, useCallback } from "react"
import { searchByText, searchByImage, SearchResult } from "@/lib/search-service"

interface SearchContextType {
  query: string
  setQuery: (q: string) => void
  results: SearchResult[]
  isSearching: boolean
  hasSearched: boolean
  imageFile: File | null
  runTextSearch: (q: string) => Promise<void>
  runImageSearch: (file: File) => Promise<void>
  clearSearch: () => void
  recentSearches: string[]
  addRecentSearch: (term: string) => void
  removeRecentSearch: (term: string) => void
}

const SearchContext = createContext<SearchContextType | null>(null)

export function SearchProvider({ children }: { children: ReactNode }) {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<SearchResult[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [hasSearched, setHasSearched] = useState(false)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [recentSearches, setRecentSearches] = useState<string[]>(["Minimalist Tee", "Tailored Trousers"])

  const runTextSearch = useCallback(async (q: string) => {
    setQuery(q)
    setImageFile(null)
    setIsSearching(true)
    setHasSearched(true)
    const res = await searchByText(q)
    setResults(res)
    setIsSearching(false)
  }, [])

  const runImageSearch = useCallback(async (file: File) => {
    setImageFile(file)
    setQuery("")
    setIsSearching(true)
    setHasSearched(true)
    const res = await searchByImage(file)
    setResults(res)
    setIsSearching(false)
  }, [])

  const clearSearch = useCallback(() => {
    setQuery("")
    setImageFile(null)
    setResults([])
    setHasSearched(false)
  }, [])

  const addRecentSearch = useCallback((term: string) => {
    if (!term.trim()) return
    setRecentSearches((prev) => [term, ...prev.filter((t) => t !== term)].slice(0, 5))
  }, [])

  const removeRecentSearch = useCallback((term: string) => {
    setRecentSearches((prev) => prev.filter((t) => t !== term))
  }, [])

  return (
    <SearchContext.Provider
      value={{
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
      }}
    >
      {children}
    </SearchContext.Provider>
  )
}

export function useSearch() {
  const ctx = useContext(SearchContext)
  if (!ctx) throw new Error("useSearch must be used inside SearchProvider")
  return ctx
}
