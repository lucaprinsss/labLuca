import { ListGroup } from "react-bootstrap";

function Filters(props) {
  const { selectedFilter } = props;

  return(
    <ListGroup className="mt-3">
      <ListGroup.Item className={selectedFilter === 'all' ? 'active' : ''} onClick={() => props.setFilter('all')}>All</ListGroup.Item>
      <ListGroup.Item className={selectedFilter === 'fav' ? 'active' : ''} onClick={() => props.setFilter('fav')}>Favorites</ListGroup.Item>
      <ListGroup.Item className={selectedFilter === 'best' ? 'active' : ''} onClick={() => props.setFilter('best')}>Best Rated</ListGroup.Item>
      <ListGroup.Item className={selectedFilter === 'last' ? 'active' : ''} onClick={() => props.setFilter('last')}>Seen Last Month</ListGroup.Item>
      <ListGroup.Item className={selectedFilter === 'unseen' ? 'active' : ''} onClick={() => props.setFilter('unseen')}>Unseen</ListGroup.Item>
    </ListGroup>
  );
}

export default Filters;
