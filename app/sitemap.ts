import type { MetadataRoute } from "next";
import {
  getTrendingMovies,
  getPopularMovies,
  getTopRatedMovies,
} from "@/lib/tmdb";

const baseUrl = "https://cinemahunt10.vercel.app";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: now,
    },
    {
      url: `${baseUrl}/movies`,
      lastModified: now,
    },
    {
      url: `${baseUrl}/popular`,
      lastModified: now,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: now,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: now,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: now,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: now,
    },
  ];

  try {
    const [trending, popular, topRated] = await Promise.all([
      getTrendingMovies(),
      getPopularMovies(),
      getTopRatedMovies(),
    ]);

    // Combine all movies
    const movies = [
      ...trending.results,
      ...popular.results,
      ...topRated.results,
    ];

    // Remove duplicate movie IDs
    const uniqueMovies = Array.from(
      new Map(movies.map((movie) => [movie.id, movie])).values()
    );

    // Create movie URLs
    const moviePages: MetadataRoute.Sitemap = uniqueMovies.map(
      (movie) => ({
        url: `${baseUrl}/movie/${movie.id}`,
        lastModified: now,
      })
    );

    return [...staticPages, ...moviePages];
  } catch (error) {
    console.error("Sitemap error:", error);

    return staticPages;
  }
}
