"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, Play } from "lucide-react";
import { useEffect, useState } from "react";

type Movie = {
  id: number;
  title?: string;
  name?: string;
  poster_path?: string | null;
  backdrop_path?: string | null;
  vote_average?: number | null;
  rating?: number | null;
  release_date?: string | null;
  first_air_date?: string | null;
  media_type?: string;
};

type MovieCardProps = {
  movie: Movie;
};

function PosterFallback() {
  return (
    <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-zinc-900 via-zinc-800 to-black">
      <svg
        viewBox="0 0 120 160"
        className="h-20 w-16 text-zinc-700"
        fill="none"
        aria-hidden="true"
      >
        <rect
          x="18"
          y="12"
          width="84"
          height="136"
          rx="8"
          stroke="currentColor"
          strokeWidth="5"
        />
        <path
          d="M38 12v136M82 12v136"
          stroke="currentColor"
          strokeWidth="4"
        />
        <circle
          cx="60"
          cy="80"
          r="16"
          stroke="currentColor"
          strokeWidth="5"
        />
      </svg>
    </div>
  );
}

export default function MovieCard({ movie }: MovieCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false);

  const title = movie.title || movie.name || "Untitled";

  const releaseDate = movie.release_date || movie.first_air_date;

  const year = releaseDate
    ? new Date(releaseDate).getFullYear()
    : null;

  const rating =
    typeof movie.vote_average === "number"
      ? movie.vote_average
      : typeof movie.rating === "number"
        ? movie.rating
        : null;

  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w342${movie.poster_path}`
    : null;

  useEffect(() => {
    try {
      const saved = JSON.parse(
        localStorage.getItem("cinemahunt-wishlist") || "[]"
      );

      setIsWishlisted(
        Array.isArray(saved) &&
          saved.some((item: Movie) => item.id === movie.id)
      );
    } catch {
      setIsWishlisted(false);
    }
  }, [movie.id]);

  function toggleWishlist(
    event: React.MouseEvent<HTMLButtonElement>
  ) {
    event.preventDefault();
    event.stopPropagation();

    try {
      const saved = JSON.parse(
        localStorage.getItem("cinemahunt-wishlist") || "[]"
      );

      const wishlist: Movie[] = Array.isArray(saved) ? saved : [];

      if (isWishlisted) {
        const updated = wishlist.filter(
          (item) => item.id !== movie.id
        );

        localStorage.setItem(
          "cinemahunt-wishlist",
          JSON.stringify(updated)
        );

        setIsWishlisted(false);
      } else {
        const updated = [...wishlist, movie];

        localStorage.setItem(
          "cinemahunt-wishlist",
          JSON.stringify(updated)
        );

        setIsWishlisted(true);
      }

      window.dispatchEvent(new Event("wishlistUpdated"));
    } catch {
      // Ignore localStorage errors.
    }
  }

  return (
    <Link
      href={`/movie/${movie.id}`}
      className="group relative flex h-full min-w-0 flex-col overflow-hidden rounded-xl border border-white/10 bg-zinc-900/80 transition-all duration-300 hover:-translate-y-1 hover:border-red-500/50 hover:bg-zinc-900 hover:shadow-2xl hover:shadow-red-950/30"
    >
      {/* Poster */}
      <div className="relative aspect-[2/3] w-full overflow-hidden bg-zinc-900">
        {posterUrl ? (
          <Image
            src={posterUrl}
            alt={title}
            fill
            loading="lazy"
            quality={75}
            sizes="(max-width: 640px) 45vw, (max-width: 768px) 30vw, (max-width: 1024px) 22vw, 16vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          />
        ) : (
          <PosterFallback />
        )}

        {/* Cinematic overlay */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-black/20 opacity-70 transition-opacity duration-300 group-hover:opacity-100" />

        {/* Hover red glow */}
        <div className="pointer-events-none absolute inset-0 bg-red-600/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        {/* Rating */}
        {rating !== null && (
          <div className="absolute left-2 top-2 rounded-md border border-white/10 bg-black/75 px-2 py-1 text-xs font-bold text-yellow-400 shadow-lg backdrop-blur-md">
            ★ {rating.toFixed(1)}
          </div>
        )}

        {/* Wishlist */}
        <button
          type="button"
          onClick={toggleWishlist}
          aria-label={
            isWishlisted
              ? "Remove from wishlist"
              : "Add to wishlist"
          }
          className={`absolute right-2 top-2 z-10 rounded-full border p-2 backdrop-blur-md transition-all duration-300 ${
            isWishlisted
              ? "scale-105 border-red-400/40 bg-red-500 text-white shadow-lg shadow-red-500/30"
              : "border-white/10 bg-black/60 text-white hover:scale-110 hover:border-red-400/40 hover:bg-red-500"
          }`}
        >
          <Heart
            size={16}
            className="transition-transform duration-300"
            fill={isWishlisted ? "currentColor" : "none"}
          />
        </button>

        {/* Play button */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-0 transition-all duration-300 group-hover:opacity-100">
          <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/30 bg-red-600/90 text-white shadow-xl shadow-red-950/50 backdrop-blur-sm transition-transform duration-300 group-hover:scale-100">
            <Play
              size={20}
              fill="currentColor"
              className="ml-0.5"
            />
          </div>
        </div>

        {/* Bottom poster gradient */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black to-transparent" />
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-3">
        {/* Title */}
        <h3
          title={title}
          className="line-clamp-2 min-h-[40px] text-sm font-semibold leading-5 text-white transition-colors duration-200 group-hover:text-red-400"
        >
          {title}
        </h3>

        {/* Year + Rating */}
        <div className="mt-2 flex items-center justify-between">
          <p className="text-xs text-gray-500">
            {year || "Unknown year"}
          </p>

          {rating !== null && (
            <span className="text-xs font-medium text-yellow-400">
              ★ {rating.toFixed(1)}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}