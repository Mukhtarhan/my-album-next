import { PhotoDetail } from "@/components/photo-detail";
import { Navigation } from "@/components/navigation";
import { Sidebar } from "@/components/sidebar";

interface PhotoPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function PhotoPage({ params }: PhotoPageProps) {
  const { id } = await params;

  return (
    <div className="min-h-screen bg-gray-100">
      <Navigation />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-8">
          <div className="max-w-4xl mx-auto">
            <PhotoDetail photoId={id} />
          </div>
        </main>
      </div>
    </div>
  );
}
