import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react'
import NavHeader from './NavHeader'
import { Col, Container, Row } from 'react-bootstrap';
import Sidebar from './Sidebar';
import FilmslList from './FilmsList';
import { Film, FilmLibrary } from './FilmLibrary.mjs';

const library = new FilmLibrary();
library.init();

function App() {
  const [filter, setFilter] = useState("All");

  const setNewFilter = (newFilter) => {
    setFilter(newFilter);
  }

  return (
    <>
      <NavHeader />
      <Container fluid>
        <Row>
          <Col xs={3}>
            <Sidebar filter={filter} setNewFilter={setNewFilter}/>
          </Col>
          <Col xs={9}>
            <FilmslList library={library} filter={filter}/>
          </Col>
          
        </Row>
      </Container>
    </>
  )
}

export default App
