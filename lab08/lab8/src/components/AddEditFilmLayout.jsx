import { useParams } from "react-router-dom";
import FilmForm from "./FilmForm";
import NotFound from "./NotFound";


function AddEditFilmLayout (props) {
  const {filmId} = useParams();
  const numericFilmId = parseInt(filmId, 10);
  
  if(props.mode === 'add'){
    return(<FilmForm mode='add' add={props.add}/>);
  }

  //siamo in mode='view'
  if(numericFilmId){
    const filmToEdit = props.films.find(film=>film.id===numericFilmId);
    if (filmToEdit)
      return(<FilmForm filmToEdit={filmToEdit} mode='edit' edit={props.edit}/>);
  }

  //filmId non presente o filmToEdit non trovato
  return(<NotFound/>);
  
}

export default AddEditFilmLayout;