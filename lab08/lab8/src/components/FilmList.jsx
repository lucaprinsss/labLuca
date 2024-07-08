import { Col, ListGroup, ListGroupItem, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function FilmList(props) {
  const {films} = props;

  return(
    <ListGroup variant="flush">
      {films.map((film) => <FilmRow key={film.id} film={film} edit={props.edit} delete={props.delete}/>)}
    </ListGroup>
  );
}

function FilmRow (props) {
  const navigate = useNavigate();
  const {film} = props;
  
  return(
    <ListGroupItem>
      <Row>
        <Col xs={4} className="fs-5">{film.title}</Col>
        <Col xs={2} className="text-end">
          <input type="checkbox" defaultChecked={film.favorite} onChange={(event) => props.edit({...props.film, "favorite" : event.target.checked})}/>
          <label className="ms-1">Favorite</label>
        </Col>
        <Col xs={3} className="text-end">{film.watchDate && film.watchDate.format('MMMM D, YYYY')}</Col>
        <Col xs={3} className="text-end">
          <span className="text-warning">{renderStars(film)}</span>
          <span className="">
            <i className="bi bi-pencil ms-3" onClick={()=>{navigate(`/edit/${props.film.id}`)}}></i>
            <i className="bi bi-trash ms-1" onClick={()=>{props.delete(props.film.id)}}></i>
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
  