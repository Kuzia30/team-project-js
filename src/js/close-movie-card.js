import refs from './refs';

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
