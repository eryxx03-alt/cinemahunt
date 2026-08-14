import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = { title: "About CinemaHunt", description: "Learn what CinemaHunt is and how the movie discovery website works." };

export default function AboutPage() {
  return <main className="min-h-screen bg-[#050505] text-white"><Navbar /><div className="mx-auto max-w-4xl px-6 pb-20 pt-28"><p className="mb-3 text-sm uppercase tracking-[0.3em] text-red-400">CinemaHunt</p><h1 className="text-4xl font-black">About CinemaHunt</h1><div className="mt-8 space-y-7 leading-7 text-gray-300"><p>CinemaHunt is a movie discovery website built to make choosing your next film easier. Instead of searching across several pages, visitors can browse popular, trending, top-rated, now-playing, and upcoming movies in one place.</p><p>Movie pages bring together practical information such as ratings, release dates, genres, runtime, cast, and official trailers. The goal is to help visitors make an informed choice about what to explore next.</p><p>CinemaHunt uses The Movie Database (TMDB) for movie data and imagery. The site is an independent project and is not endorsed or certified by TMDB.</p><p>Editorial sections on CinemaHunt are intended for original commentary and useful movie guides. We do not intentionally host or distribute unauthorized full movies, downloads, or copyrighted material.</p><p>If you spot an issue, have a suggestion, or have a copyright concern, please use our <a className="text-red-400 hover:text-red-300" href="/contact">Contact page</a>.</p></div></div><Footer /></main>;
}
