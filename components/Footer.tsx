import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black px-6 py-10 text-white">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 md:grid-cols-4">
          {/* BRAND */}
          <div>
            <Link
              href="/"
              className="text-2xl font-bold"
            >
              Cinema<span className="text-red-500">Hunt</span>
            </Link>

            <p className="mt-3 max-w-sm text-sm leading-6 text-gray-400">
              Discover movies, popular titles, trailers,
              ratings and more.
            </p>
          </div>

          {/* EXPLORE */}
          <div>
            <h3 className="mb-3 font-semibold">
              Explore
            </h3>

            <div className="flex flex-col gap-2 text-sm text-gray-400">
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
                href="/watchlist"
                className="transition hover:text-white"
              >
                Wishlist
              </Link>
            </div>
          </div>

          {/* INFORMATION */}
          <div>
            <h3 className="mb-3 font-semibold">
              Information
            </h3>

            <div className="flex flex-col gap-2 text-sm text-gray-400">
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
            </div>
          </div>

          {/* TMDB */}
          <div>
            <h3 className="mb-3 font-semibold">
              TMDB
            </h3>

            <p className="text-sm leading-6 text-gray-400">
              This product uses the TMDB API but is not
              endorsed or certified by TMDB.
            </p>
          </div>
        </div>

        {/* COPYRIGHT */}
        <div className="mt-10 border-t border-white/10 pt-6 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} CinemaHunt. All rights reserved.
        </div>
      </div>
    </footer>
  );
}