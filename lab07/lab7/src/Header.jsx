import { Col, Container, Row } from "react-bootstrap";

function Header () {
  return(
    
      <Container fluid className="p-3 align-items-center bg-primary text-white">
        <Row>
          <Col xs={3} className="fs-4">
            <i className="bi bi-play-btn-fill"></i>
            <span>Film Library</span>
          </Col>
          <Col xs={6}>
            <form>
              <input type="search" placeholder="Search..." className="form-control"/>
            </form>
          </Col>
          <Col xs={3} className="d-flex justify-content-end">
            <i className="bi bi-person-circle fs-4"></i>
          </Col>
        </Row>
      </Container>
    
  );
}

export default Header;