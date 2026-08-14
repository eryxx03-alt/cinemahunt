import Navbar from "@/components/Navbar";
import MovieRow from "@/components/MovieRow";
import HeroSection from "@/components/HeroSection";
import Footer from "@/components/Footer";

import {
  getPopularMovies,
  getNowPlayingMovies,
  getUpcomingMovies,
} from "@/lib/tmdb";

export default async function HomePage() {
  const [popular, nowPlaying, upcoming] = await Promise.all([
    getPopularMovies(),
    getNowPlayingMovies(),
    getUpcomingMovies(),
  ]);

  const popularMovies = popular?.results || [];
  const nowPlayingMovies = nowPlaying?.results || [];
  const upcomingMovies = upcoming?.results || [];

  const heroMovie = popularMovies[0];

  return (
    <main className="min-h-screen bg-[#050505] text-white">
      <Navbar />

      {heroMovie && <HeroSection movie={heroMovie} />}

      <div className="mx-auto max-w-7xl space-y-12 px-6 py-12">
        {popularMovies.length > 0 && (
          <MovieRow
            title="Popular Movies 🔥"
            movies={popularMovies}
          />
        )}

        {nowPlayingMovies.length > 0 && (
          <MovieRow
            title="Now Playing 🎬"
            movies={nowPlayingMovies}
          />
        )}

        {upcomingMovies.length > 0 && (
          <MovieRow
            title="Upcoming Movies 🚀"
            movies={upcomingMovies}
          />
        )}
      </div>

      <Footer />
    </main>
  );
}