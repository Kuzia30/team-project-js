import refs from './refs';
// import {showWatchedFilms, showQueue } from './button-library';
export function closeMovieWindow() {
  refs.backdrop.classList.add('visually-hidden');
  refs.body.classList.remove('overflow-hidden');
  refs.closeBtn.removeEventListener('click', closeMovieWindow);
  refs.closeBtnMobile.removeEventListener('click', closeMovieWindow);
  window.removeEventListener('keydown', closeEscape);
  refs.aboutFilmWindow.removeEventListener('click', closeBackdrop);
  
}

export function closeEscape(event) {
  if (event.key === 'Escape') {
    refs.backdrop.classList.add('visually-hidden');
    refs.body.classList.remove('overflow-hidden');
    window.removeEventListener('keydown', closeEscape);
    refs.aboutFilmWindow.removeEventListener('click', closeBackdrop);
    refs.closeBtn.removeEventListener('click', closeMovieWindow);
    refs.closeBtnMobile.removeEventListener('click', closeMovieWindow);
      return;
  }
}

export function closeBackdrop(event) {
  if (event.currentTarget !== event.target) {
    return;
  } else {
    refs.backdrop.classList.add('visually-hidden');
    refs.body.classList.remove('overflow-hidden');
    refs.aboutFilmWindow.removeEventListener('click', closeBackdrop);
    window.removeEventListener('keydown', closeEscape);
    refs.closeBtn.removeEventListener('click', closeMovieWindow);
    refs.closeBtnMobile.removeEventListener('click', closeMovieWindow);
  }
  
}

  // if (refs.watchedBtn.classList.contains('library__btn' && 'current-btn' && 'watched-js') === true) {
    //   // showWatchedFilms();
    //   console.log('SHOWWHATHED');
    // }
    // if (refs.queueBtn.classList.contains('library__btn' && 'queue-js' && 'current-btn') === true) {
    //   // showQueue();
    //   console.log('SHOWWQUEUE');
    // }