import { Col, ListGroup, ListGroupItem, Row } from "react-bootstrap";

function FilmList(props) {
  const {films} = props;

  return(
    <ListGroup variant="flush">
      {films.map((film) => <FilmRow key={film.id} film={film} />)}
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
          <span className="text-warning">{renderStars(film.rating)}</span>
          <span className="">
            <i className="bi bi-pencil ms-3"></i>
            <i className="bi bi-trash ms-1"></i>
            </span>
        </Col>
      </Row>
    </ListGroupItem>
  )
}


const renderStars = (rating) => {
  const stars = [];
  for (let i=0; i<rating; i++){
    stars.push(<i className="bi bi-star-fill" />);
  }
  for (let i=rating; i<5; i++){
    stars.push(<i className="bi bi-star" />);
  }
  return stars;
}
  
  export default FilmList;
  