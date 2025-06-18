import { PhotoGrid } from "@/components/photo-grid"
import { Navigation } from "@/components/navigation"
import { Sidebar } from "@/components/sidebar"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navigation />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-8">
          <div className="max-w-4xl mx-auto">
            <PhotoGrid />
          </div>
        </main>
      </div>
    </div>
  )
}
