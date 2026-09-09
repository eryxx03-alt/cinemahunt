"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart } from "lucide-react";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Movies", href: "/movies" },
    { name: "Popular", href: "/popular" },
  ];

  return (
    <nav className="fixed top-0 z-50 w-full border-b border-white/10 bg-black/70 px-4 py-3 backdrop-blur-md sm:px-6 sm:py-4">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">

        <Link href="/" className="flex shrink-0 items-center gap-2">
          <Image
            src="/logo.png"
            alt="CinemaHunt"
            width={40}
            height={40}
            className="object-contain"
            priority
          />

          <span className="text-xl font-bold text-white sm:text-2xl">
            Cinema<span className="text-red-500">Hunt</span>
          </span>
        </Link>

        <div className="flex items-center gap-1 overflow-x-auto whitespace-nowrap sm:gap-2">

          {navItems.map((item) => {
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`shrink-0 rounded-lg px-3 py-2 text-sm font-medium transition sm:px-4 ${
                  isActive
                    ? "bg-red-600 text-white"
                    : "text-gray-300 hover:bg-white/10 hover:text-white"
                }`}
              >
                {item.name}
              </Link>
            );
          })}

          <Link
            href="/watchlist"
            className={`flex shrink-0 items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-semibold transition sm:px-4 ${
              pathname.startsWith("/watchlist")
                ? "bg-red-600 text-white"
                : "text-red-400 hover:bg-white/10"
            }`}
          >
            <Heart
              size={18}
              fill={
                pathname.startsWith("/watchlist")
                  ? "currentColor"
                  : "none"
              }
            />
            <span>Wishlist</span>
          </Link>

        </div>
      </div>
    </nav>
  );
}