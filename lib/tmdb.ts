export interface Movie {
  id: number;
  title?: string;
  name?: string;
  poster_path?: string | null;
  backdrop_path?: string | null;
  overview?: string;
  vote_average: number;
  vote_count: number;
  popularity: number;
  genre_ids?: number[];
  original_language?: string;
  release_date?: string;
  first_air_date?: string;
  media_type?: string;
}

export interface Genre {
  id: number;
  name: string;
}

export interface TMDBResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

interface GenreResponse {
  genres: Genre[];
}

const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

async function fetchTMDB(
  endpoint: string,
  params: Record<string, string> = {}
): Promise<TMDBResponse> {
  if (!API_KEY) {
    throw new Error("NEXT_PUBLIC_TMDB_API_KEY is not configured");
  }

  const searchParams = new URLSearchParams({
    api_key: API_KEY,
    language: "en-US",
    ...params,
  });

  const response = await fetch(
    `${BASE_URL}${endpoint}?${searchParams.toString()}`,
    {
      next: {
        revalidate: 3600,
      },
    }
  );

  if (!response.ok) {
    throw new Error(`TMDB request failed: ${response.status}`);
  }

  return response.json();
}

/* ----------------------------------------
   HOME MOVIES
----------------------------------------- */

export async function getTrendingMovies(): Promise<TMDBResponse> {
  return fetchTMDB("/trending/movie/week");
}

export async function getPopularMovies(): Promise<TMDBResponse> {
  return fetchTMDB("/movie/popular");
}

export async function getTopRatedMovies(): Promise<TMDBResponse> {
  return fetchTMDB("/movie/top_rated");
}

export async function getNowPlayingMovies(): Promise<TMDBResponse> {
  return fetchTMDB("/movie/now_playing");
}

export async function getUpcomingMovies(): Promise<TMDBResponse> {
  return fetchTMDB("/movie/upcoming");
}

/* ----------------------------------------
   GENRE MOVIES
----------------------------------------- */

export async function getActionMovies(): Promise<TMDBResponse> {
  return fetchTMDB("/discover/movie", {
    with_genres: "28",
    sort_by: "popularity.desc",
  });
}

export async function getCrimeMovies(): Promise<TMDBResponse> {
  return fetchTMDB("/discover/movie", {
    with_genres: "80",
    sort_by: "popularity.desc",
  });
}

export async function getThrillerMovies(): Promise<TMDBResponse> {
  return fetchTMDB("/discover/movie", {
    with_genres: "53",
    sort_by: "popularity.desc",
  });
}

export async function getHorrorMovies(): Promise<TMDBResponse> {
  return fetchTMDB("/discover/movie", {
    with_genres: "27",
    sort_by: "popularity.desc",
  });
}

/* ----------------------------------------
   LANGUAGE MOVIES
----------------------------------------- */

export async function getHindiMovies(): Promise<TMDBResponse> {
  return fetchTMDB("/discover/movie", {
    with_original_language: "hi",
    sort_by: "popularity.desc",
  });
}

export async function getEnglishMovies(): Promise<TMDBResponse> {
  return fetchTMDB("/discover/movie", {
    with_original_language: "en",
    sort_by: "popularity.desc",
  });
}

/* ----------------------------------------
   SMART FILTERING & SORTING
----------------------------------------- */

export async function discoverMovies({
  genre,
  year,
  language,
  sortBy = "popularity.desc",
}: {
  genre?: string;
  year?: string;
  language?: string;
  sortBy?: string;
}): Promise<TMDBResponse> {
  const params: Record<string, string> = {
    sort_by: sortBy,
  };

  if (genre) {
    params.with_genres = genre;
  }

  if (year) {
    params.primary_release_year = year;
  }

  if (language) {
    params.with_original_language = language;
  }

  if (sortBy === "vote_average.desc") {
    params.vote_count_gte = "100";
  }

  return fetchTMDB("/discover/movie", params);
}

/* ----------------------------------------
   MOVIE DETAILS
----------------------------------------- */

export async function getMovieDetails(movieId: number) {
  if (!API_KEY) {
    throw new Error("NEXT_PUBLIC_TMDB_API_KEY is not configured");
  }

  const searchParams = new URLSearchParams({
    api_key: API_KEY,
    language: "en-US",
    append_to_response: "videos,credits,recommendations,similar",
  });

  const response = await fetch(
    `${BASE_URL}/movie/${movieId}?${searchParams.toString()}`,
    {
      next: {
        revalidate: 3600,
      },
    }
  );

  if (!response.ok) {
    throw new Error(
      `TMDB movie details failed: ${response.status}`
    );
  }

  return response.json();
}

/* ----------------------------------------
   SIMILAR MOVIES
----------------------------------------- */

export async function getSimilarMovies(
  movieId: number
): Promise<TMDBResponse> {
  return fetchTMDB(`/movie/${movieId}/similar`);
}

/* ----------------------------------------
   RECOMMENDATIONS
----------------------------------------- */

export async function getRecommendedMovies(
  movieId: number
): Promise<TMDBResponse> {
  return fetchTMDB(`/movie/${movieId}/recommendations`);
}

/* ----------------------------------------
   GENRES
----------------------------------------- */

export async function getGenres(): Promise<GenreResponse> {
  if (!API_KEY) {
    throw new Error("NEXT_PUBLIC_TMDB_API_KEY is not configured");
  }

  const searchParams = new URLSearchParams({
    api_key: API_KEY,
    language: "en-US",
  });

  const response = await fetch(
    `${BASE_URL}/genre/movie/list?${searchParams.toString()}`,
    {
      next: {
        revalidate: 3600,
      },
    }
  );

  if (!response.ok) {
    throw new Error(`TMDB genres failed: ${response.status}`);
  }

  return response.json();
}

export async function getMoviesByGenre(
  genreId: number
): Promise<TMDBResponse> {
  return fetchTMDB("/discover/movie", {
    with_genres: String(genreId),
    sort_by: "popularity.desc",
  });
}

/* ----------------------------------------
   SEARCH
----------------------------------------- */

export async function searchMovies(
  query: string
): Promise<TMDBResponse> {
  return fetchTMDB("/search/movie", {
    query,
  });
}

/* ----------------------------------------
   IMAGE URL
----------------------------------------- */

export function getImageUrl(
  path?: string | null,
  size = "w500"
): string {
  if (!path) {
    return "/logo.png";
  }

  return `https://image.tmdb.org/t/p/${size}${path}`;
}