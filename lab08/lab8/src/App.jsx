import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { useState } from "react";
import dayjs from 'dayjs';

import Header from './Header.jsx';
import Filters from './Filters';
import FilmList from './FilmList.jsx';
import FilmForm from './FilmForm.jsx';
import './App.css';
import { INITIAL_FILMS } from './films.mjs';


const filters ={
  'all' : 'All',
  'fav' : 'Favorite',
  'best' : 'Best Rated',
  'last' : 'Seen Last Month',
  'unseen' : 'Unseen',
};

function App() {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [mode, setMode] = useState('view');
  const [films, setFilms] = useState(INITIAL_FILMS);
  const [filmToEdit, setFilmToEdit] = useState('');

  const filterFilms = (films) => {
    switch(selectedFilter){
      case 'all': return films;
      case 'fav': return films.filter(film => film.favorite);
      case 'best': return films.filter(film => film.rating === 5);
      case 'last': return films.filter(film => {if(!film?.watchDate) return false; return film.watchDate.isAfter(dayjs().subtract(30,'day')); });
      case 'unseen': return films.filter(film => !film?.watchDate);
    }
  }

  const setFilter = (filter) => {
    setSelectedFilter(filter);
    setMode('view');
  }

  const addFilm = (film) => {
    const idFilm = Math.max(...films.map(film=>film.id)) + 1;
    film.id=idFilm;
    setFilms(films => [...films, film]);
  }

  const editFilm = (editedFilm) => {
    setFilms(films.map(film => film.id === editedFilm.id ? editedFilm : film));
    setFilmToEdit('');
  }

  return (
    <>
      <Header />
      <Container fluid>
        <Row>
          <Col xs={3}>
            <h5 className="my-3">Filters</h5>
            <Filters filters={filters} selectedFilter={selectedFilter} setFilter={setFilter}/>
          </Col>
          <Col xs={9} className="pt-3">
            <h1>{filters[selectedFilter]} Films</h1>
            <FilmList films={filterFilms(films)} setFilmToEdit={setFilmToEdit} setMode={setMode}/>
            {mode==='add' && <FilmForm key={"form"} setMode={setMode} add={addFilm}/>}
            {mode==='edit' && <FilmForm key={filmToEdit.id} setMode={setMode} filmToEdit={filmToEdit} edit={editFilm}/>}
          </Col>
        </Row>

        {
          mode==='view' && 
          <Button variant="primary" className="rounded-circle fixed-right-bottom" onClick={()=>setMode('add')}>
            <i className="bi bi-plus"></i>
          </Button>
        }
      </Container>
    </>
  )
}

export default App;

