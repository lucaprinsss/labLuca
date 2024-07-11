import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Container } from 'react-bootstrap';
import { useEffect, useState } from "react";
import { Routes, Route, useLocation } from 'react-router-dom';
import dayjs from 'dayjs';

import Header from './components/Header.jsx';
import Home from './components/Home.jsx';
import NotFound from './components/NotFound.jsx';
import './App.css';
import AddEditFilmLayout from './components/AddEditFilmLayout.jsx';
import API from './API.mjs';


function App() {
  const [films, setFilms] = useState([]);

  const {pathname} = useLocation();

  useEffect(() => {
    if (pathname.startsWith('/filters')) {
      API.getFilms(pathname.split('/').pop())
        .then(films=>setFilms(films))
        .catch(err=> console.log(err));
    } else if (pathname === '/') {
      API.getFilms('all')
        .then(films=>setFilms(films))
        .catch(err=> console.log(err));
    }  //else stiamo aggiungendo o editando un film, non serve aggiornare la lista
  }, [pathname]);

  const addFilm = (film) => {
    API.addFilm(film);
  }

  const editFilm = (film) => {
    API.editFilm(film);
  }

  const deleteFilm = (filmId) => {
    setFilms((oldFilms) => oldFilms.filter((f) => f.id !== filmId));
  }

  return (
    <>
      <Header />
      <Container fluid>
        <Routes>
          <Route index element={<Home films={films} edit={editFilm} delete={deleteFilm}/>}></Route>
          <Route path="filters/:filterId" element={<Home films={films} edit={editFilm} delete={deleteFilm}/>}/>
          <Route path="add" element={<AddEditFilmLayout mode='add' add={addFilm}/>}></Route>
          <Route path="edit/:filmId" element={<AddEditFilmLayout films={films} mode='edit' edit={editFilm}/>}></Route>
          <Route path="*" element={ <NotFound /> }></Route>
        </Routes>
      </Container>
    </>
  )
}

export default App;