import { Movie } from "@/lib/tmdb";
import MovieCard from "@/components/MovieCard";

export default function MovieGrid({ movies }: { movies: Movie[] }) {
  if (!movies.length) {
    return <div className="rounded-2xl border border-white/10 bg-[#101010] p-10 text-center text-gray-400">No movies found right now. Please try again later.</div>;
  }
  return <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">{movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)}</div>;
}
