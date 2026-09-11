import Image from "next/image";
import Link from "next/link";

import HomeFilters from "@/components/HomeFilters";
import MovieCard from "@/components/MovieCard";

import {
  getTrendingMovies,
  getPopularMovies,
  getTopRatedMovies,
  getNowPlayingMovies,
  getUpcomingMovies,
  discoverMovies,
} from "@/lib/tmdb";

type Movie = {
  id: number;
  title?: string;
  name?: string;
  overview?: string | null;
  poster_path?: string | null;
  backdrop_path?: string | null;
  vote_average?: number | null;
  rating?: number | null;
  release_date?: string | null;
  first_air_date?: string | null;
  original_language?: string | null;
  media_type?: string;
};

type SearchParams = {
  genre?: string;
  year?: string;
  language?: string;
  sortBy?: string;
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
    <section className="mb-14 md:mb-16">
      <div className="mb-6 flex items-end justify-between gap-4">
        <div className="min-w-0">
          <h2 className="text-xl font-black tracking-tight text-white sm:text-2xl md:text-3xl">
            {title}
          </h2>

          <p className="mt-1.5 text-xs leading-5 text-zinc-500 sm:text-sm">
            {description}
          </p>
        </div>

        <Link
          href="/movies"
          className="shrink-0 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 text-xs font-bold text-zinc-400 transition-all duration-300 hover:border-red-500/30 hover:bg-red-500/10 hover:text-red-400 sm:px-4 sm:text-sm"
        >
          View All →
        </Link>
      </div>

      {movies.length > 0 ? (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {movies.slice(0, 12).map((movie) => (
            <MovieCard
              key={`${title}-${movie.id}`}
              movie={movie}
            />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-6 py-12 text-center">
          <p className="text-sm text-zinc-500">
            No movies available.
          </p>
        </div>
      )}
    </section>
  );
}

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const filters = await searchParams;

  const hasFilters =
    Boolean(filters.genre) ||
    Boolean(filters.year) ||
    Boolean(filters.language) ||
    Boolean(filters.sortBy);

  /*
   * FILTERED HOMEPAGE
   */
  if (hasFilters) {
    const filteredData = await discoverMovies({
      genre: filters.genre,
      year: filters.year,
      language: filters.language,
      sortBy: filters.sortBy || "popularity.desc",
    });

    const filteredMovies = safeMovies(filteredData);

    return (
      <main className="min-h-screen overflow-x-hidden bg-black text-white">
        <section className="relative border-b border-white/10 bg-gradient-to-b from-zinc-950 via-black to-black px-4 pb-12 pt-28 sm:px-6">
          <div className="mx-auto max-w-7xl">
            <div className="mb-8">
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-red-500/20 bg-red-500/10 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.25em] text-red-400">
                <span className="h-1.5 w-1.5 rounded-full bg-red-500 shadow-lg shadow-red-500/50" />
                CinemaHunt
              </div>

              <h1 className="text-3xl font-black tracking-tight sm:text-4xl md:text-5xl">
                Discover Movies
              </h1>

              <p className="mt-2 max-w-xl text-sm leading-6 text-zinc-400 sm:text-base">
                Find your next favorite movie using powerful filters.
              </p>
            </div>

            <HomeFilters />
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 md:py-14">
          <div className="mb-8 flex items-center justify-between gap-4">
            <div>
              <p className="mb-1 text-[10px] font-black uppercase tracking-[0.25em] text-red-500">
                Your selection
              </p>

              <h2 className="text-2xl font-black sm:text-3xl">
                Filtered Results
              </h2>

              <p className="mt-1 text-sm text-zinc-500">
                {filteredMovies.length} movies found
              </p>
            </div>

            <Link
              href="/"
              className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm font-bold transition-all duration-300 hover:border-red-500/30 hover:bg-red-500/10 hover:text-red-400"
            >
              Reset
            </Link>
          </div>

          {filteredMovies.length > 0 ? (
            <MovieRow
              title="🎬 Movies For You"
              description="Based on your selected filters"
              movies={filteredMovies}
            />
          ) : (
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-6 py-20 text-center">
              <div className="mb-4 text-5xl">🎬</div>

              <p className="text-lg font-bold">
                No movies found
              </p>

              <p className="mt-2 text-sm text-zinc-500">
                Try changing your filters.
              </p>
            </div>
          )}
        </section>
      </main>
    );
  }

  /*
   * NORMAL HOMEPAGE
   */
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

  const heroTitle =
    hero?.title ||
    hero?.name ||
    "Discover Your Next Favorite";

  const heroReleaseDate =
    hero?.release_date ||
    hero?.first_air_date ||
    "";

  const heroHasRating =
    hero?.vote_average !== null &&
    hero?.vote_average !== undefined &&
    Number(hero.vote_average) > 0;

  return (
    <main className="min-h-screen overflow-x-hidden bg-black text-white">
      {/* HERO */}
      {hero ? (
        <section className="group relative min-h-[720px] overflow-hidden sm:min-h-[760px] lg:min-h-[820px]">
          {/* BACKGROUND */}
          <Image
            src={imageUrl(hero.backdrop_path, "original")}
            alt={heroTitle}
            fill
            priority
            sizes="100vw"
            className="scale-105 object-cover object-center transition-transform duration-[12000ms] ease-out group-hover:scale-110"
          />

          {/* CINEMATIC GRADIENTS */}
          <div className="absolute inset-0 bg-black/45" />

          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/75 to-black/20" />

          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/25 to-transparent" />

          <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-black to-transparent" />

          {/* TOP RIGHT ACTIONS */}
          <div className="absolute right-4 top-24 z-20 flex items-center gap-2 sm:right-6 sm:top-28 md:right-10">
            <Link
              href="/movies"
              className="group/action flex items-center gap-2 rounded-xl border border-white/15 bg-black/40 px-3 py-2.5 text-xs font-bold text-white shadow-2xl backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 hover:border-red-500/50 hover:bg-red-600 sm:px-4 sm:text-sm"
            >
              <span className="transition-transform duration-300 group-hover/action:scale-110">
                🎬
              </span>

              <span className="hidden sm:inline">
                Movies
              </span>
            </Link>

            <Link
              href="/watchlist"
              className="group/action flex items-center gap-2 rounded-xl border border-white/15 bg-black/40 px-3 py-2.5 text-xs font-bold text-white shadow-2xl backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 hover:border-red-500/50 hover:bg-red-600 sm:px-4 sm:text-sm"
            >
              <span className="text-base leading-none transition-transform duration-300 group-hover/action:scale-110">
                ♡
              </span>

              <span className="hidden sm:inline">
                Wishlist
              </span>
            </Link>
          </div>

          {/* HERO CONTENT */}
          <div className="relative z-10 mx-auto flex min-h-[720px] max-w-7xl items-end px-4 pb-20 pt-32 sm:min-h-[760px] sm:px-6 sm:pb-24 lg:min-h-[820px] lg:pb-28">
            <div className="max-w-4xl">
              {/* BRAND */}
              <p className="mb-3 text-sm font-black tracking-tight text-white sm:text-base">
                CinemaHunt
              </p>

              {/* BADGE */}
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-red-500/25 bg-red-500/10 px-3.5 py-1.5 text-[10px] font-black uppercase tracking-[0.25em] text-red-400 backdrop-blur-md sm:text-xs">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-red-500 shadow-lg shadow-red-500/60" />
                Trending Now
              </div>

              {/* TITLE */}
              <h1 className="max-w-4xl text-4xl font-black leading-[0.98] tracking-[-0.03em] text-white drop-shadow-2xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl">
                {heroTitle}
              </h1>

              {/* META */}
              <div className="mt-5 flex flex-wrap items-center gap-3 text-xs sm:mt-6 sm:gap-4 sm:text-sm">
                {heroReleaseDate && (
                  <span className="font-semibold text-zinc-300">
                    {heroReleaseDate.slice(0, 4)}
                  </span>
                )}

                {heroHasRating && (
                  <span className="font-bold text-yellow-400">
                    ⭐ {Number(hero.vote_average).toFixed(1)}
                  </span>
                )}

                {hero.original_language && (
                  <span className="rounded-md border border-white/10 bg-white/[0.06] px-2 py-1 uppercase text-zinc-400 backdrop-blur-md">
                    {hero.original_language}
                  </span>
                )}

                <span className="rounded-md border border-white/10 bg-white/[0.06] px-2 py-1 text-zinc-400 backdrop-blur-md">
                  HD
                </span>
              </div>

              {/* OVERVIEW */}
              <p className="mt-5 line-clamp-3 max-w-2xl text-sm leading-6 text-zinc-300 drop-shadow-lg sm:mt-6 sm:text-base sm:leading-7 md:text-lg md:leading-8">
                {hero.overview ||
                  "Discover movies, ratings, trailers and more on CinemaHunt."}
              </p>

              {/* BUTTONS */}
              <div className="mt-7 flex flex-wrap gap-3 sm:mt-9 sm:gap-4">
                <Link
                  href={`/movie/${hero.id}`}
                  className="group/button flex items-center gap-2 rounded-xl bg-red-600 px-5 py-3 text-sm font-black text-white shadow-xl shadow-red-950/50 transition-all duration-300 hover:-translate-y-0.5 hover:bg-red-500 hover:shadow-red-600/30 sm:px-7 sm:py-3.5 sm:text-base"
                >
                  <span className="text-base transition-transform duration-300 group-hover/button:scale-110">
                    ▶
                  </span>

                  View Details
                </Link>

                <Link
                  href="/movies"
                  className="flex items-center gap-2 rounded-xl border border-white/15 bg-white/10 px-5 py-3 text-sm font-bold text-white backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 hover:border-white/25 hover:bg-white/20 sm:px-7 sm:py-3.5 sm:text-base"
                >
                  Browse Movies
                  <span>→</span>
                </Link>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <section className="flex min-h-[70vh] items-center justify-center bg-gradient-to-b from-zinc-950 to-black px-4">
          <div className="text-center">
            <div className="mb-5 text-5xl">🎬</div>

            <h1 className="text-3xl font-black sm:text-4xl">
              Welcome to CinemaHunt
            </h1>

            <p className="mt-4 text-sm text-zinc-400 sm:text-base">
              Discover your next favorite movie.
            </p>

            <Link
              href="/movies"
              className="mt-7 inline-flex rounded-xl bg-red-600 px-6 py-3 font-bold transition hover:bg-red-500"
            >
              Browse Movies
            </Link>
          </div>
        </section>
      )}

      {/* FILTERS */}
      <section className="relative z-20 mx-auto -mt-6 max-w-7xl px-4 sm:px-6">
        <div className="rounded-2xl border border-white/10 bg-zinc-950/90 p-1 shadow-2xl shadow-black/50 backdrop-blur-2xl">
          <HomeFilters />
        </div>
      </section>

      {/* MOVIE SECTIONS */}
      <div className="mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 sm:py-16">
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