import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { useState } from "react";
import dayjs from 'dayjs';

import Header from './Header.jsx';
import Filters from './Filters';
import FilmList from './FilmList.jsx';
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
  const [selectedFilter, setSelectedFilter] =useState('all');

  const filmToDisplay = (films) => {
    switch(selectedFilter){
      case 'all': return films;
      case 'fav': return films.filter(film => film.favorite);
      case 'best': return films.filter(film => film.rating === 5);
      case 'last': return films.filter(film => {if(!film?.watchDate) return false; return film.watchDate.isAfter(dayjs().subtract(30,'day')); });
      case 'unseen': return films.filter(film => !film?.watchDate);
    }
  }

  return (
    <>
      <Header />
      <Container fluid>
        <Row>
          <Col xs={3}>
            <h5 className="my-3">Filters</h5>
            <Filters filters={filters} selectedFilter={selectedFilter} setSelectedFilter={setSelectedFilter}/>
          </Col>
          <Col xs={9} className="pt-3">
            <h1>{filters[selectedFilter]} Films</h1>
            <FilmList films={filmToDisplay(INITIAL_FILMS)} selectedFilter={selectedFilter}/>
          </Col>
        </Row>
        <Button variant="primary" className="rounded-circle fixed-right-bottom">
          <i className="bi bi-plus"></i>
        </Button>
      </Container>
    </>
  )
}

export default App;

