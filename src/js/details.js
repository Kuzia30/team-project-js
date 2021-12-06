import { fetchMovie } from './API/theMovieApi';
import refs from './refs';
import { fetchMovies } from './API/theMovieApi';
import { openMovieWindow } from './renderOneMovie';
import { renderImages } from './renderImages';

fetchMovies().then(data => {
  //   console.log(data);
  renderImages(data.results);
});

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
    openMovieWindow(data);
    // console.log(data);
  });
});

function closeMovieWindow() {
  refs.backdrop.classList.add('visually-hidden');
}

refs.closeBtn.addEventListener('click', closeMovieWindow);

function closeEscape(event) {
  if (event.key === 'Escape') {
    refs.backdrop.classList.add('visually-hidden');
    return;
  }
}

window.addEventListener('keydown', closeEscape);
