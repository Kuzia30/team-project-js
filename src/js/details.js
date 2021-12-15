import { fetchMovie } from './API/theMovieApi';
import refs from './refs';
import { openMovieWindow } from './render-one-movie';
import { load, save, remove } from './localStorage';
import fetchTrailers from './API/trailerApi';
// export { showQueue, showWatchedFilms } from './button-library'
// import {showWatchedFilms, showQueue } from './button-library';
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
    // получаем данные из массива ключей localstorage
    const arrWatchList = JSON.parse(localStorage.getItem('Watched'));
    const arrQueueList = JSON.parse(localStorage.getItem('Queue'));
    console.log('arrWatchList', arrWatchList);
    console.log('arrQueueList', arrQueueList);
    console.log('MY ID', id);

    const btnWatch = refs.movieDetailsContainer.querySelector('.js-watched');
    const btnQueue = refs.movieDetailsContainer.querySelector('.js-queue');
    btnWatch.addEventListener('click', addWatch);
    btnQueue.addEventListener('click', addQueue);
    function addWatch() {
      console.log('click addwatchedkey');

      addWatchList();
      //скрываем карточку
      const removeElW = document.querySelector(`li[data-idli="${id}"]`);
      removeElW.classList.toggle('visually-hidden');
    }
    function addQueue() {
      addQueueList();
        //скрываем карточку
      const removeElW = document.querySelector(`li[data-idli="${id}"]`);
      removeElW.classList.toggle('visually-hidden');
      console.log('click queuekey');
    }

    // console.log('w', watchedList);
    // checkWatchedList()
    // проверка массива на наличие элемента

    // function checkWatchedList() {
    //   //     const repeatedIndexWatched = watchedList.filter(elem => elem.id === id);
    //   //    console.log('repeat', repeatedIndexWatched);
    //   // }

    //   }

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
          watchList.unshift(id);
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
    // сверяем полученные данные из массива ключей Watch localstorage на включение в списке и изменение текста и стиля кнопок
    // нужно добавить setTimeout
    if (arrWatchList.includes(id)) {
      console.log('такой фильм есть в списке просмотренных');
      btnWatch.disabled = false;
      btnWatch.textContent = 'Remove from watched';
      btnWatch.classList.add('current-btn');
      // refs.gallery.innerHTML = '';
      // refs.cardsContainerRef.innerHTML = '';
      // showWatchedFilms();
      console.log('Очистка');
    }
    if (arrWatchList.includes(!id)) {
      btnWatch.textContent = 'Added to watched';
      btnWatch.disabled = true;
      // refs.gallery.innerHTML = '';
      // refs.cardsContainerRef.innerHTML = '';
      // showWatchedFilms();
      console.log('Очистка');
    }
    // нужно добавить setTimeout

    // сверяем полученные данные из массива ключей Queue localstorage на включение в списке и изменение текста и стиля кнопок
    // нужно добавить setTimeout
    if (arrQueueList.includes(id)) {
      console.log('такой фильм есть в списке очереди на просмотр');
      btnQueue.disabled = false;
      btnQueue.textContent = 'Remove from queue';
      btnQueue.classList.add('current-btn');
      // refs.cardsContainerRef.innerHTML = '';
      // showQueue();
    }
    if (arrQueueList.includes(!id)) {
      btnQueue.textContent = 'Added to queue';
      btnQueue.disabled = true;
      // refs.cardsContainerRef.innerHTML = '';
      // showQueue();
    }
    // нужно добавить setTimeout

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
          queueList.unshift(id);
          save('Queue', queueList);
          textModalBtn(id);
        }
      }
    }
    // Trailers render
    const btnTrailer = refs.movieDetailsContainer.querySelector('.js-trailer');
    btnTrailer.addEventListener('click', openTrailer);
    function openTrailer(e) {
      fetchTrailers(id).then(({ results }) => {
        const trailerEl = refs.movieDetailsContainer.querySelector('.trailer');
        const trailers = results
          .filter(trailer => trailer.type === 'Trailer')
          .map(
            trailer =>
              `<iframe class="trailer__frame" src="https://www.youtube.com/embed/${trailer.key}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`,
          );
        trailerEl.classList.remove('is-hidden');
        trailerEl.innerHTML = trailers[0];
      });
    }
  });
});
