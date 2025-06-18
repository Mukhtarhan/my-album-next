import { type NextRequest, NextResponse } from "next/server";

const UNSPLASH_ACCESS_KEY = "s5zcqAOkhjyphb5ilLC7kcdStS79FPnmYpbfra7wPwQ";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Handle mock photos
    if (params.id.startsWith("mock-")) {
      const mockId = params.id.replace("mock-", "");
      return NextResponse.json({
        id: params.id,
        urls: {
          small: `/placeholder.svg?height=200&width=200&text=Photo ${mockId}`,
          regular: `/placeholder.svg?height=400&width=400&text=Photo ${mockId}`,
          full: `/placeholder.svg?height=800&width=800&text=Photo ${mockId}`,
        },
        alt_description: `Mock photo ${mockId}`,
        user: {
          name: `Photographer ${mockId}`,
          username: `user${mockId}`,
        },
        description: `This is a mock photo ${mockId} for demonstration purposes.`,
        likes: Math.floor(Math.random() * 1000),
      });
    }

    const response = await fetch(
      `https://api.unsplash.com/photos/${params.id}?client_id=${UNSPLASH_ACCESS_KEY}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch photo");
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching photo:", error);
    return NextResponse.json(
      { error: "Failed to fetch photo" },
      { status: 500 }
    );
  }
}
