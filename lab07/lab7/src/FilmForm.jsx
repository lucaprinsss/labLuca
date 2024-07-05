import { Button, Form, FormGroup } from "react-bootstrap";
import { Film } from "./films.mjs";
import { useState } from "react";
import dayjs from "dayjs";

function FilmForm (props) {
  const [title, setTitle] = useState(props.filmToEdit ? props.filmToEdit.title : '');
  const [favorite, setFavorite] = useState(props.filmToEdit ? props.filmToEdit.favorite : false);
  const [watchDate, setWatchDate] = useState((props.filmToEdit && props.filmToEdit.watchDate) ? props.filmToEdit.watchDate.format('YYYY-MM-DD') : '');
  const [rating, setRating] = useState(props.filmToEdit && props.filmToEdit.rating ? props.filmToEdit.rating : 0);
  
  const handleSubmit = (event) => {
    event.preventDefault();
    //Validazione film!!

    if(props?.filmToEdit){
      const film = new Film(props.filmToEdit.id, title.trim(), favorite, watchDate, rating);
      props.edit(film);
    } else {
      const film = new Film(-1, title.trim(), favorite, watchDate, rating);  
      props.add(film);
    }
    props.setMode('view');
  }

  return(
    <>
      <Form className={"border border-primary rounded px-5 py-2 mt-3"} onSubmit={handleSubmit}>
      <h4 className="mt-3 ms-3">{props?.filmToEdit ? 'Add' : 'Edit'} a film</h4>
        <Form.Group className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control type="text" required={true} onChange={event=>setTitle(event.target.value)}></Form.Control>
        </Form.Group>
        <FormGroup className="mb-3">
          <Form.Check type="checkbox" label="Favorite" onChange={event=>setFavorite(event.target.checked)}></Form.Check>
        </FormGroup>
        <FormGroup className="mb-3">
        <Form.Label>Watch date</Form.Label>
        <Form.Control type="date" onChange={event => event.target.value ? setWatchDate(dayjs(event.target.value).format('YYYY-MM-DD')) : setWatchDate("")}></Form.Control>
        </FormGroup>
        <FormGroup className="mb-3">
        <Form.Label>Rating</Form.Label>
        <Form.Control type="number" min={0} max={5} step={1} onChange={event => setRating(event.target.value==='' ? 0 : parseInt(event.target.value))}></Form.Control>
        </FormGroup>

        <Button className="m-3" variant="primary" type="submit">Save</Button>
        <Button className="my-3" variant="danger" onClick={()=>props.setMode('view')}>Cancel</Button>
      </Form>
    </>

  )
}

export default FilmForm;