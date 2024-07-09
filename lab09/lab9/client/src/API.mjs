import { Film } from "./films.mjs";

const SERVER_URL = 'http://localhost:3001/api';

async function getFilms(filter) {
  const response = await fetch(SERVER_URL + '/films?filter='+filter);
  if(response.ok) {
    const filmsJson = await response.json();
    return filmsJson.map(film => new Film(film.id, film.title, film.favorite, film.watchDate, film.rating, film.userId));
  }

}

const API = {getFilms};
export default API;