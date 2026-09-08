import type { Metadata } from "next";
import Image from "next/image";
import { getMovieDetails } from "@/lib/tmdb";

const baseUrl = "https://cinemahunt10.vercel.app";

type Props = {
  params: Promise<{ id: string }>;
};

// Dynamic SEO + Open Graph metadata
export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { id } = await params;

  const movie = await getMovieDetails(Number(id));

  const title = movie.title || movie.name || "Movie";
  const description =
    movie.overview ||
    `Watch and discover ${title} on CinemaHunt.`;

  const poster = movie.poster_path
    ? `https://image.tmdb.org/t/p/w1280${movie.poster_path}`
    : `${baseUrl}/logo.png`;

  const movieUrl = `${baseUrl}/movie/${id}`;

  return {
    title: `${title} | CinemaHunt`,
    description,

    alternates: {
      canonical: movieUrl,
    },

    openGraph: {
      title: `${title} | CinemaHunt`,
      description,
      url: movieUrl,
      siteName: "CinemaHunt",
      type: "video.movie",
      images: [
        {
          url: poster,
          width: 1280,
          height: 720,
          alt: title,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: `${title} | CinemaHunt`,
      description,
      images: [poster],
    },
  };
}

export default async function MoviePage({ params }: Props) {
  const { id } = await params;

  const movie = await getMovieDetails(Number(id));

  const title = movie.title || movie.name || "Movie";

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="mx-auto max-w-7xl px-6 py-24">
        <div className="grid gap-8 md:grid-cols-[300px_1fr]">
          {/* Poster */}
          {movie.poster_path && (
            <div className="relative aspect-[2/3] overflow-hidden rounded-xl">
              <Image
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={title}
                fill
                className="object-cover"
              />
            </div>
          )}

          {/* Movie Info */}
          <div>
            <h1 className="text-4xl font-bold">
              {title}
            </h1>

            {movie.overview && (
              <p className="mt-5 max-w-3xl text-zinc-400">
                {movie.overview}
              </p>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}