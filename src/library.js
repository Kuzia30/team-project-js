import './sass/main.scss';
import './js/showFilms';
import './js/modal-about-us.js';
import './js/pagination.js';
import './js/localStorage';
import './js/button-library';
import './js/loader';
import 'animate.css';
import './js/themeSwitcher';
import './js/renderOneMovie'
import './js/details';
import { fetchMovies } from './js/API/theMovieApi';
import { renderImages } from './js/renderImages';

fetchMovies().then(data => {
  console.log(data);
  renderImages(data.results);
});