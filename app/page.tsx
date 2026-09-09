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
    <section className="mb-12 md:mb-14">
      <div className="mb-5 flex items-end justify-between gap-3">
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
          className="shrink-0 rounded-md px-2 py-1 text-xs font-semibold text-red-400 transition hover:bg-red-500/10 hover:text-red-300 sm:text-sm"
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
        <div className="rounded-xl border border-white/10 bg-white/5 px-6 py-10 text-center">
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
        {/* FILTER HEADER */}
        <section className="relative border-b border-white/10 bg-gradient-to-b from-zinc-950 to-black px-4 pb-10 pt-28 sm:px-6">
          <div className="mx-auto max-w-7xl">
            <div className="mb-8">
              <p className="mb-2 text-xs font-bold uppercase tracking-[0.25em] text-red-500">
                CinemaHunt
              </p>

              <h1 className="text-3xl font-black sm:text-4xl md:text-5xl">
                Discover Movies
              </h1>

              <p className="mt-2 text-sm text-zinc-400 sm:text-base">
                Find movies using your favorite filters.
              </p>
            </div>

            <HomeFilters />
          </div>
        </section>

        {/* FILTERED RESULTS */}
        <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
          <div className="mb-7 flex items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold sm:text-3xl">
                Filtered Results
              </h2>

              <p className="mt-1 text-sm text-zinc-500">
                {filteredMovies.length} movies found
              </p>
            </div>

            <Link
              href="/"
              className="rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold transition hover:border-red-500/30 hover:bg-white/10"
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
            <div className="rounded-xl border border-white/10 bg-white/5 px-6 py-16 text-center">
              <div className="mb-4 text-4xl">🎬</div>

              <p className="text-lg font-semibold">
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

  const heroHasRating =
    hero?.vote_average !== null &&
    hero?.vote_average !== undefined &&
    Number(hero?.vote_average) > 0;

  return (
    <main className="min-h-screen overflow-x-hidden bg-black text-white">
      {/* HERO */}
      {hero ? (
        <section className="relative flex min-h-[70vh] items-end overflow-hidden sm:min-h-[75vh]">
          {/* TOP RIGHT ACTIONS */}
          <div className="absolute right-4 top-24 z-30 flex items-center gap-2 sm:right-6 sm:top-28 md:right-10">
            <Link
              href="/movies"
              className="group flex items-center gap-2 rounded-xl border border-white/15 bg-black/40 px-4 py-2.5 text-sm font-semibold text-white shadow-xl backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 hover:border-red-500/50 hover:bg-red-600/90"
            >
              <span className="text-base transition-transform duration-300 group-hover:scale-110">
                🎬
              </span>

              <span>Movies</span>
            </Link>

            <Link
              href="/watchlist"
              className="group flex items-center gap-2 rounded-xl border border-white/15 bg-black/40 px-4 py-2.5 text-sm font-semibold text-white shadow-xl backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 hover:border-red-500/50 hover:bg-red-600/90"
            >
              <span className="text-lg leading-none transition-transform duration-300 group-hover:scale-110">
                ♡
              </span>

              <span>Wishlist</span>
            </Link>
          </div>

          {/* HERO BACKGROUND */}
          <Image
            src={imageUrl(hero.backdrop_path, "original")}
            alt={hero.title || hero.name || "CinemaHunt"}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />

          {/* CINEMATIC OVERLAYS */}
          <div className="absolute inset-0 bg-black/55" />

          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/30 to-transparent" />

          {/* HERO CONTENT */}
          <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-16 pt-24 sm:px-6 sm:pb-20 md:pb-28">
            <div className="max-w-3xl">
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-red-500 sm:mb-4 sm:text-sm sm:tracking-[0.3em]">
                CinemaHunt
              </p>

              <h1 className="text-3xl font-black leading-tight sm:text-4xl md:text-6xl lg:text-7xl">
                {hero.title || hero.name}
              </h1>

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
                  <span className="font-semibold text-yellow-400">
                    ⭐ {Number(hero.vote_average).toFixed(1)}
                  </span>
                ) : (
                  <span className="rounded-md bg-gray-800 px-2 py-1 text-xs text-gray-400">
                    TBA
                  </span>
                )}

                {hero.original_language && (
                  <span className="uppercase text-zinc-400">
                    🌐 {hero.original_language}
                  </span>
                )}
              </div>

              <p className="mt-4 line-clamp-3 max-w-2xl text-sm leading-6 text-gray-300 sm:mt-6 sm:text-base sm:leading-7 md:text-lg">
                {hero.overview ||
                  "Discover movies and TV shows on CinemaHunt."}
              </p>

              <div className="mt-6 flex flex-wrap gap-3 sm:mt-8 sm:gap-4">
                <Link
                  href={`/movie/${hero.id}`}
                  className="rounded-lg bg-red-600 px-5 py-2.5 text-sm font-bold transition-all duration-200 hover:bg-red-700 hover:shadow-lg hover:shadow-red-600/20 sm:px-7 sm:py-3 sm:text-base"
                >
                  View Details
                </Link>

                <Link
                  href="/movies"
                  className="rounded-lg border border-white/10 bg-white/10 px-5 py-2.5 text-sm font-bold backdrop-blur transition-all duration-200 hover:border-white/20 hover:bg-white/20 sm:px-7 sm:py-3 sm:text-base"
                >
                  Browse Movies
                </Link>
              </div>
            </div>
          </div>
        </section>
      ) : (
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
              className="mt-6 inline-block rounded-lg bg-red-600 px-6 py-3 text-sm font-semibold transition hover:bg-red-700 sm:text-base"
            >
              Browse Movies
            </Link>
          </div>
        </section>
      )}

      {/* HOMEPAGE FILTERS */}
      <section className="mx-auto max-w-7xl px-4 pt-10 sm:px-6">
        <HomeFilters />
      </section>

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