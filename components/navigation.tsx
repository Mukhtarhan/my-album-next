"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Heart, ImageIcon } from "lucide-react"

export function Navigation() {
  const pathname = usePathname()

  return (
    <nav className="bg-gray-900 text-white px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <Link
            href="/"
            className={`flex items-center space-x-2 px-3 py-2 rounded ${
              pathname === "/" ? "bg-blue-600" : "hover:bg-gray-700"
            }`}
          >
            <Home size={20} />
            <span>home</span>
          </Link>
          <Link
            href="/favorites"
            className={`flex items-center space-x-2 px-3 py-2 rounded ${
              pathname === "/favorites" ? "bg-blue-600" : "hover:bg-gray-700"
            }`}
          >
            <Heart size={20} />
            <span>favorites</span>
          </Link>
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-sm">photo_page</span>
          <ImageIcon size={20} />
        </div>
      </div>
    </nav>
  )
}
