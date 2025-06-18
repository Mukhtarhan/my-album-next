import { type NextRequest, NextResponse } from "next/server";

const UNSPLASH_ACCESS_KEY = "s5zcqAOkhjyphb5ilLC7kcdStS79FPnmYpbfra7wPwQ";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const count = searchParams.get("count") || "9";
  const query = searchParams.get("query");

  try {
    let url = "";

    if (query) {
      // Search for specific photos
      url = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(
        query
      )}&per_page=${count}&client_id=${UNSPLASH_ACCESS_KEY}`;
    } else {
      // Get random photos
      url = `https://api.unsplash.com/photos/random?count=${count}&client_id=${UNSPLASH_ACCESS_KEY}`;
    }

    const response = await fetch(url);

    const data = await response.json();
    const photos = query && data.results ? data.results : data;

    if (!Array.isArray(photos)) {
      throw new Error("Unexpected API response structure.");
    }

    return NextResponse.json(photos);
  } catch (error) {
    console.error("Error fetching photos:", error);
    return NextResponse.json(
      { error: "Failed to fetch photos" },
      { status: 500 }
    );
  }
}
