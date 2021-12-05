import fetchKeywordMovie from './API/keywordApi';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { debounce } from 'lodash';
import { renderImages } from './renderImages';
import refs from './refs';

refs.searchInput.addEventListener('input', debounce(searchMovie, 500));

function searchMovie(e) {
  const searchWord = e.target.value.trim();
  if (searchWord.length === 0) {
    return;
  }
  fetchKeywordMovie(searchWord).then(data => {
    if (data.results.length <= 0) {
      Notify.failure('Search result not successful. Enter the correct movie.');
      return;
    }
    refs.gallery.innerHTML = '';
    renderImages(data.results);
  });
}
