import refs from './refs';
import { showWatchedFilms, showQueue } from './button-library';

function offVideo() {
  const trailerEl = (refs.movieDetailsContainer.querySelector('.trailer').innerHTML = '');
}

  refs.aboutFilmWindow.addEventListener('click', closeBackdropLib);
  refs.closeBtn.addEventListener('click', closeMovieWindowLib);
  refs.closeBtnMobile.addEventListener('click', closeMovieWindowLib);
  window.addEventListener('keydown', closeEscapeLib);
  let backdrlib;
  let backdrlibQ;

function renderLibQueue() {
showQueue();
}

function renderLibWatch() {
showWatchedFilms();

    }

export function closeMovieWindowLib() {
    
  if (backdrlib = refs.watchedBtn.classList.contains('current-btn')) {
    refs.cardsContainerRef.innerHTML = '';
    renderLibWatch();
    // window.removeEventListener('keydown', closeEscapeLib);
    // refs.closeBtnMobile.removeEventListener('click', closeMovieWindowLib);
    // refs.closeBtn.removeEventListener('click', closeMovieWindowLib);
    // refs.closeBtnMobile.removeEventListener('click', closeMovieWindowLib);
    // window.removeEventListener('keydown', closeEscapeLib);
    // refs.aboutFilmWindow.removeEventListener('click', closeBackdropLib);
    // refs.aboutFilmWindow.removeEventListener('click', closeBackdropLib);
    offVideo();
  }

  if (backdrlibQ = refs.queueBtn.classList.contains('current-btn')) {
    refs.cardsContainerRef.innerHTML = '';
    renderLibQueue();
    offVideo();
    // refs.aboutFilmWindow.removeEventListener('click', closeBackdropLib);
    // window.removeEventListener('keydown', closeEscapeLib);
    // refs.closeBtn.removeEventListener('click', closeMovieWindowLib);
    // refs.closeBtnMobile.removeEventListener('click', closeMovieWindowLib);
  }
}

export function closeEscapeLib(event) {
  if (event.key === 'Escape') {
    // window.removeEventListener('keydown', closeEscapeLib);
    // refs.aboutFilmWindow.removeEventListener('click', closeBackdropLib);
    // refs.closeBtn.removeEventListener('click', closeMovieWindowLib);
    // refs.closeBtnMobile.removeEventListener('click', closeMovieWindowLib);
    offVideo();
    if (backdrlib = refs.watchedBtn.classList.contains('current-btn')) {
       refs.cardsContainerRef.innerHTML = '';
    renderLibWatch();
    }
    if (backdrlibQ = refs.queueBtn.classList.contains('current-btn')) {
      refs.cardsContainerRef.innerHTML = '';
      renderLibQueue();
    }
    return;
  }
}

export function closeBackdropLib(event) {
    if (event.currentTarget !== event.target) {
        return;
    }
    else if (backdrlib = refs.watchedBtn.classList.contains('current-btn')) {
       refs.cardsContainerRef.innerHTML = '';
      renderLibWatch();
      offVideo();
    //    refs.aboutFilmWindow.removeEventListener('click', closeBackdropLib);
    // window.removeEventListener('keydown', closeEscapeLib);
    // refs.closeBtn.removeEventListener('click', closeMovieWindowLib);
    // refs.closeBtnMobile.removeEventListener('click', closeMovieWindowLib);
    }
   else if (backdrlibQ = refs.queueBtn.classList.contains('current-btn')) {
      refs.cardsContainerRef.innerHTML = '';
      renderLibQueue();
      offVideo();
    //    refs.aboutFilmWindow.removeEventListener('click', closeBackdropLib);
    // window.removeEventListener('keydown', closeEscapeLib);
    // refs.closeBtn.removeEventListener('click', closeMovieWindowLib);
    // refs.closeBtnMobile.removeEventListener('click', closeMovieWindowLib);
    }
  }