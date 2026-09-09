import Image from "next/image";
import Link from "next/link";
import WatchlistButton from "@/components/WatchlistButton";
import {
  getTrendingMovies,
  getPopularMovies,
  getTopRatedMovies,
  getNowPlayingMovies,
  getUpcomingMovies,
} from "@/lib/tmdb";

type Movie = {
  id: number;
  title?: string;
  name?: string;
  poster_path?: string | null;
  backdrop_path?: string | null;
  overview?: string;
  vote_average?: number | null;
  release_date?: string;
  first_air_date?: string;
};

function safeMovies(data: any): Movie[] {
  if (Array.isArray(data?.results)) {
    return data.results;
  }

  if (Array.isArray(data)) {
    return data;
  }

  return [];
}

function imageUrl(
  path: string | null | undefined,
  size = "w500"
): string {
  if (!path) {
    return "/logo.png";
  }

  return `https://image.tmdb.org/t/p/${size}${path}`;
}

function MovieRow({
  title,
  description,
  movies,
}: {
  title: string;
  description: string;
  movies: Movie[];
}) {
  return (
    <section className="mb-12 md:mb-14">
      {/* Section Header */}
      <div className="mb-4 flex items-end justify-between gap-3 md:mb-5">
        <div className="min-w-0">
          <h2 className="text-xl font-bold text-white sm:text-2xl md:text-3xl">
            {title}
          </h2>

          <p className="mt-1 text-xs text-zinc-500 sm:text-sm">
            {description}
          </p>
        </div>

        <Link
          href="/movies"
          className="shrink-0 text-xs text-red-400 transition hover:text-red-300 sm:text-sm"
        >
          View All
        </Link>
      </div>

      {movies.length > 0 ? (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:grid-cols-4 lg:grid-cols-6">
          {movies.slice(0, 12).map((movie) => {
            const movieTitle =
              movie.title || movie.name || "Untitled";

            const hasRating =
              movie.vote_average !== null &&
              movie.vote_average !== undefined &&
              Number(movie.vote_average) > 0;

            const releaseDate =
              movie.release_date ||
              movie.first_air_date;

            const year = releaseDate
              ? releaseDate.slice(0, 4)
              : null;

            return (
              <Link
                key={`${title}-${movie.id}`}
                href={`/movie/${movie.id}`}
                className="group flex h-full min-w-0 flex-col overflow-hidden rounded-lg bg-zinc-900 transition duration-300 hover:-translate-y-1 hover:bg-zinc-800 sm:rounded-xl"
              >
                {/* Poster */}
                <div className="relative aspect-[2/3] w-full shrink-0 overflow-hidden bg-zinc-800">
                  {/* Watchlist */}
                  <WatchlistButton movie={movie} />

                  <Image
                    src={imageUrl(movie.poster_path)}
                    alt={`${movieTitle} poster`}
                    fill
                    loading="lazy"
                    quality={80}
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 16vw"
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

                  {/* Rating / TBA */}
                  <div className="absolute right-1.5 top-1.5 sm:right-2 sm:top-2">
                    {hasRating ? (
                      <span className="rounded-md bg-black/75 px-1.5 py-1 text-[10px] font-semibold text-white backdrop-blur-sm sm:px-2 sm:text-xs">
                        ⭐ {Number(movie.vote_average).toFixed(1)}
                      </span>
                    ) : (
                      <span className="rounded-md bg-gray-800 px-1.5 py-1 text-[10px] font-semibold text-gray-400 sm:px-2 sm:text-xs">
                        TBA
                      </span>
                    )}
                  </div>
                </div>

                {/* Movie Information */}
                <div className="flex min-h-[120px] flex-1 flex-col p-2 sm:min-h-[140px] sm:p-3">
                  {/* Title */}
                  <h3 className="line-clamp-2 min-h-[2.5rem] text-sm font-semibold leading-5 text-white transition-colors group-hover:text-red-400 sm:min-h-[3rem] sm:text-base sm:leading-6">
                    {movieTitle}
                  </h3>

                  {/* Description */}
                  <p className="mt-1 line-clamp-2 text-[11px] leading-4 text-zinc-400 sm:text-xs sm:leading-5">
                    {movie.overview ||
                      "No description available."}
                  </p>

                  {/* Year */}
                  <div className="mt-auto pt-2">
                    <p className="text-[11px] text-zinc-500 sm:text-xs">
                      {year || "—"}
                    </p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      ) : (
        <p className="text-sm text-gray-500">
          No movies available.
        </p>
      )}
    </section>
  );
}

export default async function HomePage() {
  const [
    trendingData,
    popularData,
    topRatedData,
    nowPlayingData,
    upcomingData,
  ] = await Promise.all([
    getTrendingMovies(),
    getPopularMovies(),
    getTopRatedMovies(),
    getNowPlayingMovies(),
    getUpcomingMovies(),
  ]);

  const trending = safeMovies(trendingData);
  const popular = safeMovies(popularData);
  const topRated = safeMovies(topRatedData);
  const nowPlaying = safeMovies(nowPlayingData);
  const upcoming = safeMovies(upcomingData);

  const hero = trending[0];

  const heroHasRating =
    hero?.vote_average !== null &&
    hero?.vote_average !== undefined &&
    Number(hero?.vote_average) > 0;

  return (
    <main className="min-h-screen overflow-x-hidden bg-black text-white">

      {/* HERO */}
      {hero ? (
        <section className="relative flex min-h-[70vh] items-end overflow-hidden sm:min-h-[75vh]">

          <Image
            src={imageUrl(hero.backdrop_path, "original")}
            alt={hero.title || hero.name || "CinemaHunt"}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />

          <div className="absolute inset-0 bg-black/55" />

          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/30 to-transparent" />

          <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-16 pt-24 sm:px-6 sm:pb-20 md:pb-28">

            <div className="max-w-3xl">

              {/* Branding */}
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-red-500 sm:mb-4 sm:text-sm sm:tracking-[0.3em]">
                CinemaHunt
              </p>

              {/* Hero Title */}
              <h1 className="text-3xl font-black leading-tight sm:text-4xl md:text-6xl lg:text-7xl">
                {hero.title || hero.name}
              </h1>

              {/* Hero Meta */}
              <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-gray-300 sm:mt-4 sm:gap-4 sm:text-sm">

                {(hero.release_date ||
                  hero.first_air_date) && (
                  <span>
                    {(
                      hero.release_date ||
                      hero.first_air_date ||
                      ""
                    ).slice(0, 4)}
                  </span>
                )}

                {heroHasRating ? (
                  <span className="text-yellow-400">
                    ⭐{" "}
                    {Number(hero.vote_average).toFixed(1)}
                  </span>
                ) : (
                  <span className="rounded-md bg-gray-800 px-2 py-1 text-xs text-gray-400">
                    TBA
                  </span>
                )}

              </div>

              {/* Hero Description */}
              <p className="mt-4 line-clamp-3 max-w-2xl text-sm leading-6 text-gray-300 sm:mt-6 sm:text-base sm:leading-7 md:text-lg">
                {hero.overview ||
                  "Discover movies and TV shows on CinemaHunt."}
              </p>

              {/* Hero Buttons */}
              <div className="mt-6 flex flex-wrap gap-3 sm:mt-8 sm:gap-4">

                <Link
                  href={`/movie/${hero.id}`}
                  className="rounded-lg bg-red-600 px-5 py-2.5 text-sm font-bold transition hover:bg-red-700 sm:px-7 sm:py-3 sm:text-base"
                >
                  View Details
                </Link>

                <Link
                  href="/movies"
                  className="rounded-lg bg-white/10 px-5 py-2.5 text-sm font-bold backdrop-blur transition hover:bg-white/20 sm:px-7 sm:py-3 sm:text-base"
                >
                  Browse Movies
                </Link>

              </div>

            </div>
          </div>
        </section>
      ) : (
        /* Fallback Hero */
        <section className="flex min-h-[60vh] items-center justify-center px-4">
          <div className="text-center">

            <h1 className="text-3xl font-bold sm:text-4xl">
              Welcome to CinemaHunt
            </h1>

            <p className="mt-4 text-sm text-gray-400 sm:text-base">
              Discover your next movie.
            </p>

            <Link
              href="/movies"
              className="mt-6 inline-block rounded-lg bg-red-600 px-6 py-3 text-sm font-semibold hover:bg-red-700 sm:text-base"
            >
              Browse Movies
            </Link>

          </div>
        </section>
      )}

      {/* MOVIE SECTIONS */}
      <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 sm:py-12">

        <MovieRow
          title="🔥 Trending Now"
          description="What people are watching and talking about right now"
          movies={trending}
        />

        <MovieRow
          title="🔥 Popular Movies"
          description="The most popular movies on CinemaHunt"
          movies={popular}
        />

        <MovieRow
          title="⭐ Top Rated"
          description="Movies with the highest ratings"
          movies={topRated}
        />

        <MovieRow
          title="🎬 Now Playing"
          description="Movies currently playing in theaters"
          movies={nowPlaying}
        />

        <MovieRow
          title="🆕 Coming Soon"
          description="Upcoming movies you can look forward to"
          movies={upcoming}
        />

      </div>
    </main>
  );
}