import { ListGroup } from "react-bootstrap";

function Filters(props) {
  const { selectedFilter } = props;

  return(
    <ListGroup className="mt-3">
      <ListGroup.Item className={selectedFilter === 'all' ? 'active' : ''} onClick={() => props.setSelectedFilter('all')}>All</ListGroup.Item>
      <ListGroup.Item className={selectedFilter === 'fav' ? 'active' : ''} onClick={() => props.setSelectedFilter('fav')}>Favorites</ListGroup.Item>
      <ListGroup.Item className={selectedFilter === 'best' ? 'active' : ''} onClick={() => props.setSelectedFilter('best')}>Best Rated</ListGroup.Item>
      <ListGroup.Item className={selectedFilter === 'last' ? 'active' : ''} onClick={() => props.setSelectedFilter('last')}>Seen Last Month</ListGroup.Item>
      <ListGroup.Item className={selectedFilter === 'unseen' ? 'active' : ''} onClick={() => props.setSelectedFilter('unseen')}>Unseen</ListGroup.Item>
    </ListGroup>
  );
}

export default Filters;
