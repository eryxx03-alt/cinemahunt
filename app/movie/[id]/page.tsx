import { getMovieDetails } from "@/lib/tmdb";

export default async function MoviePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const movie = await getMovieDetails(Number(id));

  return (
    <div className="min-h-screen bg-black text-white p-8">
 <img
  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
  alt={movie.title}
  className="w-64 rounded-lg mb-6"
/>

      <h1 className="text-4xl font-bold">{movie.title}</h1>

      <p className="mt-4">
        ⭐ Rating: {movie.vote_average}
      </p>

      <p className="mt-2">
        📅 Release Date: {movie.release_date}
      </p>

      <p className="mt-6 text-gray-300">
        {movie.overview}
      </p>
    </div>
  );
}