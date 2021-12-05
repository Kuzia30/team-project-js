import { objGanres } from '/js/ganres';

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

      return `<a class="gallery__item" href="" data-id="${id}">
          <img class="image-card" src="${full_path}" alt="${title}" loading="lazy"/>
          <div class="info">
    <p class="info-title">
      ${title.toUpperCase()}
    </p>
    <p class="info-item">
      ${genres} <span>|</span> ${yearRelease}
    </p>
  </div></a>`;
    })
    .join('');

  gallery.insertAdjacentHTML('beforeend', markup);
}
