export const dynamic = "force-dynamic";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MovieGrid from "@/components/MovieGrid";
import { getUpcomingMovies } from "@/lib/tmdb";

export default async function UpcomingPage() {
  const data = await getUpcomingMovies();
  return <main className="min-h-screen bg-[#050505] text-white"><Navbar /><div className="mx-auto max-w-7xl px-6 pb-20 pt-28"><p className="mb-2 text-sm uppercase tracking-[0.3em] text-red-400">CinemaHunt</p><h1 className="text-4xl font-black">Upcoming Movies 🚀</h1><p className="mt-3 mb-10 max-w-2xl leading-7 text-gray-400">Keep an eye on movies with upcoming release dates and learn more before they arrive.</p><MovieGrid movies={data.results} /></div><Footer /></main>;
}
