import fetchKeywordMovie from './API/keywordApi';
import { fetchMovies } from './API/theMovieApi';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { debounce } from 'lodash';
import { renderImages } from './renderImages';
import refs from './refs';

refs.searchInput.addEventListener('input', debounce(searchMovie, 500));

function searchMovie(e) {
  const searchWord = e.target.value.trim();
  if (searchWord.length === 0) {
    fetchMovies().then(data => {
      renderImages(data.results);
    });
    return;
  }
  if (searchWord.length < 3) {
    Notify.warning('Please enter more than 3 characters');
    return;
  }
  fetchKeywordMovie(searchWord).then(data => {
    if (data.results.length <= 0) {
      Notify.failure('Search result not successful. Enter the correct movie.');
      return;
    }
    renderImages(data.results);
  });
}
