import { Form, Navbar } from 'react-bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.css';


function NavHeader () {
    return(
    <Navbar className='container-fluid align-items-center' bg={'primary'}>
        <div className="col-3">
          <a className="d-flex align-items-center justify-content-center justify-content-md-start h-100 link-light text-decoration-none" href="#">
            <i className="bi bi-collection-play-fill"></i>
            <span>Film Library</span>
          </a>
        </div>
        <div className='col-6 align-items-center'>
          <Form className="d-flex" role="search">
            <Form.Control className="form-control me-2" type="search" placeholder="Search..." aria-label="Search"></Form.Control> 
          </Form>
        </div>
        <div className='col-3 d-flex justify-content-end'>
          <a href="#" className="d-block link-light text-decoration-none">
            <i className="bi bi-person-circle"></i>
          </a>
        </div>
      </Navbar>
    )
}

export default NavHeader;