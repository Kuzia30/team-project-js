import refs from './refs';
import { load, save, remove } from './localStorage';

refs.watchedBtn.addEventListener('click', onWatchedBtn);
refs.queueBtn.addEventListener('click', onQueueBtn);
renderAllList();
function onWatchedBtn(e) {
    e.preventDefault();
    console.log('click wathed');
    refs.queueBtn.classList.remove('current-btn');
    refs.watchedBtn.classList.add('current-btn');
    
    const arrId = load('watched');
    console.log(arrId);
    if (!arrId || arrId.length === 0) {
        refs.gallery.innerHTML = '';
      plugLib();
    } else {
        // логика если есть просмотренные фильмы
        console.log('у тебя есть просмотренные фильмы');
        }
    }

function onQueueBtn(e) {
    e.preventDefault();
    refs.queueBtn.classList.add('current-btn');
    refs.watchedBtn.classList.remove('current-btn');
    console.log('click queue');

    const arrId = load('queue');
    console.log(arrId);
    if (!arrId || arrId.length === 0) {
        refs.gallery.innerHTML = '';
     return plugLib();
    } else {
        // логика если есть просмотренные фильмы
        console.log('у тебя есть очередь просмотра');
        }
}

function renderAllList() {
  refs.gallery.innerHTML = '';
  let arrWatchId = [];
  let arrQueueId = [];
  if (load('watched')) {
    arrWatchId = load('watched');
  }
  if (load('queue')) {
    arrQueueId = load('queue');
  }
 
  if (arrWatchId.length === 0 && arrQueueId.length === 0) {
   return plugLib();
  } else {
    
  }
}

function plugLib() {
    const clearLibrary = (
    `<div class="container">
    <ul><div class="clear-list">
    <h3 class="clear-list__title">Oops...</h3>
    <p class="clear-list__text">No movies have been added yet. Let's go pick something to your liking</p>
    <a class="clear-list__link button-lib" href="./index.html">go to Home</a>
</div></ul></div>`
  );
  console.log('Твоя библиотека пуста');
  refs.gallery.insertAdjacentHTML('beforeend', clearLibrary);
  
}
