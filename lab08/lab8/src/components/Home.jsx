import { Button, Col, Row } from 'react-bootstrap';
import Filters from './Filters.jsx';
import FilmList from './FilmList.jsx';
import { useState } from 'react';
import dayjs from 'dayjs';
import { useNavigate, useParams } from 'react-router-dom';

const filters ={
  'all' : 'All',
  'fav' : 'Favorite',
  'best' : 'Best Rated',
  'last' : 'Seen Last Month',
  'unseen' : 'Unseen',
};

function Home (props) {
  const { filterId } = useParams();
  const navigate = useNavigate();

  let selectedFilter = 'all';
  if(filterId){
    selectedFilter = filterId;
  }

  const filterFilms = (films) => {
    switch(selectedFilter){
      case 'all': return films;
      case 'fav': return films.filter(film => film.favorite);
      case 'best': return films.filter(film => film.rating === 5);
      case 'last': return films.filter(film => {if(!film?.watchDate) return false; return film.watchDate.isAfter(dayjs().subtract(30,'day')); });
      case 'unseen': return films.filter(film => !film?.watchDate);
    }
  }

  return(
    <>
      <Row>
        <Col xs={3}>
          <h5 className="my-3">Filters</h5>
          <Filters filters={filters} selectedFilter={selectedFilter}/>
        </Col>
        <Col xs={9} className="pt-3">
          <h1>{filters[selectedFilter]} Films</h1>
          <FilmList films={filterFilms(props.films)} edit={props.edit} delete={props.delete}/>
        </Col>
      </Row>

      <Button variant="primary" className="rounded-circle fixed-right-bottom" onClick={()=>navigate('/add')}>
      <i className="bi bi-plus"></i>
      </Button>
    </>

  );
}

export default Home;