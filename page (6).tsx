export const dynamic = "force-dynamic";

import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MovieRow from "@/components/MovieRow";
import { getImageUrl, getMovieDetails, getPopularMovies } from "@/lib/tmdb";

function formatRuntime(minutes?: number | null) {
  if (!minutes) return "Not listed";
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return hours ? `${hours}h ${mins}m` : `${mins}m`;
}

function formatDate(date?: string) {
  if (!date) return "Release date not listed";
  return new Intl.DateTimeFormat("en", { month: "long", day: "numeric", year: "numeric" }).format(new Date(`${date}T00:00:00`));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  try {
    const movie = await getMovieDetails(Number(id));
    return { title: `${movie.title} | CinemaHunt`, description: `Explore ${movie.title}: rating, release date, runtime, genres, cast, movie information and official trailer on CinemaHunt.` };
  } catch {
    return { title: "Movie | CinemaHunt" };
  }
}

export default async function MoviePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const movieId = Number(id);
  if (!Number.isInteger(movieId)) notFound();

  let movie;
  try { movie = await getMovieDetails(movieId); } catch { notFound(); }
  if (!movie?.id) notFound();

  const popular = await getPopularMovies();
  const genreIds = new Set(movie.genres?.map((genre) => genre.id) || movie.genre_ids || []);
  const related = popular.results.filter((item) => item.id !== movie.id && (item.genre_ids || []).some((genreId) => genreIds.has(genreId))).slice(0, 8);
  const cast = movie.credits?.cast?.slice(0, 8) || [];
  const genres = movie.genres || [];
  const primaryGenre = genres[0]?.name || "movie";
  const rating = movie.vote_average || 0;

  return (
    <main className="min-h-screen bg-[#050505] text-white">
      <Navbar />
      <section className="relative overflow-hidden border-b border-white/10 bg-[#0a0a0a] pt-24">
        {getImageUrl(movie.backdrop_path, "original") && <img src={getImageUrl(movie.backdrop_path, "original")!} alt="" aria-hidden className="absolute inset-0 h-full w-full object-cover opacity-20" />}
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/30 via-[#050505]/80 to-[#050505]" />
        <div className="relative mx-auto grid max-w-7xl gap-8 px-6 py-10 md:grid-cols-[280px_1fr] md:py-14">
          <div>{getImageUrl(movie.poster_path, "w500") ? <img src={getImageUrl(movie.poster_path, "w500")!} alt={`${movie.title} poster`} className="mx-auto w-full max-w-[280px] rounded-2xl shadow-2xl shadow-black/50" /> : <div className="mx-auto flex aspect-[2/3] max-w-[280px] items-center justify-center rounded-2xl bg-[#111] text-gray-500">No image</div>}</div>
          <div className="flex flex-col justify-center">
            <p className="text-sm font-bold uppercase tracking-[0.3em] text-red-400">CinemaHunt Movie Guide</p>
            <h1 className="mt-3 text-4xl font-black tracking-tight md:text-6xl">{movie.title}</h1>
            {movie.tagline && <p className="mt-3 text-lg italic text-gray-400">“{movie.tagline}”</p>}
            <div className="mt-6 flex flex-wrap gap-2">{genres.map((genre) => <Link key={genre.id} href={`/genres/${genre.id}`} className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-gray-300 hover:border-red-500/40 hover:text-white">{genre.name}</Link>)}</div>
            <div className="mt-6 grid max-w-2xl grid-cols-2 gap-3 sm:grid-cols-4">
              <div className="rounded-xl border border-white/10 bg-black/30 p-3"><p className="text-xs text-gray-500">Rating</p><p className="mt-1 font-bold text-yellow-400">⭐ {rating ? rating.toFixed(1) : "N/A"}</p></div>
              <div className="rounded-xl border border-white/10 bg-black/30 p-3"><p className="text-xs text-gray-500">Release</p><p className="mt-1 font-semibold">{movie.release_date?.slice(0,4) || "TBA"}</p></div>
              <div className="rounded-xl border border-white/10 bg-black/30 p-3"><p className="text-xs text-gray-500">Runtime</p><p className="mt-1 font-semibold">{formatRuntime(movie.runtime)}</p></div>
              <div className="rounded-xl border border-white/10 bg-black/30 p-3"><p className="text-xs text-gray-500">Status</p><p className="mt-1 font-semibold">{movie.status || "Unknown"}</p></div>
            </div>
            <p className="mt-6 max-w-3xl leading-7 text-gray-300">{movie.overview || "A full overview for this title is not currently available."}</p>
            <div className="mt-7 flex flex-wrap gap-3"><Link href={`/movie/${movie.id}/watch`} className="rounded-xl bg-red-600 px-6 py-3 font-bold hover:bg-red-500">▶ View Official Trailer</Link><Link href="/search" className="rounded-xl border border-white/15 bg-white/5 px-6 py-3 font-bold hover:bg-white/10">Search another movie</Link></div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl space-y-12 px-6 py-12">
        <section className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
          <article className="rounded-2xl border border-white/10 bg-[#101010] p-7">
            <p className="text-sm font-bold uppercase tracking-[0.25em] text-red-400">Movie overview</p>
            <h2 className="mt-2 text-2xl font-bold">What to know about {movie.title}</h2>
            <p className="mt-4 leading-7 text-gray-300">{movie.title} is listed as a {primaryGenre.toLowerCase()} film{movie.release_date ? ` released on ${formatDate(movie.release_date)}` : ""}. This page brings together the key information a viewer usually wants before choosing a movie: genre, runtime, release status, audience rating, cast, and the official trailer.</p>
            <p className="mt-4 leading-7 text-gray-400">Use the rating as one signal rather than the only deciding factor. The best choice depends on your preferred genre, the movie's length, and whether its premise matches what you want to watch today.</p>
          </article>
          <aside className="rounded-2xl border border-white/10 bg-[#101010] p-7">
            <p className="text-sm font-bold uppercase tracking-[0.25em] text-red-400">At a glance</p>
            <dl className="mt-5 space-y-4 text-sm"><div className="flex justify-between gap-4 border-b border-white/10 pb-3"><dt className="text-gray-500">Release date</dt><dd className="text-right font-medium">{formatDate(movie.release_date)}</dd></div><div className="flex justify-between gap-4 border-b border-white/10 pb-3"><dt className="text-gray-500">Runtime</dt><dd className="font-medium">{formatRuntime(movie.runtime)}</dd></div><div className="flex justify-between gap-4 border-b border-white/10 pb-3"><dt className="text-gray-500">Genres</dt><dd className="text-right font-medium">{genres.map((g) => g.name).join(", ") || "Not listed"}</dd></div><div className="flex justify-between gap-4"><dt className="text-gray-500">Rating count</dt><dd className="font-medium">{movie.vote_count?.toLocaleString() || "Not listed"}</dd></div></dl>
          </aside>
        </section>

        <section className="rounded-2xl border border-white/10 bg-gradient-to-br from-red-950/20 to-[#101010] p-7">
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-red-400">CinemaHunt guide</p>
          <h2 className="mt-2 text-2xl font-bold">Why this title may fit your watchlist</h2>
          <p className="mt-4 max-w-4xl leading-7 text-gray-300">If you enjoy {genres.length ? genres.map((g) => g.name.toLowerCase()).join(" and ") : "movies in this style"}, {movie.title} is worth a closer look. Its current TMDB rating is {rating ? rating.toFixed(1) : "not available"}, while the runtime is {formatRuntime(movie.runtime).toLowerCase()}. Check the synopsis and official trailer above to decide whether its tone and story match what you are looking for.</p>
          <p className="mt-4 max-w-4xl text-sm leading-6 text-gray-500">Editorial note: CinemaHunt uses movie metadata to build this guide. Add your own firsthand review or commentary to this page when you have watched the movie; do not copy reviews or descriptions from other websites.</p>
        </section>

        <section>
          <div className="mb-5"><p className="text-sm font-bold uppercase tracking-[0.25em] text-red-400">People</p><h2 className="mt-2 text-2xl font-bold">Featured Cast</h2></div>
          {cast.length ? <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-8">{cast.map((person) => <div key={person.id} className="overflow-hidden rounded-2xl border border-white/10 bg-[#101010]">{getImageUrl(person.profile_path, "w342") ? <img src={getImageUrl(person.profile_path, "w342")!} alt={person.name} loading="lazy" className="aspect-[2/3] w-full object-cover" /> : <div className="flex aspect-[2/3] items-center justify-center bg-[#171717] text-xs text-gray-500">No photo</div>}<div className="p-3"><p className="line-clamp-1 text-sm font-semibold">{person.name}</p><p className="mt-1 line-clamp-2 text-xs text-gray-500">{person.character || "Cast"}</p></div></div>)}</div> : <p className="text-gray-500">Cast information is not currently available.</p>}
        </section>

        <MovieRow title="You may also like" movies={related} />
      </div>
      <Footer />
    </main>
  );
}
