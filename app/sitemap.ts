import type { MetadataRoute } from "next";
import {
  getTrendingMovies,
  getPopularMovies,
  getTopRatedMovies,
} from "@/lib/tmdb";

const baseUrl = "https://cinemahunt10.vercel.app";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${baseUrl}/movies`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/popular`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  try {
    const [trending, popular, topRated] = await Promise.all([
      getTrendingMovies(),
      getPopularMovies(),
      getTopRatedMovies(),
    ]);

    const allMovies = [
      ...(trending?.results || []),
      ...(popular?.results || []),
      ...(topRated?.results || []),
    ];

    const uniqueMovies = Array.from(
      new Map(
        allMovies
          .filter((movie) => movie?.id)
          .map((movie) => [movie.id, movie])
      ).values()
    );

    const moviePages: MetadataRoute.Sitemap = uniqueMovies.map((movie) => ({
      url: `${baseUrl}/movie/${movie.id}`,
      lastModified: movie.release_date
        ? new Date(movie.release_date)
        : now,
      changeFrequency: "weekly",
      priority: 0.7,
    }));

    return [...staticPages, ...moviePages];
  } catch (error) {
    console.error("Failed to generate movie sitemap:", error);

    return staticPages;
  }
}