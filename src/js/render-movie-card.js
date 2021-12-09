import movieCardLibraryTmp from '../hbs/movie-card-library.hbs';
import refs from './refs';
import { openMovieWindow } from './render-one-movie';
import { fetchMovie } from './API/theMovieApi';
import { load, save, remove } from './localStorage';
export function renderMovieCardLibrary(film) {
  refs.cardsContainerRef.insertAdjacentHTML('beforeend', movieCardLibraryTmp(film));
}

refs.cardsContainerRef.addEventListener('click', e => {
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
    const btnWatch = refs.movieDetailsContainer.querySelector('.js-watched');
    const btnQueue = refs.movieDetailsContainer.querySelector('.js-queue');
    btnWatch.addEventListener('click', addWatch);
    btnQueue.addEventListener('click', addQueue);
    function addWatch() {
      console.log('click addwatchedkey');
      addWatchList();
    }
    function addQueue() {
      addQueueList();
      console.log('click queuekey');
    }
  });
});
