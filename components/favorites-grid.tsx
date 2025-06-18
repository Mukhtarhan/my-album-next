"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

interface Photo {
  id: string;
  urls: {
    small: string;
    regular: string;
  };
  alt_description: string;
}

export function FavoritesGrid() {
  const [favoritePhotos, setFavoritePhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFavorites();
  }, []);

  const fetchFavorites = async () => {
    try {
      const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
      if (favorites.length === 0) {
        setLoading(false);
        return;
      }

      const photoPromises = favorites.map((id: string) =>
        fetch(`/api/photos/${id}`).then((res) => res.json())
      );

      const photos = await Promise.all(photoPromises);
      setFavoritePhotos(photos.filter((photo) => photo));
    } catch (error) {
      console.error("Error fetching favorites:", error);
    } finally {
      setLoading(false);
    }
  };

  const removeFavorite = (photoId: string) => {
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    const newFavorites = favorites.filter((id: string) => id !== photoId);
    localStorage.setItem("favorites", JSON.stringify(newFavorites));
    setFavoritePhotos((prev) => prev.filter((photo) => photo.id !== photoId));
  };

  if (loading) {
    return (
      <div className="grid grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="aspect-square bg-gray-200 animate-pulse rounded-lg"
          />
        ))}
      </div>
    );
  }

  if (favoritePhotos.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 mb-4">No favorite photos yet</p>
        <Link href="/">
          <Button>Browse Photos</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {favoritePhotos.map((photo) => (
        <div key={photo.id} className="relative group">
          <Link href={`/photo/${photo.id}`}>
            <div className="relative aspect-square rounded-lg overflow-hidden hover:opacity-90 transition-opacity">
              <Image
                src={photo.urls.regular || "/placeholder.svg"}
                alt={photo.alt_description || "Photo"}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
          </Link>
          <Button
            onClick={() => removeFavorite(photo.id)}
            variant="destructive"
            size="sm"
            className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      ))}
    </div>
  );
}
