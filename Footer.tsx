import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#080808] px-6 py-12 text-sm text-gray-500">
      <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <Link href="/" className="text-2xl font-black text-white">Cinema<span className="text-red-500">Hunt</span></Link>
          <p className="mt-3 max-w-md leading-6">A movie discovery guide for finding trending, popular, highly rated, and upcoming films, with movie information and official trailers.</p>
          <p className="mt-4 text-xs text-gray-600">Movie data and images are provided by TMDB. CinemaHunt is not endorsed or certified by TMDB.</p>
        </div>
        <div>
          <h2 className="mb-3 font-semibold text-white">Explore</h2>
          <div className="grid gap-2"><Link href="/movies" className="hover:text-white">Movies</Link><Link href="/popular" className="hover:text-white">Popular</Link><Link href="/top-rated" className="hover:text-white">Top Rated</Link><Link href="/genres" className="hover:text-white">Genres</Link><Link href="/upcoming" className="hover:text-white">Upcoming</Link><Link href="/search" className="hover:text-white">Search</Link></div>
        </div>
        <div>
          <h2 className="mb-3 font-semibold text-white">CinemaHunt</h2>
          <div className="grid gap-2"><Link href="/about" className="hover:text-white">About</Link><Link href="/contact" className="hover:text-white">Contact</Link><Link href="/privacy" className="hover:text-white">Privacy Policy</Link><Link href="/terms" className="hover:text-white">Terms & Conditions</Link></div>
        </div>
      </div>
      <div className="mx-auto mt-10 max-w-7xl border-t border-white/10 pt-6 text-xs">© 2026 CinemaHunt. All rights reserved.</div>
    </footer>
  );
}
