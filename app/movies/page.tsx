"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

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

  async function loadMovies() {
    try {
      setLoading(true);
      setError(false);

      const response = await discoverMovies({
        genre,
        year,
        language,
        sortBy,
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
    setGenre("");
    setYear("");
    setLanguage("");
    setSortBy("popularity.desc");

    setTimeout(() => {
      discoverMovies({
        genre: "",
        year: "",
        language: "",
        sortBy: "popularity.desc",
      })
        .then((response) => {
          setMovies(response.results || []);
          setError(false);
        })
        .catch((error) => {
          console.error("Movies error:", error);
          setError(true);
        });
    }, 0);
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
            onClick={loadMovies}
            disabled={loading}
            className="mt-5 rounded-xl bg-red-600 px-6 py-3 text-sm font-semibold transition hover:bg-red-700 disabled:opacity-50"
          >
            {loading ? "Loading..." : "Apply Filters"}
          </button>
        </section>

        {/* Loading */}
        {loading && (
          <div className="flex min-h-[300px] items-center justify-center">
            <div className="text-center">
              <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-white/10 border-t-red-500" />

              <p className="text-gray-400">
                Loading movies...
              </p>
            </div>
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
              onClick={loadMovies}
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

                  return (
                    <Link
                      key={movie.id}
                      href={`/movie/${movie.id}`}
                      className="group overflow-hidden rounded-2xl bg-[#111] transition duration-300 hover:-translate-y-2 hover:shadow-2xl"
                    >
                      <div className="relative overflow-hidden">
                        {posterUrl ? (
                          <Image
                            src={posterUrl}
                            alt={`${title} poster`}
                            width={342}
                            height={513}
                            loading="lazy"
                            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 200px"
                            className="aspect-[2/3] w-full object-cover transition duration-500 group-hover:scale-105"
                          />
                        ) : (
                          <div className="flex aspect-[2/3] w-full items-center justify-center bg-zinc-900 text-sm text-zinc-500">
                            No Image
                          </div>
                        )}

                        <div className="absolute right-2 top-2 rounded-full bg-black/80 px-2 py-1 text-xs">
                          ⭐{" "}
                          {movie.vote_average > 0
                            ? movie.vote_average.toFixed(1)
                            : "N/A"}
                        </div>

                        <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition group-hover:opacity-100">
                          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-black shadow-lg">
                            ▶
                          </span>
                        </div>
                      </div>

                      <div className="flex min-h-[100px] flex-col p-3">
                        <h2 className="line-clamp-1 font-semibold">
                          {title}
                        </h2>

                        {releaseDate && (
                          <p className="mt-1 text-xs text-gray-500">
                            {releaseDate.slice(0, 4)}
                          </p>
                        )}

                        <p className="mt-1 line-clamp-2 text-xs leading-4 text-gray-500">
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