const API_KEY = 'd28eeb5f1e0206ee46e3ed30e2f4030f';
const BASE_URL = 'https://api.themoviedb.org/3';

export default class moviesApiService {
  constructor() {
    this.query = '';
    this.totalPages = 1;
  }

 getMovieByIdForLibrary(id) {
    return fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}`)
      .then(r => r.json())
      .then(({ ...results }) => {
          results.vote_average = results.vote_average ? this.getVote(results.vote_average) : '';
          results.release_date = results.release_date ? this.getCuttedDate(results.release_date) : '';
        (results.title = results.title ? this.getCuttedName(results.title) : ''),
          (results.genres = results.genres ? this.getGenreNameForLibrary(results.genres) : []);
        console.log(results);
        return results;
      });
   
};

  getVote(string) {
    let vote = '';
    vote = string;
    console.log(vote);
     return vote;
  }
 
  
 getGenreNameForLibrary(genresList) {
    let genresListForLibrary = '';
    const genres = genresList.map(genre => genre.name);
    genresListForLibrary = genres.join(', ');
    if (genres.length > 3) {
      // console.log('genre', genres);
      genres.splice(2, 2, 'Other',);
      // console.log('genre2', genres);
      genresListForLibrary = genres.slice(0, 3).join(', ');
      return genresListForLibrary;
    }
    return genresListForLibrary;
  }
  
  getCuttedName(string) {
    let cuttedName;
    // console.log(string.length);
    cuttedName = string.length <= 35 ? string : string.slice(0, 35) + '...';
    return cuttedName;
    // console.log(string);
  }

   getCuttedDate(string) {
    let cuttedDate;
    cuttedDate = string.slice(0, 4);
    return cuttedDate;
    // console.log(string);
  }
}