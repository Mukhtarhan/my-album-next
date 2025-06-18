"use client";

import type React from "react";

import { useState } from "react";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface HeroSectionProps {
  onSearch?: (query: string) => void;
}

export function HeroSection({ onSearch }: HeroSectionProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch && searchQuery.trim()) {
      onSearch(searchQuery.trim());
    }
  };

  return (
    <div
      className="relative h-64 w-full bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: "url('/images/night-bg.png')",
      }}
    >
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-black bg-opacity-30" />

      {/* Content */}
      <div className="relative z-10 flex items-center justify-center h-full px-4">
        <div className="w-full max-w-xl">
          <form onSubmit={handleSearch} className="relative">
            <Input
              type="text"
              placeholder="Поиск"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-6 pr-12 py-6 text-xl bg-white/90 backdrop-blur-sm border-0  shadow-lg focus:bg-white focus:ring-2 focus:ring-blue-500"
            />
            <Button
              type="submit"
              size="sm"
              variant="ghost"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 hover:bg-gray-100 rounded-md"
            >
              <Search className="w-5 h-5 text-gray-600" />
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
