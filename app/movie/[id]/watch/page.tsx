import { getMovieDetails } from "@/lib/tmdb";

export default async function WatchPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const movie = await getMovieDetails(Number(id));

  const videos = movie.videos?.results || [];

  const trailer =
    videos.find(
      (video: any) =>
        video.site === "YouTube" &&
        video.type === "Trailer" &&
        video.official === true
    ) ||
    videos.find(
      (video: any) =>
        video.site === "YouTube" &&
        video.type === "Trailer"
    );

  return (
    <main className="min-h-screen bg-black px-4 py-8 text-white md:px-8">
      <div className="mx-auto max-w-6xl">

        <h1 className="mb-6 text-3xl font-bold">
          ▶ {movie.title}
        </h1>

        <div className="grid gap-8 md:grid-cols-[280px_1fr]">

          {/* Poster */}
          <div>
            {movie.poster_path ? (
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="w-full rounded-2xl"
              />
            ) : (
              <div className="flex aspect-[2/3] items-center justify-center rounded-2xl bg-[#111] text-gray-500">
                No Image
              </div>
            )}
          </div>

          {/* Movie information */}
          <div>

            <h2 className="text-4xl font-bold">
              {movie.title}
            </h2>

            <p className="mt-4 text-yellow-400">
              ⭐ {movie.vote_average?.toFixed(1) || "N/A"}
            </p>

            <p className="mt-2 text-gray-400">
              📅 {movie.release_date || "Unknown"}
            </p>

            <p className="mt-6 leading-7 text-gray-300">
              {movie.overview || "No description available."}
            </p>

          </div>
        </div>

        {/* Trailer */}
        <div className="mt-10">

          <h2 className="mb-5 text-2xl font-bold">
            🎬 Official Trailer
          </h2>

          {trailer?.key ? (
            <div className="aspect-video overflow-hidden rounded-2xl bg-[#111]">
              <iframe
                className="h-full w-full"
                src={`https://www.youtube.com/embed/${trailer.key}`}
                title={`${movie.title} Official Trailer`}
                allow="autoplay; encrypted-media; picture-in-picture"
                allowFullScreen
              />
            </div>
          ) : (
            <div className="flex aspect-video items-center justify-center rounded-2xl bg-[#111] text-gray-400">
              Official trailer not available.
            </div>
          )}

        </div>

      </div>
    </main>
  );
}