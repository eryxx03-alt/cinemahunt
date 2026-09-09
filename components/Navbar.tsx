"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, Menu, Search, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Movies", href: "/movies" },
    { name: "Popular", href: "/popular" },
  ];

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }

    return (
      pathname === href ||
      pathname.startsWith(`${href}/`)
    );
  };

  const wishlistActive =
    pathname === "/watchlist" ||
    pathname.startsWith("/watchlist/");

  const searchActive =
    pathname === "/search" ||
    pathname.startsWith("/search/");

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <nav className="fixed top-0 z-50 w-full border-b border-white/10 bg-black/70 shadow-2xl shadow-black/30 backdrop-blur-2xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:h-[72px] sm:px-6">
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
              width={40}
              height={40}
              priority
              className="relative object-contain transition-transform duration-300 group-hover:scale-105 sm:h-[42px] sm:w-[42px]"
            />
          </div>

          <span className="text-xl font-black tracking-tight text-white sm:text-2xl">
            Cinema<span className="text-red-500">Hunt</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-1 rounded-xl border border-white/10 bg-white/[0.03] p-1 sm:flex">
          {navItems.map((item) => {
            const active = isActive(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative flex items-center rounded-lg px-4 py-2 text-sm font-semibold transition-all duration-300 ${
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
            className={`relative flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-semibold transition-all duration-300 ${
              wishlistActive
                ? "bg-red-600/15 text-red-400 shadow-lg shadow-red-950/20"
                : "text-zinc-400 hover:bg-white/[0.06] hover:text-red-400"
            }`}
          >
            <Heart
              size={17}
              fill={wishlistActive ? "currentColor" : "none"}
              className="transition-transform duration-300"
            />

            <span>Wishlist</span>

            {wishlistActive && (
              <span className="absolute bottom-0 left-1/2 h-0.5 w-5 -translate-x-1/2 rounded-full bg-red-500 shadow-lg shadow-red-500/50" />
            )}
          </Link>

          {/* Search */}
          <Link
            href="/search"
            aria-label="Search movies"
            className={`flex items-center justify-center rounded-lg p-2.5 transition-all duration-300 ${
              searchActive
                ? "bg-red-600/15 text-red-400"
                : "text-zinc-400 hover:bg-white/[0.06] hover:text-white"
            }`}
          >
            <Search size={18} />
          </Link>
        </div>

        {/* Mobile Actions */}
        <div className="flex items-center gap-2 sm:hidden">
          {/* Mobile Wishlist */}
          <Link
            href="/watchlist"
            aria-label="Wishlist"
            className={`flex h-10 w-10 items-center justify-center rounded-xl border transition-all duration-300 ${
              wishlistActive
                ? "border-red-500/30 bg-red-500/10 text-red-400"
                : "border-white/10 bg-white/[0.04] text-zinc-400 hover:border-red-500/30 hover:text-red-400"
            }`}
          >
            <Heart
              size={19}
              fill={wishlistActive ? "currentColor" : "none"}
            />
          </Link>

          {/* Mobile Search */}
          <Link
            href="/search"
            aria-label="Search movies"
            className={`flex h-10 w-10 items-center justify-center rounded-xl border transition-all duration-300 ${
              searchActive
                ? "border-red-500/30 bg-red-500/10 text-red-400"
                : "border-white/10 bg-white/[0.04] text-zinc-400 hover:border-red-500/30 hover:text-white"
            }`}
          >
            <Search size={19} />
          </Link>

          {/* Mobile Menu */}
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={
              menuOpen ? "Close menu" : "Open menu"
            }
            aria-expanded={menuOpen}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-zinc-300 transition-all duration-300 hover:border-red-500/30 hover:bg-red-500/10 hover:text-white"
          >
            {menuOpen ? (
              <X size={21} />
            ) : (
              <Menu size={21} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`overflow-hidden border-t border-white/10 bg-black/95 backdrop-blur-2xl transition-all duration-300 sm:hidden ${
          menuOpen
            ? "max-h-[500px] opacity-100"
            : "max-h-0 border-transparent opacity-0"
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 py-4">
          <div className="space-y-2">
            {navItems.map((item) => {
              const active = isActive(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center justify-between rounded-xl border px-4 py-3.5 text-sm font-semibold transition-all duration-200 ${
                    active
                      ? "border-red-500/20 bg-red-500/10 text-red-400"
                      : "border-white/5 bg-white/[0.03] text-zinc-400 hover:border-white/10 hover:bg-white/[0.06] hover:text-white"
                  }`}
                >
                  <span>{item.name}</span>

                  {active && (
                    <span className="h-2 w-2 rounded-full bg-red-500 shadow-lg shadow-red-500/50" />
                  )}
                </Link>
              );
            })}

            {/* Mobile Wishlist */}
            <Link
              href="/watchlist"
              className={`flex items-center justify-between rounded-xl border px-4 py-3.5 text-sm font-semibold transition-all duration-200 ${
                wishlistActive
                  ? "border-red-500/20 bg-red-500/10 text-red-400"
                  : "border-white/5 bg-white/[0.03] text-zinc-400 hover:border-white/10 hover:bg-white/[0.06] hover:text-white"
              }`}
            >
              <span className="flex items-center gap-3">
                <Heart
                  size={18}
                  fill={
                    wishlistActive
                      ? "currentColor"
                      : "none"
                  }
                />
                Wishlist
              </span>

              {wishlistActive && (
                <span className="h-2 w-2 rounded-full bg-red-500 shadow-lg shadow-red-500/50" />
              )}
            </Link>

            {/* Mobile Search */}
            <Link
              href="/search"
              className={`flex items-center gap-3 rounded-xl border px-4 py-3.5 text-sm font-semibold transition-all duration-200 ${
                searchActive
                  ? "border-red-500/20 bg-red-500/10 text-red-400"
                  : "border-white/5 bg-white/[0.03] text-zinc-400 hover:border-white/10 hover:bg-white/[0.06] hover:text-white"
              }`}
            >
              <Search size={18} />
              Search Movies
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}