import movieCardLibraryTmp from '../hbs/movie-card-library.hbs';
import refs from './refs';

export function renderMovieCardLibrary(film) {

  refs.cardsContainerRef.insertAdjacentHTML('beforeend', movieCardLibraryTmp(film));
}