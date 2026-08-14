"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MovieGrid from "@/components/MovieGrid";
import { Movie, searchMovies } from "@/lib/tmdb";
import { Search } from "lucide-react";
import { FormEvent, useState } from "react";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const clean = query.trim();
    if (!clean) return;
    setLoading(true);
    setSearched(true);
    try {
      const data = await searchMovies(clean);
      setMovies(data.results || []);
    } catch {
      setMovies([]);
    } finally {
      setLoading(false);
    }
  }

  return <main className="min-h-screen bg-[#050505] text-white"><Navbar /><div className="mx-auto max-w-7xl px-6 pb-20 pt-28"><p className="mb-2 text-sm uppercase tracking-[0.3em] text-red-400">CinemaHunt</p><h1 className="text-4xl font-black">Search Movies</h1><p className="mt-3 max-w-2xl leading-7 text-gray-400">Search the movie catalogue by title, then open a result for ratings, cast, release information, and its official trailer.</p><form onSubmit={handleSubmit} className="mt-8 mb-10 flex max-w-3xl gap-2"><label className="sr-only" htmlFor="movie-search">Movie title</label><div className="relative flex-1"><Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={19} /><input id="movie-search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search for a movie…" className="w-full rounded-xl border border-white/10 bg-[#111] py-3.5 pl-11 pr-4 text-white outline-none placeholder:text-gray-600 focus:border-red-500/60" /></div><button disabled={loading} className="rounded-xl bg-red-600 px-6 font-bold hover:bg-red-500 disabled:cursor-not-allowed disabled:opacity-60">{loading ? "Searching…" : "Search"}</button></form>{loading ? <div className="py-20 text-center text-gray-400">Finding movies…</div> : searched ? <MovieGrid movies={movies} /> : <div className="rounded-2xl border border-dashed border-white/10 bg-[#0b0b0b] p-12 text-center text-gray-500">Type a movie title above to begin.</div>}</div><Footer /></main>;
}
