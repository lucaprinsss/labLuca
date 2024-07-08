import { Link } from "react-router-dom";


function NotFound() {
  return(
    <>
      <h2>Error: page not found!</h2>
      <img src="/GitHub404.png" className="my-3" style={{ display: 'block' }}/>
      <Link to="/" className="btn btn-primary" >Go Home!</Link>
    </>
  );
}

export default NotFound;