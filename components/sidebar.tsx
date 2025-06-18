"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"

interface Photo {
  id: string
  urls: {
    small: string
    regular: string
  }
  alt_description: string
}

export function Sidebar() {
  const [photos, setPhotos] = useState<Photo[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchSidebarPhotos()
  }, [])

  const fetchSidebarPhotos = async () => {
    try {
      const response = await fetch("/api/photos?count=12")

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()

      // Ensure data is an array
      if (Array.isArray(data)) {
        setPhotos(data)
      } else {
        console.error("API response is not an array:", data)
        setPhotos([])
      }
    } catch (error) {
      console.error("Error fetching sidebar photos:", error)
      setPhotos([])
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <aside className="w-24 bg-white border-r border-gray-200 p-2">
        <div className="space-y-2">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="w-16 h-16 bg-gray-200 animate-pulse rounded" />
          ))}
        </div>
      </aside>
    )
  }

  return (
    <aside className="w-24 bg-white border-r border-gray-200 p-2">
      <div className="space-y-2">
        {photos.length > 0 ? (
          photos.map((photo) => (
            <Link key={photo.id} href={`/photo/${photo.id}`}>
              <div className="relative w-16 h-16 rounded overflow-hidden hover:opacity-80 transition-opacity">
                <Image
                  src={photo.urls.small || "/placeholder.svg?height=64&width=64"}
                  alt={photo.alt_description || "Photo"}
                  fill
                  className="object-cover"
                  sizes="64px"
                />
              </div>
            </Link>
          ))
        ) : (
          <div className="text-xs text-gray-500 p-2">No photos available</div>
        )}
      </div>
    </aside>
  )
}
