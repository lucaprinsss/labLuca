import { Button, Form, FormGroup } from "react-bootstrap";
import { Film } from "./films.mjs";
import { useState } from "react";
import dayjs from "dayjs";

function FilmForm (props) {
  const [title, setTitle] = useState(props.filmToEdit ? props.filmToEdit.title : '');
  const [favorite, setFavorite] = useState(props.filmToEdit ? props.filmToEdit.favorite : false);
  const [watchDate, setWatchDate] = useState((props.filmToEdit && props.filmToEdit.watchDate) ? props.filmToEdit.watchDate.format('YYYY-MM-DD') : '');
  const [rating, setRating] = useState(props.filmToEdit && props.filmToEdit.rating ? props.filmToEdit.rating : 0);

  const [errors, setErrors] = useState([]);
  
  const handleSubmit = (event) => {
    event.preventDefault();

    const validationErrors = validateForm();
    if(Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);  //quindi in errors posso avere title, watchDate e/o rating
      return;
    } else {
      setErrors([]);
    }

    if(props.filmToEdit){
      const film = new Film(props.filmToEdit.id, title.trim(), favorite, watchDate, rating);
      props.edit(film);
    } else {
      const film = new Film(-1, title.trim(), favorite, watchDate, rating);  
      props.add(film);
    }
    props.setMode('view');
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
      <h4 className="mt-3 ms-3">{props?.filmToEdit ? 'Edit' : 'Add'} a film</h4>
        <Form.Group className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control className={errors.title? "is-invalid" : ""} type="text" required={true} value={title} onChange={event=>setTitle(event.target.value)}></Form.Control>
        </Form.Group>
        <FormGroup className="mb-3">
          <Form.Check type="checkbox" label="Favorite" checked={favorite} onChange={event=>setFavorite(event.target.checked)}></Form.Check>
        </FormGroup>
        <FormGroup className="mb-3">
        <Form.Label>Watch date</Form.Label>
        <Form.Control className={errors.watchDate? "is-invalid" : ""} type="date" value={watchDate} onChange={event => event.target.value ? setWatchDate(dayjs(event.target.value).format('YYYY-MM-DD')) : setWatchDate("")}></Form.Control>
        </FormGroup>
        <FormGroup className="mb-3">
        <Form.Label>Rating</Form.Label>
        <Form.Control className={errors.rating? "is-invalid" : ""} type="number" min={0} max={5} step={1} value={rating} onChange={event => setRating(event.target.value==='' ? 0 : parseInt(event.target.value))}></Form.Control>
        </FormGroup>

        {Object.keys(errors).length > 0 ? 
         <div>{Object.keys(errors).map((err, index)=>(<p className="text-danger mb-0">{"Error "+(index)+": "+errors[err]}</p>))}</div>
         : ''
        }

        <Button className="m-3" variant="primary" type="submit">Save</Button>
        <Button className="my-3" variant="danger" onClick={()=>props.setMode('view')}>Cancel</Button>
      </Form>
    </>

  )
}

export default FilmForm;