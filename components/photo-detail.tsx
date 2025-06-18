"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Heart, ArrowLeft, Download } from "lucide-react"

interface Photo {
  id: string
  urls: {
    regular: string
    full: string
  }
  alt_description: string
  user: {
    name: string
    username: string
  }
  description: string
  likes: number
}

interface PhotoDetailProps {
  photoId: string
}

export function PhotoDetail({ photoId }: PhotoDetailProps) {
  const [photo, setPhoto] = useState<Photo | null>(null)
  const [loading, setLoading] = useState(true)
  const [isFavorite, setIsFavorite] = useState(false)

  useEffect(() => {
    fetchPhoto()
    checkIfFavorite()
  }, [photoId])

  const fetchPhoto = async () => {
    try {
      const response = await fetch(`/api/photos/${photoId}`)
      const data = await response.json()
      setPhoto(data)
    } catch (error) {
      console.error("Error fetching photo:", error)
    } finally {
      setLoading(false)
    }
  }

  const checkIfFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]")
    setIsFavorite(favorites.includes(photoId))
  }

  const toggleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]")
    if (isFavorite) {
      const newFavorites = favorites.filter((id: string) => id !== photoId)
      localStorage.setItem("favorites", JSON.stringify(newFavorites))
      setIsFavorite(false)
    } else {
      favorites.push(photoId)
      localStorage.setItem("favorites", JSON.stringify(favorites))
      setIsFavorite(true)
    }
  }

  if (loading) {
    return <div className="w-full h-96 bg-gray-200 animate-pulse rounded-lg" />
  }

  if (!photo) {
    return <div className="text-center py-8">Photo not found</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Link href="/">
          <Button variant="outline" size="sm">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Gallery
          </Button>
        </Link>
        <div className="flex space-x-2">
          <Button onClick={toggleFavorite} variant={isFavorite ? "default" : "outline"} size="sm">
            <Heart className={`w-4 h-4 mr-2 ${isFavorite ? "fill-current" : ""}`} />
            {isFavorite ? "Favorited" : "Add to Favorites"}
          </Button>
          <Button variant="outline" size="sm" asChild>
            <a href={photo.urls.full} download target="_blank" rel="noopener noreferrer">
              <Download className="w-4 h-4 mr-2" />
              Download
            </a>
          </Button>
        </div>
      </div>

      <div className="relative w-full h-96 rounded-lg overflow-hidden">
        <Image
          src={photo.urls.regular || "/placeholder.svg"}
          alt={photo.alt_description || "Photo"}
          fill
          className="object-contain"
          sizes="100vw"
        />
      </div>

      <div className="space-y-4">
        <div>
          <h1 className="text-2xl font-bold">{photo.alt_description || "Untitled Photo"}</h1>
          <p className="text-gray-600">
            by {photo.user.name} (@{photo.user.username})
          </p>
        </div>

        {photo.description && <p className="text-gray-700">{photo.description}</p>}

        <div className="flex items-center space-x-4 text-sm text-gray-500">
          <span>{photo.likes} likes</span>
        </div>
      </div>
    </div>
  )
}
