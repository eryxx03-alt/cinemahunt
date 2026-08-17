"use client";

import Image from "next/image";
import { Movie, getImageUrl } from "@/lib/tmdb";

interface MovieCardProps {
  movie: Movie;
  onClick?: () => void;
}

export default function MovieCard({
  movie,
  onClick,
}: MovieCardProps) {
  return (
    <div
      onClick={onClick}
      className="group cursor-pointer transition-transform duration-300 hover:scale-105"
    >
      <div className="overflow-hidden rounded-xl bg-zinc-900">
        <Image
          src={
            getImageUrl(movie.poster_path) ||
            "/placeholder.png"
          }
          alt={movie.title}
          width={300}
          height={450}
          className="h-[320px] w-full object-cover"
        />
      </div>

      <div className="mt-3">
        <h3 className="line-clamp-1 font-semibold text-white">
          {movie.title}
        </h3>

        <p className="mt-1 text-sm text-yellow-400">
          ⭐ {movie.vote_average?.toFixed(1) || "N/A"}
        </p>

        <p className="mt-1 text-xs text-zinc-400">
          {movie.release_date?.slice(0, 4) || "Unknown"}
        </p>

        <p className="mt-2 line-clamp-3 text-sm text-zinc-300">
          {movie.overview || "No description available."}
        </p>
      </div>
    </div>
  );
}