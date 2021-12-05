import { objGanres } from '/js/ganres';
import { fetchMovie } from '/js/API/theMovieApi';

const gallery = document.querySelector(`.gallery`);

export function renderImages(results) {
  const markup = results
    .map(({ poster_path, id, title, genre_ids, release_date }) => {
      const full_path = 'https://image.tmdb.org/t/p/w500/' + poster_path;
      const date = new Date(release_date);
      const yearRelease = date.getFullYear();
      let genres = genre_ids.map(id => {
        return objGanres[id];
      });
      if (genres.length > 3) {
        const longGenresList = genres.splice(0, 2);
        genres = longGenresList.join(', ') + ', Other';
      } else {
        genres = genres.join(', ');
      }

      return `<div class="gallery__item" data-id="${id}">
          <img class="image-card" src="${full_path}" alt="${title}" data-id="${id}" loading="lazy"/>
          <div class="info">
    <p class="info-title" data-id="${id}">
      ${title.toUpperCase()}
    </p>
    <p class="info-item" data-id="${id}">
      ${genres} <span>|</span> ${yearRelease}
    </p>
  </div></div>`;
    })
    .join('');

  gallery.insertAdjacentHTML('beforeend', markup);
}

gallery.addEventListener('click', e => {
  if (e.target.nodeName !== 'IMG' && e.target.nodeName !== 'P') {
    return;
  }
  const id = e.target.dataset.id;
  fetchMovie(id).then(data => {
    console.log(data);
  });
});
