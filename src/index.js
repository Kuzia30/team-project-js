import './sass/main.scss';
import './js/showFilms';
import './js/modal-about-us.js';
import './js/pagination.js';
import './js/searchInput';
import './js/loader';
import './js/details';
import './js/renderOneMovie';
import 'animate.css';
import './js/themeSwitcher';
import './js/localStorage';
import { fetchMovies } from './js/API/theMovieApi';
import { renderImages } from './js/renderImages';
import { pagination } from './js/pagination'
const pagin = pagination();
const page = pagin.getCurrentPage();


fetchMovies(page).then(data => ({
    itemsFilm: data.results,
    total: data.total_pages,
})).then(({ itemsFilm, total }) => {
  renderImages(itemsFilm)
  pagin.reset(total)
 });

pagin.on('afterMove', ({ page }) => {
  fetchMovies(page).then(data => ({
    itemsFilm: data.results,
  })).then(({ itemsFilm }) => {
    renderImages(itemsFilm)
  });
 });