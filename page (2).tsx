export const dynamic = "force-dynamic";

import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getGenres } from "@/lib/tmdb";

const icons: Record<string, string> = { Action: "💥", Adventure: "🗺️", Animation: "✨", Comedy: "😂", Crime: "🕵️", Documentary: "🎥", Drama: "🎭", Family: "👨‍👩‍👧‍👦", Fantasy: "🪄", History: "📜", Horror: "👻", Music: "🎵", Mystery: "🔎", Romance: "❤️", "Science Fiction": "🚀", Thriller: "😱", War: "⚔️", Western: "🤠" };

export default async function GenresPage() {
  const data = await getGenres();
  return <main className="min-h-screen bg-[#050505] text-white"><Navbar /><div className="mx-auto max-w-7xl px-6 pb-20 pt-28"><p className="mb-2 text-sm uppercase tracking-[0.3em] text-red-400">CinemaHunt</p><h1 className="text-4xl font-black">Browse by Genre</h1><p className="mt-3 mb-10 max-w-2xl leading-7 text-gray-400">Pick a genre and explore popular movies that match your mood.</p><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{data.genres.map((genre) => <Link key={genre.id} href={`/genres/${genre.id}`} className="rounded-2xl border border-white/10 bg-[#101010] p-6 transition hover:-translate-y-1 hover:border-red-500/40 hover:bg-[#151515]"><span className="text-3xl">{icons[genre.name] || "🎬"}</span><h2 className="mt-4 text-xl font-bold">{genre.name}</h2><p className="mt-1 text-sm text-gray-500">Explore {genre.name.toLowerCase()} movies →</p></Link>)}</div></div><Footer /></main>;
}
