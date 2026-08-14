"use client";

import Link from "next/link";
import { Play } from "lucide-react";
import { useState } from "react";
import { Movie, getImageUrl, getMovieDetails } from "@/lib/tmdb";

export default function HeroSection({ movie }: { movie: Movie }) {
  const [showTrailer, setShowTrailer] = useState(false);
  const [trailerKey, setTrailerKey] = useState<string | null>(null);
  const [loadingTrailer, setLoadingTrailer] = useState(false);

  const handleTrailer = async () => {
    setShowTrailer(true);
    setLoadingTrailer(true);
    try {
      const data = await getMovieDetails(movie.id);
      const videos = data.videos?.results || [];
      const trailer = videos.find((v) => v.site === "YouTube" && v.type === "Trailer" && v.official) || videos.find((v) => v.site === "YouTube" && v.type === "Trailer");
      setTrailerKey(trailer?.key || null);
    } catch {
      setTrailerKey(null);
    } finally {
      setLoadingTrailer(false);
    }
  };

  return (
    <>
      <section className="relative flex min-h-[76vh] items-end overflow-hidden bg-[#080808] pt-20">
        {getImageUrl(movie.backdrop_path, "original") && <img src={getImageUrl(movie.backdrop_path, "original")!} alt="" aria-hidden className="absolute inset-0 h-full w-full object-cover opacity-55" />}
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/60 to-[#050505]/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505]/35 to-transparent" />
        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-16 md:pb-20">
          <div className="max-w-3xl">
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.3em] text-red-400">Featured on CinemaHunt</p>
            <h1 className="text-4xl font-black tracking-tight text-white md:text-6xl">{movie.title}</h1>
            <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-sm text-gray-300"><span>⭐ {movie.vote_average?.toFixed(1) || "N/A"}</span><span>{movie.release_date?.slice(0,4) || "TBA"}</span><span>Movie guide & official trailer</span></div>
            <p className="mt-5 line-clamp-4 max-w-2xl text-base leading-7 text-gray-300 md:text-lg">{movie.overview || "Discover the details, cast, release information, and official trailer for this featured movie."}</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href={`/movie/${movie.id}`} className="rounded-xl bg-red-600 px-6 py-3 font-bold text-white transition hover:bg-red-500">View Movie Guide</Link>
              <button onClick={handleTrailer} className="flex items-center gap-2 rounded-xl bg-white px-6 py-3 font-bold text-black transition hover:bg-gray-200"><Play size={17} fill="currentColor" /> Official Trailer</button>
            </div>
          </div>
        </div>
      </section>

      {showTrailer && <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90 p-4" role="dialog" aria-modal="true" aria-label={`${movie.title} trailer`}>
        <div className="relative w-full max-w-5xl"><button onClick={() => { setShowTrailer(false); setTrailerKey(null); }} className="absolute -right-1 -top-11 text-2xl text-white" aria-label="Close trailer">✕</button>
          <div className="aspect-video overflow-hidden rounded-2xl bg-black">{loadingTrailer ? <div className="flex h-full items-center justify-center text-gray-300">Loading official trailer…</div> : trailerKey ? <iframe className="h-full w-full" src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1`} title={`${movie.title} Official Trailer`} allow="autoplay; encrypted-media; picture-in-picture" allowFullScreen /> : <div className="flex h-full items-center justify-center text-gray-400">Official trailer not available.</div>}</div>
        </div>
      </div>}
    </>
  );
}
