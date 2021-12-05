import './sass/main.scss';
import './js/showFilms';
import './js/modal-about-us.js';
import './js/pagination.js';

import { fetchMovies } from './js/API/theMovieApi';
import fetchKeywordMovie from './js/API/keywordApi';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { debounce } from 'lodash';
import { objGanres } from './js/ganres';
import { renderImages } from './js/renderImages';
import { loader } from './js/loader';

fetchMovies().then(data => {
  console.log(data);
  renderImages(data.results);
});

const searchInputEl = document.querySelector('#key');

searchInputEl.addEventListener('input', debounce(searchMovie, 500));

function searchMovie(e) {
  const searchWord = e.target.value.trim();
  if (searchWord.length === 0) {
    return;
  }
  fetchKeywordMovie(searchWord).then(data => {
    if (data.results.length <= 0) {
      Notify.failure('Not a found. Try again!');
      return;
    }
    gallery.innerHTML = '';
    renderImages(data.results);
  });
}
