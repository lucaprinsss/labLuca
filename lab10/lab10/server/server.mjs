//import
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import {check, validationResult} from 'express-validator';
import {getAll, getFavorites, getWatchedThisMonth, getFilm, getWatchedToday, getWatchedBefore, getRatedAbove, getUnseen, getContainingString, deleteFilm, addFilm, resetWatchDates, updateFilm, updateFilmFavorite} from './dao.mjs';
import Film from './Film.mjs';
import dayjs from 'dayjs';

// init
const app = express();
const port = 3001;

// middleware
app.use(express.json());
app.use(morgan('dev'));
app.use(cors());

// Set up and enable Cross-Origin Resource Sharing (CORS)
const corsOptions = {
  origin: 'http://localhost:5173'
};
app.use(cors(corsOptions));


/* ROUTES */

// GET /api/films?filter=...  //Se scrivessi /api/films/filter avrei poi problemi a recuperare il singolo film perché la url è la stessa, devo usare un filtro!
app.get('/api/films', (request, response) => {
    const filter = request.query.filter;
    switch(filter){
        case 'all':
            getAll().then(results => {response.json(results)}).catch(()=>response.status(500).end());
            break;
        case undefined:  //se non è presente il parametro filter nella query, request.query.filter ritorna undefined
            getAll().then(results => {response.json(results)}).catch(()=>response.status(500).end());
            break;
        case 'fav':
            getFavorites().then(results => {response.json(results)}).catch(()=>response.status(500).end());
            break;
        case 'best':
            getRatedAbove(5).then(results => {response.json(results)}).catch(()=>response.status(500).end());
            break;
        case 'last':
            getWatchedThisMonth().then(results => {response.json(results)}).catch(()=>response.status(500).end());
            break;
        case 'unseen':
            getUnseen().then(results => {response.json(results)}).catch(()=>response.status(500).end());
            break;
        default:
            response.status(400).end();
    }
});

// GET /api/films/<id>
app.get('/api/films/:id', async (request, response) => {
    try {
        const result = await getFilm(request.params.id);
        if(result.error)
          response.status(404).json(result);
        else
          response.json(result);
      } catch {
        response.status(500).end();
      }
});

app.post('/api/films', async (request, response) => {
    //validazione parametri
    try {
        const film = new Film(-1, request.body.title, request.body.favorite, request.body.rating, dayjs(request.body.watchDate).format('YYYY-MM-DD'), request.body.userId);
        const result = await addFilm(film);
        response.json(result);
    } catch (err) {
        response.status(503).json({error: `Database error during the creation of new film: ${err}`});
    }
});

app.put('/api/films/:id', async (request, response) => {
    //validazione parametri
    try {
        const film = new Film(request.params.id, request.body.title, request.body.favorite,  request.body.rating, request.body.watchDate, request.body.userId);
        const result = await updateFilm(film);
        if (result.error)
                response.status(404).json(result);
            else
                response.json(result);
    } catch (err) {
        response.status(503).json({error: `Database error during the creation of new film: ${err}`});
    }
});

app.put('/api/films/:id/favorite', async (request, response) => {
    //validazione parametri
    try {
        const result = await updateFilmFavorite(request.params.id);
        if (result.error)
                response.status(404).json(result);
            else
                response.json(result);
    } catch (err) {
        response.status(503).json({error: `Database error during the creation of new film: ${err}`});
    }
});

app.put('/api/films/:id/rating', async (request, response) => {
    //validazione parametri
    try {
        const film = await getFilm(request.params.id);
        if (film.error)
            response.status(404).json(result);
        film.rating = request.body.rating;
        console.log(film);
        const result = await updateFilm(film);
        if (result.error)
                response.status(404).json(result);
            else
                response.json(result);
    } catch (err) {
        response.status(503).json({error: `Database error during the creation of new film: ${err}`});
    }
});

app.delete('/api/films/:id', async (request, response) => {
    //validazione :id
    try {
        // NOTE: if there is no film with the specified id, the delete operation is considered successful.
        await deleteFilm(request.params.id);
        response.status(200).end();
    } catch (err) {
        response.status(503).json({error: `Database error during the deletion of film ${request.params.id}: ${err} `});
    }
});

// far partire il server
app.listen(port, () => { console.log(`API server started at http://localhost:${port}`); });