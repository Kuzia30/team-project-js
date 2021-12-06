import Pagination from 'tui-pagination';
import { fetchMovies } from './API/theMovieApi';
import fetchKeywordMovie from './API/keywordApi';
import { renderImages } from './renderImages';
import refs from './refs';
const container = document.getElementById('pagination');

const options = {
  itemsPerPage: 9,
  visiblePages: 5,
  page: 1,
  centerAlign: true,
  firstItemClassName: 'tui-first-child',
  lastItemClassName: 'tui-last-child',
  template: {
    page: `<a href="#" class="tui-page-btn">{{page}}</a>`,
    currentPage: `<strong class="tui-page-btn tui-is-selected">{{page}}</strong>`,
    moveButton:
      `<a href="#" class="tui-page-btn tui-{{type}}">` +
        `<span class="tui-ico-{{type}}">{{type}}</span>` +
      `</a>`,
    disabledMoveButton:
      `<span class="tui-page-btn tui-is-disabled tui-{{type}}">` +
        `<span class="tui-ico-{{type}}">{{type}}</span>` +
      `</span>`,
    moreButton:
      `<a href="#" class="tui-page-btn tui-{{type}}-is-ellip">` +
        `<span class="tui-ico-ellip">...</span>` +
      `</a>`
  }
};

const pagination = new Pagination(container, options);
const page = pagination.getCurrentPage();


fetchMovies(page).then(data => ({
    itemsFilm: data.results,
    total: data.total_results,
})).then(({ itemsFilm, total }) => {
  renderImages(itemsFilm)
  console.log(total);
  pagination.reset(total)
 });

pagination.on('afterMove', ({ page }) => {
  fetchMovies(page).then(data => ({
    itemsFilm: data.results,
  })).then(({ itemsFilm }) => {
    renderImages(itemsFilm)
  });
 });
