import Image from "next/image";
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

  const backdrop = movie.backdrop_path
    ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
    : null;

  const poster = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : null;

  return (
    <main className="min-h-screen bg-black text-white">

      {/* Cinematic movie header */}
      <section className="relative overflow-hidden">

        {/* Backdrop */}
        {backdrop && (
          <div className="absolute inset-0">
            <Image
              src={backdrop}
              alt=""
              fill
              priority
              className="object-cover opacity-40"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/80 to-black" />
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent" />
          </div>
        )}

        <div className="relative mx-auto max-w-7xl px-4 pb-12 pt-6 md:px-8 md:pt-8">

          {/* Premium Back button */}
          <button
            onClick={() => window.history.back()}
            className="mb-10 inline-flex items-center rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-xl transition-all duration-300 hover:bg-white/20 hover:-translate-x-1"
          >
            ← Back
          </button>

          {/* Main movie content */}
          <div className="grid items-center gap-8 md:grid-cols-[260px_1fr] lg:grid-cols-[300px_1fr]">

            {/* Poster */}
            <div className="relative mx-auto w-full max-w-[300px] overflow-hidden rounded-2xl shadow-2xl shadow-black/60">
              {poster ? (
                <Image
                  src={poster}
                  alt={movie.title}
                  width={500}
                  height={750}
                  priority
                  className="h-auto w-full object-cover"
                />
              ) : (
                <div className="flex aspect-[2/3] items-center justify-center bg-zinc-900 text-zinc-500">
                  No Image
                </div>
              )}
            </div>

            {/* Information */}
            <div className="max-w-3xl">

              <p className="mb-3 text-sm font-medium uppercase tracking-[0.25em] text-red-400">
                CinemaHunt
              </p>

              <h1 className="text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
                {movie.title}
              </h1>

              <div className="mt-5 flex flex-wrap items-center gap-3 text-sm">

                <span className="rounded-full bg-yellow-400/10 px-3 py-1.5 text-yellow-400">
                  ⭐ {movie.vote_average?.toFixed(1) || "N/A"}
                </span>

                <span className="text-zinc-400">
                  {movie.release_date?.slice(0, 4) || "Unknown"}
                </span>

                {movie.runtime && (
                  <span className="text-zinc-400">
                    {movie.runtime} min
                  </span>
                )}

              </div>

              {/* Genres */}
              {movie.genres?.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {movie.genres.slice(0, 4).map((genre: any) => (
                    <span
                      key={genre.id}
                      className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-zinc-300 backdrop-blur-md"
                    >
                      {genre.name}
                    </span>
                  ))}
                </div>
              )}

              {/* Description */}
              <p className="mt-7 max-w-2xl text-base leading-7 text-zinc-300 md:text-lg">
                {movie.overview || "No description available."}
              </p>

              {/* Buttons */}
              <div className="mt-8 flex flex-wrap gap-3">

                {trailer?.key && (
                  <a
                    href="#trailer"
                    className="rounded-full bg-white px-6 py-3 text-sm font-bold text-black transition-all duration-300 hover:scale-105 hover:bg-zinc-200"
                  >
                    ▶ Watch Trailer
                  </a>
                )}

                <button
                  className="rounded-full border border-white/20 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur-xl transition-all duration-300 hover:bg-white/20"
                >
                  ♡ Save
                </button>

                <button
                  className="rounded-full border border-white/20 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur-xl transition-all duration-300 hover:bg-white/20"
                >
                  ↗ Share
                </button>

              </div>

            </div>
          </div>

        </div>
      </section>

      {/* Trailer */}
      <section
        id="trailer"
        className="mx-auto max-w-7xl px-4 pb-16 md:px-8"
      >
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-2xl font-bold md:text-3xl">
            Official Trailer
          </h2>
        </div>

        {trailer?.key ? (
          <div className="aspect-video overflow-hidden rounded-2xl border border-white/10 bg-zinc-950 shadow-2xl">
            <iframe
              className="h-full w-full"
              src={`https://www.youtube.com/embed/${trailer.key}`}
              title={`${movie.title} Official Trailer`}
              allow="autoplay; encrypted-media; picture-in-picture"
              allowFullScreen
            />
          </div>
        ) : (
          <div className="flex aspect-video items-center justify-center rounded-2xl border border-white/10 bg-zinc-950 text-zinc-500">
            Official trailer not available.
          </div>
        )}
      </section>

    </main>
  );
}