"use client";

import Navbar from "@/components/Navbar";
import { useEffect, useState } from "react";
import {
  getNowPlayingMovies,
  getUpcomingMovies,
  Movie,
} from "@/lib/tmdb";

export default function MoviesPage() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [trailerKey, setTrailerKey] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadMovies() {
      try {
        const [nowPlaying, upcoming] = await Promise.all([
          getNowPlayingMovies(),
          getUpcomingMovies(),
        ]);

        const combined: Movie[] = [
          ...(nowPlaying.results || []),
          ...(upcoming.results || []),
        ];

        setMovies(combined);
      } catch (error) {
        console.error("Movies error:", error);
      }
    }

    loadMovies();
  }, []);

  async function openMovie(movie: Movie) {
    setSelectedMovie(movie);
    setTrailerKey(null);
    setLoading(true);

    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${movie.id}/videos?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
      );

      const data = await response.json();

      const trailer = data.results?.find(
        (video: any) =>
          video.site === "YouTube" &&
          video.type === "Trailer"
      );

      setTrailerKey(trailer?.key || null);
    } catch (error) {
      console.error("Trailer error:", error);
      setTrailerKey(null);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#050505] text-white">
      <Navbar />

      <div className="mx-auto max-w-7xl px-6 pb-20 pt-28">
        <p className="mb-2 text-sm uppercase tracking-[0.3em] text-red-500">
          CinemaHunt
        </p>

        <h1 className="mb-10 text-4xl font-bold">
          Explore Movies 🎬
        </h1>

        {movies.length === 0 ? (
          <p className="text-gray-400">
            Loading movies...
          </p>
        ) : (
          <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
            {movies.map((movie, index) => (
              <button
                key={`${movie.id}-${index}`}
                type="button"
                onClick={() => openMovie(movie)}
                className="group overflow-hidden rounded-2xl bg-[#111] text-left transition duration-300 hover:-translate-y-2"
              >
                <div className="relative overflow-hidden">
                  {movie.poster_path ? (
                    <img
                      src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                      alt={movie.title}
                      className="aspect-[2/3] w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex aspect-[2/3] items-center justify-center text-gray-500">
                      No Image
                    </div>
                  )}

                  <div className="absolute right-2 top-2 rounded-full bg-black/80 px-2 py-1 text-xs">
                    ⭐ {movie.vote_average?.toFixed(1) || "N/A"}
                  </div>

                  <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition group-hover:opacity-100">
                    <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-black">
                      ▶
                    </span>
                  </div>
                </div>

                <div className="p-3">
                  <h2 className="line-clamp-1 font-semibold">
                    {movie.title}
                  </h2>

                  {movie.release_date && (
                    <p className="mt-1 text-xs text-gray-500">
                      {movie.release_date.slice(0, 4)}
                    </p>
                  )}
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {selectedMovie && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-5">
          <div className="relative w-full max-w-5xl">
            <button
              type="button"
              onClick={() => {
                setSelectedMovie(null);
                setTrailerKey(null);
              }}
              className="absolute -right-1 -top-12 text-2xl text-white"
            >
              ✕
            </button>

            <div className="aspect-video overflow-hidden rounded-2xl bg-black">
              {loading ? (
                <div className="flex h-full items-center justify-center text-gray-400">
                  Loading trailer...
                </div>
              ) : trailerKey ? (
                <iframe
                  className="h-full w-full"
                  src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1`}
                  title={`${selectedMovie.title} Trailer`}
                  allow="autoplay; encrypted-media; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <div className="flex h-full flex-col items-center justify-center">
                  <h2 className="text-xl font-bold">
                    {selectedMovie.title}
                  </h2>

                  <p className="mt-2 text-gray-400">
                    Trailer not available.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}