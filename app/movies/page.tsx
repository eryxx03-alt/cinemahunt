"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MovieSkeletonGrid from "@/components/MovieSkeletonGrid";

import {
  discoverMovies,
  getGenres,
  type Genre,
  type Movie,
} from "@/lib/tmdb";

const languages = [
  { value: "", label: "All Languages" },
  { value: "en", label: "English" },
  { value: "hi", label: "Hindi" },
  { value: "ko", label: "Korean" },
  { value: "ja", label: "Japanese" },
  { value: "fr", label: "French" },
  { value: "es", label: "Spanish" },
];

const sortOptions = [
  {
    value: "popularity.desc",
    label: "Most Popular",
  },
  {
    value: "vote_average.desc",
    label: "Top Rated",
  },
  {
    value: "primary_release_date.desc",
    label: "Recently Released",
  },
];

const currentYear = new Date().getFullYear();

const years = Array.from(
  { length: 30 },
  (_, index) => currentYear - index
);

function MoviePosterFallback({ title }: { title: string }) {
  return (
    <div className="flex aspect-[2/3] w-full flex-col items-center justify-center bg-gradient-to-br from-zinc-950 via-zinc-900 to-red-950/40">
      <svg
        viewBox="0 0 120 160"
        className="mb-3 h-20 w-16 text-red-500/70"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <rect
          x="18"
          y="10"
          width="84"
          height="140"
          rx="8"
          stroke="currentColor"
          strokeWidth="5"
        />

        <path
          d="M32 30H88M32 130H88"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
        />

        <circle
          cx="60"
          cy="80"
          r="25"
          stroke="currentColor"
          strokeWidth="4"
        />

        <path
          d="M55 68L75 80L55 92V68Z"
          fill="currentColor"
        />
      </svg>

      <span className="max-w-[80%] text-center text-xs font-semibold text-zinc-500 line-clamp-2">
        {title}
      </span>

      <span className="mt-1 text-[10px] uppercase tracking-widest text-red-500/60">
        CinemaHunt
      </span>
    </div>
  );
}

export default function MoviesPage() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [genres, setGenres] = useState<Genre[]>([]);

  const [genre, setGenre] = useState("");
  const [year, setYear] = useState("");
  const [language, setLanguage] = useState("");
  const [sortBy, setSortBy] = useState("popularity.desc");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function loadGenres() {
      try {
        const response = await getGenres();
        setGenres(response.genres || []);
      } catch (error) {
        console.error("Genres error:", error);
      }
    }

    loadGenres();
  }, []);

  async function loadMovies(
    customFilters?: {
      genre?: string;
      year?: string;
      language?: string;
      sortBy?: string;
    }
  ) {
    try {
      setLoading(true);
      setError(false);

      const response = await discoverMovies({
        genre: customFilters?.genre ?? genre,
        year: customFilters?.year ?? year,
        language: customFilters?.language ?? language,
        sortBy: customFilters?.sortBy ?? sortBy,
      });

      setMovies(response.results || []);
    } catch (error) {
      console.error("Movies error:", error);
      setMovies([]);
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadMovies();
  }, []);

  function clearFilters() {
    const defaultFilters = {
      genre: "",
      year: "",
      language: "",
      sortBy: "popularity.desc",
    };

    setGenre(defaultFilters.genre);
    setYear(defaultFilters.year);
    setLanguage(defaultFilters.language);
    setSortBy(defaultFilters.sortBy);

    loadMovies(defaultFilters);
  }

  return (
    <main className="min-h-screen bg-[#050505] text-white">
      <Navbar />

      <div className="mx-auto max-w-7xl px-6 pb-20 pt-28">
        {/* Header */}
        <div className="mb-10">
          <p className="mb-2 text-sm uppercase tracking-[0.3em] text-red-500">
            CinemaHunt
          </p>

          <h1 className="text-4xl font-bold md:text-5xl">
            Explore Movies 🎬
          </h1>

          <p className="mt-3 max-w-2xl text-gray-400">
            Discover movies by genre, release year, language,
            popularity, and ratings.
          </p>
        </div>

        {/* Filters */}
        <section className="mb-10 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-lg font-semibold">
              Filter & Sort
            </h2>

            <button
              type="button"
              onClick={clearFilters}
              className="text-sm text-gray-400 transition hover:text-white"
            >
              Clear All
            </button>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {/* Genre */}
            <div>
              <label
                htmlFor="genre"
                className="mb-2 block text-sm font-medium text-gray-300"
              >
                Genre
              </label>

              <select
                id="genre"
                value={genre}
                onChange={(event) =>
                  setGenre(event.target.value)
                }
                className="w-full rounded-xl border border-white/10 bg-[#111] px-4 py-3 text-sm text-white outline-none focus:border-red-500"
              >
                <option value="">All Genres</option>

                {genres.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Year */}
            <div>
              <label
                htmlFor="year"
                className="mb-2 block text-sm font-medium text-gray-300"
              >
                Release Year
              </label>

              <select
                id="year"
                value={year}
                onChange={(event) =>
                  setYear(event.target.value)
                }
                className="w-full rounded-xl border border-white/10 bg-[#111] px-4 py-3 text-sm text-white outline-none focus:border-red-500"
              >
                <option value="">All Years</option>

                {years.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>

            {/* Language */}
            <div>
              <label
                htmlFor="language"
                className="mb-2 block text-sm font-medium text-gray-300"
              >
                Language
              </label>

              <select
                id="language"
                value={language}
                onChange={(event) =>
                  setLanguage(event.target.value)
                }
                className="w-full rounded-xl border border-white/10 bg-[#111] px-4 py-3 text-sm text-white outline-none focus:border-red-500"
              >
                {languages.map((item) => (
                  <option
                    key={item.value}
                    value={item.value}
                  >
                    {item.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort */}
            <div>
              <label
                htmlFor="sort"
                className="mb-2 block text-sm font-medium text-gray-300"
              >
                Sort By
              </label>

              <select
                id="sort"
                value={sortBy}
                onChange={(event) =>
                  setSortBy(event.target.value)
                }
                className="w-full rounded-xl border border-white/10 bg-[#111] px-4 py-3 text-sm text-white outline-none focus:border-red-500"
              >
                {sortOptions.map((item) => (
                  <option
                    key={item.value}
                    value={item.value}
                  >
                    {item.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <button
            type="button"
            onClick={() => loadMovies()}
            disabled={loading}
            className="mt-5 rounded-xl bg-red-600 px-6 py-3 text-sm font-semibold transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Loading..." : "Apply Filters"}
          </button>
        </section>

        {/* Skeleton Loading */}
        {loading && (
          <div>
            <div className="mb-5 h-7 w-32 animate-pulse rounded bg-zinc-800" />

            <MovieSkeletonGrid count={18} />
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="rounded-2xl border border-red-500/20 bg-red-500/5 p-10 text-center">
            <p className="text-gray-400">
              Unable to load movies right now.
            </p>

            <button
              type="button"
              onClick={() => loadMovies()}
              className="mt-4 rounded-lg bg-red-600 px-5 py-2 text-sm font-semibold hover:bg-red-700"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Empty */}
        {!loading &&
          !error &&
          movies.length === 0 && (
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-10 text-center">
              <p className="text-gray-400">
                No movies found with these filters.
              </p>
            </div>
          )}

        {/* Results */}
        {!loading &&
          !error &&
          movies.length > 0 && (
            <>
              <div className="mb-5 flex items-center justify-between">
                <h2 className="text-xl font-semibold">
                  Movies
                </h2>

                <p className="text-sm text-gray-500">
                  {movies.length} results
                </p>
              </div>

              <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
                {movies.map((movie) => {
                  const title =
                    movie.title ||
                    movie.name ||
                    "Untitled";

                  const releaseDate =
                    movie.release_date ||
                    movie.first_air_date;

                  const posterUrl = movie.poster_path
                    ? `https://image.tmdb.org/t/p/w342${movie.poster_path}`
                    : null;

                  const hasRating =
                    movie.vote_average !== null &&
                    movie.vote_average !== undefined &&
                    Number(movie.vote_average) > 0;

                  return (
                    <Link
                      key={movie.id}
                      href={`/movie/${movie.id}`}
                      className="group flex h-full min-w-0 flex-col overflow-hidden rounded-2xl bg-[#111] transition duration-300 hover:-translate-y-2 hover:shadow-2xl"
                    >
                      {/* Poster */}
                      <div className="relative aspect-[2/3] w-full shrink-0 overflow-hidden bg-zinc-950">
                        {posterUrl ? (
                          <Image
                            src={posterUrl}
                            alt={`${title} poster`}
                            width={342}
                            height={513}
                            loading="lazy"
                            quality={75}
                            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 200px"
                            className="aspect-[2/3] w-full object-cover transition duration-500 group-hover:scale-105"
                          />
                        ) : (
                          <MoviePosterFallback title={title} />
                        )}

                        {/* Gradient */}
                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                        {/* Rating */}
                        <div className="absolute right-2 top-2">
                          <span className="rounded-full bg-black/80 px-2 py-1 text-xs font-semibold backdrop-blur-sm">
                            {hasRating
                              ? `⭐ ${Number(movie.vote_average).toFixed(1)}`
                              : "N/A"}
                          </span>
                        </div>

                        {/* Hover Play */}
                        <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition duration-300 group-hover:opacity-100">
                          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-black shadow-lg">
                            ▶
                          </span>
                        </div>
                      </div>

                      {/* Movie Info */}
                      <div className="flex min-h-[120px] flex-1 flex-col p-3">
                        <h2
                          title={title}
                          className="line-clamp-1 min-h-[20px] font-semibold leading-5 text-white transition-colors group-hover:text-red-400"
                        >
                          {title}
                        </h2>

                        <p className="mt-1 min-h-[16px] text-xs text-gray-500">
                          {releaseDate
                            ? releaseDate.slice(0, 4)
                            : "—"}
                        </p>

                        <p className="mt-2 line-clamp-2 min-h-[32px] text-xs leading-4 text-gray-500">
                          {movie.overview ||
                            "No description available."}
                        </p>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </>
          )}
      </div>

      <Footer />
    </main>
  );
}