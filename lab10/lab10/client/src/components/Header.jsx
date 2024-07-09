import { Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function Header () {
  const navigate = useNavigate();
  return(
    
      <Container fluid className="px-3 py-2 bg-primary text-white">
        <Row className=" align-items-center">
          <Col xs={3} className="fs-4">
            <div className="d-inline-block p-2" onClick={()=>navigate('/')}>
              <i className="bi bi-play-btn-fill me-2"></i>
              <span>Film Library</span>
            </div>

          </Col>
          <Col xs={6} >
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