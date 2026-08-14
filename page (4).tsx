export const dynamic = "force-dynamic";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MovieGrid from "@/components/MovieGrid";
import { getNowPlayingMovies, getUpcomingMovies } from "@/lib/tmdb";

export default async function MoviesPage() {
  const [nowPlaying, upcoming] = await Promise.all([getNowPlayingMovies(), getUpcomingMovies()]);
  const seen = new Set<number>();
  const movies = [...nowPlaying.results, ...upcoming.results].filter((movie) => !seen.has(movie.id) && seen.add(movie.id));
  return <main className="min-h-screen bg-[#050505] text-white"><Navbar /><div className="mx-auto max-w-7xl px-6 pb-20 pt-28"><p className="mb-2 text-sm uppercase tracking-[0.3em] text-red-400">CinemaHunt</p><h1 className="text-4xl font-black">Explore Movies</h1><p className="mt-3 mb-10 max-w-2xl leading-7 text-gray-400">Browse movies that are currently playing and titles that are scheduled to arrive soon.</p><MovieGrid movies={movies} /></div><Footer /></main>;
}
