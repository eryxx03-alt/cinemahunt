"use client";

import { useEffect, useState } from "react";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MovieCard from "@/components/MovieCard";
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

  const hasFilters =
    genre !== "" ||
    year !== "" ||
    language !== "" ||
    sortBy !== "popularity.desc";

  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />

      {/* PAGE HEADER */}
      <section className="relative overflow-hidden border-b border-white/10 bg-gradient-to-b from-zinc-950 via-black to-black">
        <div className="absolute -right-32 -top-32 h-80 w-80 rounded-full bg-red-600/10 blur-3xl" />
        <div className="absolute -left-32 top-40 h-72 w-72 rounded-full bg-red-600/5 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 pb-10 pt-28 sm:px-6 md:pb-12">
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.3em] text-red-500">
            CinemaHunt
          </p>

          <h1 className="text-3xl font-black tracking-tight sm:text-4xl md:text-5xl">
            Explore Movies
            <span className="ml-2">🎬</span>
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-zinc-400 sm:text-base">
            Discover movies by genre, release year, language,
            popularity, and ratings.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 pb-20 sm:px-6">
        {/* FILTER PANEL */}
        <section className="relative -mt-2 mb-10 overflow-hidden rounded-2xl border border-white/10 bg-zinc-950/90 p-5 shadow-2xl shadow-black/30 backdrop-blur-xl sm:p-6">
          <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-red-600/5 blur-3xl" />

          <div className="relative">
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="text-lg font-bold">
                  Filter & Sort
                </h2>

                <p className="mt-1 text-xs text-zinc-500">
                  Customize your movie discovery
                </p>
              </div>

              {hasFilters && (
                <button
                  type="button"
                  onClick={clearFilters}
                  className="rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 text-xs font-semibold text-zinc-400 transition-all duration-200 hover:border-red-500/30 hover:bg-red-500/10 hover:text-red-400"
                >
                  Clear All
                </button>
              )}
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {/* GENRE */}
              <div>
                <label
                  htmlFor="genre"
                  className="mb-2 block text-xs font-semibold uppercase tracking-wider text-zinc-500"
                >
                  Genre
                </label>

                <select
                  id="genre"
                  value={genre}
                  onChange={(event) =>
                    setGenre(event.target.value)
                  }
                  className="w-full cursor-pointer rounded-xl border border-white/10 bg-zinc-900 px-4 py-3 text-sm text-white outline-none transition-all duration-200 hover:border-white/20 focus:border-red-500/50 focus:ring-2 focus:ring-red-500/10"
                >
                  <option value="">All Genres</option>

                  {genres.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* YEAR */}
              <div>
                <label
                  htmlFor="year"
                  className="mb-2 block text-xs font-semibold uppercase tracking-wider text-zinc-500"
                >
                  Release Year
                </label>

                <select
                  id="year"
                  value={year}
                  onChange={(event) =>
                    setYear(event.target.value)
                  }
                  className="w-full cursor-pointer rounded-xl border border-white/10 bg-zinc-900 px-4 py-3 text-sm text-white outline-none transition-all duration-200 hover:border-white/20 focus:border-red-500/50 focus:ring-2 focus:ring-red-500/10"
                >
                  <option value="">All Years</option>

                  {years.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>

              {/* LANGUAGE */}
              <div>
                <label
                  htmlFor="language"
                  className="mb-2 block text-xs font-semibold uppercase tracking-wider text-zinc-500"
                >
                  Language
                </label>

                <select
                  id="language"
                  value={language}
                  onChange={(event) =>
                    setLanguage(event.target.value)
                  }
                  className="w-full cursor-pointer rounded-xl border border-white/10 bg-zinc-900 px-4 py-3 text-sm text-white outline-none transition-all duration-200 hover:border-white/20 focus:border-red-500/50 focus:ring-2 focus:ring-red-500/10"
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

              {/* SORT */}
              <div>
                <label
                  htmlFor="sort"
                  className="mb-2 block text-xs font-semibold uppercase tracking-wider text-zinc-500"
                >
                  Sort By
                </label>

                <select
                  id="sort"
                  value={sortBy}
                  onChange={(event) =>
                    setSortBy(event.target.value)
                  }
                  className="w-full cursor-pointer rounded-xl border border-white/10 bg-zinc-900 px-4 py-3 text-sm text-white outline-none transition-all duration-200 hover:border-white/20 focus:border-red-500/50 focus:ring-2 focus:ring-red-500/10"
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

            <div className="mt-5 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => loadMovies()}
                disabled={loading}
                className="rounded-xl bg-red-600 px-6 py-3 text-sm font-bold shadow-lg shadow-red-950/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-red-700 hover:shadow-red-600/20 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading ? "Loading..." : "Apply Filters"}
              </button>

              {hasFilters && !loading && (
                <span className="text-xs text-zinc-500">
                  Filters applied
                </span>
              )}
            </div>
          </div>
        </section>

        {/* LOADING */}
        {loading && (
          <section>
            <div className="mb-5 flex items-center justify-between">
              <div className="h-7 w-36 animate-pulse rounded bg-zinc-800" />
            </div>

            <MovieSkeletonGrid count={18} />
          </section>
        )}

        {/* ERROR */}
        {!loading && error && (
          <section className="relative overflow-hidden rounded-2xl border border-red-500/20 bg-red-500/5 p-10 text-center">
            <div className="absolute left-1/2 top-0 h-32 w-32 -translate-x-1/2 rounded-full bg-red-600/10 blur-3xl" />

            <div className="relative">
              <div className="mb-4 text-4xl">⚠️</div>

              <h2 className="text-lg font-bold">
                Something went wrong
              </h2>

              <p className="mt-2 text-sm text-zinc-500">
                Unable to load movies right now.
              </p>

              <button
                type="button"
                onClick={() => loadMovies()}
                className="mt-5 rounded-xl bg-red-600 px-5 py-2.5 text-sm font-bold transition hover:bg-red-700"
              >
                Try Again
              </button>
            </div>
          </section>
        )}

        {/* EMPTY */}
        {!loading && !error && movies.length === 0 && (
          <section className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-12 text-center">
            <div className="mb-5 text-5xl">🎬</div>

            <h2 className="text-xl font-bold">
              No movies found
            </h2>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-zinc-500">
              No movies match your current filters. Try changing
              the genre, year, language, or sorting option.
            </p>

            <button
              type="button"
              onClick={clearFilters}
              className="mt-6 rounded-xl bg-red-600 px-5 py-2.5 text-sm font-bold transition hover:bg-red-700"
            >
              Reset Filters
            </button>
          </section>
        )}

        {/* RESULTS */}
        {!loading && !error && movies.length > 0 && (
          <section>
            <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
              <div>
                <p className="mb-1 text-xs font-bold uppercase tracking-[0.2em] text-red-500">
                  Discover
                </p>

                <h2 className="text-2xl font-black sm:text-3xl">
                  Movies
                </h2>
              </div>

              <div className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-xs text-zinc-400">
                <span className="font-bold text-white">
                  {movies.length}
                </span>{" "}
                results
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
              {movies.map((movie) => (
                <MovieCard
                  key={movie.id}
                  movie={movie}
                />
              ))}
            </div>
          </section>
        )}
      </div>

      <Footer />
    </main>
  );
}