// import { fetchMovies } from './API/theMovieApi';
// import refs from './js/refs';

// console.log(refs.closeBtn);
// const closeBtn = document.querySelector('.pop-up__close-btn');

// refs.closeBtn.addEventListener('click', closeMovieWindow);

// function closeMovieWindow() {
//   refs.backdrop.classList.add('visually-hidden');
// }
// import { fetchMovie } from './API/theMovieApi';
// import refs from './refs';

// import { square, diag } from './renderImages';

// console.log(square(5), diag(6, 6));

// const basicLightbox = require('basiclightbox');
// import * as basicLightbox from 'basiclightbox';

// const gallery = document.querySelector('.gallery');
// console.log(gallery);
// const popup = document.querySelector('.backdrop');

// console.log(popup);

// gallery.addEventListener('click', selectMovie);
// // window.addEventListener('keydown', closeEscape);

// function selectMovie(event) {
//   //   event.preventDefault();
//   const selectedFilm = event.carget.dataset.id;
//   //   console.log(selectedFilm);
//   const instant = basicLightbox.create(popup);
//   instant.show();
// }

// function closeEscape(event) {
//   const instance = basicLightbox.create(popup);
//   if (event.key === 'Escape') {
//     // console.log(instance);
//     instance.close(() => console.log('lightbox not visible anymore'));

//     return;
//   }
// }

// const instance = basicLightbox.create('.backdrop', {
//   onShow: instance => {
//     instance
//       .element()
//       .querySelector('.backdrop')
//       .addEventListener('click', instance.show(), { once: true });
//   },

//   // console.log('onShow', instance),
//   //   onClose: instance => console.log('onClose', instance),
// });
// document.querySelector('.gallery').onclick = () => {
//   basicLightbox.create('.backdrop').show();
// };

// document.querySelector('.pop-up__close-btn').onclick = () => {
//   basicLightbox.create('.backdrop').show();
// };
// gallery.addEventListener('click', selectMovie);

// function selectMovie(event) {
//   event.preventDefault();

//   console.log('hello');

//   instance.show();
// }

// function closePopup(event) {
//   console.log(event, 'buy');
//   instance.close();
// }

// const instance = basicLightbox.create(document.querySelector('.backdrop'), {
//   onShow: () => {
//     gallery.addEventListener('click', selectMovie);
//   },
//   onClose: () => {
//     window.removeEventListener('keydown', closePopup);
//   },
// });

// export function renderMovies(inputData) {
//   return fetch(`${BASE_URL}/name/${inputData}?fields=name,capital,population,flags,languages`).then(
//     res => {
//       if (res.ok) {
//         return res.json();
//       }
//       throw Error(res.statusText);
//     },
//   );
// }

//  https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=d28eeb5f1e0206ee46e3ed30e2f4030f&page=1
//
// 8961361d6e18d951b539:4994c4436b9c770ce4b443f64dd963999e9912e43f11237a5731c7acbebe627b
