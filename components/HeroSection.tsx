"use client";

import Link from "next/link";
import { useState } from "react";
import { Movie, getMovieDetails } from "@/lib/tmdb";

interface HeroSectionProps {
  movie: Movie;
}

export default function HeroSection({ movie }: HeroSectionProps) {
  const [showTrailer, setShowTrailer] = useState(false);
  const [trailerKey, setTrailerKey] = useState<string | null>(null);
  const [loadingTrailer, setLoadingTrailer] = useState(false);

  const handleTrailer = async () => {
    setShowTrailer(true);
    setLoadingTrailer(true);

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
    } catch (error) {
      console.error("Trailer error:", error);
      setTrailerKey(null);
    } finally {
      setLoadingTrailer(false);
    }
  };

  return (
    <>
      <section className="relative flex min-h-[70vh] items-end overflow-hidden bg-[#080808]">
        {movie.backdrop_path && (
          <img
            src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
            alt={movie.title}
            className="absolute inset-0 h-full w-full object-cover opacity-50"
          />
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/60 to-transparent" />

        <div className="relative z-10 max-w-3xl px-6 pb-20 pt-32">
          <h1 className="text-4xl font-bold text-white md:text-6xl">
            {movie.title}
          </h1>

          <p className="mt-4 line-clamp-3 text-gray-300">
            {movie.overview ||
              "Discover movies and watch amazing movies."}
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            {/* WATCH NOW */}
            <Link
              href={`/movie/${movie.id}`}
              className="rounded-lg bg-red-600 px-6 py-3 font-semibold text-white transition hover:bg-red-700"
            >
              ▶ WATCH NOW
            </Link>

            {/* WATCH TRAILER */}
            <button
              onClick={handleTrailer}
              className="rounded-lg bg-white px-6 py-3 font-semibold text-black transition hover:bg-gray-200"
            >
             🎬 HERO TRAILER ONLY
            </button>
          </div>
        </div>
      </section>

      {/* TRAILER MODAL */}
      {showTrailer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4">
          <div className="relative w-full max-w-5xl">
            <button
              onClick={() => {
                setShowTrailer(false);
                setTrailerKey(null);
              }}
              className="absolute -right-2 -top-12 text-3xl text-white"
            >
              ✕
            </button>

            <div className="aspect-video w-full overflow-hidden rounded-xl bg-black">
              {loadingTrailer ? (
                <div className="flex h-full items-center justify-center text-white">
                  Loading trailer...
                </div>
              ) : trailerKey ? (
                <iframe
                  className="h-full w-full"
                  src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1`}
                  title={`${movie.title} Official Trailer`}
                  allow="autoplay; encrypted-media; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <div className="flex h-full items-center justify-center text-white">
                  Trailer not available.
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}