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
        ? [
            `https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`,
          ]
        : [],
    },
  };
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
        .slice(0, 12)
    : [];

  return (
    <main className="min-h-screen bg-black text-white">

      {/* BACK BUTTON */}
      <div className="mx-auto max-w-7xl px-6 pt-24">
        <BackButton />
      </div>

      {/* HERO */}
      <section className="relative mt-4 min-h-[70vh] overflow-hidden">

        {backdrop ? (
          <Image
            src={backdrop}
            alt={title}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        ) : (
          <div className="absolute inset-0 bg-zinc-900" />
        )}

        <div className="absolute inset-0 bg-black/70" />

        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/30 to-transparent" />

        <div className="relative z-10 mx-auto flex min-h-[70vh] max-w-7xl items-end gap-8 px-6 pb-12 pt-20">

          {/* POSTER */}
          {poster && (
            <div className="relative hidden w-56 shrink-0 overflow-hidden rounded-xl shadow-2xl md:block">

              <Image
                src={poster}
                alt={title}
                width={500}
                height={750}
                quality={75}
                className="h-auto w-full object-cover"
              />

              {/* WISHLIST */}
              <div className="absolute right-3 top-3 z-20">
                <WatchlistButton movie={movie} />
              </div>

            </div>
          )}

          {/* DETAILS */}
          <div className="max-w-3xl">

            {/* MOBILE WISHLIST */}
            <div className="mb-5 md:hidden">
              <WatchlistButton movie={movie} />
            </div>

            <h1 className="mb-4 text-4xl font-bold md:text-6xl">
              {title}
            </h1>

            <div className="mb-5 flex flex-wrap items-center gap-4 text-sm text-gray-300">

              {movie.release_date && (
                <span>
                  📅 {movie.release_date.slice(0, 4)}
                </span>
              )}

              {movie.vote_average > 0 && (
                <span className="font-semibold text-yellow-400">
                  ⭐ {Number(movie.vote_average).toFixed(1)}
                </span>
              )}

              {movie.runtime && (
                <span>
                  ⏱ {movie.runtime} min
                </span>
              )}

              {movie.original_language && (
                <span className="uppercase">
                  🌐 {movie.original_language}
                </span>
              )}

            </div>

            {/* DESCRIPTION */}
            <p className="mb-7 text-base leading-7 text-gray-300 md:text-lg">
              {movie.overview ||
                "No description available."}
            </p>

            {/* ACTIONS */}
            <div className="flex flex-wrap gap-3">

              <Link
                href={`/movie/${id}/watch`}
                className="rounded-lg bg-red-600 px-6 py-3 font-semibold transition hover:bg-red-700"
              >
                ▶ Watch Now
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
      </section>

      {/* ABOUT */}
      <section className="mx-auto max-w-7xl px-6 py-12">

        <h2 className="mb-6 text-2xl font-bold">
          About {title}
        </h2>

        <p className="max-w-4xl leading-7 text-gray-400">
          {movie.overview ||
            "No description available."}
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

      {/* SIMILAR MOVIES */}
      {similarMovies.length > 0 && (
        <section className="mx-auto max-w-7xl px-6 pb-20">

          <div className="mb-6">
            <h2 className="text-2xl font-bold md:text-3xl">
              🎯 You Might Also Like
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              More movies you may enjoy
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">

            {similarMovies.map((similar: any) => {

              const similarTitle =
                similar.title ||
                similar.name ||
                "Movie";

              return (
                <Link
                  key={similar.id}
                  href={`/movie/${similar.id}`}
                  className="group overflow-hidden rounded-xl bg-zinc-900 transition duration-300 hover:-translate-y-1 hover:bg-zinc-800"
                >

                  <div className="relative aspect-[2/3] overflow-hidden bg-zinc-800">

                    <Image
                      src={getImageUrl(
                        similar.poster_path,
                        "w500"
                      )}
                      alt={similarTitle}
                      fill
                      quality={75}
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 16vw"
                      className="object-cover transition duration-500 group-hover:scale-105"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

                    {similar.vote_average > 0 && (
                      <span className="absolute right-2 top-2 rounded-md bg-black/75 px-2 py-1 text-xs font-semibold backdrop-blur-sm">
                        ⭐ {Number(similar.vote_average).toFixed(1)}
                      </span>
                    )}

                  </div>

                  <div className="p-3">

                    <h3 className="line-clamp-2 min-h-[3rem] text-sm font-semibold leading-6 text-white transition-colors group-hover:text-red-400">
                      {similarTitle}
                    </h3>

                    {similar.release_date && (
                      <p className="mt-1 text-xs text-gray-500">
                        {similar.release_date.slice(0, 4)}
                      </p>
                    )}

                  </div>

                </Link>
              );
            })}

          </div>

        </section>
      )}

    </main>
  );
}