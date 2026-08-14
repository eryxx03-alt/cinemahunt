import Link from "next/link";
import { Movie, getImageUrl } from "@/lib/tmdb";

export default function MovieCard({ movie }: { movie: Movie }) {
  const year = movie.release_date?.slice(0, 4);
  const poster = getImageUrl(movie.poster_path, "w500");

  return (
    <Link href={`/movie/${movie.id}`} className="group overflow-hidden rounded-2xl border border-white/10 bg-[#111] transition duration-300 hover:-translate-y-1 hover:border-white/20">
      <div className="relative overflow-hidden">
        {poster ? (
          <img src={poster} alt={`${movie.title} poster`} loading="lazy" className="aspect-[2/3] w-full object-cover transition duration-500 group-hover:scale-105" />
        ) : (
          <div className="flex aspect-[2/3] items-center justify-center bg-[#171717] text-gray-500">No image</div>
        )}
        <div className="absolute right-2 top-2 rounded-full bg-black/85 px-2.5 py-1 text-xs font-semibold text-white">⭐ {movie.vote_average?.toFixed(1) || "N/A"}</div>
      </div>
      <div className="p-3.5">
        <h3 className="line-clamp-1 font-semibold text-white group-hover:text-red-400">{movie.title}</h3>
        <p className="mt-1 text-xs text-gray-500">{year || "Release date TBA"}</p>
      </div>
    </Link>
  );
}
