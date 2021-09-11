const BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = "c27b75f2098a52933ae8847a9b55ad4e";

export function fetchTrendingMovies() {
  const searchParams = new URLSearchParams({
    api_key: API_KEY,
  });

  const url = `${BASE_URL}/trending/movie/day?${searchParams}`;
  return fetch(url).then((response) => response.json());
}

export function searchMovieByQuery(query) {
  const searchParams = new URLSearchParams({
    api_key: API_KEY,
    query,
  });

  const url = `${BASE_URL}/search/movie?${searchParams}`;
  return fetch(url).then((response) => response.json());
}

export function fetchMovieById(id) {
  const searchParams = new URLSearchParams({
    api_key: API_KEY,
  });

  const url = `${BASE_URL}/movie/${id}?${searchParams}`;
  return fetch(url).then((response) => response.json());
}

export function fetchMovieActors(id) {
  const searchParams = new URLSearchParams({
    api_key: API_KEY,
  });

  const url = `${BASE_URL}/movie/${id}/credits?${searchParams}`;
  return fetch(url).then((response) => response.json());
}

export function fetchMovieReviews(id) {
  const searchParams = new URLSearchParams({
    api_key: API_KEY,
  });

  const url = `${BASE_URL}/movie/${id}/reviews?${searchParams}`;
  return fetch(url).then((response) => response.json());
}
