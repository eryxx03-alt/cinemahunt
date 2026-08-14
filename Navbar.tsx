"use client";

import Link from "next/link";
import { Menu, Search, X } from "lucide-react";
import { useState } from "react";

const links = [
  ["Home", "/"],
  ["Movies", "/movies"],
  ["Popular", "/popular"],
  ["Top Rated", "/top-rated"],
  ["Genres", "/genres"],
  ["Upcoming", "/upcoming"],
] as const;

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 z-50 w-full border-b border-white/10 bg-black/75 px-4 py-3 backdrop-blur-xl sm:px-6">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <Link href="/" onClick={() => setOpen(false)} className="text-2xl font-black tracking-tight text-white">
          Cinema<span className="text-red-500">Hunt</span>
        </Link>

        <div className="hidden items-center gap-5 text-sm text-gray-300 lg:flex">
          {links.map(([label, href]) => <Link key={href} href={href} className="transition hover:text-white">{label}</Link>)}
          <Link href="/search" aria-label="Search movies" className="rounded-full border border-white/10 p-2 hover:bg-white/10"><Search size={17} /></Link>
        </div>

        <button onClick={() => setOpen(!open)} aria-label={open ? "Close menu" : "Open menu"} className="rounded-lg p-2 text-white hover:bg-white/10 lg:hidden">
          {open ? <X size={23} /> : <Menu size={23} />}
        </button>
      </div>

      {open && (
        <div className="mx-auto mt-3 max-w-7xl rounded-2xl border border-white/10 bg-[#0c0c0c] p-3 lg:hidden">
          <div className="grid gap-1">
            {links.map(([label, href]) => <Link key={href} href={href} onClick={() => setOpen(false)} className="rounded-xl px-4 py-3 text-gray-200 hover:bg-white/5 hover:text-white">{label}</Link>)}
            <Link href="/search" onClick={() => setOpen(false)} className="flex items-center gap-2 rounded-xl px-4 py-3 text-gray-200 hover:bg-white/5 hover:text-white"><Search size={17} /> Search movies</Link>
          </div>
        </div>
      )}
    </nav>
  );
}
