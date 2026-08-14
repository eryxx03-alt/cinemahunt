export const dynamic = "force-dynamic";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MovieGrid from "@/components/MovieGrid";
import { getTopRatedMovies } from "@/lib/tmdb";

export default async function TopRatedPage() {
  const data = await getTopRatedMovies();
  return <main className="min-h-screen bg-[#050505] text-white"><Navbar /><div className="mx-auto max-w-7xl px-6 pb-20 pt-28"><p className="mb-2 text-sm uppercase tracking-[0.3em] text-red-400">CinemaHunt</p><h1 className="text-4xl font-black">Top Rated Movies 🏆</h1><p className="mt-3 mb-10 max-w-2xl leading-7 text-gray-400">Explore highly rated movies and open each title for detailed information and its official trailer.</p><MovieGrid movies={data.results} /></div><Footer /></main>;
}
