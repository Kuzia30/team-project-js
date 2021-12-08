import { fetchMovie } from './API/theMovieApi';
import refs from './refs';
import { fetchMovies } from './API/theMovieApi';
import { openMovieWindow } from './renderOneMovie';
import { renderImages } from './renderImages';
import { load, save, remove } from './localStorage';
import {} from './render-movie-card';

fetchMovies().then(data => {
  //   console.log(data);
  renderImages(data.results);
});

refs.gallery.addEventListener('click', e => {
  e.preventDefault();
  if (e.target.nodeName !== 'IMG' && e.target.nodeName !== 'P') {
    return;
  }
  let id = e.target.dataset.id;
  if (!id) {
    id = e.target.parentNode.dataset.id;
  }

  fetchMovie(id).then(data => {
    openMovieWindow(data);

    // console.log(data);
    // Kretsul
    const btnWatch = refs.movieDetailsContainer.querySelector('.js-watched');
    const btnQueue = refs.movieDetailsContainer.querySelector('.js-queue');
    btnWatch.addEventListener('click', addWatch);
    btnQueue.addEventListener('click', addQueue);
    function addWatch() {
      console.log('click addwatchedkey');
      addWatchList();
    }
    function addQueue() {
      addQueueList();
      console.log('click queuekey');
    }
    //add watch
    function addWatchList() {
      const btnWatch = refs.movieDetailsContainer.querySelector('.js-watched');
      if (btnWatch.classList.contains('current-btn')) {
        removeFromWatchedList(id);
      } else {
        let watchList = [];
        let localWatchListJson = load('Watched');
        if (localWatchListJson) {
          watchList = [...localWatchListJson];
        }

        let queueList = [];
        let localQueueListJson = load('Queue');
        if (localQueueListJson) {
          queueList = [...localQueueListJson];
        }
        let queueSet = new Set(queueList);
        if (queueSet.has(id)) {
          remove('Queue');
          let index = queueList.indexOf(id);
          queueList.splice(index, 1);
          save('Queue', queueList);
        }

        const watchSet = new Set(watchList);
        if (watchSet.has(id)) {
          textModalBtn(id);
        } else {
          watchList.push(id);
          save('Watched', watchList);
          textModalBtn(id);
        }
      }
    }

    //remove watch
    function removeFromWatchedList(id) {
      console.log('удаляем из watched');
      let watchList = [];
      let localWatchListJson = load('Watched');
      if (localWatchListJson) {
        watchList = [...localWatchListJson];
      }

      remove('Watched');
      let index = watchList.indexOf(id);
      watchList.splice(index, 1);
      save('Watched', watchList);

      textModalBtn();
    }

    // смена текста кнопок
    function textModalBtn(id) {
      const btnWatch = refs.movieDetailsContainer.querySelector('.js-watched');
      const btnQueue = refs.movieDetailsContainer.querySelector('.js-queue');
      if (inList(id, 'Watched')) {
        // console.log('есть такой в watched');
        btnWatch.textContent = 'Added to watched';
        btnWatch.disabled = true;
        function changeText() {
          btnWatch.disabled = false;
          btnWatch.textContent = 'Remove from watched';
          btnWatch.classList.add('current-btn');
        }
        setTimeout(changeText, 100);
      } else {
        // console.log('нет такого в watched');
        btnWatch.textContent = 'Add to watched';
        btnWatch.classList.remove('current-btn');
        // console.log('удаляем класс current-btn');
        btnWatch.disabled = false;
      }

      if (inList(id, 'Queue')) {
        // console.log('есть такой в queue');
        btnQueue.textContent = 'Added to queue';
        btnQueue.disabled = true;
        function changeText() {
          btnQueue.disabled = false;
          btnQueue.textContent = 'Remove from queue';
          btnQueue.classList.add('current-btn');
        }
        setTimeout(changeText, 100);
      } else {
        // console.log('нет такого в queue');
        btnQueue.textContent = 'Add to queue';
        btnQueue.classList.remove('current-btn');
        btnQueue.disabled = false;
      }
    }
    function inList(id, list) {
      let arrList = [];
      let localListJson = load(list);
      if (localListJson) {
        arrList = [...localListJson];
      }
      const listSet = new Set(arrList);
      return listSet.has(id);
    }

    function removeFromQueueList(id) {
      console.log('удаляем из Queue');
      let queueList = [];
      let localQueueListJson = load('Queue');
      if (localQueueListJson) {
        queueList = [...localQueueListJson];
      }

      remove('Queue');
      let index = queueList.indexOf(id);
      queueList.splice(index, 1);
      save('Queue', queueList);

      textModalBtn();
    }

    //add queue
    function addQueueList() {
      const btnQueue = refs.movieDetailsContainer.querySelector('.js-queue');
      if (btnQueue.classList.contains('current-btn')) {
        removeFromQueueList(id);
      } else {
        let queueList = [];
        let localQueueListJson = load('Queue');
        if (localQueueListJson) {
          queueList = [...localQueueListJson];
        }

        let watchList = [];
        let localWatchListJson = load('Watched');
        if (localWatchListJson) {
          watchList = [...localWatchListJson];
        }
        let watchSet = new Set(watchList);
        if (watchSet.has(id)) {
          remove('Watched');
          let index = watchList.indexOf(id);
          watchList.splice(index, 1);
          save('Watched', watchList);
        }

        const queueSet = new Set(queueList);
        if (queueSet.has(id)) {
          textModalBtn(id);
        } else {
          queueList.push(id);
          save('Queue', queueList);
          textModalBtn(id);
        }
      }
    }
  });
});

function closeMovieWindow() {
  refs.backdrop.classList.add('visually-hidden');
  // refs.closeBtn.removeEventListener('click', closeMovieWindow);
  // refs.closeBtnMobile.removeEventListener('click', closeMovieWindow);
}

refs.closeBtn.addEventListener('click', closeMovieWindow);
refs.closeBtnMobile.addEventListener('click', closeMovieWindow);

function closeEscape(event) {
  if (event.key === 'Escape') {
    refs.backdrop.classList.add('visually-hidden');
    window.removeEventListener('keydown', closeEscape);
    return;
  }
  window.removeEventListener('keydown', closeEscape);
}

window.addEventListener('keydown', closeEscape);
