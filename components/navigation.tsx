"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Heart, Search } from "lucide-react";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function Navigation() {
  const pathname = usePathname();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Navigate to homepage with search query
      router.push(`/?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <nav className="bg-black text-white py-4 sm:px-0 px-3">
      <div className="flex items-center justify-between max-w-screen-xl mx-auto gap-4">
        {/* Logo */}
        <div className="flex items-center">
          <Link href="/" className="flex items-center space-x-2">
            <img src="/images/logo.png" alt="Art Gallery" width={145} />
          </Link>
        </div>

        {/* Search – show on non-home pages */}
        {pathname !== "/" && (
          <form
            onSubmit={handleSearch}
            className="relative w-full max-w-md ml-3"
          >
            <Input
              type="text"
              placeholder="Поиск"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-6 pr-12 py-2 text-base text-black bg-white rounded-md focus:ring-2 focus:ring-yellow-400"
            />
            <Button
              type="submit"
              size="icon"
              variant="ghost"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-black"
            >
              <Search className="w-5 h-5" />
            </Button>
          </form>
        )}

        {/* Favorites */}
        <div className="flex items-center space-x-4">
          <Link
            href="/favorites"
            className="flex items-center space-x-2 px-3 py-2 rounded text-gray-300 hover:text-white hover:bg-gray-700 transition-colors"
          >
            <Heart size={18} />
            <span className="hidden sm:flex">Избранное</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}
