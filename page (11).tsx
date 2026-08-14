export const dynamic = "force-dynamic";

import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import MovieRow from "@/components/MovieRow";
import Footer from "@/components/Footer";
import Link from "next/link";
import { getNowPlayingMovies, getPopularMovies, getTopRatedMovies, getTrendingMovies, getUpcomingMovies } from "@/lib/tmdb";

export default async function HomePage() {
  const [trending, popular, topRated, nowPlaying, upcoming] = await Promise.all([
    getTrendingMovies(), getPopularMovies(), getTopRatedMovies(), getNowPlayingMovies(), getUpcomingMovies(),
  ]);
  const featured = trending.results?.[0];

  return (
    <main className="min-h-screen bg-[#050505] text-white">
      <Navbar />
      {featured && <HeroSection movie={featured} />}
      <div className="mx-auto max-w-7xl space-y-14 px-6 pb-20 pt-12">
        <section className="grid gap-4 md:grid-cols-3">
          {[
            ["Discover", "Explore movies by popularity, rating, genre, and release date.", "/movies"],
            ["Compare", "Open a movie guide to see key details, cast, ratings, and trailers.", "/top-rated"],
            ["Choose", "Use official trailers and our movie information to decide what to watch next.", "/search"],
          ].map(([title, text, href]) => <Link key={title} href={href} className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition hover:border-white/20 hover:bg-white/[0.05]"><p className="text-lg font-bold text-white">{title}</p><p className="mt-2 text-sm leading-6 text-gray-400">{text}</p></Link>)}
        </section>

        <MovieRow title="🔥 Trending Movies" movies={trending.results} href="/movies" />
        <MovieRow title="⭐ Popular Movies" movies={popular.results} href="/popular" />
        <MovieRow title="🏆 Top Rated" movies={topRated.results} href="/top-rated" />
        <MovieRow title="🎬 Now Playing" movies={nowPlaying.results} href="/movies" />
        <MovieRow title="🚀 Coming Soon" movies={upcoming.results} href="/upcoming" />

        <section className="rounded-3xl border border-white/10 bg-gradient-to-br from-red-950/30 via-[#101010] to-[#101010] p-7 md:p-10">
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-red-400">The CinemaHunt approach</p>
          <h2 className="mt-3 max-w-3xl text-3xl font-black md:text-4xl">A simpler way to decide what movie to watch next.</h2>
          <p className="mt-4 max-w-3xl leading-7 text-gray-400">CinemaHunt brings together movie discovery tools, ratings, release information, cast details, and official trailers in one place. Browse what is trending, compare highly rated titles, or search for a specific movie before you press play somewhere you trust.</p>
        </section>
      </div>
      <Footer />
    </main>
  );
}
