import { Col, ListGroup, Row } from "react-bootstrap";

function Sidebar (props) {
    return(
    <>
      <Row>
        <Col as='h2'>Filters</Col>
      </Row>
      <Row>
        <FiltersList filter={props.filter} setNewFilter={props.setNewFilter}/>
      </Row>
    </>
    )
}

function FiltersList (props) {
    return(
      <ListGroup>
        <ListGroup.Item>All</ListGroup.Item>
        <ListGroup.Item>Favorites</ListGroup.Item>
        <ListGroup.Item>Best Rated</ListGroup.Item>
        <ListGroup.Item>Seen Last Month</ListGroup.Item>
        <ListGroup.Item>Useen</ListGroup.Item>
      </ListGroup>

    )
}

export default Sidebar;