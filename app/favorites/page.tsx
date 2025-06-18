import { FavoritesGrid } from "@/components/favorites-grid";
import { Navigation } from "@/components/navigation";
import { Sidebar } from "@/components/sidebar";

export default function FavoritesPage() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navigation />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-4">
          <div className="max-w-screen-xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">Избранное</h1>
            <FavoritesGrid />
          </div>
        </main>
      </div>
    </div>
  );
}
