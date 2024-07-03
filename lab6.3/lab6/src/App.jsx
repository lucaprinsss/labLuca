import {INITIAL_FILMS} from "./films.mjs";
import {Col, Container, Row} from 'react-bootstrap';
import Header from './Header.jsx';
import Filters from './Filters';
import FilmList from './FilmList.jsx';


function App() {

  return (
    <>
      <Container fluid>
        <Row>
          <Header />
        </Row>
        <Row>
          <Col xs={3}>
            <Filters />
          </Col>
          <Col xs={9}>
            <FilmList />
          </Col>
        </Row>
      </Container>
      
    </>
  )
}

export default App
