import refs from './refs';
import { closeEscape, closeMovieWindow, closeBackdrop } from './close-movie-card';

export function openMovieWindow({
  title,
  genres,
  poster_path,
  //   backdrop_path,
  overview,
  original_title,
  vote_average,
  vote_count,
  popularity,
}) {
  refs.movieDetailsContainer.innerHTML = '';
  refs.backdrop.classList.remove('visually-hidden');
  refs.body.classList.add('overflow-hidden');
  refs.aboutFilmWindow.addEventListener('click', closeBackdrop);
  refs.closeBtn.addEventListener('click', closeMovieWindow);
  refs.closeBtnMobile.addEventListener('click', closeMovieWindow);
  window.addEventListener('keydown', closeEscape);
  const genresSTR = genres.map(genre => genre.name).join(', ');

  const posterPath = `https://image.tmdb.org/t/p/w500/${poster_path}`;
  const posterPathMobile = `https://image.tmdb.org/t/p/w342/${poster_path}`;

  //   `<img
  //     class="pop-up__poster"
  //     src="https://image.tmdb.org/t/p/w342//ci5A9TPmNajMxt1L8p4KlZ76sc9.jpg"
  //     alt="Movie poster"
  //   ></img>;`;
  //   const backdropPath = `https://image.tmdb.org/t/p/w500/${backdrop_path}`;
  //   console.log(posterPath);
  //   console.log(backdropPath);

  const aboutMovieMarkup = `
        <div class="pop-up__container">

          <div class="pop-up__thumb">
                <picture>
                    <source srcset="${posterPath}" media="(min-width: 1024px)" width="396px" />
                    <source srcset="${posterPathMobile}" media="(min-width: 768px)" width="264px" height="374px"/>
                    <source srcset="${posterPathMobile}" media="(min-width: 320px)" width="240px" height="356px"/>
                    <img class="pop-up__poster" src="${posterPath}" alt="Movie poster" loading="lazy"/>
                </picture>
                <button class=" js-trailer" type="button">
                      </button>
                <div class="trailer is-hidden "></div>
          </div>

          <div class="movie-details-container">
              <h1 class="pop-up__title">${title}</h1>
                <ul class="movie-details">
                    <li class="movie-details__vote  movie-details__items">
                        <div class="movie-details__key-wrap">
                            <span class="movie-details__key">Vote / Votes</span>
                        </div>
                        <ul class="vote-value movie-details__value">
                            <li class="vote-value__accent">${vote_average}</li>
                            <li class="vote-value__slash">/</li>
                            <li class="vote-value__last">${vote_count}</li>
                        </ul>
                    </li>
                    <li class="movie-details__popularity movie-details__items">
                        <div class="movie-details__key-wrap">
                            <span class="movie-details__key">Popularity</span>
                        </div>
                        <div class="popularity-value  movie-details__value">${popularity}</div>
                    </li>
                    <li class="movie-details__title movie-details__items">
                        <div class="movie-details__key-wrap">
                            <span class="movie-details__key">Original Title</span>
                        </div>
                        <div class="title-value  movie-details__value">${original_title}</div>
                    </li>
                    <li class="movie-details__genre movie-details__items">
                        <div class="movie-details__key-wrap">
                            <span class="movie-details__key">Genre</span>
                        </div>
                        <div class="genre-value movie-details__value">${genresSTR}</div>
                    </li>
                </ul>

              <div class="about">
                  <p class="about__title">about</p>
                  <p class="about__description">${overview}</p>
              </div>
              <ul class="pop-up-buttons">
                  <li class="pop-up-buttons__items">
                      <button class="pop-up-btn js-watched" type="button" data-watched>
                          add to watched
                      </button>
                  </li>
                  <li class="pop-up-buttons__items">
                      <button class="pop-up-btn js-queue" type="button" data-queue>
                          add to queue
                      </button>
                  </li>
              </ul>
          </div>
        </div>
        `;
  refs.movieDetailsContainer.innerHTML = aboutMovieMarkup;

  //   refs.closeBtn.addEventListener('click', closeMovieWindow);
  //   refs.closeBtnMobile.addEventListener('click', closeMovieWindow);
  //   window.addEventListener('keydown', closeEscape);
  //   closeMovieWindow();
  //   closeEscape();
}
