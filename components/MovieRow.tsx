"use client";

import Link from "next/link";
import { Movie } from "@/lib/tmdb";

interface MovieRowProps {
  title: string;
  movies?: Movie[];
}

export default function MovieRow({
  title,
  movies = [],
}: MovieRowProps) {
  const movieList = Array.isArray(movies) ? movies : [];

  return (
    <section>
      <h2 className="mb-5 text-2xl font-bold text-white md:text-3xl">
        {title}
      </h2>

      <div
        className="flex gap-5 overflow-x-auto pb-5"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {movieList.slice(0, 10).map((movie) => (
          <Link
            key={movie.id}
            href={`/movie/${movie.id}`}
            className="group min-w-[180px] overflow-hidden rounded-2xl bg-[#111] transition duration-300 hover:-translate-y-2 md:min-w-[200px]"
          >
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

            <div className="p-3">
              <h3 className="line-clamp-1 font-semibold text-white">
                {movie.title}
              </h3>

              <p className="mt-1 text-xs text-gray-500">
                ⭐ {movie.vote_average?.toFixed(1) || "N/A"}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}