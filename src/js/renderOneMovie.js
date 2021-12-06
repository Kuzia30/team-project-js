// import { fetchMovies } from './API/theMovieApi';
// import refs from './js/refs';

// fetchMovies().then(data => {
//   console.log(data);
//   renderImages(data.results);
// });

// refs.gallery.addEventListener('click', e => {
//   e.preventDefault();
//   if (e.target.nodeName !== 'IMG' && e.target.nodeName !== 'P') {
//     return;
//   }
//   let id = e.target.dataset.id;
//   if (!id) {
//     id = e.target.parentNode.dataset.id;
//   }

//   fetchMovie(id).then(data => {
//     openMovieWindow(data);
//   });
// });

// function openMovieWindow(data) {
//   refs.backdrop.classList.remove('visually-hidden');
//   console.log(data.genres);
// }
