import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { useState } from "react";
import { Routes, Route } from 'react-router-dom';
import dayjs from 'dayjs';

import Header from './components/Header.jsx';
import Home from './components/Home.jsx';
import FilmForm from './components/FilmForm.jsx';
import NotFound from './components/NotFound.jsx';
import './App.css';
import { INITIAL_FILMS } from './films.mjs';
import AddEditFilmLayout from './components/AddEditFilmLayout.jsx';


function App() {
  const [films, setFilms] = useState(INITIAL_FILMS);

  const addFilm = (film) => {
    const idFilm = Math.max(...films.map(film=>film.id)) + 1;
    film.id=idFilm;
    setFilms(films => [...films, film]);
  }

  const editFilm = (editedFilm) => {
    setFilms(films.map(film => film.id === editedFilm.id ? editedFilm : film));
  }

  const deleteFilm = (filmId) => {
    setFilms((oldFilms) => oldFilms.filter((f) => f.id !== filmId));
  }

  return (
    <>
      <Header />
      <Container fluid>
        <Routes>
          <Route index element={<Home films={films} update={editFilm} delete={deleteFilm}/>}></Route>
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


{/*
  
<Route>
<Row>
  <Col xs={3}>
    <h5 className="my-3">Filters</h5>
    <Filters filters={filters} selectedFilter={selectedFilter} setFilter={setFilter}/>
  </Col>
  <Col xs={9} className="pt-3">
    <h1>{filters[selectedFilter]} Films</h1>
    <FilmList films={filterFilms(films)} setFilmToEdit={setFilmToEdit} setMode={setMode}/>
  </Col>
</Row>      
</Route>
{
mode==='view' && 
<Button variant="primary" className="rounded-circle fixed-right-bottom" onClick={()=>setMode('add')}>
<i className="bi bi-plus"></i>
</Button>
}

*/}