import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function NotFound() {
  return <main className="min-h-screen bg-[#050505] text-white"><Navbar /><div className="flex min-h-[70vh] items-center justify-center px-6 pt-20 text-center"><div><p className="text-sm font-bold uppercase tracking-[0.3em] text-red-400">404</p><h1 className="mt-3 text-4xl font-black">Movie or page not found</h1><p className="mx-auto mt-3 max-w-lg leading-7 text-gray-500">The page may have moved, or the movie is no longer available in the catalogue.</p><div className="mt-7 flex justify-center gap-3"><Link href="/" className="rounded-xl bg-red-600 px-6 py-3 font-bold hover:bg-red-500">Back home</Link><Link href="/search" className="rounded-xl border border-white/10 bg-white/5 px-6 py-3 font-bold hover:bg-white/10">Search movies</Link></div></div></div><Footer /></main>;
}
