export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  vote_average: number;
  vote_count: number;
  popularity: number;
  genre_ids?: number[];
  original_language?: string;
}

interface TMDBResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
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

// Trending movies
export async function getTrendingMovies(): Promise<TMDBResponse> {
  return fetchTMDB("/trending/movie/week");
}

// Popular movies
export async function getPopularMovies(): Promise<TMDBResponse> {
  return fetchTMDB("/movie/popular");
}

// Top rated movies
export async function getTopRatedMovies(): Promise<TMDBResponse> {
  return fetchTMDB("/movie/top_rated");
}

// Now playing
export async function getNowPlayingMovies(): Promise<TMDBResponse> {
  return fetchTMDB("/movie/now_playing");
}

// Upcoming movies
export async function getUpcomingMovies(): Promise<TMDBResponse> {
  return fetchTMDB("/movie/upcoming");
}

// Action movies
export async function getActionMovies(): Promise<TMDBResponse> {
  return fetchTMDB("/discover/movie", {
    with_genres: "28",
    sort_by: "popularity.desc",
  });
}

// Crime movies
export async function getCrimeMovies(): Promise<TMDBResponse> {
  return fetchTMDB("/discover/movie", {
    with_genres: "80",
    sort_by: "popularity.desc",
  });
}

// Thriller movies
export async function getThrillerMovies(): Promise<TMDBResponse> {
  return fetchTMDB("/discover/movie", {
    with_genres: "53",
    sort_by: "popularity.desc",
  });
}

// Horror movies
export async function getHorrorMovies(): Promise<TMDBResponse> {
  return fetchTMDB("/discover/movie", {
    with_genres: "27",
    sort_by: "popularity.desc",
  });
}

// Hindi movies
export async function getHindiMovies(): Promise<TMDBResponse> {
  return fetchTMDB("/discover/movie", {
    with_original_language: "hi",
    sort_by: "popularity.desc",
  });
}

// English movies
export async function getEnglishMovies(): Promise<TMDBResponse> {
  return fetchTMDB("/discover/movie", {
    with_original_language: "en",
    sort_by: "popularity.desc",
  });
}

// Movie details
export async function getMovieDetails(movieId: number) {
  if (!API_KEY) {
    throw new Error("NEXT_PUBLIC_TMDB_API_KEY is not configured");
  }

  const searchParams = new URLSearchParams({
    api_key: API_KEY,
    language: "en-US",
    append_to_response: "videos,credits",
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
    throw new Error(`TMDB movie details failed: ${response.status}`);
  }

  return response.json();
}

// Search movies
export async function searchMovies(
  query: string
): Promise<TMDBResponse> {
  return fetchTMDB("/search/movie", {
    query,
  });
}