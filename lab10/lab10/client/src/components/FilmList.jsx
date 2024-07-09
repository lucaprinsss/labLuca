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
  
  const renderStars = () => {
    const stars = [];
    for (let i=1; i<=film.rating; i++){
      stars.push(<i key={`star-${film.id}-${i}`} className="bi bi-star-fill" onClick={()=>props.edit({...props.film, "rating" : i})} />);
    }
    for (let i=film.rating+1; i<=5; i++){
      stars.push(<i key={`star-${film.id}-${i}`} className="bi bi-star" onClick={()=>props.edit({...props.film, "rating" : i})} />);
    }
    return stars;
  }

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


  
export default FilmList;
  