"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { RefreshCw } from "lucide-react"

interface Photo {
  id: string
  urls: {
    small: string
    regular: string
  }
  alt_description: string
  user: {
    name: string
  }
}

interface PhotoGridProps {
  searchQuery?: string
}

export function PhotoGrid({ searchQuery }: PhotoGridProps) {
  const [photos, setPhotos] = useState<Photo[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchPhotos()
  }, [searchQuery])

  const fetchPhotos = async () => {
    setLoading(true)
    try {
      let url = "/api/photos?count=9"
      if (searchQuery) {
        url += `&query=${encodeURIComponent(searchQuery)}`
      }

      const response = await fetch(url)

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()

      if (Array.isArray(data)) {
        setPhotos(data)
      } else {
        console.error("API response is not an array:", data)
        setPhotos([])
      }
    } catch (error) {
      console.error("Error fetching photos:", error)
      setPhotos([])
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="grid grid-cols-3 gap-6">
        {Array.from({ length: 9 }).map((_, i) => (
          <div key={i} className="aspect-square bg-gray-200 animate-pulse rounded-lg" />
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">
          {searchQuery ? `Поиск: ${searchQuery}` : "Случайные фотографии"}
        </h1>
        <Button onClick={fetchPhotos} variant="outline" size="sm">
          <RefreshCw className="w-4 h-4 mr-2" />
          Обновить
        </Button>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {photos.map((photo) => (
          <Link key={photo.id} href={`/photo/${photo.id}`}>
            <div className="relative aspect-square rounded-lg overflow-hidden hover:opacity-90 transition-all duration-300 group shadow-md hover:shadow-lg">
              <Image
                src={photo.urls.regular || "/placeholder.svg"}
                alt={photo.alt_description || "Photo"}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
