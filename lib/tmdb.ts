export interface Movie {
  id: number;
  title: string;
  overview?: string;
  poster_path?: string | null;
  backdrop_path?: string | null;
  release_date?: string;
  vote_average?: number;
}

const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

async function fetchTMDB(endpoint: string) {
  if (!API_KEY) {
    throw new Error('TMDB API key is missing');
  }

  const response = await fetch(
    `${BASE_URL}${endpoint}${endpoint.includes('?') ? '&' : '?'}api_key=${API_KEY}`
  );

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
      `TMDB request failed: ${response.status} ${errorText}`
    );
  }

  return response.json();
}

export async function getTrendingMovies() {
  return fetchTMDB('/trending/movie/week');
}

export async function getPopularMovies() {
  return fetchTMDB('/movie/popular');
}

export async function getHorrorMovies() {
  return fetchTMDB('/discover/movie?with_genres=27');
}

export async function getHindiMovies() {
  return fetchTMDB('/discover/movie?with_original_language=hi');
}

export async function getEnglishMovies() {
  return fetchTMDB('/discover/movie?with_original_language=en');
}

export async function getNowPlayingMovies() {
  return fetchTMDB('/movie/now_playing');
}

export async function getUpcomingMovies() {
  return fetchTMDB('/movie/upcoming');
}

export async function getMovieDetails(movieId: number) {
  return fetchTMDB(`/movie/${movieId}?append_to_response=videos`);
}

export function getImageUrl(
  path?: string | null,
  size = 'w500'
) {
  if (!path) return '';
  return `https://image.tmdb.org/t/p/${size}${path}`;
}