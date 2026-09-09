import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black">
      <div className="mx-auto max-w-7xl px-6 py-10">
        <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          {/* Brand */}
          <div>
            <Link
              href="/"
              className="text-xl font-bold text-white transition hover:text-red-500"
            >
              CinemaHunt
            </Link>

            <p className="mt-2 max-w-md text-sm text-zinc-400">
              Discover movies and TV shows, explore ratings, trailers, and
              more.
            </p>
          </div>

          {/* Navigation */}
          <nav className="flex flex-wrap gap-x-6 gap-y-3 text-sm text-zinc-400">
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

            <Link
              href="/about"
              className="transition hover:text-white"
            >
              About
            </Link>

            <Link
              href="/contact"
              className="transition hover:text-white"
            >
              Contact
            </Link>

            <Link
              href="/privacy"
              className="transition hover:text-white"
            >
              Privacy
            </Link>

            <Link
              href="/terms"
              className="transition hover:text-white"
            >
              Terms
            </Link>
          </nav>
        </div>

        {/* TMDB Attribution */}
        <div className="mt-8 border-t border-white/10 pt-6">
          <p className="text-center text-xs leading-5 text-zinc-500">
            This product uses the TMDB API but is not endorsed or certified
            by TMDB.
          </p>

          <p className="mt-2 text-center text-xs text-zinc-600">
            © {new Date().getFullYear()} CinemaHunt. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}