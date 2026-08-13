import Navbar from "@/components/Navbar";
import MovieRow from "@/components/MovieRow";
import { getPopularMovies } from "@/lib/tmdb";

export default async function PopularPage() {
  const data = await getPopularMovies();

  return (
    <main className="min-h-screen bg-[#050505] text-white">
      <Navbar />

      <div className="mx-auto max-w-7xl px-6 pb-20 pt-28">
        <h1 className="mb-8 text-4xl font-bold">
          Popular Movies 🔥
        </h1>

        <MovieRow
          title="Popular Movies"
          movies={data.results || []}
        />
      </div>
    </main>
  );
}