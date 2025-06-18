"use client"

import { useState } from "react"
import { PhotoGrid } from "@/components/photo-grid"
import { Navigation } from "@/components/navigation"
import { Sidebar } from "@/components/sidebar"
import { HeroSection } from "@/components/hero-section"

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("")

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    // You can implement search functionality here
    console.log("Searching for:", query)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <HeroSection onSearch={handleSearch} />

      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-8">
          <div className="max-w-6xl mx-auto">
            {searchQuery && (
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-700">Результаты поиска для: "{searchQuery}"</h2>
                <button onClick={() => setSearchQuery("")} className="text-blue-600 hover:text-blue-800 text-sm mt-1">
                  Очистить поиск
                </button>
              </div>
            )}
            <PhotoGrid searchQuery={searchQuery} />
          </div>
        </main>
      </div>
    </div>
  )
}
