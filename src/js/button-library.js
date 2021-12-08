import refs from './refs';
import {renderMovieCardLibrary} from './render-movie-card';
import API from './API/libraryApi';
// import { renderImages } from './renderImages';
import LocalStorService from './localStorage';
const localStorService = new LocalStorService();
// import { fetchMovie } from './API/theMovieApi';

refs.watchedBtn.addEventListener('click', onWatchedBtn);
refs.queueBtn.addEventListener('click', onQueueBtn);
refs.libraryRef.addEventListener('click', onLibraryClick);

const getMovies = new API();
let queueList = [];
let watchedList = [];

// showWatchedFilms();
function onLibraryClick(e) {
  e.preventDefault();
  // refs.gallery.innerHTML = '';
  refs.cardsContainerRef.innerHTML = '';
  console.log('library');
  showWatchedFilms();
}

function onWatchedBtn(e) {
    e.preventDefault();
    console.log('click wathed');
    refs.queueBtn.classList.remove('current-btn');
    refs.watchedBtn.classList.add('current-btn');
    refs.gallery.innerHTML = '';
  showWatchedFilms();
    console.log('у тебя есть просмотренные фильмы');
  
    }

function onQueueBtn(e) {
    e.preventDefault();
    refs.queueBtn.classList.add('current-btn');
    refs.watchedBtn.classList.remove('current-btn');
    refs.gallery.innerHTML = '';
  showQueue();
  console.log('у тебя есть очередь просмотра');
}

function plugLib() {
    const clearLibrary = (
    `<div class="container">
    <ul><div class="clear-list">
    <h3 class="clear-list__title">Oops...</h3>
    <p class="clear-list__text">Your movie list is empty!</p>
    <a href="./index.html"><button href="./index.html" class="button-lib" type="button">Back to Homepage</button></a>
    </div></ul></div>`
  );
  console.log('Твоя библиотека пуста');
  refs.gallery.insertAdjacentHTML('beforeend', clearLibrary);
}

export function showWatchedFilms() {
  refs.cardsContainerRef.innerHTML = '';
  let array = localStorService.getFromWatchedLS();
  if (!array || array.length === 0) {
    // Если LocalStorage пуст делаем заглушку и прячем пагинацию
    plugLib()
    refs.pagination.classList.add('visually-hidden');
    return;
  }
  refs.cardsContainerRef.innerHTML = '';
  refs.pagination.classList.remove('visually-hidden');
      getWatchedList().forEach(movie => {
    getMovies.getMovieByIdForLibrary(movie)
      .then(renderMovieCardLibrary);
  });
}

export function showQueue() {
  let array = localStorService.getQueueLS();
  if (!array || array.length === 0) {
    // Если LocalStorage делаем заглушку и прячем пагинацию
    plugLib()
    refs.pagination.classList.add('visually-hidden');
    return;
  }
  refs.cardsContainerRef.innerHTML = '';
  refs.pagination.classList.remove('visually-hidden');
  
  getQueueList().forEach(movie => {
    getMovies.getMovieByIdForLibrary(movie)
      .then(renderMovieCardLibrary);
  });
}

function getQueueList() {
     if (!(localStorage.getItem('Queue')) || JSON.parse(localStorage.getItem('Queue')).length === 0 ) {
      console.log('empty');
      return [];
    } else {
      return queueList = JSON.parse(localStorage.getItem('Queue'));
    }
}

function getWatchedList() {
      if (!(localStorage.getItem('Watched')) || JSON.parse(localStorage.getItem('Watched')).length === 0 ) {
      console.log('empty');
      return [];
    } else {
      return watchedList = JSON.parse(localStorage.getItem('Watched'));
    }
    
};
