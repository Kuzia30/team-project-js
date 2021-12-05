import './sass/main.scss';
import './js/showFilms';
import './js/modal-about-us.js';
import './js/pagination.js';
import './js/searchInput';

import { fetchMovies } from './js/API/theMovieApi';
import { renderImages } from './js/renderImages';
import { loader } from './js/loader';

fetchMovies().then(data => {
  console.log(data);
  renderImages(data.results);
});
