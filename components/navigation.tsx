"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Heart } from "lucide-react";

export function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="bg-black text-white py-4 sm:px-0 px-3">
      <div className="flex items-center justify-between max-w-screen-xl mx-auto">
        <div className="flex items-center">
          <Link href="/" className="flex items-center space-x-2">
            <img src="/images/logo.png" alt="" width={145} />
          </Link>
        </div>

        <div className="flex items-center space-x-6">
          <Link
            href="/favorites"
            className={`flex items-center space-x-2 px-3 py-2 rounded transition-colors text-gray-300 hover:text-white hover:bg-gray-700`}
          >
            <Heart size={18} />
            <span>Избранное</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}
