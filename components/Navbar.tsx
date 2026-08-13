"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="fixed top-0 z-50 w-full border-b border-white/10 bg-black/70 px-6 py-4 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <Link
          href="/"
          className="text-2xl font-bold text-white"
        >
          Cinema<span className="text-red-500">Hunt</span>
        </Link>

        <div className="flex items-center gap-6 text-sm text-gray-300">
          <Link
            href="/"
            className="transition hover:text-white"
          >
            Home
          </Link>

          <Link
            href="/movies"
            className="transition hover:text-white"
          >
            Movies
          </Link>

          <Link
            href="/popular"
            className="transition hover:text-white"
          >
            Popular
          </Link>
        </div>
      </div>
    </nav>
  );
}