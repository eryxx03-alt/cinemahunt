export const dynamic = "force-dynamic";

import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getImageUrl, getMovieDetails } from "@/lib/tmdb";

export default async function WatchPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const movie = await getMovieDetails(Number(id)).catch(() => null);
  if (!movie) notFound();
  const videos = movie.videos?.results || [];
  const trailer = videos.find((video) => video.site === "YouTube" && video.type === "Trailer" && video.official) || videos.find((video) => video.site === "YouTube" && video.type === "Trailer");

  return <main className="min-h-screen bg-[#050505] text-white"><Navbar /><div className="mx-auto max-w-6xl px-6 pb-20 pt-28"><Link href={`/movie/${movie.id}`} className="text-sm text-gray-400 hover:text-white">← Back to movie guide</Link><div className="mt-5 flex flex-wrap items-end justify-between gap-4"><div><p className="text-sm font-bold uppercase tracking-[0.25em] text-red-400">Official trailer</p><h1 className="mt-2 text-4xl font-black">{movie.title}</h1></div><p className="text-sm text-gray-500">Trailer source: YouTube</p></div><div className="mt-8 aspect-video overflow-hidden rounded-2xl border border-white/10 bg-[#0b0b0b]">{trailer?.key ? <iframe className="h-full w-full" src={`https://www.youtube.com/embed/${trailer.key}`} title={`${movie.title} official trailer`} allow="autoplay; encrypted-media; picture-in-picture" allowFullScreen /> : <div className="flex h-full items-center justify-center p-6 text-center text-gray-400">An official trailer is not currently available for this title.</div>}</div><div className="mt-8 grid gap-6 md:grid-cols-[180px_1fr]"><div>{getImageUrl(movie.poster_path, "w500") && <img src={getImageUrl(movie.poster_path, "w500")!} alt={`${movie.title} poster`} className="w-full rounded-2xl" />}</div><div><h2 className="text-2xl font-bold">About this trailer</h2><p className="mt-3 leading-7 text-gray-400">This page is for viewing the movie's official trailer when one is available. CinemaHunt does not host or provide unauthorized full-movie streams or downloads.</p><p className="mt-3 leading-7 text-gray-500">For release availability, tickets, or legal streaming options, check the movie's official distributor or a licensed service in your region.</p></div></div></div><Footer /></main>;
}
