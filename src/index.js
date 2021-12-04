import './sass/main.scss';
import './js/showFilms';
import './js/modal-about-us.js';

import { fetchMovies } from './js/API/theMovieApi';

fetchMovies().then(data => {
  console.log(data);
});

const loader = document.querySelector(`.loader`);
window.addEventListener(`load`, stopScrolling);

function stopScrolling() {
  loader.classList.add(`slow`);
  loader.style.display = `none`;
}

