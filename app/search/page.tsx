"use client";

import Image from "next/image";
import Link from "next/link";
import { Search, X } from "lucide-react";
import { useEffect, useState } from "react";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MovieSkeletonGrid from "@/components/MovieSkeletonGrid";

import { getImageUrl, searchMovies, type Movie } from "@/lib/tmdb";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const initialQuery = params.get("q") || "";

    if (initialQuery) {
      setQuery(initialQuery);
      performSearch(initialQuery);
    }
  }, []);

  async function performSearch(searchQuery: string) {
    const trimmedQuery = searchQuery.trim();

    if (!trimmedQuery) {
      setMovies([]);
      setSearched(false);
      return;
    }

    try {
      setLoading(true);
      setError(false);
      setSearched(true);

      const data = await searchMovies(trimmedQuery);

      setMovies(data.results || []);

      window.history.replaceState(
        null,
        "",
        `/search?q=${encodeURIComponent(trimmedQuery)}`
      );
    } catch (error) {
      console.error("Search error:", error);
      setMovies([]);
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    performSearch(query);
  }

  function clearSearch() {
    setQuery("");
    setMovies([]);
    setSearched(false);
    setError(false);

    window.history.replaceState(null, "", "/search");
  }

  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />

      {/* HEADER */}
      <section className="relative overflow-hidden border-b border-white/10 bg-gradient-to-b from-zinc-950 via-black to-black">
        <div className="absolute -right-32 -top-32 h-80 w-80 rounded-full bg-red-600/10 blur-3xl" />

        <div className="absolute -left-32 top-32 h-72 w-72 rounded-full bg-red-600/5 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 pb-10 pt-28 sm:px-6 md:pb-12">
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.3em] text-red-500">
            CinemaHunt
          </p>

          <h1 className="text-3xl font-black tracking-tight sm:text-4xl md:text-5xl">
            Search Movies
            <span className="ml-2">🔎</span>
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-zinc-400 sm:text-base">
            Find movies by title and discover your next favorite film.
          </p>

          {/* SEARCH BOX */}
          <form
            onSubmit={handleSubmit}
            className="mt-7 max-w-3xl"
          >
            <div className="relative flex items-center">
              <Search
                size={20}
                className="pointer-events-none absolute left-4 text-zinc-500"
              />

              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search for a movie..."
                aria-label="Search movies"
                className="h-14 w-full rounded-xl border border-white/10 bg-white/[0.05] pl-12 pr-28 text-sm text-white outline-none backdrop-blur-xl transition-all duration-300 placeholder:text-zinc-600 focus:border-red-500/50 focus:bg-white/[0.07] focus:ring-2 focus:ring-red-500/10 sm:text-base"
              />

              {query && (
                <button
                  type="button"
                  onClick={clearSearch}
                  aria-label="Clear search"
                  className="absolute right-24 flex h-8 w-8 items-center justify-center rounded-lg text-zinc-500 transition hover:bg-white/10 hover:text-white"
                >
                  <X size={17} />
                </button>
              )}

              <button
                type="submit"
                disabled={!query.trim() || loading}
                className="absolute right-2 rounded-lg bg-red-600 px-4 py-2.5 text-sm font-bold transition-all duration-200 hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading ? "..." : "Search"}
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* RESULTS */}
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-12">
        {/* INITIAL STATE */}
        {!searched && !loading && (
          <section className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] px-6 py-20 text-center">
            <div className="absolute left-1/2 top-0 h-40 w-40 -translate-x-1/2 rounded-full bg-red-600/10 blur-3xl" />

            <div className="relative">
              <div className="mb-5 text-5xl">🎬</div>

              <h2 className="text-2xl font-black">
                What do you want to watch?
              </h2>

              <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-zinc-500">
                Search for a movie by title and we'll find matching
                results from TMDB.
              </p>
            </div>
          </section>
        )}

        {/* LOADING */}
        {loading && (
          <section>
            <div className="mb-6 h-7 w-48 animate-pulse rounded bg-zinc-800" />

            <MovieSkeletonGrid count={12} />
          </section>
        )}

        {/* ERROR */}
        {!loading && error && (
          <section className="rounded-2xl border border-red-500/20 bg-red-500/5 p-12 text-center">
            <div className="mb-4 text-4xl">⚠️</div>

            <h2 className="text-xl font-bold">
              Search failed
            </h2>

            <p className="mt-2 text-sm text-zinc-500">
              Something went wrong while searching for movies.
            </p>

            <button
              type="button"
              onClick={() => performSearch(query)}
              className="mt-6 rounded-xl bg-red-600 px-6 py-3 text-sm font-bold transition hover:bg-red-700"
            >
              Try Again
            </button>
          </section>
        )}

        {/* NO RESULTS */}
        {!loading &&
          !error &&
          searched &&
          movies.length === 0 && (
            <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-12 text-center">
              <div className="mb-5 text-5xl">😕</div>

              <h2 className="text-xl font-bold">
                No movies found
              </h2>

              <p className="mt-2 text-sm text-zinc-500">
                We couldn't find anything matching{" "}
                <span className="font-semibold text-zinc-300">
                  "{query}"
                </span>
                .
              </p>

              <button
                type="button"
                onClick={clearSearch}
                className="mt-6 rounded-xl bg-red-600 px-5 py-2.5 text-sm font-bold transition hover:bg-red-700"
              >
                Clear Search
              </button>
            </section>
          )}

        {/* RESULTS GRID */}
        {!loading &&
          !error &&
          searched &&
          movies.length > 0 && (
            <section>
              <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
                <div>
                  <p className="mb-1 text-xs font-bold uppercase tracking-[0.2em] text-red-500">
                    Search Results
                  </p>

                  <h2 className="text-2xl font-black sm:text-3xl">
                    Results for "{query}"
                  </h2>

                  <p className="mt-1 text-sm text-zinc-500">
                    Movies matching your search
                  </p>
                </div>

                <div className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-xs text-zinc-400">
                  <span className="font-bold text-white">
                    {movies.length}
                  </span>{" "}
                  results
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
                {movies.map((movie) => {
                  const title =
                    movie.title ||
                    movie.name ||
                    "Untitled";

                  const year =
                    movie.release_date ||
                    movie.first_air_date;

                  return (
                    <Link
                      key={movie.id}
                      href={`/movie/${movie.id}`}
                      className="group overflow-hidden rounded-xl border border-white/10 bg-zinc-900/80 transition-all duration-300 hover:-translate-y-1 hover:border-red-500/50 hover:bg-zinc-900 hover:shadow-2xl hover:shadow-red-950/30"
                    >
                      <div className="relative aspect-[2/3] overflow-hidden bg-zinc-900">
                        <Image
                          src={getImageUrl(
                            movie.poster_path,
                            "w342"
                          )}
                          alt={title}
                          fill
                          loading="lazy"
                          quality={75}
                          sizes="(max-width: 640px) 45vw, (max-width: 768px) 30vw, (max-width: 1024px) 22vw, 16vw"
                          className="object-cover transition-transform duration-700 group-hover:scale-110"
                        />

                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/20 opacity-70 transition-opacity group-hover:opacity-100" />

                        {movie.vote_average > 0 && (
                          <div className="absolute left-2 top-2 rounded-md border border-white/10 bg-black/75 px-2 py-1 text-xs font-bold text-yellow-400 backdrop-blur-md">
                            ⭐ {movie.vote_average.toFixed(1)}
                          </div>
                        )}

                        <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-600/90 text-white shadow-xl">
                            ▶
                          </div>
                        </div>
                      </div>

                      <div className="p-3">
                        <h3 className="line-clamp-1 text-sm font-semibold text-white transition-colors group-hover:text-red-400">
                          {title}
                        </h3>

                        <p className="mt-1 text-xs text-zinc-500">
                          {year
                            ? year.slice(0, 4)
                            : "Unknown year"}
                        </p>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </section>
          )}
      </div>

      <Footer />
    </main>
  );
}