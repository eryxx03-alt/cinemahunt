import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getMovieDetails } from "@/lib/tmdb";
import TrailerButton from "@/components/TrailerButton";

type MoviePageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({
  params,
}: MoviePageProps): Promise<Metadata> {
  const { id } = await params;

  const movie = await getMovieDetails(Number(id));

  const title = movie.title || movie.name || "Movie";
  const description =
    movie.overview || `Watch ${title} on CinemaHunt.`;

  return {
    title,
    description,

    alternates: {
      canonical: `https://cinemahunt10.vercel.app/movie/${id}`,
    },

    openGraph: {
      title: `${title} | CinemaHunt`,
      description,
      url: `https://cinemahunt10.vercel.app/movie/${id}`,
      siteName: "CinemaHunt",
      images: movie.backdrop_path
        ? [
            {
              url: `https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`,
              width: 1280,
              height: 720,
              alt: title,
            },
          ]
        : [],
      type: "video.movie",
    },

    twitter: {
      card: "summary_large_image",
      title: `${title} | CinemaHunt`,
      description,
      images: movie.backdrop_path
        ? [`https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`]
        : [],
    },
  };
}

export default async function MoviePage({
  params,
}: MoviePageProps) {
  const { id } = await params;

  const movie = await getMovieDetails(Number(id));

  const title = movie.title || movie.name || "Movie";

  const poster = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : null;

  const backdrop = movie.backdrop_path
    ? `https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`
    : null;

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

  return (
    <main className="min-h-screen bg-black text-white">

      {/* HERO */}
      <section className="relative min-h-[70vh] overflow-hidden">

        {backdrop && (
          <Image
            src={backdrop}
            alt={title}
            fill
            priority
            className="object-cover"
          />
        )}

        <div className="absolute inset-0 bg-black/70" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

        <div className="relative z-10 mx-auto flex min-h-[70vh] max-w-7xl items-end gap-8 px-6 pb-12 pt-32">

          {/* POSTER */}
          {poster && (
            <div className="hidden w-56 shrink-0 overflow-hidden rounded-xl shadow-2xl md:block">
              <Image
                src={poster}
                alt={title}
                width={500}
                height={750}
                className="h-auto w-full object-cover"
              />
            </div>
          )}

          {/* DETAILS */}
          <div className="max-w-3xl">

            <h1 className="mb-4 text-4xl font-bold md:text-6xl">
              {title}
            </h1>

            {movie.release_date && (
              <p className="mb-3 text-gray-300">
                {movie.release_date.slice(0, 4)}
              </p>
            )}

            {movie.vote_average > 0 && (
              <p className="mb-5 text-lg">
                ⭐ {Number(movie.vote_average).toFixed(1)}
              </p>
            )}

            {/* DESCRIPTION */}
            <p className="mb-7 text-base leading-7 text-gray-300 md:text-lg">
              {movie.overview || "No description available."}
            </p>

            {/* WATCH NOW */}
            <Link
              href={`/movie/${id}/watch`}
              className="inline-block rounded-lg bg-red-600 px-6 py-3 font-semibold transition hover:bg-red-700"
            >
              ▶ Watch Now
            </Link>

          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section className="mx-auto max-w-7xl px-6 py-12">

        <h2 className="mb-6 text-2xl font-bold">
          About {title}
        </h2>

        <p className="max-w-4xl leading-7 text-gray-400">
          {movie.overview || "No description available."}
        </p>

        {/* INFO */}
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

          {movie.release_date && (
            <div className="rounded-xl border border-white/10 bg-white/5 p-5">
              <p className="text-sm text-gray-500">
                Release Date
              </p>
              <p className="mt-1 font-semibold">
                {movie.release_date}
              </p>
            </div>
          )}

          {movie.vote_average > 0 && (
            <div className="rounded-xl border border-white/10 bg-white/5 p-5">
              <p className="text-sm text-gray-500">
                Rating
              </p>
              <p className="mt-1 font-semibold">
                ⭐ {Number(movie.vote_average).toFixed(1)}
              </p>
            </div>
          )}

          {movie.runtime && (
            <div className="rounded-xl border border-white/10 bg-white/5 p-5">
              <p className="text-sm text-gray-500">
                Runtime
              </p>
              <p className="mt-1 font-semibold">
                {movie.runtime} minutes
              </p>
            </div>
          )}

          {movie.status && (
            <div className="rounded-xl border border-white/10 bg-white/5 p-5">
              <p className="text-sm text-gray-500">
                Status
              </p>
              <p className="mt-1 font-semibold">
                {movie.status}
              </p>
            </div>
          )}

        </div>
      </section>

      {/* TRAILER */}
      {trailer && (
        <section className="mx-auto max-w-7xl px-6 pb-16">

          <h2 className="mb-6 text-2xl font-bold">
            🎬 Trailer
          </h2>

          <TrailerButton
            videoKey={trailer.key}
            title={title}
          />

        </section>
      )}

    </main>
  );
}