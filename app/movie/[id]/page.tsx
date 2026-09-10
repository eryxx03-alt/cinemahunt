import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MovieCard from "@/components/MovieCard";
import TrailerButton from "@/components/TrailerButton";
import BackButton from "@/components/BackButton";
import MovieWishlistButton from "@/components/MovieWishlistButton";

import {
  getImageUrl,
  getMovieDetails,
  getSimilarMovies,
} from "@/lib/tmdb";

type MoviePageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: MoviePageProps) {
  const { id } = await params;
  const movieId = Number(id);

  if (!Number.isFinite(movieId)) {
    return {
      title: "Movie | CinemaHunt",
    };
  }

  try {
    const movie = await getMovieDetails(movieId);

    const title = movie.title || movie.name || "Movie";
    const description =
      movie.overview ||
      `Watch details, trailers, ratings and recommendations for ${title} on CinemaHunt.`;

    const poster = getImageUrl(movie.poster_path, "w780");

    return {
      title: `${title} | CinemaHunt`,
      description,

      alternates: {
        canonical: `https://cinemahunt10.vercel.app/movie/${movieId}`,
      },

      openGraph: {
        title: `${title} | CinemaHunt`,
        description,
        url: `https://cinemahunt10.vercel.app/movie/${movieId}`,
        siteName: "CinemaHunt",
        type: "video.movie",
        images: [
          {
            url: poster,
            width: 780,
            height: 1170,
            alt: title,
          },
        ],
      },

      twitter: {
        card: "summary_large_image",
        title: `${title} | CinemaHunt`,
        description,
        images: [poster],
      },
    };
  } catch {
    return {
      title: "Movie | CinemaHunt",
    };
  }
}

export default async function MoviePage({ params }: MoviePageProps) {
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

  if (!movie) {
    notFound();
  }

  const title = movie.title || movie.name || "Untitled";

  const year =
    movie.release_date?.slice(0, 4) ||
    movie.first_air_date?.slice(0, 4) ||
    "N/A";

  const poster = getImageUrl(movie.poster_path, "w500");
  const backdrop = getImageUrl(movie.backdrop_path, "original");

  const rating =
    typeof movie.vote_average === "number"
      ? movie.vote_average.toFixed(1)
      : "N/A";

  const runtime =
    typeof movie.runtime === "number" && movie.runtime > 0
      ? `${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}m`
      : "N/A";

  const genres = Array.isArray(movie.genres) ? movie.genres : [];

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

  let similarMovies = [];

  try {
    const similar = await getSimilarMovies(movieId);
    similarMovies = similar?.results?.slice(0, 12) || [];
  } catch {
    similarMovies = [];
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      {/* HERO */}
      <section className="relative min-h-[720px] overflow-hidden">
        {/* Backdrop */}
        <div className="absolute inset-0">
          <Image
            src={backdrop}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />

          <div className="absolute inset-0 bg-black/55" />

          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/75 to-black/20" />

          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
        </div>

        {/* Back Button */}
        <div className="absolute left-4 top-24 z-30 sm:left-6 sm:top-28 md:left-10">
          <BackButton />
        </div>

        {/* Hero Content */}
        <div className="relative z-20 mx-auto flex min-h-[720px] max-w-7xl items-end px-4 pb-16 pt-32 sm:px-6 md:px-10">
          <div className="grid w-full items-end gap-10 md:grid-cols-[280px_1fr] lg:grid-cols-[320px_1fr]">
            {/* Poster */}
            <div className="hidden md:block">
              <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-2xl shadow-black/50">
                <Image
                  src={poster}
                  alt={title}
                  width={500}
                  height={750}
                  className="h-auto w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />

                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              </div>
            </div>

            {/* Details */}
            <div className="max-w-4xl">
              <div className="mb-4 flex flex-wrap items-center gap-2 text-sm font-medium text-white/70">
                <span>{year}</span>

                <span className="text-white/30">•</span>

                <span className="flex items-center gap-1 text-yellow-400">
                  ★
                  <span>{rating}</span>
                </span>

                <span className="text-white/30">•</span>

                <span>{runtime}</span>

                {movie.original_language && (
                  <>
                    <span className="text-white/30">•</span>
                    <span className="uppercase">
                      {movie.original_language}
                    </span>
                  </>
                )}
              </div>

              <h1 className="max-w-4xl text-4xl font-black tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
                {title}
              </h1>

              {genres.length > 0 && (
                <div className="mt-5 flex flex-wrap gap-2">
                  {genres.map((genre: any) => (
                    <span
                      key={genre.id}
                      className="rounded-full border border-white/10 bg-white/[0.06] px-3 py-1 text-xs font-semibold text-white/80 backdrop-blur-md"
                    >
                      {genre.name}
                    </span>
                  ))}
                </div>
              )}

              <p className="mt-6 max-w-3xl text-sm leading-7 text-white/70 sm:text-base">
                {movie.overview ||
                  "No description is available for this movie yet."}
              </p>

              {/* ACTIONS */}
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href={`/movie/${movieId}/watch`}
                  className="rounded-xl bg-red-600 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-red-600/20 transition-all duration-300 hover:bg-red-500 hover:shadow-red-500/30"
                >
                  Watch Now
                </Link>

                {trailer?.key && (
                  <TrailerButton videoKey={trailer.key} />
                )}

                <MovieWishlistButton movie={movie} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DETAILS */}
      <section className="border-t border-white/10 bg-black">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 md:px-10">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
              <p className="text-xs font-bold uppercase tracking-widest text-white/40">
                Rating
              </p>

              <p className="mt-2 text-2xl font-black">
                {rating}
                <span className="ml-1 text-sm font-medium text-white/40">
                  / 10
                </span>
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
              <p className="text-xs font-bold uppercase tracking-widest text-white/40">
                Release
              </p>

              <p className="mt-2 text-2xl font-black">
                {year}
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
              <p className="text-xs font-bold uppercase tracking-widest text-white/40">
                Runtime
              </p>

              <p className="mt-2 text-2xl font-black">
                {runtime}
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
              <p className="text-xs font-bold uppercase tracking-widest text-white/40">
                Language
              </p>

              <p className="mt-2 text-2xl font-black uppercase">
                {movie.original_language || "N/A"}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* TRAILER */}
      {trailer?.key && (
        <section className="border-t border-white/10 bg-zinc-950">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:px-10">
            <div className="mb-8">
              <p className="text-sm font-bold uppercase tracking-[0.25em] text-red-500">
                Official Trailer
              </p>

              <h2 className="mt-2 text-3xl font-black sm:text-4xl">
                Watch the Trailer
              </h2>
            </div>

            <div className="overflow-hidden rounded-2xl border border-white/10 bg-black shadow-2xl">
              <div className="aspect-video">
                <iframe
                  src={`https://www.youtube.com/embed/${trailer.key}`}
                  title={`${title} Official Trailer`}
                  className="h-full w-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* SIMILAR MOVIES */}
      {similarMovies.length > 0 && (
        <section className="border-t border-white/10 bg-black">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:px-10">
            <div className="mb-8 flex items-end justify-between gap-4">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.25em] text-red-500">
                  Recommendations
                </p>

                <h2 className="mt-2 text-3xl font-black sm:text-4xl">
                  You Might Also Like
                </h2>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
              {similarMovies.map((similarMovie: any) => (
                <MovieCard
                  key={similarMovie.id}
                  movie={similarMovie}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
}