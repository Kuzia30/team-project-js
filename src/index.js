import './sass/main.scss';
import './js/showFilms';
import './js/modal-about-us.js';
import './js/pagination.js';
import './js/searchInput';
import './js/loader';
import './js/details';
import './js/renderOneMovie';

import { fetchMovies } from './js/API/theMovieApi';
import { renderImages } from './js/renderImages';

fetchMovies().then(data => {
  console.log(data);
  renderImages(data.results);
});
