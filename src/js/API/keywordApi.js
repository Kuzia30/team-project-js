const API_KEY = 'd28eeb5f1e0206ee46e3ed30e2f4030f';
const BASE_URL = 'https://api.themoviedb.org/3/search/movie?';

export default function fetchKeywordMovie(query, pageCounter = 1) {
  return fetch(`${BASE_URL}api_key=${API_KEY}&query=${query}&page=${pageCounter}`).then(
    response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    },
  );
}
