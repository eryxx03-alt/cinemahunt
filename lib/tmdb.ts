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
const BASE_URL = "https://api.themoviedb.org/3";

async function fetchTMDB(endpoint: string) {
  const response = await fetch(
    `${BASE_URL}${endpoint}${endpoint.includes("?") ? "&" : "?"}api_key=${API_KEY}`
  );

  if (!response.ok) {
    throw new Error("TMDB request failed");
  }

  return response.json();
}

async function fetchMultiplePages(
  endpoint: string,
  pages: number = 10
) {
  const requests = [];

  for (let page = 1; page <= pages; page++) {
    requests.push(
      fetchTMDB(
        `${endpoint}${endpoint.includes("?") ? "&" : "?"}page=${page}`
      )
    );
  }

  const responses = await Promise.all(requests);

  return {
    results: responses.flatMap(
      (response: any) => response.results || []
    ),
  };
}

export async function getTrendingMovies() {
  return fetchMultiplePages("/trending/movie/week", 10);
}

export async function getPopularMovies() {
  return fetchMultiplePages("/movie/popular", 10);
}

export async function getTopRatedMovies() {
  return fetchMultiplePages("/movie/top_rated", 10);
}

export async function getNowPlayingMovies() {
  return fetchMultiplePages("/movie/now_playing", 10);
}

export async function getUpcomingMovies() {
  return fetchMultiplePages("/movie/upcoming", 10);
}

export async function getActionMovies() {
  return fetchMultiplePages(
    "/discover/movie?with_genres=28",
    10
  );
}

export async function getCrimeMovies() {
  return fetchMultiplePages(
    "/discover/movie?with_genres=80",
    10
  );
}

export async function getThrillerMovies() {
  return fetchMultiplePages(
    "/discover/movie?with_genres=53",
    10
  );
}

export async function getHorrorMovies() {
  return fetchMultiplePages(
    "/discover/movie?with_genres=27",
    10
  );
}

export async function getHindiMovies() {
  return fetchMultiplePages(
    "/discover/movie?with_original_language=hi",
    10
  );
}

export async function getEnglishMovies() {
  return fetchMultiplePages(
    "/discover/movie?with_original_language=en",
    10
  );
}

export async function getMovieDetails(
  movieId: number
) {
  return fetchTMDB(
    `/movie/${movieId}?append_to_response=videos`
  );
}

export function getImageUrl(
  path?: string | null,
  size = "w500"
) {
  if (!path) return "";

  return `https://image.tmdb.org/t/p/${size}${path}`;
}
export async function getGenres() {
  return fetchTMDB("/genre/movie/list");
}

export async function getMoviesByGenre(
  genreId: number
) {
  return fetchMultiplePages(
    `/discover/movie?with_genres=${genreId}`,
    10
  );
}

export async function searchMovies(
  query: string
) {
  return fetchTMDB(
    `/search/movie?query=${encodeURIComponent(query)}`
  );
}