import type { MetadataRoute } from "next";
import {
  getTrendingMovies,
  getPopularMovies,
  getTopRatedMovies,
} from "@/lib/tmdb";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://cinemahunt10.vercel.app";
  const now = new Date();

  // Static pages
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
    // Fetch movie lists from TMDB
    const [trending, popular, topRated] = await Promise.all([
      getTrendingMovies(),
      getPopularMovies(),
      getTopRatedMovies(),
    ]);

    // Combine all movies
    const allMovies = [
      ...(trending?.results || []),
      ...(popular?.results || []),
      ...(topRated?.results || []),
    ];

    // Remove duplicate movies
    const uniqueMovies = Array.from(
      new Map(
        allMovies
          .filter((movie) => movie?.id)
          .map((movie) => [movie.id, movie])
      ).values()
    );

    // Create movie URLs
    const moviePages: MetadataRoute.Sitemap = uniqueMovies.map((movie) => ({
      url: `${baseUrl}/movie/${movie.id}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7,
    }));

    return [...staticPages, ...moviePages];
  } catch (error) {
    console.error("Failed to generate movie sitemap:", error);

    // Always return the static pages if TMDB fails
    return staticPages;
  }
}