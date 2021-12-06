import { fetchMovie } from './API/theMovieApi';

export default class LocalStorService {
  constructor() {
    if (JSON.parse(localStorage.getItem('Watched'))) {
      let watchedArray = JSON.parse(localStorage.getItem('Watched'));
      this.watchedArray = watchedArray;
    } else {
      this.watchedArray = [];
    }

    if (JSON.parse(localStorage.getItem('Queue'))) {
      let queueArray = JSON.parse(localStorage.getItem('Queue'));
      this.queueArray = queueArray;
    } else {
      this.queueArray = [];
    }

    this.id = 0;
  }

  set currentID(movieId) {
    return (this.id = movieId);
  }

  get currentID() {
    return this.id;
  }

  // добавить фильм в Watched
  async setWatchedToStorage() {
    const object = await fetchMovie(this.id);

    const info = renderImages(object);

    this.watchedArray.unshift(info);
    try {
      localStorage.setItem('Watched', JSON.stringify(this.watchedArray));
    } catch (err) {
      console.error(err);
    }
  }

  //Удалить фильм из списка просмотренных
  delFromWatched() {
    let array = this.getFromWatchedLS();

    for (let i = 0; i < array.length; i++) {
      if (array[i].id === this.id) {
        array.splice(i, 1);
      }
    }
    this.watchedArray = array;
    try {
      localStorage.setItem('Watched', JSON.stringify(this.watchedArray));
    } catch (err) {
      console.error(err);
    }
  }

  // добавить фильм в Queue
  async setQueueToStorage() {
    const array = await fetchMovie(this.id);
    const info = renderImages(array);
    this.queueArray.unshift(info);
    try {
      localStorage.setItem('Queue', JSON.stringify(this.queueArray));
    } catch (err) {
      console.error(err);
    }
  }

  //Удалить фильм из списка очереди
  delFromQueue() {
    let array = this.getQueueLS();

    for (let i = 0; i < array.length; i++) {
      if (array[i].id === this.id) {
        array.splice(i, 1);
      }
    }
    this.queueArray = array;
    try {
      localStorage.setItem('Queue', JSON.stringify(this.queueArray));
    } catch (err) {
      console.error(err);
    }
  }

  // Получить массив объектов из списка Watched
  getFromWatchedLS() {
    try {
      const movieArr = JSON.parse(localStorage.getItem('Watched'));
      return movieArr === null ? undefined : movieArr;
    } catch (err) {
      console.error('Get state error: ', err);
    }
  }

  // Получить массив объектов из списка Queue
  getQueueLS() {
    try {
      const movieArr = JSON.parse(localStorage.getItem('Queue'));
      return movieArr === null ? undefined : movieArr;
    } catch (err) {
      console.error('Get state error: ', err);
    }
  }
}