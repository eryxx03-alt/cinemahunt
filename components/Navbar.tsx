"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, Search } from "lucide-react";
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

  const wishlistActive =
    pathname === "/watchlist" || pathname.startsWith("/watchlist/");

  return (
    <nav className="fixed top-0 z-50 w-full border-b border-white/10 bg-black/65 px-4 py-3 shadow-2xl shadow-black/30 backdrop-blur-2xl sm:px-6 sm:py-4">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
        {/* Logo */}
        <Link
          href="/"
          className="group flex shrink-0 items-center gap-2.5"
        >
          <div className="relative">
            <div className="absolute inset-0 rounded-xl bg-red-600/30 opacity-0 blur-md transition-opacity duration-300 group-hover:opacity-100" />

            <Image
              src="/logo.png"
              alt="CinemaHunt"
              width={42}
              height={42}
              className="relative object-contain transition-transform duration-300 group-hover:scale-105"
              priority
            />
          </div>

          <span className="text-xl font-black tracking-tight text-white sm:text-2xl">
            Cinema<span className="text-red-500">Hunt</span>
          </span>
        </Link>

        {/* Navigation */}
        <div className="flex items-center gap-1 overflow-x-auto whitespace-nowrap rounded-xl border border-white/10 bg-white/[0.03] p-1 sm:gap-1.5">
          {navItems.map((item) => {
            const active = isActive(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative flex shrink-0 items-center rounded-lg px-3 py-2 text-sm font-semibold transition-all duration-300 sm:px-4 ${
                  active
                    ? "bg-red-600/15 text-red-400 shadow-lg shadow-red-950/20"
                    : "text-zinc-400 hover:bg-white/[0.06] hover:text-white"
                }`}
              >
                {item.name}

                {active && (
                  <span className="absolute bottom-0 left-1/2 h-0.5 w-5 -translate-x-1/2 rounded-full bg-red-500 shadow-lg shadow-red-500/50" />
                )}
              </Link>
            );
          })}

          {/* Wishlist */}
          <Link
            href="/watchlist"
            aria-label="Wishlist"
            className={`relative flex shrink-0 items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-semibold transition-all duration-300 sm:px-4 ${
              wishlistActive
                ? "bg-red-600/15 text-red-400 shadow-lg shadow-red-950/20"
                : "text-zinc-400 hover:bg-white/[0.06] hover:text-red-400"
            }`}
          >
            <Heart
              size={17}
              className="transition-transform duration-300 group-hover:scale-110"
              fill={wishlistActive ? "currentColor" : "none"}
            />

            <span className="hidden sm:inline">Wishlist</span>

            {wishlistActive && (
              <span className="absolute bottom-0 left-1/2 h-0.5 w-5 -translate-x-1/2 rounded-full bg-red-500 shadow-lg shadow-red-500/50" />
            )}
          </Link>

          {/* Search */}
          <Link
            href="/movies"
            aria-label="Search movies"
            className="flex shrink-0 items-center justify-center rounded-lg p-2 text-zinc-400 transition-all duration-300 hover:bg-white/[0.06] hover:text-white"
          >
            <Search size={18} />
          </Link>
        </div>
      </div>
    </nav>
  );
}