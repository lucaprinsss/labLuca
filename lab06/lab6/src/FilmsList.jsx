import 'bootstrap-icons/font/bootstrap-icons.css';
import { Button, Col, Form, Row, Table } from "react-bootstrap";

function FilmslList (props) {
    return(
    <>
      <Row>
        <Col as='h2'>{props.filter} films</Col>
      </Row>
      <Row>
        <Col>
          <FilmsTable library={props.library}/>
        </Col>
      </Row>
    </>
    )
}

function FilmsTable (props) {
    return(
      <Table striped>
        <tbody>
          {props.library.list.map((film) => <tr key={film.id}><FilmRow film={film}/></tr>)}
        </tbody>
      </Table>
    )
}

function FilmRow (props) {
    return (
        <>
          <td>{props.film.title}</td>
          <td>{props.film.favorite? <Form.Check type="checkbox" label="Favorite" checked={true} onChange={console.log("Click 1")}/> : <Form.Check type="checkbox" label="Favorite" onChange={console.log("Click")}/>}</td>
          <td>{props.film.watchDate ? props.film.watchDate.format('YYYY-MM-DD') :  " " }</td>
          <td><FilmRate rate={props.film.rating}/></td>
          <td><FilmAction /></td>
        </>

      )
}

function FilmRate (props) {
    let result = [];
    for(let i=0; i<props.rate; i++) {
        result.push(<i className="bi bi-star-fill"></i>);
    }
    for(let i=props.rate; i<5; i++) {
        result.push(<i className="bi bi-star"></i>);
    }
    return(result);
}

function FilmAction () {
    return(
    <>
      <Button><i className="bi bi-pencil"></i></Button>
      <Button className="mx-1" variant='danger'><i className="bi bi-trash"></i></Button> 
    </>);
}

export default FilmslList;