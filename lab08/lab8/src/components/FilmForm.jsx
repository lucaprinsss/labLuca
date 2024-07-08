import { useState } from "react";
import { Button, Form, FormGroup } from "react-bootstrap";
import dayjs from "dayjs";
import { Film } from "../films.mjs";
import { useNavigate } from "react-router-dom";

function FilmForm (props) {
  const [title, setTitle] = useState(props.filmToEdit ? props.filmToEdit.title : '');
  const [favorite, setFavorite] = useState(props.filmToEdit ? props.filmToEdit.favorite : false);
  const [watchDate, setWatchDate] = useState((props.filmToEdit && props.filmToEdit.watchDate) ? props.filmToEdit.watchDate.format('YYYY-MM-DD') : '');
  const [rating, setRating] = useState(props.filmToEdit && props.filmToEdit.rating ? props.filmToEdit.rating : 0);

  const [errors, setErrors] = useState([]);

  const navigate = useNavigate();
  

  const handleSubmit = (event) => {
    event.preventDefault();
    const validationErrors = validateForm();
    if(Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);  //quindi in errors posso avere title, watchDate e/o rating come attributi
      return;
    } else {
      setErrors([]);  //per essere certi che sia vuoto ma forse è superfluo
    }

    if(props.filmToEdit){
      const film = new Film(props.filmToEdit.id, title.trim(), favorite, watchDate, rating);
      props.edit(film);
    } else {
      const film = new Film(-1, title.trim(), favorite, watchDate, rating);  
      props.add(film);
    }

    navigate('/');
  }

  const validateForm = () => {
    const validationErrors = {}; //Creo un oggetto che avrà come proprietà: title, date e rating
    if(title.trim()===''){
      validationErrors.title = 'Title can not be empty';
    }
    if(dayjs(watchDate).isAfter(dayjs())){
      validationErrors.watchDate = 'Watch date cannot be in the future'
    }
    if(rating>5 || rating<0){
      validationErrors.rating = 'Rating should be between 0 and 5'
    }
    return validationErrors;
  }


  return(
    <>
      <Form className={"border border-primary rounded px-5 py-2 mt-3"} onSubmit={handleSubmit}>
      <h4 className="mt-3 ms-3">{props.mode === 'add'? 'Add' : 'Edit'} a film</h4>
        <Form.Group className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control className={errors.title? "is-invalid" : ""} type="text" required={true} value={title} onChange={event=>setTitle(event.target.value)}></Form.Control>
          <Form.Control.Feedback type="invalid">{errors.title}</Form.Control.Feedback>
        </Form.Group>
        <FormGroup className="mb-3">
          <Form.Check type="checkbox" label="Favorite" checked={favorite} onChange={event=>setFavorite(event.target.checked)}></Form.Check>
        </FormGroup>
        <FormGroup className="mb-3">
          <Form.Label>Watch date</Form.Label>
          <Form.Control className={errors.watchDate? "is-invalid" : ""} type="date" value={watchDate} onChange={event => event.target.value ? setWatchDate(dayjs(event.target.value).format('YYYY-MM-DD')) : setWatchDate("")}></Form.Control>
          <Form.Control.Feedback type="invalid">{errors.watchDate}</Form.Control.Feedback>
        </FormGroup>
        <FormGroup className="mb-3">
          <Form.Label>Rating</Form.Label>
          <Form.Control className={errors.rating? "is-invalid" : ""} type="number" min={0} max={5} step={1} value={rating} onChange={event => setRating(event.target.value==='' ? 0 : parseInt(event.target.value))}></Form.Control>
          <Form.Control.Feedback type="invalid">{errors.rating}</Form.Control.Feedback>
        </FormGroup>

        <Button className="m-3" variant="primary" type="submit">Save</Button>
        <Button className="my-3" variant="danger" onClick={()=>navigate('/')}>Cancel</Button>
      </Form>
    </>

  )
}

export default FilmForm;