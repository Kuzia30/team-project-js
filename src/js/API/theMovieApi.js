const API_KEY = 'd28eeb5f1e0206ee46e3ed30e2f4030f';
const API_URL = 'https://api.themoviedb.org/3';
const API_ENDPOINT_MOVIES = '/discover/movie?sort_by=popularity.desc';

export const fetchMovies = (page = 1) => {
  return fetch(`${API_URL}${API_ENDPOINT_MOVIES}&api_key=${API_KEY}&page=${page}`)
    .then(response => {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response.json();
})
}

