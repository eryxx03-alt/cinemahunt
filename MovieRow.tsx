import Link from "next/link";
import { Movie, getImageUrl } from "@/lib/tmdb";

interface MovieRowProps { title: string; movies?: Movie[]; href?: string; }

export default function MovieRow({ title, movies = [], href }: MovieRowProps) {
  const movieList = Array.isArray(movies) ? movies : [];
  if (!movieList.length) return null;

  return (
    <section>
      <div className="mb-5 flex items-end justify-between gap-4">
        <h2 className="text-2xl font-bold text-white md:text-3xl">{title}</h2>
        {href && <Link href={href} className="text-sm font-semibold text-red-400 hover:text-red-300">View all →</Link>}
      </div>
      <div className="flex gap-5 overflow-x-auto pb-5" style={{ scrollbarWidth: "none" }}>
        {movieList.slice(0, 10).map((movie) => {
          const poster = getImageUrl(movie.poster_path, "w500");
          return (
            <Link key={movie.id} href={`/movie/${movie.id}`} className="group min-w-[170px] overflow-hidden rounded-2xl border border-white/10 bg-[#111] transition duration-300 hover:-translate-y-1 hover:border-white/20 md:min-w-[190px]">
              {poster ? <img src={poster} alt={`${movie.title} poster`} loading="lazy" className="aspect-[2/3] w-full object-cover transition duration-500 group-hover:scale-105" /> : <div className="flex aspect-[2/3] items-center justify-center bg-[#171717] text-gray-500">No image</div>}
              <div className="p-3"><h3 className="line-clamp-1 font-semibold text-white group-hover:text-red-400">{movie.title}</h3><p className="mt-1 text-xs text-gray-500">⭐ {movie.vote_average?.toFixed(1) || "N/A"}</p></div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
