import { Film } from "./films.mjs";

const SERVER_URL = 'http://localhost:3001/api';

async function getFilms(filter) {
  const response = await fetch(SERVER_URL + '/films?filter='+filter);
  if(response.ok) {
    const filmsJson = await response.json();
    return filmsJson.map(film => new Film(film.id, film.title, film.favorite, film.watchDate, film.rating, film.userId));
  }

}

async function addFilm(film) {
  const response =  await fetch(SERVER_URL+'/films', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(film)
  });
  if (response.ok) {
    return await response.json();
  } else {
    throw new Error('Unable to add film');
  }
}

async function editFilm(film) {
  const response =  await fetch( SERVER_URL+'/films/'+film.id , {
    method: 'PUT',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(film)
  });
  console.log(JSON.stringify(film));
  if (response.ok) {
    return await response.json();
  } else {
    throw new Error('Unable to add film');
  }
}


const API = {getFilms, addFilm, editFilm};
export default API;