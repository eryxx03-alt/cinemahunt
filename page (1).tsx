export const dynamic = "force-dynamic";

import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MovieGrid from "@/components/MovieGrid";
import { getGenres, getMoviesByGenre } from "@/lib/tmdb";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const genres = await getGenres();
  const genre = genres.genres.find((item) => item.id === Number(id));
  return { title: genre ? `${genre.name} Movies | CinemaHunt` : "Genre | CinemaHunt", description: genre ? `Explore ${genre.name} movies on CinemaHunt.` : "Explore movies by genre on CinemaHunt." };
}

export default async function GenrePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const genreId = Number(id);
  if (!Number.isInteger(genreId)) notFound();
  const [genres, movies] = await Promise.all([getGenres(), getMoviesByGenre(genreId)]);
  const genre = genres.genres.find((item) => item.id === genreId);
  if (!genre) notFound();
  return <main className="min-h-screen bg-[#050505] text-white"><Navbar /><div className="mx-auto max-w-7xl px-6 pb-20 pt-28"><p className="mb-2 text-sm uppercase tracking-[0.3em] text-red-400">Genre</p><h1 className="text-4xl font-black">{genre.name} Movies</h1><p className="mt-3 mb-10 max-w-2xl leading-7 text-gray-400">Discover popular {genre.name.toLowerCase()} movies and open any title for its full movie guide.</p><MovieGrid movies={movies.results} /></div><Footer /></main>;
}
