"use client";

import Image from "next/image";
import Link from "next/link";

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

type MovieCardProps = {
  movie: Movie;
};

export default function MovieCard({ movie }: MovieCardProps) {
  const title = movie.title || movie.name || "Untitled";

  const rating = movie.vote_average ?? movie.rating;

  const hasRating =
    rating !== null &&
    rating !== undefined &&
    Number(rating) > 0;

  const releaseDate = movie.release_date || movie.first_air_date;

  const year = releaseDate
    ? new Date(releaseDate).getFullYear()
    : null;

  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "/logo.png";

  return (
    <Link
      href={`/movie/${movie.id}`}
      className="group block min-w-0 overflow-hidden rounded-xl bg-zinc-900 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
    >
      <div className="relative aspect-[2/3] w-full overflow-hidden bg-zinc-800">
        <Image
          src={posterUrl}
          alt={`${title} poster`}
          fill
          loading="lazy"
          quality={80}
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 200px"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-70" />

        {/* Rating */}
        <div className="absolute right-2 top-2">
          {hasRating ? (
            <span className="rounded-md bg-black/75 px-2 py-1 text-xs font-semibold text-white backdrop-blur-sm">
              ⭐ {Number(rating).toFixed(1)}
            </span>
          ) : (
            <span className="rounded-md bg-black/75 px-2 py-1 text-xs font-semibold text-white/80 backdrop-blur-sm">
              N/A
            </span>
          )}
        </div>

        {/* Media Type */}
        {movie.media_type && (
          <div className="absolute left-2 top-2">
            <span className="rounded-md bg-red-600/90 px-2 py-1 text-[10px] font-bold uppercase text-white">
              {movie.media_type === "tv" ? "TV" : "Movie"}
            </span>
          </div>
        )}

        {/* Hover Button */}
        <div className="absolute inset-x-0 bottom-0 flex translate-y-full items-center justify-center p-3 transition-transform duration-300 group-hover:translate-y-0">
          <span className="rounded-lg bg-white px-4 py-2 text-sm font-bold text-black shadow-lg">
            View Details
          </span>
        </div>
      </div>

      {/* Movie Info */}
      <div className="p-3">
        <h3 className="truncate text-sm font-semibold text-white transition-colors group-hover:text-red-400">
          {title}
        </h3>

        {year && (
          <p className="mt-1 text-xs text-zinc-400">
            {year}
          </p>
        )}

        {/* Movie Description */}
        {movie.overview && (
          <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-zinc-400">
            {movie.overview}
          </p>
        )}
      </div>
    </Link>
  );
}