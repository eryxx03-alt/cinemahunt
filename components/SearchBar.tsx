"use client";

import Image from "next/image";
import Link from "next/link";
import { Search, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { getImageUrl, searchMovies, type Movie } from "@/lib/tmdb";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const trimmedQuery = query.trim();

    if (trimmedQuery.length < 2) {
      setResults([]);
      setLoading(false);
      return;
    }

    const timer = setTimeout(async () => {
      try {
        setLoading(true);

        const data = await searchMovies(trimmedQuery);

        setResults(
          (data.results || [])
            .filter((movie) => movie.poster_path)
            .slice(0, 6)
        );

        setOpen(true);
      } catch (error) {
        console.error("Search suggestions error:", error);
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, 450);

    return () => clearTimeout(timer);
  }, [query]);

  useEffect(() => {
    function handleOutsideClick(event: MouseEvent) {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener(
        "mousedown",
        handleOutsideClick
      );
    };
  }, []);

  function clearSearch() {
    setQuery("");
    setResults([]);
    setOpen(false);
  }

  function submitSearch(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    const trimmedQuery = query.trim();

    if (!trimmedQuery) return;

    window.location.href = `/search?q=${encodeURIComponent(
      trimmedQuery
    )}`;
  }

  function viewAllResults() {
    const trimmedQuery = query.trim();

    if (!trimmedQuery) return;

    window.location.href = `/search?q=${encodeURIComponent(
      trimmedQuery
    )}`;
  }

  return (
    <div
      ref={searchRef}
      className="relative w-full"
    >
      <form onSubmit={submitSearch}>
        <div className="relative">
          <Search
            size={18}
            className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500"
          />

          <input
            type="search"
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setOpen(true);
            }}
            onFocus={() => {
              if (query.trim().length >= 2) {
                setOpen(true);
              }
            }}
            placeholder="Search movies..."
            aria-label="Search movies"
            className="h-11 w-full rounded-xl border border-white/10 bg-white/[0.05] pl-10 pr-20 text-sm text-white outline-none backdrop-blur-xl transition-all duration-300 placeholder:text-zinc-600 focus:border-red-500/50 focus:bg-white/[0.08] focus:ring-2 focus:ring-red-500/10"
          />

          {query && (
            <button
              type="button"
              onClick={clearSearch}
              aria-label="Clear search"
              className="absolute right-11 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-md text-zinc-500 transition hover:bg-white/10 hover:text-white"
            >
              <X size={15} />
            </button>
          )}

          <button
            type="submit"
            aria-label="Search"
            className="absolute right-1.5 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-lg bg-red-600 text-white shadow-lg shadow-red-950/30 transition hover:bg-red-500 hover:shadow-red-600/20"
          >
            <Search size={15} />
          </button>
        </div>
      </form>

      {open && query.trim().length >= 2 && (
        <div className="absolute left-0 right-0 top-[calc(100%+8px)] z-[100] overflow-hidden rounded-2xl border border-white/10 bg-zinc-950/98 shadow-2xl shadow-black/70 backdrop-blur-2xl">

          {/* Loading */}
          {loading && (
            <div className="p-3">
              {Array.from({ length: 4 }).map((_, index) => (
                <div
                  key={index}
                  className="flex gap-3 rounded-xl p-2"
                >
                  <div className="h-16 w-11 shrink-0 animate-pulse rounded-md bg-zinc-800" />

                  <div className="flex-1 space-y-2 pt-2">
                    <div className="h-4 w-3/4 animate-pulse rounded bg-zinc-800" />
                    <div className="h-3 w-1/3 animate-pulse rounded bg-zinc-800" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Results */}
          {!loading && results.length > 0 && (
            <>
              <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-red-500">
                  Movies
                </p>

                <span className="text-xs text-zinc-600">
                  {results.length} found
                </span>
              </div>

              <div className="p-2">
                {results.map((movie) => {
                  const title =
                    movie.title ||
                    movie.name ||
                    "Untitled";

                  const releaseDate =
                    movie.release_date ||
                    movie.first_air_date;

                  return (
                    <Link
                      key={movie.id}
                      href={`/movie/${movie.id}`}
                      onClick={() => setOpen(false)}
                      className="group flex gap-3 rounded-xl p-2.5 transition-all duration-200 hover:bg-white/[0.07]"
                    >
                      <div className="relative h-16 w-11 shrink-0 overflow-hidden rounded-md bg-zinc-900">
                        <Image
                          src={getImageUrl(
                            movie.poster_path,
                            "w92"
                          )}
                          alt={title}
                          fill
                          sizes="44px"
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>

                      <div className="min-w-0 flex-1 py-1">
                        <h3 className="line-clamp-1 text-sm font-semibold text-white transition-colors group-hover:text-red-400">
                          {title}
                        </h3>

                        <div className="mt-1.5 flex items-center gap-2 text-xs text-zinc-500">
                          {releaseDate && (
                            <span>
                              {releaseDate.slice(0, 4)}
                            </span>
                          )}

                          {movie.vote_average > 0 && (
                            <span className="text-yellow-400">
                              ★ {movie.vote_average.toFixed(1)}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center pr-1 text-zinc-700 transition-colors group-hover:text-red-400">
                        →
                      </div>
                    </Link>
                  );
                })}
              </div>

              <button
                type="button"
                onClick={viewAllResults}
                className="w-full border-t border-white/10 px-4 py-3 text-center text-sm font-semibold text-red-400 transition hover:bg-red-500/10 hover:text-red-300"
              >
                View all results →
              </button>
            </>
          )}

          {/* No results */}
          {!loading &&
            query.trim().length >= 2 &&
            results.length === 0 && (
              <div className="px-5 py-8 text-center">
                <div className="mb-2 text-3xl">
                  🎬
                </div>

                <p className="text-sm font-semibold text-zinc-300">
                  No movies found
                </p>

                <p className="mt-1 text-xs text-zinc-600">
                  Try another movie title.
                </p>
              </div>
            )}
        </div>
      )}
    </div>
  );
}