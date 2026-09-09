"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import MovieCard from "@/components/MovieCard";

type Movie = {
  id: number;
  title?: string;
  name?: string;
  overview?: string | null;
  poster_path?: string | null;
  backdrop_path?: string | null;
  vote_average?: number | null;
  rating?: number | null;
  release_date?: string | null;
  first_air_date?: string | null;
  media_type?: string;
};

const WISHLIST_KEY = "cinemahunt-wishlist";

export default function WatchlistPage() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    function loadWishlist() {
      try {
        const stored = localStorage.getItem(WISHLIST_KEY);

        if (!stored) {
          setMovies([]);
          setLoaded(true);
          return;
        }

        const parsed = JSON.parse(stored);

        setMovies(Array.isArray(parsed) ? parsed : []);
      } catch {
        setMovies([]);
      } finally {
        setLoaded(true);
      }
    }

    loadWishlist();

    const handleWishlistUpdate = () => {
      loadWishlist();
    };

    window.addEventListener(
      "wishlistUpdated",
      handleWishlistUpdate
    );

    window.addEventListener(
      "storage",
      handleWishlistUpdate
    );

    return () => {
      window.removeEventListener(
        "wishlistUpdated",
        handleWishlistUpdate
      );

      window.removeEventListener(
        "storage",
        handleWishlistUpdate
      );
    };
  }, []);

  return (
    <main className="min-h-screen bg-black px-4 pb-16 pt-28 text-white sm:px-6">
      <div className="mx-auto max-w-7xl">
        {/* HEADER */}
        <div className="mb-10">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <div className="mb-3 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-red-500/20 bg-red-500/10 text-xl">
                  ❤️
                </div>

                <span className="text-sm font-semibold uppercase tracking-[0.2em] text-red-400">
                  Your Collection
                </span>
              </div>

              <h1 className="text-3xl font-black tracking-tight sm:text-4xl md:text-5xl">
                My Wishlist
              </h1>

              <p className="mt-2 max-w-xl text-sm leading-6 text-zinc-500 sm:text-base">
                Keep track of movies and shows you want to watch later.
              </p>
            </div>

            {loaded && movies.length > 0 && (
              <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-zinc-400">
                <span className="font-semibold text-white">
                  {movies.length}
                </span>{" "}
                {movies.length === 1 ? "movie" : "movies"} saved
              </div>
            )}
          </div>
        </div>

        {/* LOADING */}
        {!loaded ? (
          <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="overflow-hidden rounded-xl bg-zinc-900"
              >
                <div className="aspect-[2/3] animate-pulse bg-zinc-800" />

                <div className="space-y-3 p-3">
                  <div className="h-4 w-4/5 animate-pulse rounded bg-zinc-800" />
                  <div className="h-3 w-1/3 animate-pulse rounded bg-zinc-800" />
                  <div className="h-3 w-full animate-pulse rounded bg-zinc-800" />
                  <div className="h-3 w-4/5 animate-pulse rounded bg-zinc-800" />
                </div>
              </div>
            ))}
          </div>
        ) : movies.length === 0 ? (
          /* EMPTY STATE */
          <section className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-zinc-950 via-zinc-900 to-black">
            <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-red-600/10 blur-3xl" />

            <div className="absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-red-600/10 blur-3xl" />

            <div className="relative flex min-h-[50vh] flex-col items-center justify-center px-6 py-16 text-center">
              <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full border border-white/10 bg-white/5 text-4xl shadow-2xl">
                🤍
              </div>

              <h2 className="text-2xl font-bold sm:text-3xl">
                Your wishlist is empty
              </h2>

              <p className="mt-3 max-w-md text-sm leading-6 text-zinc-500 sm:text-base">
                Find something you love and tap the heart icon to save it
                here for later.
              </p>

              <Link
                href="/movies"
                className="mt-7 rounded-lg bg-red-600 px-6 py-3 text-sm font-bold transition-all duration-200 hover:bg-red-700 hover:shadow-lg hover:shadow-red-600/20"
              >
                Browse Movies
              </Link>
            </div>
          </section>
        ) : (
          /* MOVIE GRID */
          <section>
            <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
              {movies.map((movie) => (
                <MovieCard
                  key={movie.id}
                  movie={movie}
                />
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}