const API_KEY = 'd28eeb5f1e0206ee46e3ed30e2f4030f';
const BASE_URL = 'https://api.themoviedb.org/3/movie';

export default function fetchTrailers(id) {
  return fetch(`${BASE_URL}/${id}/videos?api_key=${API_KEY}&language=en-US`).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
}
