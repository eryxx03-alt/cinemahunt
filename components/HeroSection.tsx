```tsx
"use client";

import Link from "next/link";
import { useState } from "react";
import { Play, Info, X, Star } from "lucide-react";
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

  const releaseDate = movie.release_date || movie.first_air_date;

  const year = releaseDate
    ? new Date(releaseDate).getFullYear()
    : null;

  const rating =
    typeof movie.vote_average === "number"
      ? movie.vote_average
      : null;

  return (
    <>
      <section className="relative min-h-[78vh] overflow-hidden bg-[#050505]">
        {/* Optimized Backdrop */}
        {movie.backdrop_path && (
          <img
            src={`https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`}
            alt={movie.title}
            loading="eager"
            decoding="async"
            fetchPriority="high"
            className="absolute inset-0 h-full w-full object-cover object-center"
          />
        )}

        {/* Cinematic gradients */}
        <div className="absolute inset-0 bg-black/30" />

        <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505]/70 to-transparent" />

        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/20 to-transparent" />

        {/* Content */}
        <div className="relative z-10 flex min-h-[78vh] items-end">
          <div className="w-full max-w-3xl px-5 pb-16 pt-32 sm:px-8 md:pb-24 lg:px-12">
            {/* Featured label */}
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-red-500/30 bg-red-500/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-red-400 backdrop-blur-md">
              <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
              Featured Movie
            </div>

            {/* Title */}
            <h1 className="max-w-3xl text-4xl font-black leading-[1.05] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
              {movie.title}
            </h1>

            {/* Movie information */}
            <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-300">
              {year && <span>{year}</span>}

              {rating !== null && (
                <span className="flex items-center gap-1 font-semibold text-yellow-400">
                  <Star size={15} fill="currentColor" />
                  {rating.toFixed(1)}
                </span>
              )}

              <span className="rounded border border-white/20 px-2 py-0.5 text-xs text-gray-300">
                TMDB
              </span>
            </div>

            {/* Overview */}
            <p className="mt-5 max-w-2xl line-clamp-3 text-sm leading-6 text-gray-300 sm:text-base">
              {movie.overview ||
                "Discover this movie and explore everything CinemaHunt has to offer."}
            </p>

            {/* Buttons */}
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href={`/movie/${movie.id}`}
                className="inline-flex items-center gap-2 rounded-lg bg-red-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-red-950/30 transition-all duration-200 hover:scale-[1.02] hover:bg-red-500"
              >
                <Info size={18} />
                View Details
              </Link>

              <button
                type="button"
                onClick={handleTrailer}
                className="inline-flex items-center gap-2 rounded-lg border border-white/20 bg-white/10 px-5 py-3 text-sm font-bold text-white backdrop-blur-md transition-all duration-200 hover:bg-white hover:text-black"
              >
                <Play size={18} fill="currentColor" />
                Watch Trailer
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Trailer Modal */}
      {showTrailer && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 backdrop-blur-sm"
          onClick={() => {
            setShowTrailer(false);
            setTrailerKey(null);
          }}
        >
          <div
            className="relative w-full max-w-5xl"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => {
                setShowTrailer(false);
                setTrailerKey(null);
              }}
              aria-label="Close trailer"
              className="absolute -right-1 -top-12 flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white hover:text-black sm:-right-2"
            >
              <X size={20} />
            </button>

            <div className="aspect-video w-full overflow-hidden rounded-xl border border-white/10 bg-black shadow-2xl">
              {loadingTrailer ? (
                <div className="flex h-full items-center justify-center text-sm text-gray-400">
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
                <div className="flex h-full items-center justify-center text-sm text-gray-400">
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
```
