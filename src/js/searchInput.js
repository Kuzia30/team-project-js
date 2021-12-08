import fetchKeywordMovie from './API/keywordApi';
import { fetchMovies } from './API/theMovieApi';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { debounce } from 'lodash';
import { renderImages } from './renderImages';
import { pagination } from './pagination'
import refs from './refs';

refs.searchInput.addEventListener('input', debounce(searchMovie, 500));
const pagin = pagination();
const page = pagin.getCurrentPage();

function searchMovie(e) {
  const searchWord = e.target.value.trim();
  if (searchWord.length === 0) {
    fetchMovies(page).then(data => ({
      itemsFilm: data.results,
      total: data.total_pages,
    })).then(({ itemsFilm, total }) => {
    renderImages(itemsFilm)
    pagin.reset(total)
 });

    pagin.on('afterMove', ({ page }) => {
      fetchMovies(page).then(data => ({
       itemsFilm: data.results,
  })).then(({ itemsFilm }) => {
      renderImages(itemsFilm)
    });
 });
    return;
  }

  if (searchWord.length < 3) {
    Notify.warning('Please enter more than 3 characters');
    return;
  }

  fetchKeywordMovie(searchWord).then(data => {
    console.log(data);
    if (data.results.length <= 0) {
      Notify.failure('Search result not successful. Enter the correct movie.');
      return;
    }
    
  fetchKeywordMovie(searchWord, page).then(data => ({
    itemsFilm: data.results,
    total: data.total_pages,
    })).then(({ itemsFilm, total }) => {
      renderImages(itemsFilm)
      pagin.reset(total)
  });

pagin.on('afterMove', ({ page }) => {
  fetchKeywordMovie(searchWord, page).then(data => ({
    itemsFilm: data.results,
  })).then(({ itemsFilm }) => {
    renderImages(itemsFilm)
     });
    });
  });
}
