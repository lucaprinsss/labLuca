import { ListGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function Filters(props) {
  const { selectedFilter } = props;
  const navigate = useNavigate();

  return(
    <ListGroup className="mt-3">
      <ListGroup.Item key={'filter-all'} className={selectedFilter === 'all' ? 'active' : ''} onClick={() => navigate('/filters/all')}>All</ListGroup.Item>
      <ListGroup.Item key={'filter-fav'} className={selectedFilter === 'fav' ? 'active' : ''} onClick={() => navigate('/filters/fav')}>Favorites</ListGroup.Item>
      <ListGroup.Item key={'filter-best'} className={selectedFilter === 'best' ? 'active' : ''} onClick={() => navigate('/filters/best')}>Best Rated</ListGroup.Item>
      <ListGroup.Item key={'filter-last'} className={selectedFilter === 'last' ? 'active' : ''} onClick={() => navigate('/filters/last')}>Seen Last Month</ListGroup.Item>
      <ListGroup.Item key={'filter-unseen'} className={selectedFilter === 'unseen' ? 'active' : ''} onClick={() => navigate('/filters/unseen')}>Unseen</ListGroup.Item>
    </ListGroup>
  );
}

export default Filters;
