import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import MovieRow from "@/components/MovieRow";
import Footer from "@/components/Footer";

import {
  getTrendingMovies,
  getPopularMovies,
  getTopRatedMovies,
  getNowPlayingMovies,
  getUpcomingMovies,
  getActionMovies,
  getCrimeMovies,
  getThrillerMovies,
  getHorrorMovies,
  getHindiMovies,
  getEnglishMovies,
} from "@/lib/tmdb";

export default async function HomePage() {
  const [
    trending,
    popular,
    topRated,
    nowPlaying,
    upcoming,
    action,
    crime,
    thriller,
    horror,
    hindi,
    english,
  ] = await Promise.all([
    getTrendingMovies(),
    getPopularMovies(),
    getTopRatedMovies(),
    getNowPlayingMovies(),
    getUpcomingMovies(),
    getActionMovies(),
    getCrimeMovies(),
    getThrillerMovies(),
    getHorrorMovies(),
    getHindiMovies(),
    getEnglishMovies(),
  ]);

  const trendingMovies = trending?.results || [];
  const popularMovies = popular?.results || [];
  const topRatedMovies = topRated?.results || [];
  const nowPlayingMovies = nowPlaying?.results || [];
  const upcomingMovies = upcoming?.results || [];
  const actionMovies = action?.results || [];
  const crimeMovies = crime?.results || [];
  const thrillerMovies = thriller?.results || [];
  const horrorMovies = horror?.results || [];
  const hindiMovies = hindi?.results || [];
  const englishMovies = english?.results || [];

  return (
    <main className="min-h-screen bg-[#050505] text-white">
      <Navbar />

      {trendingMovies.length > 0 && (
        <HeroSection movie={trendingMovies[0]} />
      )}

      <div className="mx-auto max-w-7xl space-y-12 px-6 pb-20 pt-10">

        <MovieRow
          title="🔥 Trending Movies"
          movies={trendingMovies}
        />

        <MovieRow
          title="⭐ Popular Movies"
          movies={popularMovies}
        />

        <MovieRow
          title="🏆 Top Rated Movies"
          movies={topRatedMovies}
        />

        <MovieRow
          title="🎬 Now Playing"
          movies={nowPlayingMovies}
        />

        <MovieRow
          title="🚀 Upcoming Movies"
          movies={upcomingMovies}
        />

        <MovieRow
          title="💥 Action Movies"
          movies={actionMovies}
        />

        <MovieRow
          title="🕵️ Crime Movies"
          movies={crimeMovies}
        />

        <MovieRow
          title="😱 Thriller Movies"
          movies={thrillerMovies}
        />

        <MovieRow
          title="👻 Horror Movies"
          movies={horrorMovies}
        />

        <MovieRow
          title="🇮🇳 Hindi Movies"
          movies={hindiMovies}
        />

        <MovieRow
          title="🌎 English Movies"
          movies={englishMovies}
        />

      </div>

      <Footer />
    </main>
  );
}