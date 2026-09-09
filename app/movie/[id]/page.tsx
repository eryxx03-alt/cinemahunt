import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MovieCard from "@/components/MovieCard";
import TrailerButton from "@/components/TrailerButton";
import BackButton from "@/components/BackButton";

import {
  getImageUrl,
  getMovieDetails,
  getSimilarMovies,
} from "@/lib/tmdb";

type MoviePageProps = {
  params: Promise<{
    id: string;
  }>;
};

export async function generateMetadata({
  params,
}: MoviePageProps) {
  const { id } = await params;

  try {
    const movie = await getMovieDetails(Number(id));

    const title = movie.title || movie.name || "Movie";

    const description =
      movie.overview ||
      `Discover ${title} on CinemaHunt.`;

    return {
      title: `${title} | CinemaHunt`,
      description,

      alternates: {
        canonical: `https://cinemahunt10.vercel.app/movie/${id}`,
      },

      openGraph: {
        title: `${title} | CinemaHunt`,
        description,
        url: `https://cinemahunt10.vercel.app/movie/${id}`,
        siteName: "CinemaHunt",
        type: "video.movie",

        images: movie.backdrop_path
          ? [
              {
                url: getImageUrl(
                  movie.backdrop_path,
                  "original"
                ),
                width: 1280,
                height: 720,
                alt: title,
              },
            ]
          : [],
      },

      twitter: {
        card: "summary_large_image",
        title: `${title} | CinemaHunt`,
        description,

        images: movie.backdrop_path
          ? [
              getImageUrl(
                movie.backdrop_path,
                "original"
              ),
            ]
          : [],
      },
    };
  } catch {
    return {
      title: "Movie | CinemaHunt",
      description:
        "Discover movies, ratings, trailers and more on CinemaHunt.",
    };
  }
}

export default async function MoviePage({
  params,
}: MoviePageProps) {
  const { id } = await params;

  const movieId = Number(id);

  if (!Number.isFinite(movieId)) {
    notFound();
  }

  let movie;

  try {
    movie = await getMovieDetails(movieId);
  } catch {
    notFound();
  }

  const similarData = await getSimilarMovies(movieId).catch(
    () => ({
      results: [],
    })
  );

  const title =
    movie.title ||
    movie.name ||
    "Untitled";

  const releaseDate =
    movie.release_date ||
    movie.first_air_date ||
    "";

  const year = releaseDate
    ? releaseDate.slice(0, 4)
    : "Unknown";

  const rating =
    typeof movie.vote_average === "number"
      ? movie.vote_average
      : 0;

  const runtime =
    typeof movie.runtime === "number"
      ? movie.runtime
      : null;

  const genres = Array.isArray(movie.genres)
    ? movie.genres
    : [];

  const trailer =
    movie.videos?.results?.find(
      (video: any) =>
        video.site === "YouTube" &&
        video.type === "Trailer" &&
        video.official !== false
    ) ||
    movie.videos?.results?.find(
      (video: any) =>
        video.site === "YouTube" &&
        video.type === "Trailer"
    );

  const backdropUrl = movie.backdrop_path
    ? getImageUrl(
        movie.backdrop_path,
        "original"
      )
    : null;

  const posterUrl = movie.poster_path
    ? getImageUrl(
        movie.poster_path,
        "w500"
      )
    : "/logo.png";

  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />

      {/* HERO */}
      <section className="relative min-h-[720px] overflow-hidden">

        {/* BACK BUTTON */}
        <div className="absolute left-4 top-24 z-30 sm:left-6 sm:top-28 md:left-10">
          <BackButton />
        </div>

        {/* BACKGROUND */}
        {backdropUrl && (
          <Image
            src={backdropUrl}
            alt={title}
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
        )}

        {/* OVERLAYS */}
        <div className="absolute inset-0 bg-black/50" />

        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-black/30" />

        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

        {/* HERO CONTENT */}
        <div className="relative mx-auto flex min-h-[720px] max-w-7xl items-end px-4 pb-14 pt-32 sm:px-6 sm:pb-20">

          <div className="grid w-full gap-10 md:grid-cols-[240px_1fr] md:items-end lg:grid-cols-[280px_1fr] lg:gap-12">

            {/* POSTER */}
            <div className="hidden md:block">
              <div className="group relative aspect-[2/3] overflow-hidden rounded-2xl border border-white/10 bg-zinc-900 shadow-2xl shadow-black/70">

                <Image
                  src={posterUrl}
                  alt={title}
                  fill
                  sizes="280px"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />

              </div>
            </div>

            {/* MOVIE INFO */}
            <div className="max-w-4xl">

              <p className="mb-3 text-xs font-bold uppercase tracking-[0.3em] text-red-500">
                CinemaHunt
              </p>

              <h1 className="text-4xl font-black tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
                {title}
              </h1>

              {/* META */}
              <div className="mt-5 flex flex-wrap items-center gap-3 text-sm">

                <span className="rounded-full border border-white/10 bg-white/10 px-3 py-1.5 font-semibold backdrop-blur-md">
                  {year}
                </span>

                {rating > 0 && (
                  <span className="rounded-full border border-yellow-500/20 bg-yellow-500/10 px-3 py-1.5 font-bold text-yellow-400">
                    ★ {rating.toFixed(1)}
                  </span>
                )}

                {runtime && (
                  <span className="rounded-full border border-white/10 bg-white/10 px-3 py-1.5 text-zinc-300 backdrop-blur-md">
                    {runtime} min
                  </span>
                )}

              </div>

              {/* GENRES */}
              {genres.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">

                  {genres.map((genre: any) => (
                    <span
                      key={genre.id}
                      className="text-sm text-zinc-400"
                    >
                      {genre.name}
                    </span>
                  ))}

                </div>
              )}

              {/* DESCRIPTION */}
              <p className="mt-6 max-w-3xl text-sm leading-7 text-zinc-300 sm:text-base">
                {movie.overview ||
                  "No description available for this movie."}
              </p>

              {/* ACTIONS */}
              <div className="mt-8 flex flex-wrap gap-3">

                <Link
                  href={`/movie/${movieId}/watch`}
                  className="rounded-xl bg-red-600 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-red-950/40 transition-all duration-300 hover:-translate-y-0.5 hover:bg-red-500"
                >
                  Watch Now
                </Link>

                {trailer?.key && (
                  <TrailerButton
                    videoKey={trailer.key}
                  />
                )}

                {/* WISHLIST - TEMPORARY */}
                <button
                  type="button"
                  className="rounded-xl border border-white/10 bg-white/[0.06] px-6 py-3.5 text-sm font-bold text-white backdrop-blur-md transition-all duration-300 hover:border-red-500/30 hover:bg-red-500/10 hover:text-red-400"
                >
                  ♡ Add to Wishlist
                </button>

              </div>

            </div>
          </div>
        </div>
      </section>

      {/* MOVIE DETAILS */}
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6">

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">

          {/* RATING */}
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">

            <p className="text-xs font-bold uppercase tracking-widest text-zinc-600">
              Rating
            </p>

            <p className="mt-2 text-2xl font-black text-yellow-400">
              {rating > 0
                ? rating.toFixed(1)
                : "N/A"}
            </p>

          </div>

          {/* RELEASE */}
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">

            <p className="text-xs font-bold uppercase tracking-widest text-zinc-600">
              Release
            </p>

            <p className="mt-2 text-2xl font-black">
              {releaseDate || "Unknown"}
            </p>

          </div>

          {/* RUNTIME */}
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">

            <p className="text-xs font-bold uppercase tracking-widest text-zinc-600">
              Runtime
            </p>

            <p className="mt-2 text-2xl font-black">
              {runtime
                ? `${runtime} min`
                : "N/A"}
            </p>

          </div>

          {/* LANGUAGE */}
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">

            <p className="text-xs font-bold uppercase tracking-widest text-zinc-600">
              Language
            </p>

            <p className="mt-2 text-2xl font-black uppercase">
              {movie.original_language ||
                "N/A"}
            </p>

          </div>

        </div>
      </section>

      {/* TRAILER */}
      {trailer?.key && (
        <section className="mx-auto max-w-7xl px-4 pb-14 sm:px-6">

          <div className="mb-6">

            <p className="text-xs font-bold uppercase tracking-[0.25em] text-red-500">
              Watch
            </p>

            <h2 className="mt-2 text-3xl font-black">
              Official Trailer
            </h2>

          </div>

          <div className="overflow-hidden rounded-2xl border border-white/10 bg-zinc-950">

            <div className="aspect-video w-full">

              <iframe
                src={`https://www.youtube.com/embed/${trailer.key}?rel=0`}
                title={`${title} trailer`}
                className="h-full w-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />

            </div>

          </div>

        </section>
      )}

      {/* SIMILAR MOVIES */}
      {similarData.results?.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6">

          <div className="mb-7">

            <p className="text-xs font-bold uppercase tracking-[0.25em] text-red-500">
              More like this
            </p>

            <h2 className="mt-2 text-3xl font-black">
              You Might Also Like
            </h2>

            <p className="mt-2 text-sm text-zinc-500">
              More movies you may enjoy.
            </p>

          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">

            {similarData.results
              .filter(
                (movie: any) =>
                  movie.id !== movieId
              )
              .slice(0, 12)
              .map((movie: any) => (
                <MovieCard
                  key={movie.id}
                  movie={movie}
                />
              ))}

          </div>

        </section>
      )}

      <Footer />
    </main>
  );
}