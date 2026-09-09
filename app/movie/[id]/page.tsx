import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import {
  getMovieDetails,
  getSimilarMovies,
  getImageUrl,
} from "@/lib/tmdb";

import TrailerButton from "@/components/TrailerButton";
import BackButton from "@/components/BackButton";
import WatchlistButton from "@/components/WatchlistButton";
import MovieCard from "@/components/MovieCard";

type MoviePageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({
  params,
}: MoviePageProps): Promise<Metadata> {
  const { id } = await params;

  try {
    const movie = await getMovieDetails(Number(id));

    const title = movie.title || movie.name || "Movie";

    const description =
      movie.overview ||
      `Discover ${title}, watch trailers, view ratings, and explore more on CinemaHunt.`;

    const image = movie.backdrop_path
      ? `https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`
      : movie.poster_path
        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        : "https://cinemahunt10.vercel.app/logo.png";

    const url = `https://cinemahunt10.vercel.app/movie/${id}`;

    return {
      title: `${title} | CinemaHunt`,
      description,

      alternates: {
        canonical: url,
      },

      openGraph: {
        title: `${title} | CinemaHunt`,
        description,
        url,
        siteName: "CinemaHunt",
        type: "video.movie",
        images: [
          {
            url: image,
            width: 1280,
            height: 720,
            alt: `${title} backdrop`,
          },
        ],
      },

      twitter: {
        card: "summary_large_image",
        title: `${title} | CinemaHunt`,
        description,
        images: [image],
      },
    };
  } catch {
    return {
      title: "Movie | CinemaHunt",
      description: "Discover movies and TV shows on CinemaHunt.",
    };
  }
}

export default async function MoviePage({
  params,
}: MoviePageProps) {
  const { id } = await params;
  const movieId = Number(id);

  const [movie, similarData] = await Promise.all([
    getMovieDetails(movieId),
    getSimilarMovies(movieId),
  ]);

  const title = movie.title || movie.name || "Movie";

  const poster = movie.poster_path
    ? getImageUrl(movie.poster_path, "w500")
    : null;

  const backdrop = movie.backdrop_path
    ? getImageUrl(movie.backdrop_path, "w1280")
    : null;

  const releaseDate =
    movie.release_date || movie.first_air_date || null;

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
    ) ||
    videos.find(
      (video: any) =>
        video.site === "YouTube" &&
        video.type === "Teaser"
    );

  const similarMovies = Array.isArray(similarData?.results)
    ? similarData.results
        .filter((item: any) => item.id !== movieId)
        .filter((item: any) => item.poster_path)
        .slice(0, 12)
    : [];

  const rating =
    typeof movie.vote_average === "number"
      ? movie.vote_average
      : 0;

  return (
    <main className="min-h-screen bg-black text-white">
      {/* BACK BUTTON */}
      <div className="relative z-30 mx-auto max-w-7xl px-4 pt-24 sm:px-6">
        <BackButton />
      </div>

      {/* HERO */}
      <section className="relative mt-4 min-h-[78vh] overflow-hidden sm:min-h-[82vh]">
        {/* BACKDROP */}
        {backdrop ? (
          <Image
            src={backdrop}
            alt={`${title} backdrop`}
            fill
            priority
            sizes="100vw"
            quality={80}
            className="object-cover object-center"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 via-black to-black" />
        )}

        {/* CINEMATIC OVERLAYS */}
        <div className="absolute inset-0 bg-black/55" />

        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/45 to-black/20" />

        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/45 to-transparent" />

        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black to-transparent" />

        {/* HERO CONTENT */}
        <div className="relative z-10 mx-auto flex min-h-[78vh] max-w-7xl items-end px-4 pb-12 pt-16 sm:px-6 sm:pb-16 md:min-h-[82vh] md:pb-20">
          <div className="flex w-full flex-col gap-8 md:flex-row md:items-end">
            {/* POSTER */}
            {poster && (
              <div className="relative hidden w-56 shrink-0 overflow-hidden rounded-2xl border border-white/10 bg-zinc-900 shadow-2xl shadow-black/70 md:block lg:w-64">
                <Image
                  src={poster}
                  alt={`${title} poster`}
                  width={500}
                  height={750}
                  quality={80}
                  sizes="256px"
                  className="h-auto w-full object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

                <div className="absolute right-3 top-3 z-20">
                  <WatchlistButton movie={movie} />
                </div>
              </div>
            )}

            {/* DETAILS */}
            <div className="max-w-4xl">
              {/* MOBILE WISHLIST */}
              <div className="mb-5 md:hidden">
                <WatchlistButton movie={movie} />
              </div>

              {/* LABEL */}
              <div className="mb-3 flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-red-500 shadow-lg shadow-red-500/50" />

                <span className="text-xs font-bold uppercase tracking-[0.25em] text-red-400">
                  CinemaHunt
                </span>
              </div>

              {/* TITLE */}
              <h1 className="max-w-4xl text-4xl font-black leading-[1.05] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
                {title}
              </h1>

              {/* META */}
              <div className="mt-5 flex flex-wrap items-center gap-2.5 text-sm">
                {releaseDate && (
                  <span className="rounded-md border border-white/10 bg-black/40 px-3 py-1.5 text-zinc-300 backdrop-blur-md">
                    📅 {releaseDate.slice(0, 4)}
                  </span>
                )}

                {rating > 0 && (
                  <span className="rounded-md border border-yellow-500/20 bg-yellow-500/10 px-3 py-1.5 font-bold text-yellow-400 backdrop-blur-md">
                    ⭐ {rating.toFixed(1)}
                  </span>
                )}

                {movie.runtime && (
                  <span className="rounded-md border border-white/10 bg-black/40 px-3 py-1.5 text-zinc-300 backdrop-blur-md">
                    ⏱ {movie.runtime} min
                  </span>
                )}

                {movie.original_language && (
                  <span className="rounded-md border border-white/10 bg-black/40 px-3 py-1.5 uppercase text-zinc-300 backdrop-blur-md">
                    🌐 {movie.original_language}
                  </span>
                )}
              </div>

              {/* DESCRIPTION */}
              <p className="mt-5 max-w-3xl text-sm leading-6 text-zinc-300 sm:text-base sm:leading-7 md:mt-6 md:text-lg">
                {movie.overview ||
                  "Discover this movie and explore more information on CinemaHunt."}
              </p>

              {/* ACTIONS */}
              <div className="mt-7 flex flex-wrap gap-3 sm:mt-8">
                <Link
                  href={`/movie/${id}/watch`}
                  className="group inline-flex items-center gap-2 rounded-xl bg-red-600 px-6 py-3 text-sm font-bold shadow-lg shadow-red-950/30 transition-all duration-300 hover:-translate-y-0.5 hover:bg-red-700 hover:shadow-xl hover:shadow-red-600/20 sm:px-7 sm:py-3.5 sm:text-base"
                >
                  <span className="transition-transform duration-300 group-hover:scale-110">
                    ▶
                  </span>
                  Watch Now
                </Link>

                {trailer && (
                  <TrailerButton
                    videoKey={trailer.key}
                    title={title}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 md:py-16">
        <div className="max-w-4xl">
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.25em] text-red-500">
            Movie Information
          </p>

          <h2 className="text-2xl font-black sm:text-3xl">
            About {title}
          </h2>

          <p className="mt-5 text-sm leading-7 text-zinc-400 sm:text-base">
            {movie.overview || "No description available."}
          </p>
        </div>

        {/* INFO CARDS */}
        <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {releaseDate && (
            <div className="group rounded-2xl border border-white/10 bg-white/[0.04] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-red-500/30 hover:bg-white/[0.06]">
              <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
                Release Date
              </p>

              <p className="mt-2 font-bold text-white">
                {releaseDate}
              </p>
            </div>
          )}

          {rating > 0 && (
            <div className="group rounded-2xl border border-white/10 bg-white/[0.04] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-yellow-500/30 hover:bg-white/[0.06]">
              <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
                Rating
              </p>

              <p className="mt-2 font-bold text-yellow-400">
                ⭐ {rating.toFixed(1)} / 10
              </p>
            </div>
          )}

          {movie.runtime && (
            <div className="group rounded-2xl border border-white/10 bg-white/[0.04] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-red-500/30 hover:bg-white/[0.06]">
              <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
                Runtime
              </p>

              <p className="mt-2 font-bold text-white">
                {movie.runtime} minutes
              </p>
            </div>
          )}

          {movie.status && (
            <div className="group rounded-2xl border border-white/10 bg-white/[0.04] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-red-500/30 hover:bg-white/[0.06]">
              <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
                Status
              </p>

              <p className="mt-2 font-bold text-white">
                {movie.status}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* TRAILER */}
      {trailer && (
        <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6">
          <div className="mb-6">
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.25em] text-red-500">
              Watch Preview
            </p>

            <h2 className="text-2xl font-black sm:text-3xl">
              🎬 Official Trailer
            </h2>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 sm:p-6">
            <TrailerButton
              videoKey={trailer.key}
              title={title}
            />
          </div>
        </section>
      )}

      {/* SIMILAR MOVIES */}
      {similarMovies.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6">
          <div className="mb-7">
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.25em] text-red-500">
              Recommendations
            </p>

            <h2 className="text-2xl font-black sm:text-3xl">
              🎯 You Might Also Like
            </h2>

            <p className="mt-1 text-sm text-zinc-500">
              More movies you may enjoy
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5 md:grid-cols-4 lg:grid-cols-6">
            {similarMovies.map((similar: any) => (
              <MovieCard
                key={similar.id}
                movie={similar}
              />
            ))}
          </div>
        </section>
      )}
    </main>
  );
}