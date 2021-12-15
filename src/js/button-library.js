import refs from './refs';
import {renderMovieCardLibrary} from './render-movie-card';
import API from './API/libraryApi';
// import LocalStorService from './localStorage';
// const localStorService = new LocalStorService();

refs.watchedBtn.addEventListener('click', onWatchedBtn);
refs.queueBtn.addEventListener('click', onQueueBtn);
refs.libraryRef.addEventListener('click', onLibraryClick);

const getMovies = new API();
let queueList = [];
let watchedList = [];


// export function showWatchedFilms() {
//   let array = getWatchedList();
//   if (!array || array.length === 0) {
//     // Если LocalStorage пуст делаем заглушку и прячем пагинацию
//     plugLib()
//     refs.pagination.classList.add('visually-hidden');
//     return;
//   }
//   refs.cardsContainerRef.innerHTML = '';
//   refs.pagination.classList.remove('visually-hidden');
//       getWatchedList().forEach(movie => {
//     getMovies.getMovieByIdForLibrary(movie)
//       .then(renderMovieCardLibrary);
//       });
//   }

// export function showQueue() {
//   let array = getQueueList();
//   if (!array || array.length === 0) {
//     // Если LocalStorage делаем заглушку и прячем пагинацию
//     plugLib()
//     refs.pagination.classList.add('visually-hidden');
//     return;
//   }
//   refs.cardsContainerRef.innerHTML = '';
//   refs.pagination.classList.remove('visually-hidden');
  
//   getQueueList().forEach(movie => {
//     getMovies.getMovieByIdForLibrary(movie)
//       .then(renderMovieCardLibrary);
//   });
// }


// =================================================================infinite scroll
// let currentPage = 1;
// let currentAmountFilms = 0;
// export function showWatchedFilms() {
//   let array = getWatchedList();
//   if (!array || array.length === 0) {
//     // Если LocalStorage пуст делаем заглушку и прячем пагинацию
//     plugLib()
//     refs.pagination.classList.add('visually-hidden');
//     return;
//   }
//   refs.cardsContainerRef.innerHTML = '';
//   refs.pagination.classList.remove('visually-hidden');
//       getWatchedList().forEach(movie => {
//     getMovies.getMovieByIdForLibrary(movie)
//       .then(renderMovieCardLibrary);
//       });
//   }
function renderCardPerPage() {
  // let movieArray;
  if (refs.watchedBtn.classList.contains('current-btn')) {
    //  movieArray = getWatchedList();
      getWatchedList().forEach(movie => { getMovies.getMovieByIdForLibrary(movie).then(renderMovieCardLibrary) });
  } else {
    // movieArray = getQueueList();
    getQueueList().forEach(movie => {
  getMovies.getMovieByIdForLibrary(movie).then(renderMovieCardLibrary)
});
  }

  // let filmsPerPage = 9;
  // let totalfilms = movieArray.length;
  // let pages = Math.ceil(totalfilms / filmsPerPage);

  // if (currentPage <= pages) {
  //   for (let i = currentAmountFilms; i < currentPage * filmsPerPage; i += 1) {
  //     if (currentAmountFilms < totalfilms) {
  //       getMovies.getMovieByIdForLibrary(movieArray[i]).then(renderMovieCardLibrary);
  //       currentAmountFilms++;
  //     }
  //   }
  // }
 
  // currentPage++;
}

 


  function onInfiniteScroll() {
    if (window.scrollY + window.innerHeight > document.documentElement.offsetHeight) {
 
   ScrollEnd()
      renderCardPerPage();
    }
    return
  };

function infineteScroll() {
  window.addEventListener('scroll', onInfiniteScroll)
  
}

// =================================================================infinity scroll

// export {showWatchedFilms, showQueue}

showWatchedFilms();
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
  // currentPage = 1;
  // currentAmountFilms = 0;
  showWatchedFilms();
    console.log('у тебя есть просмотренные фильмы');
  
    }

function onQueueBtn(e) {
    e.preventDefault();
    refs.queueBtn.classList.add('current-btn');
    refs.watchedBtn.classList.remove('current-btn');
  refs.gallery.innerHTML = '';
  // currentPage = 1;
  // currentAmountFilms = 0;
  showQueue();
  console.log('у тебя есть очередь просмотра');
}

function plugLib() {
    const clearLibrary = (
    `<div class="container">
    <ul><div class="clear-list">
    <h3 class="clear-list__title">Oops...</h3>
    <p class="clear-list__text">Your movie list is empty!</p>
   <button onclick="window.location.href='index.html'" class="button-lib" type="button">Back to Homepage</button></a>
    </div></ul></div>`
  );
  console.log('Твоя библиотека пуста');
  refs.gallery.insertAdjacentHTML('beforeend', clearLibrary);
}

export function showWatchedFilms() {
  refs.cardsContainerRef.innerHTML = '';
  // let array = localStorService.getFromWatchedLS();
  let array = getWatchedList();
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

export function showQueue() {
  let array = getQueueList();
  if (!array || array.length === 0) {
    // Если LocalStorage пуст делаем заглушку и прячем пагинацию
    plugLib()
    refs.pagination.classList.add('visually-hidden');
    return;
  }
  refs.cardsContainerRef.innerHTML = '';
  refs.pagination.classList.remove('visually-hidden');
  getQueueList().forEach(movie => {
    getMovies.getMovieByIdForLibrary(movie).then(renderMovieCardLibrary)
  });
   renderCardPerPage();
   infineteScroll();
}

export function getQueueList() {
     if (!(localStorage.getItem('Queue')) || JSON.parse(localStorage.getItem('Queue')).length === 0 ) {
      console.log('empty');
      return [];
    } else {
      return queueList = JSON.parse(localStorage.getItem('Queue'));
    }
}

export function getWatchedList() {
      if (!(localStorage.getItem('Watched')) || JSON.parse(localStorage.getItem('Watched')).length === 0 ) {
      console.log('empty');
      return [];
    } else {
      return watchedList = JSON.parse(localStorage.getItem('Watched'));
    }
    
};

function ScrollEnd() {
  let backdrlib;
  let backdrlibQ;
  const arrWatchList = JSON.parse(localStorage.getItem('Watched'));
  const arrQueueList = JSON.parse(localStorage.getItem('Queue'));
  
  if (backdrlib = refs.watchedBtn.classList.contains('current-btn')) {
  for (let i = 0; i < arrWatchList.length; i=i+1) {
     window.removeEventListener('scroll', onInfiniteScroll)
  }
  }
  if (backdrlibQ = refs.queueBtn.classList.contains('current-btn')) {
    for (let i = 0; i < arrQueueList.length; i=i+1) {
      window.removeEventListener('scroll', onInfiniteScroll)
    }
  }
return
}

// for (i = 0; i < a.length; i++) {
//   if (a[i] == theValue) {
//     break;
//   }
// }

// function infineteScroll() {
//   window.addEventListener('scroll', () => {
//     if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight) {
//       renderCardPerPage();
//     }
//   });
// }

//  for (let i = 0; i < 2000; i++) document.writeln(i)