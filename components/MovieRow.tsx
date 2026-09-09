"use client";

import Link from "next/link";
import { Movie } from "@/lib/tmdb";

interface MovieRowProps {
  title: string;
  movies?: Movie[];
  href?: string;
}

export default function MovieRow({
  title,
  movies = [],
}: MovieRowProps) {
  const movieList = Array.isArray(movies) ? movies : [];

  return (
    <section>
      <h2 className="mb-6 text-2xl font-bold text-white md:text-3xl">
        {title}
      </h2>

      <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        {movieList.slice(0, 100).map((movie) => {
          const hasRating =
            movie.vote_average !== null &&
            movie.vote_average !== undefined &&
            Number(movie.vote_average) > 0;

          return (
            <Link
              key={movie.id}
              href={`/movie/${movie.id}`}
              className="group overflow-hidden rounded-2xl bg-[#111] transition duration-300 hover:-translate-y-2"
            >
              {movie.poster_path ? (
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title || movie.name || "Movie"}
                  className="aspect-[2/3] w-full object-cover transition duration-500 group-hover:scale-105"
                />
              ) : (
                <div className="flex aspect-[2/3] items-center justify-center text-gray-500">
                  No Image
                </div>
              )}

              <div className="p-3">
                <h3 className="line-clamp-1 font-semibold text-red-500">
                  {movie.title || movie.name || "Untitled"}
                </h3>

                {/* Rating */}
                {hasRating ? (
                  <p className="mt-1 text-xs text-yellow-400">
                    ⭐ {Number(movie.vote_average).toFixed(1)}
                  </p>
                ) : (
                  <p className="mt-1 text-xs text-gray-500">
                    TBA
                  </p>
                )}

                <p className="mt-1 text-xs text-gray-400">
                  {movie.release_date?.slice(0, 4) || "Unknown"}
                </p>

                <p className="mt-2 line-clamp-3 text-xs text-gray-300">
                  {movie.overview || "No description available."}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}