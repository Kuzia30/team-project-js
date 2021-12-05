import './sass/main.scss';
import './js/showFilms';
import './js/modal-about-us.js';
import './js/pagination.js';

import { fetchMovies } from './js/API/theMovieApi';
import fetchKeywordMovie from './js/API/keywordApi';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { debounce } from 'lodash';

fetchMovies().then(data => {
  console.log(data);
  renderImages(data.results);
});

const loader = document.querySelector(`.loader`);
window.addEventListener(`load`, stopScrolling);

function stopScrolling() {
  loader.classList.add(`slow`);
  loader.style.display = `none`;
}

const gallery = document.querySelector(`.gallery`);

function renderImages(results) {
  const markup = results
    .map(({ poster_path, title, genre_ids, release_date }) => {
      const full_path = 'https://image.tmdb.org/t/p/w500/' + poster_path;
      const date = new Date(release_date);
      const yearRelease = date.getFullYear();
      return `<div class="gallery__item">
          <img class="image-card" src="${full_path}" alt="${title}" loading="lazy"/>
          <div class="info">
    <p class="info-title">
      ${title.toUpperCase()}
    </p>
    <p class="info-item">
      ${genre_ids} <span>|</span> ${yearRelease}
    </p>
  </div></div>`;
    })
    .join('');

  gallery.insertAdjacentHTML('beforeend', markup);
}

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
