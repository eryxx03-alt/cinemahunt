"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Heart, Search } from "lucide-react";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
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

    window.addEventListener("wishlistUpdated", handleWishlistUpdate);
    window.addEventListener("storage", handleWishlistUpdate);

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
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      <main className="px-4 pb-20 pt-28 sm:px-6 md:px-10">
        <div className="mx-auto max-w-7xl">
          {/* HEADER */}
          <section className="mb-10">
            <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
              <div>
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-red-500/20 bg-red-500/10">
                    <Heart
                      size={20}
                      className="fill-red-500 text-red-500"
                    />
                  </div>

                  <span className="text-sm font-bold uppercase tracking-[0.2em] text-red-400">
                    Your Collection
                  </span>
                </div>

                <h1 className="text-4xl font-black tracking-tight sm:text-5xl">
                  My Wishlist
                </h1>

                <p className="mt-3 max-w-xl text-sm leading-6 text-zinc-500 sm:text-base">
                  Keep track of movies you want to watch later.
                </p>
              </div>

              {loaded && movies.length > 0 && (
                <div className="w-fit rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-sm text-zinc-400">
                  <span className="font-bold text-white">
                    {movies.length}
                  </span>{" "}
                  {movies.length === 1 ? "movie" : "movies"} saved
                </div>
              )}
            </div>
          </section>

          {/* LOADING */}
          {!loaded ? (
            <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
              {Array.from({ length: 12 }).map((_, index) => (
                <div
                  key={index}
                  className="overflow-hidden rounded-xl border border-white/5 bg-zinc-950"
                >
                  <div className="aspect-[2/3] animate-pulse bg-zinc-900" />

                  <div className="space-y-3 p-3">
                    <div className="h-4 w-4/5 animate-pulse rounded bg-zinc-800" />
                    <div className="h-3 w-1/3 animate-pulse rounded bg-zinc-800" />
                  </div>
                </div>
              ))}
            </div>
          ) : movies.length === 0 ? (
            /* EMPTY STATE */
            <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-zinc-950 via-zinc-900 to-black">
              <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-red-600/10 blur-3xl" />

              <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-red-600/10 blur-3xl" />

              <div className="relative flex min-h-[55vh] flex-col items-center justify-center px-6 py-20 text-center">
                <div className="mb-7 flex h-24 w-24 items-center justify-center rounded-full border border-white/10 bg-white/[0.05] shadow-2xl">
                  <Heart
                    size={42}
                    className="text-red-500"
                  />
                </div>

                <h2 className="text-2xl font-black sm:text-3xl">
                  Your wishlist is empty
                </h2>

                <p className="mt-4 max-w-md text-sm leading-7 text-zinc-500 sm:text-base">
                  Find something you love and tap the heart button to save
                  it here for later.
                </p>

                <Link
                  href="/movies"
                  className="mt-8 inline-flex items-center gap-2 rounded-xl bg-red-600 px-6 py-3.5 text-sm font-bold text-white transition-all duration-300 hover:bg-red-500 hover:shadow-lg hover:shadow-red-600/20"
                >
                  <Search size={18} />
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

      <Footer />
    </div>
  );
}