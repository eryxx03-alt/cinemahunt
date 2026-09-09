"use client";

import { useRouter, useSearchParams } from "next/navigation";

export default function HomeFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentGenre = searchParams.get("genre") || "";
  const currentYear = searchParams.get("year") || "";
  const currentLanguage = searchParams.get("language") || "";
  const currentSort = searchParams.get("sortBy") || "popularity.desc";

  function applyFilters() {
    const params = new URLSearchParams();

    if (currentGenre) params.set("genre", currentGenre);
    if (currentYear) params.set("year", currentYear);
    if (currentLanguage) params.set("language", currentLanguage);
    if (currentSort) params.set("sortBy", currentSort);

    router.push(`/?${params.toString()}`);
  }

  function clearFilters() {
    router.push("/");
  }

  return (
    <section className="mb-14 rounded-2xl border border-white/10 bg-zinc-950 p-5 sm:p-6">
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-bold text-white sm:text-2xl">
            Filter & Sort
          </h2>
          <p className="mt-1 text-sm text-zinc-500">
            Find movies that match your preferences.
          </p>
        </div>

        <button
          onClick={clearFilters}
          className="self-start rounded-lg border border-white/10 px-4 py-2 text-sm text-zinc-300 transition hover:bg-white/10 hover:text-white"
        >
          Clear All
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* Genre */}
        <select
          value={currentGenre}
          onChange={(e) => {
            const params = new URLSearchParams(searchParams.toString());

            if (e.target.value) {
              params.set("genre", e.target.value);
            } else {
              params.delete("genre");
            }

            router.push(`/?${params.toString()}`);
          }}
          className="rounded-lg border border-white/10 bg-zinc-900 px-4 py-3 text-sm text-white outline-none focus:border-red-500"
        >
          <option value="">All Genres</option>
          <option value="28">Action</option>
          <option value="12">Adventure</option>
          <option value="16">Animation</option>
          <option value="35">Comedy</option>
          <option value="80">Crime</option>
          <option value="99">Documentary</option>
          <option value="18">Drama</option>
          <option value="10751">Family</option>
          <option value="14">Fantasy</option>
          <option value="36">History</option>
          <option value="27">Horror</option>
          <option value="10402">Music</option>
          <option value="9648">Mystery</option>
          <option value="10749">Romance</option>
          <option value="878">Science Fiction</option>
          <option value="53">Thriller</option>
          <option value="10752">War</option>
          <option value="37">Western</option>
        </select>

        {/* Year */}
        <select
          value={currentYear}
          onChange={(e) => {
            const params = new URLSearchParams(searchParams.toString());

            if (e.target.value) {
              params.set("year", e.target.value);
            } else {
              params.delete("year");
            }

            router.push(`/?${params.toString()}`);
          }}
          className="rounded-lg border border-white/10 bg-zinc-900 px-4 py-3 text-sm text-white outline-none focus:border-red-500"
        >
          <option value="">All Years</option>

          {Array.from({ length: 31 }, (_, i) => {
            const year = new Date().getFullYear() - i;

            return (
              <option key={year} value={year}>
                {year}
              </option>
            );
          })}
        </select>

        {/* Language */}
        <select
          value={currentLanguage}
          onChange={(e) => {
            const params = new URLSearchParams(searchParams.toString());

            if (e.target.value) {
              params.set("language", e.target.value);
            } else {
              params.delete("language");
            }

            router.push(`/?${params.toString()}`);
          }}
          className="rounded-lg border border-white/10 bg-zinc-900 px-4 py-3 text-sm text-white outline-none focus:border-red-500"
        >
          <option value="">All Languages</option>
          <option value="en">English</option>
          <option value="hi">Hindi</option>
          <option value="ko">Korean</option>
          <option value="ja">Japanese</option>
          <option value="fr">French</option>
          <option value="es">Spanish</option>
        </select>

        {/* Sort */}
        <select
          value={currentSort}
          onChange={(e) => {
            const params = new URLSearchParams(searchParams.toString());

            params.set("sortBy", e.target.value);

            router.push(`/?${params.toString()}`);
          }}
          className="rounded-lg border border-white/10 bg-zinc-900 px-4 py-3 text-sm text-white outline-none focus:border-red-500"
        >
          <option value="popularity.desc">Most Popular</option>
          <option value="vote_average.desc">Top Rated</option>
          <option value="primary_release_date.desc">
            Recently Released
          </option>
        </select>
      </div>

      <button
        onClick={applyFilters}
        className="mt-5 rounded-lg bg-red-600 px-6 py-3 text-sm font-bold text-white transition hover:bg-red-700"
      >
        Apply Filters
      </button>
    </section>
  );
}