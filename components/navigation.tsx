"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Heart } from "lucide-react"

export function Navigation() {
  const pathname = usePathname()

  return (
    <nav className="bg-gray-900 text-white px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <Link href="/" className="flex items-center space-x-2">
            <div className="bg-yellow-400 text-black px-2 py-1 rounded font-bold text-sm">ART</div>
            <div className="text-white">
              <div className="font-bold">GALLERY</div>
              <div className="text-xs text-gray-300">ART GALLERY</div>
            </div>
          </Link>
        </div>

        <div className="flex items-center space-x-6">
          <Link
            href="/favorites"
            className={`flex items-center space-x-2 px-3 py-2 rounded transition-colors ${
              pathname === "/favorites" ? "bg-blue-600 text-white" : "text-gray-300 hover:text-white hover:bg-gray-700"
            }`}
          >
            <Heart size={18} />
            <span>Избранное</span>
          </Link>
        </div>
      </div>
    </nav>
  )
}
