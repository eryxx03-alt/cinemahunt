"use client";

import { Movie, getMovieDetails } from "@/lib/tmdb";
import { useState } from "react";

interface MovieRowProps {
  title: string;
  movies: Movie[];
}

export default function MovieRow({ title, movies }: MovieRowProps) {
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [trailerKey, setTrailerKey] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function openTrailer(movie: Movie) {
    setSelectedMovie(movie);
    setLoading(true);

    try {
      const data = await getMovieDetails(movie.id);
      const videos = data.videos?.results || [];

      const trailer =
        videos.find(
          (video: any) =>
            video.site === "YouTube" &&
            video.type === "Trailer" &&
            video.official === true
        ) ||
        videos.find(
          (video: any) =>
            video.site === "YouTube" &&
            video.type === "Trailer"
        );

      setTrailerKey(trailer?.key || null);
    } catch {
      setTrailerKey(null);
    }

    setLoading(false);
  }

  return (
    <section className="relative">
      {/* Section title */}
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight text-white md:text-3xl">
          {title}
        </h2>

        <span className="text-sm text-gray-500">
          Explore →
        </span>
      </div>

      {/* Movie slider */}
      <div
        className="flex gap-5 overflow-x-auto pb-6 scrollbar-hide"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {movies.slice(0, 20).map((movie) => (
          <button
            key={movie.id}
            onClick={() => openTrailer(movie)}
            className="group relative min-w-[190px] overflow-hidden rounded-2xl text-left outline-none transition-all duration-500 hover:-translate-y-2 hover:scale-[1.03] md:min-w-[210px]"
          >
            {/* Poster */}
            <div className="relative aspect-[2/3] overflow-hidden rounded-2xl bg-[#151515]">
              {movie.poster_path ? (
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              ) : (
                <div className="flex h-full items-center justify-center text-gray-500">
                  No Image
                </div>
              )}

              {/* Dark gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80" />

              {/* Rating */}
              <div className="absolute right-3 top-3 rounded-full bg-black/70 px-3 py-1 text-xs font-bold text-white backdrop-blur-md">
                ⭐ {movie.vote_average?.toFixed(1) || "N/A"}
              </div>

              {/* Play button */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 transition duration-300 group-hover:opacity-100">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-black shadow-2xl">
                  ▶
                </div>
              </div>

              {/* Movie info */}
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h3 className="line-clamp-2 text-lg font-bold text-white">
                  {movie.title}
                </h3>

                {movie.release_date && (
                  <p className="mt-1 text-xs text-gray-300">
                    {movie.release_date.slice(0, 4)}
                  </p>
                )}
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Trailer popup */}
      {selectedMovie && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-5 backdrop-blur-md">
          <div className="relative w-full max-w-5xl">
            <button
              onClick={() => {
                setSelectedMovie(null);
                setTrailerKey(null);
              }}
              className="absolute -right-1 -top-12 text-2xl text-white transition hover:text-gray-400"
            >
              ✕
            </button>

            <div className="aspect-video overflow-hidden rounded-2xl bg-black shadow-2xl">
              {loading ? (
                <div className="flex h-full items-center justify-center">
                  <div className="text-gray-400">
                    Loading trailer...
                  </div>
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
                <div className="flex h-full flex-col items-center justify-center gap-3 text-center">
                  <p className="text-lg font-semibold text-white">
                    Trailer not available
                  </p>
                  <p className="text-sm text-gray-500">
                    No official trailer was found for this movie.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}