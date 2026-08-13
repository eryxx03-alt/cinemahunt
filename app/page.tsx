import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import MovieRow from "@/components/MovieRow";
import {
  getTrendingMovies,
  getPopularMovies,
  getHorrorMovies,
  getHindiMovies,
  getEnglishMovies,
} from "@/lib/tmdb";

export default async function Home() {
  const [trending, popular, horror, hindi, english] =
    await Promise.all([
      getTrendingMovies(),
      getPopularMovies(),
      getHorrorMovies(),
      getHindiMovies(),
      getEnglishMovies(),
    ]);

  const featuredMovie = trending.results?.[0];

  return (
    <main className="min-h-screen bg-[#050505] text-white">
      <Navbar />

      {featuredMovie && <HeroSection movie={featuredMovie} />}

      <div className="relative z-10 mx-auto max-w-7xl space-y-14 px-6 pb-20 pt-12">

        <MovieRow
          title="🔥 Trending This Week"
          movies={trending.results || []}
        />

        <MovieRow
          title="⭐ Popular Right Now"
          movies={popular.results || []}
        />

        <MovieRow
          title="👻 Horror Nights"
          movies={horror.results || []}
        />

        <MovieRow
          title="🇮🇳 Bollywood & Hindi"
          movies={hindi.results || []}
        />

        <MovieRow
          title="🇺🇸 Hollywood"
          movies={english.results || []}
        />

      </div>
    </main>
  );
}