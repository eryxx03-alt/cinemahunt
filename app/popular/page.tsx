"use client";

import { useEffect, useState } from "react";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MovieCard from "@/components/MovieCard";
import MovieSkeletonGrid from "@/components/MovieSkeletonGrid";

import { getPopularMovies, type Movie } from "@/lib/tmdb";

export default function PopularPage() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function loadMovies() {
      try {
        setLoading(true);
        setError(false);

        const data = await getPopularMovies();

        setMovies(data.results || []);
      } catch (error) {
        console.error("Movies error:", error);
        setMovies([]);
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    loadMovies();
  }, []);

  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />

      {/* HEADER */}
      <section className="relative overflow-hidden border-b border-white/10 bg-gradient-to-b from-zinc-950 via-black to-black">
        <div className="absolute -right-32 -top-32 h-80 w-80 rounded-full bg-red-600/10 blur-3xl" />

        <div className="absolute -left-32 top-40 h-72 w-72 rounded-full bg-red-600/5 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 pb-12 pt-28 sm:px-6">
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.3em] text-red-500">
            CinemaHunt
          </p>

          <h1 className="text-3xl font-black tracking-tight sm:text-4xl md:text-5xl">
            Popular Movies
            <span className="ml-2">🔥</span>
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-zinc-400 sm:text-base">
            Discover the movies everyone is watching right now.
          </p>
        </div>
      </section>

      {/* CONTENT */}
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-12">
        {/* LOADING */}
        {loading && (
          <section>
            <div className="mb-6 flex items-center justify-between">
              <div className="h-7 w-40 animate-pulse rounded bg-zinc-800" />
            </div>

            <MovieSkeletonGrid count={18} />
          </section>
        )}

        {/* ERROR */}
        {!loading && error && (
          <section className="relative overflow-hidden rounded-2xl border border-red-500/20 bg-red-500/5 p-12 text-center">
            <div className="absolute left-1/2 top-0 h-32 w-32 -translate-x-1/2 rounded-full bg-red-600/10 blur-3xl" />

            <div className="relative">
              <div className="mb-4 text-4xl">⚠️</div>

              <h2 className="text-xl font-bold">
                Something went wrong
              </h2>

              <p className="mt-2 text-sm text-zinc-500">
                We couldn't load the popular movies right now.
              </p>

              <button
                type="button"
                onClick={() => window.location.reload()}
                className="mt-6 rounded-xl bg-red-600 px-6 py-3 text-sm font-bold transition-all duration-300 hover:bg-red-700 hover:shadow-lg hover:shadow-red-600/20"
              >
                Try Again
              </button>
            </div>
          </section>
        )}

        {/* EMPTY */}
        {!loading && !error && movies.length === 0 && (
          <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-12 text-center">
            <div className="mb-5 text-5xl">🎬</div>

            <h2 className="text-xl font-bold">
              No popular movies found
            </h2>

            <p className="mt-2 text-sm text-zinc-500">
              Check back again soon.
            </p>
          </section>
        )}

        {/* MOVIES */}
        {!loading && !error && movies.length > 0 && (
          <section>
            <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="mb-1 text-xs font-bold uppercase tracking-[0.2em] text-red-500">
                  Trending with everyone
                </p>

                <h2 className="text-2xl font-black sm:text-3xl">
                  Top Popular Picks
                </h2>

                <p className="mt-1 text-sm text-zinc-500">
                  The most popular movies right now
                </p>
              </div>

              <div className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-xs text-zinc-400">
                <span className="font-bold text-white">
                  {movies.length}
                </span>{" "}
                movies
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
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

      <Footer />
    </main>
  );
}