import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import MovieRow from "@/components/MovieRow";
import Footer from "@/components/Footer";

import {
  getTrendingMovies,
  getPopularMovies,
  getNowPlayingMovies,
  getUpcomingMovies,
} from "@/lib/tmdb";

export default async function HomePage() {
  const [trending, popular, nowPlaying, upcoming] =
    await Promise.all([
      getTrendingMovies(),
      getPopularMovies(),
      getNowPlayingMovies(),
      getUpcomingMovies(),
    ]);

  const trendingMovies = trending?.results || [];
  const popularMovies = popular?.results || [];
  const nowPlayingMovies = nowPlaying?.results || [];
  const upcomingMovies = upcoming?.results || [];

  return (
    <main className="min-h-screen bg-[#050505] text-white">
      <Navbar />

      {trendingMovies.length > 0 && (
        <HeroSection movie={trendingMovies[0]} />
      )}

      <div className="mx-auto max-w-7xl space-y-12 px-6 pb-20 pt-10">
        {trendingMovies.length > 0 && (
          <MovieRow
            title="🔥 Trending Movies"
            movies={trendingMovies}
          />
        )}

        {popularMovies.length > 0 && (
          <MovieRow
            title="⭐ Popular Movies"
            movies={popularMovies}
          />
        )}

        {nowPlayingMovies.length > 0 && (
          <MovieRow
            title="🎬 Now Playing"
            movies={nowPlayingMovies}
          />
        )}

        {upcomingMovies.length > 0 && (
          <MovieRow
            title="🚀 Upcoming Movies"
            movies={upcomingMovies}
          />
        )}
      </div>

      <Footer />
    </main>
  );
}