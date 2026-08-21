"use client";

import Image from "next/image";
import { Movie, getImageUrl } from "@/lib/tmdb";
import { useEffect, useState } from "react";

interface MovieCardProps {
  movie: Movie;
  onClick?: () => void;
}

const STORAGE_KEY = "cinemahunt-my-list";

export default function MovieCard({
  movie,
  onClick,
}: MovieCardProps) {
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    try {
      const savedMovies = JSON.parse(
        localStorage.getItem(STORAGE_KEY) || "[]"
      );

      setSaved(
        savedMovies.some((item: Movie) => item.id === movie.id)
      );
    } catch {
      setSaved(false);
    }
  }, [movie.id]);

  const toggleSave = (e: React.MouseEvent) => {
    e.stopPropagation();

    try {
      const savedMovies: Movie[] = JSON.parse(
        localStorage.getItem(STORAGE_KEY) || "[]"
      );

      if (saved) {
        const updated = savedMovies.filter(
          (item) => item.id !== movie.id
        );

        localStorage.setItem(
          STORAGE_KEY,
          JSON.stringify(updated)
        );

        setSaved(false);
      } else {
        const updated = [
          ...savedMovies.filter((item) => item.id !== movie.id),
          movie,
        ];

        localStorage.setItem(
          STORAGE_KEY,
          JSON.stringify(updated)
        );

        setSaved(true);
      }

      window.dispatchEvent(new Event("cinemahunt-list-updated"));
    } catch {
      console.error("Unable to update My List");
    }
  };

  const imageUrl =
    getImageUrl(movie.poster_path) || "/placeholder.png";

  return (
    <div
      onClick={onClick}
      className="group relative cursor-pointer"
    >
      {/* Poster */}
      <div className="relative overflow-hidden rounded-2xl bg-zinc-900 shadow-lg transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-2xl">
        <Image
          src={imageUrl}
          alt={movie.title}
          width={300}
          height={450}
          className="h-[320px] w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />

        {/* Dark hover gradient */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-70" />

        {/* Rating */}
        <div className="absolute left-3 top-3 rounded-full bg-black/70 px-3 py-1 text-xs font-semibold text-white backdrop-blur-md">
          ⭐ {movie.vote_average?.toFixed(1) || "N/A"}
        </div>

        {/* Save button */}
        <button
          type="button"
          onClick={toggleSave}
          aria-label={saved ? "Remove from My List" : "Add to My List"}
          className={`absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full backdrop-blur-md transition-all duration-300 ${
            saved
              ? "bg-red-600 text-white shadow-lg shadow-red-600/30"
              : "bg-black/70 text-white hover:bg-white hover:text-black"
          }`}
        >
          <span className="text-lg">
            {saved ? "♥" : "♡"}
          </span>
        </button>

        {/* Bottom hover information */}
        <div className="absolute inset-x-0 bottom-0 translate-y-4 p-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onClick?.();
            }}
            className="w-full rounded-xl bg-white py-2.5 text-sm font-bold text-black transition hover:bg-zinc-200"
          >
            View Details
          </button>
        </div>
      </div>

      {/* Movie information */}
      <div className="mt-3">
        <h3 className="line-clamp-1 text-sm font-semibold text-white transition-colors duration-300 group-hover:text-red-400">
          {movie.title}
        </h3>

        <div className="mt-1 flex items-center gap-2 text-xs">
          <span className="text-yellow-400">
            ⭐ {movie.vote_average?.toFixed(1) || "N/A"}
          </span>

          <span className="text-zinc-500">•</span>

          <span className="text-zinc-400">
            {movie.release_date?.slice(0, 4) || "Unknown"}
          </span>
        </div>

        <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-zinc-400">
          {movie.overview || "No description available."}
        </p>
      </div>
    </div>
  );
}