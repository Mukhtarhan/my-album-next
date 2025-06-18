import { type NextRequest, NextResponse } from "next/server"

const UNSPLASH_ACCESS_KEY = process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY || "demo-key"

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const count = searchParams.get("count") || "9"
  const query = searchParams.get("query")

  try {
    if (UNSPLASH_ACCESS_KEY === "demo-key") {
      console.warn("Using demo data - please add your Unsplash API key to .env.local")
      return NextResponse.json(generateMockPhotos(Number.parseInt(count)))
    }

    let url = ""
    if (query) {
      // Search for specific photos
      url = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=${count}&client_id=${UNSPLASH_ACCESS_KEY}`
    } else {
      // Get random photos
      url = `https://api.unsplash.com/photos/random?count=${count}&client_id=${UNSPLASH_ACCESS_KEY}`
    }

    const response = await fetch(url, {
      headers: {
        Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}`,
      },
    })

    if (!response.ok) {
      console.error(`Unsplash API error: ${response.status} ${response.statusText}`)
      return NextResponse.json(generateMockPhotos(Number.parseInt(count)))
    }

    const data = await response.json()

    // Handle search results vs random photos
    let photos = data
    if (query && data.results) {
      photos = data.results
    }

    if (!Array.isArray(photos)) {
      console.error("Unsplash API returned non-array data:", data)
      return NextResponse.json(generateMockPhotos(Number.parseInt(count)))
    }

    return NextResponse.json(photos)
  } catch (error) {
    console.error("Error fetching photos:", error)
    return NextResponse.json(generateMockPhotos(Number.parseInt(count)))
  }
}

function generateMockPhotos(count: number) {
  return Array.from({ length: count }, (_, i) => ({
    id: `mock-${i + 1}`,
    urls: {
      small: `/placeholder.svg?height=200&width=200&text=Photo ${i + 1}`,
      regular: `/placeholder.svg?height=400&width=400&text=Photo ${i + 1}`,
      full: `/placeholder.svg?height=800&width=800&text=Photo ${i + 1}`,
    },
    alt_description: `Mock photo ${i + 1}`,
    user: {
      name: `Photographer ${i + 1}`,
      username: `user${i + 1}`,
    },
    description: `This is a mock photo ${i + 1} for demonstration purposes.`,
    likes: Math.floor(Math.random() * 1000),
  }))
}
