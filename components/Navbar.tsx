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

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <nav className="fixed top-0 z-50 w-full border-b border-white/10 bg-black/70 px-4 py-3 backdrop-blur-xl sm:px-6 sm:py-4">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
        {/* Logo */}
        <Link
          href="/"
          className="flex shrink-0 items-center gap-2 transition-opacity hover:opacity-90"
        >
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

        {/* Navigation */}
        <div className="flex items-center gap-1 overflow-x-auto whitespace-nowrap sm:gap-2">
          {navItems.map((item) => {
            const active = isActive(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative shrink-0 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200 sm:px-4 ${
                  active
                    ? "bg-red-600/15 text-red-400"
                    : "text-gray-300 hover:bg-white/10 hover:text-white"
                }`}
              >
                {item.name}

                {/* Active indicator */}
                {active && (
                  <span className="absolute bottom-0 left-1/2 h-0.5 w-6 -translate-x-1/2 rounded-full bg-red-500" />
                )}
              </Link>
            );
          })}

          {/* Wishlist */}
          <Link
            href="/watchlist"
            className={`relative flex shrink-0 items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-semibold transition-all duration-200 sm:px-4 ${
              pathname === "/watchlist" || pathname.startsWith("/watchlist/")
                ? "bg-red-600/15 text-red-400"
                : "text-gray-300 hover:bg-white/10 hover:text-red-400"
            }`}
          >
            <Heart
              size={18}
              fill={
                pathname === "/watchlist" || pathname.startsWith("/watchlist/")
                  ? "currentColor"
                  : "none"
              }
            />

            <span>Wishlist</span>

            {/* Wishlist active indicator */}
            {(pathname === "/watchlist" ||
              pathname.startsWith("/watchlist/")) && (
              <span className="absolute bottom-0 left-1/2 h-0.5 w-6 -translate-x-1/2 rounded-full bg-red-500" />
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
}