"use client";

import { useSearchParams } from "next/navigation";
import { PhotoGrid } from "@/components/photo-grid";
import { Navigation } from "@/components/navigation";
import { Sidebar } from "@/components/sidebar";
import { HeroSection } from "@/components/hero-section";

export default function HomePage() {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("search") || "";

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div>
        <div className="flex">
          <Sidebar />
          <div className="w-full">
            {/* ✅ Hero always shown */}
            <HeroSection />
            <main className="flex-1 py-8">
              <div className="max-w-screen-xl mx-auto pr-3 pl-3 sm:pl-0 sm:pr-12">
                {searchQuery && (
                  <div className="mb-6">
                    <h2 className="text-xl font-semibold text-gray-700">
                      Результаты поиска для: "{searchQuery}"
                    </h2>
                    <a
                      href="/"
                      className="text-blue-600 hover:text-blue-800 text-sm mt-1 inline-block"
                    >
                      Очистить поиск
                    </a>
                  </div>
                )}
                <PhotoGrid searchQuery={searchQuery} />
              </div>
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}
