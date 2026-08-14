export interface Genre {
  id: number;
  name: string;
}

export interface CastMember {
  id: number;
  name: string;
  character?: string;
  profile_path?: string | null;
}

export interface Movie {
  id: number;
  title: string;
  overview?: string;
  poster_path?: string | null;
  backdrop_path?: string | null;
  release_date?: string;
  vote_average?: number;
  vote_count?: number;
  genre_ids?: number[];
  genres?: Genre[];
  runtime?: number | null;
  tagline?: string | null;
  status?: string;
  credits?: { cast?: CastMember[] };
  videos?: { results?: Video[] };
}

export interface Video {
  id: string;
  key: string;
  name: string;
  site: string;
  type: string;
  official?: boolean;
}

export interface MovieResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export interface GenreResponse {
  genres: Genre[];
}

const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

async function fetchTMDB<T>(endpoint: string): Promise<T> {
  if (!API_KEY) throw new Error("TMDB API key is missing");

  const response = await fetch(
    `${BASE_URL}${endpoint}${endpoint.includes("?") ? "&" : "?"}api_key=${API_KEY}`,
  );

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`TMDB request failed: ${response.status} ${errorText}`);
  }

  return response.json();
}

export async function getTrendingMovies(): Promise<MovieResponse> {
  return fetchTMDB<MovieResponse>("/trending/movie/week");
}
export async function getPopularMovies(): Promise<MovieResponse> {
  return fetchTMDB<MovieResponse>("/movie/popular");
}
export async function getTopRatedMovies(): Promise<MovieResponse> {
  return fetchTMDB<MovieResponse>("/movie/top_rated");
}
export async function getHorrorMovies(): Promise<MovieResponse> {
  return fetchTMDB<MovieResponse>("/discover/movie?with_genres=27");
}
export async function getHindiMovies(): Promise<MovieResponse> {
  return fetchTMDB<MovieResponse>("/discover/movie?with_original_language=hi");
}
export async function getEnglishMovies(): Promise<MovieResponse> {
  return fetchTMDB<MovieResponse>("/discover/movie?with_original_language=en");
}
export async function getNowPlayingMovies(): Promise<MovieResponse> {
  return fetchTMDB<MovieResponse>("/movie/now_playing");
}
export async function getUpcomingMovies(): Promise<MovieResponse> {
  return fetchTMDB<MovieResponse>("/movie/upcoming");
}
export async function getGenres(): Promise<GenreResponse> {
  return fetchTMDB<GenreResponse>("/genre/movie/list");
}
export async function getMoviesByGenre(genreId: number): Promise<MovieResponse> {
  return fetchTMDB<MovieResponse>(
    `/discover/movie?with_genres=${genreId}&sort_by=popularity.desc`,
  );
}
export async function searchMovies(query: string): Promise<MovieResponse> {
  return fetchTMDB<MovieResponse>(
    `/search/movie?query=${encodeURIComponent(query)}&include_adult=false`,
  );
}
export async function getMovieDetails(movieId: number): Promise<Movie> {
  return fetchTMDB<Movie>(
    `/movie/${movieId}?append_to_response=videos,credits`,
  );
}

export function getImageUrl(
  path: string | null | undefined,
  size: "w342" | "w500" | "w780" | "original" = "w500",
) {
  return path ? `https://image.tmdb.org/t/p/${size}${path}` : null;
}
