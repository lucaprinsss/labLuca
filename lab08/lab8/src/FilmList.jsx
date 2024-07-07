import { Col, ListGroup, ListGroupItem, Row } from "react-bootstrap";

function FilmList(props) {
  const {films} = props;

  return(
    <ListGroup variant="flush">
      {films.map((film) => <FilmRow key={film.id} film={film} setFilmToEdit={props.setFilmToEdit} setMode={props.setMode}/>)}
    </ListGroup>
  );
}

function FilmRow (props) {
  const {film} = props;
  
  return(
    <ListGroupItem>
      <Row>
        <Col xs={4} className="fs-5">{film.title}</Col>
        <Col xs={2} className="text-end">
          <input type="checkbox" defaultChecked={film.favorite}/>
          <label className="ms-1">Favorite</label>
        </Col>
        <Col xs={3} className="text-end">{film.watchDate && film.watchDate.format('MMMM D, YYYY')}</Col>
        <Col xs={3} className="text-end">
          <span className="text-warning">{renderStars(film)}</span>
          <span className="">
            <i className="bi bi-pencil ms-3" onClick={()=>{props.setFilmToEdit(film); props.setMode('edit');}}></i>
            <i className="bi bi-trash ms-1"></i>
            </span>
        </Col>
      </Row>
    </ListGroupItem>
  )
}

const renderStars = (film) => {
  const stars = [];
  for (let i=0; i<film.rating; i++){
    stars.push(<i key={`star-${film.id}-${i+1}`} className="bi bi-star-fill" />);
  }
  for (let i=film.rating; i<5; i++){
    stars.push(<i key={`star-${film.id}-${i+1}`} className="bi bi-star" />);
  }
  return stars;
}
  
export default FilmList;
  