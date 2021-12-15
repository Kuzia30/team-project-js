import refs from './refs';
import {renderMovieCardLibrary} from './render-movie-card';
import API from './API/libraryApi';
import LocalStorService from './localStorage';
const localStorService = new LocalStorService();

refs.watchedBtn.addEventListener('click', onWatchedBtn);
refs.queueBtn.addEventListener('click', onQueueBtn);
refs.libraryRef.addEventListener('click', onLibraryClick);

const getMovies = new API();
let queueList = [];
let watchedList = [];


// =================================================================infinite scroll
let currentPage = 1;
let currentAmountFilms = 0;

function renderCardPerPage() {
  let movieArray
  if (refs.watchedBtn.classList.contains('current-btn')) {
     movieArray = getWatchedList();
  } else {
    movieArray = getQueueList();
  }

  let filmsPerPage = 9;
  let totalfilms = movieArray.length;
  let pages = Math.ceil(totalfilms / filmsPerPage);

  if (currentPage <= pages) {
    for (let i = currentAmountFilms; i < currentPage * filmsPerPage; i += 1) {
      if (currentAmountFilms < totalfilms) {
        getMovies.getMovieByIdForLibrary(movieArray[i]).then(renderMovieCardLibrary);
        currentAmountFilms++;
      }
    }
  }
  currentPage++;
}

function infineteScroll() {
  window.addEventListener('scroll', () => {
    if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight) {
      renderCardPerPage();
    }
  });
}

// =================================================================infinity scroll



showWatchedFilms();
function onLibraryClick() {
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
  currentPage = 1;
  currentAmountFilms = 0;
  showWatchedFilms();
    console.log('у тебя есть просмотренные фильмы');
  
    }

function onQueueBtn(e) {
    e.preventDefault();
    refs.queueBtn.classList.add('current-btn');
    refs.watchedBtn.classList.remove('current-btn');
  refs.gallery.innerHTML = '';
  currentPage = 1;
  currentAmountFilms = 0;
  showQueue();
  console.log('у тебя есть очередь просмотра');
}

function plugLib() {
    const clearLibrary = (
    `<div class="clear-list">
    <h3 class="clear-list__title">Oops...</h3>
    <p class="clear-list__text">Your movie list is empty!</p>
   <button onclick="window.location.href='index.html'" class="button-lib" type="button">Back to Homepage</button></a>
    </div>`
  );
  console.log('Твоя библиотека пуста');
  refs.gallery.insertAdjacentHTML('beforeend', clearLibrary);
}

 function showWatchedFilms() {
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
   renderCardPerPage();
   infineteScroll();
}

 function showQueue() {
  let array = localStorService.getQueueLS();
  if (!array || array.length === 0) {
    // Если LocalStorage пуст делаем заглушку и прячем пагинацию
    plugLib()
    refs.pagination.classList.add('visually-hidden');
    return;
  }
  refs.cardsContainerRef.innerHTML = '';
  refs.pagination.classList.remove('visually-hidden');
  
   renderCardPerPage();
   infineteScroll();
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
