import type { MetadataRoute } from "next";
import {
  getTrendingMovies,
  getPopularMovies,
  getTopRatedMovies,
} from "@/lib/tmdb";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://cinemahunt10.vercel.app";

  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: new Date() },
    { url: `${baseUrl}/movies`, lastModified: new Date() },
    { url: `${baseUrl}/popular`, lastModified: new Date() },
    { url: `${baseUrl}/about`, lastModified: new Date() },
    { url: `${baseUrl}/contact`, lastModified: new Date() },
    { url: `${baseUrl}/privacy`, lastModified: new Date() },
    { url: `${baseUrl}/terms`, lastModified: new Date() },
  ];

  try {
    const [trending, popular, topRated] = await Promise.all([
      getTrendingMovies(),
      getPopularMovies(),
      getTopRatedMovies(),
    ]);

    const allMovies = [
      ...trending.results,
      ...popular.results,
      ...topRated.results,
    ];

    const uniqueMovies = Array.from(
      new Map(allMovies.map((movie) => [movie.id, movie])).values()
    );

    const moviePages: MetadataRoute.Sitemap = uniqueMovies.map((movie) => ({
      url: `${baseUrl}/movie/${movie.id}`,
      lastModified: movie.release_date
        ? new Date(movie.release_date)
        : new Date(),
    }));

    return [...staticPages, ...moviePages];
  } catch (error) {
    console.error("Sitemap movie fetch failed:", error);
    return staticPages;
  }
}