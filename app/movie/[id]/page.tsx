import { getMovieDetails } from "@/lib/tmdb";

export default async function MoviePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const movie = await getMovieDetails(Number(id));

  return (
    <div className="min-h-screen bg-black p-8 text-white">
      <div className="mx-auto max-w-5xl">
        {/* Movie Poster */}
        {movie.poster_path && (
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className="mb-8 w-64 rounded-2xl"
          />
        )}

        {/* Movie Title */}
        <h1 className="text-4xl font-bold">
          {movie.title}
        </h1>

        {/* Rating */}
        <p className="mt-4 text-yellow-400">
          ⭐ Rating: {movie.vote_average?.toFixed(1) || "N/A"}
        </p>

        {/* Release Date */}
        <p className="mt-2 text-gray-400">
          📅 Release Date: {movie.release_date || "Unknown"}
        </p>

        {/* Description */}
        <p className="mt-6 max-w-3xl leading-7 text-gray-300">
          {movie.overview}
        </p>

        {/* Watch Button */}
        <a
          href={`/movie/${movie.id}/watch`}
          className="mt-8 inline-block rounded-lg bg-red-600 px-8 py-4 font-bold text-white transition hover:bg-red-700"
        >
          ▶ WATCH NOW
        </a>
      </div>
    </div>
  );
}