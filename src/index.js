import './sass/main.scss';
import './js/showFilms';
import './js/modal-about-us.js';
import './js/pagination.js';
import './js/searchInput';
import './js/loader';

import { fetchMovies } from './js/API/theMovieApi';
import { renderImages } from './js/renderImages';


fetchMovies().then(data => {
  console.log(data);
  renderImages(data.results);
});


// для модалки
import { fetchMovie } from '/js/API/theMovieApi';
import refs from './js/refs';


refs.gallery.addEventListener('click', e => {
  e.preventDefault();
  if (e.target.nodeName !== 'IMG' && e.target.nodeName !== 'P') {
    return;
  }
  let id = e.target.dataset.id;
  if (!id) {
    id = e.target.parentNode.dataset.id;
  }
  
  fetchMovie(id).then(data => {
    console.log(data);
  });
});