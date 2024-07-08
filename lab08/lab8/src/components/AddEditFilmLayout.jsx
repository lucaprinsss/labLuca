import { useParams } from "react-router-dom";
import FilmForm from "./FilmForm";
import NotFound from "./NotFound";


function AddEditFilmLayout (props) {
  const {filmId} = useParams();
  const numericFilmId = Number(filmId)  //parseInt(filmId, 10); Meglio Number perché è più restrittivo: Se metto ParseInt("1a",10) mi ritorna 1!
  
  if(props.mode === 'add'){  //In realtà la props.mode è superflua, basterebbe mettere if(porps.films){Siamo in modalità edit}else{Modalità add
    return(<FilmForm add={props.add}/>);
  }

  //siamo in mode='edit'
  if(numericFilmId){
    const filmToEdit = props.films.find(film => film.id===numericFilmId);
    if (filmToEdit)
      return(<FilmForm filmToEdit={filmToEdit} edit={props.edit}/>);
  }

  //filmId non presente o filmToEdit non trovato
  return(<NotFound/>);
  
}

export default AddEditFilmLayout;