export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;

  const movie = await getMovieDetails(Number(id));

  const title = movie.title || movie.name || "Movie";
  const description =
    movie.overview ||
    `Watch ${title} on CinemaHunt.`;

  return {
    title,
    description,

    alternates: {
      canonical: `https://cinemahunt10.vercel.app/movie/${id}`,
    },

    openGraph: {
      title: `${title} | CinemaHunt`,
      description,
      url: `https://cinemahunt10.vercel.app/movie/${id}`,
      siteName: "CinemaHunt",
      images: movie.backdrop_path
        ? [
            {
              url: `https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`,
              width: 1280,
              height: 720,
              alt: title,
            },
          ]
        : [],
      type: "video.movie",
    },

    twitter: {
      card: "summary_large_image",
      title: `${title} | CinemaHunt`,
      description,
      images: movie.backdrop_path
        ? [`https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`]
        : [],
    },
  };
}