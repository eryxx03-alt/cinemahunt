"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

type Movie = {
  id: number;
  title?: string;
  name?: string;
  poster_path?: string | null;
  vote_average?: number | null;
  release_date?: string;
  first_air_date?: string;
  overview?: string;
};

export default function WatchlistPage() {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("cinemahunt-watchlist");

    if (stored) {
      try {
        const parsed = JSON.parse(stored);

        if (Array.isArray(parsed)) {
          setMovies(parsed);
        }
      } catch {
        setMovies([]);
      }
    }
  }, []);

  function removeMovie(id: number) {
    const updated = movies.filter((movie) => movie.id !== id);

    setMovies(updated);

    localStorage.setItem(
      "cinemahunt-watchlist",
      JSON.stringify(updated)
    );
  }

  return (
    <main className="min-h-screen bg-black px-4 pb-12 pt-28 text-white sm:px-6">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-black sm:text-4xl">
            ❤️ My Wishlist
          </h1>

          <p className="mt-2 text-sm text-zinc-500 sm:text-base">
            Movies you've saved to watch later.
          </p>
        </div>

        {/* Empty */}
        {movies.length === 0 ? (
          <div className="flex min-h-[45vh] flex-col items-center justify-center text-center">

            <div className="mb-4 text-6xl">
              🤍
            </div>

            <h2 className="text-xl font-bold sm:text-2xl">
              Your wishlist is empty
            </h2>

            <p className="mt-2 max-w-md text-sm text-zinc-500">
              Click the heart icon on a movie to add it to your wishlist.
            </p>

            <Link
              href="/movies"
              className="mt-6 rounded-lg bg-red-600 px-6 py-3 text-sm font-bold transition hover:bg-red-700"
            >
              Browse Movies
            </Link>

          </div>
        ) : (
          <>
            <p className="mb-5 text-sm text-zinc-500">
              {movies.length}{" "}
              {movies.length === 1 ? "movie" : "movies"} saved
            </p>

            {/* Grid */}
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:grid-cols-4 lg:grid-cols-6">

              {movies.map((movie) => {
                const movieTitle =
                  movie.title || movie.name || "Untitled";

                const hasRating =
                  movie.vote_average !== null &&
                  movie.vote_average !== undefined &&
                  Number(movie.vote_average) > 0;

                const releaseDate =
                  movie.release_date ||
                  movie.first_air_date;

                const year = releaseDate
                  ? releaseDate.slice(0, 4)
                  : null;

                const poster = movie.poster_path
                  ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                  : "/logo.png";

                return (
                  <div
                    key={movie.id}
                    className="group overflow-hidden rounded-xl bg-zinc-900"
                  >

                    {/* Poster */}
                    <div className="relative aspect-[2/3] overflow-hidden bg-zinc-800">

                      <Link href={`/movie/${movie.id}`}>
                        <Image
                          src={poster}
                          alt={`${movieTitle} poster`}
                          fill
                          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 16vw"
                          className="object-cover transition duration-500 group-hover:scale-105"
                        />
                      </Link>

                      {/* Remove */}
                      <button
                        type="button"
                        onClick={() => removeMovie(movie.id)}
                        className="absolute left-2 top-2 z-10 rounded-full bg-black/80 px-2 py-1 text-lg transition hover:scale-110 hover:bg-red-600"
                        aria-label={`Remove ${movieTitle}`}
                      >
                        ❤️
                      </button>

                      {/* Rating */}
                      <div className="absolute right-2 top-2 z-10">
                        {hasRating ? (
                          <span className="rounded-md bg-black/75 px-2 py-1 text-xs font-semibold">
                            ⭐ {Number(movie.vote_average).toFixed(1)}
                          </span>
                        ) : (
                          <span className="rounded-md bg-gray-800 px-2 py-1 text-xs font-semibold text-gray-400">
                            TBA
                          </span>
                        )}
                      </div>

                    </div>

                    {/* Info */}
                    <div className="flex min-h-[105px] flex-col p-3">

                      <Link
                        href={`/movie/${movie.id}`}
                        className="line-clamp-2 min-h-[2.5rem] text-sm font-semibold leading-5 text-white hover:text-red-400 sm:text-base"
                      >
                        {movieTitle}
                      </Link>

                      <p className="mt-1 line-clamp-2 text-xs leading-5 text-zinc-400">
                        {movie.overview ||
                          "No description available."}
                      </p>

                      <p className="mt-auto pt-2 text-xs text-zinc-500">
                        {year || "—"}
                      </p>

                    </div>

                  </div>
                );
              })}

            </div>
          </>
        )}

      </div>
    </main>
  );
}