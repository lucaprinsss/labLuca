import sqlite from 'sqlite3';
import dayjs from 'dayjs';

const db = new sqlite.Database('films.db', (err) => {  //non sto passando il nome del file ma la posizione di esso. assicurarsi che il percorso sia corretto
    if (err) throw err;
});

function Film(id, title, isFavorite=false, rating=0, watchDate=null, userId=1) {
    this.id = id;
    this.title = title;
    this.isFavorite = isFavorite;
    this.rating = rating;
    if(watchDate) this.watchDate = dayjs(watchDate); else this.watchDate = null;  //i film non visti hanno data null! Attenzione a non lanciare metodi di un oggetto null!
    this.userId = userId;

    this.toString = () => {
        let string = `Id: ${this.id},  Title: ${this.title},  Is favorite: ${this.isFavorite},  Rating: ${this.rating},  WatchDate: `;
        if (this.watchDate)
            string += this.watchDate.format('DD-MM-YYYY');
        else
            string += ' ';
        string += `,  UserId: ${this.userId}`;
        return string;
    };
}

function FilmLibrary() {
    this.films = [];
    
    /*this.addNewFilm = (film) => {
        this.films.push(film);
        //SOLUZIONE CON CONTROLLO:
        //if(!this.list.some(f => f.id == film.id))
            //this.list.push(film);
        //else
            //throw new Error('Duplicate id');
    }*/

    /*this.sortByDate = () => {
        return [...this.films].sort((a, b) => {
            if(!(a.watchDate)) return 1;
            if(!(b.watchDate)) return -1;
            return (a.watchDate.isAfter(b.watchDate) ? 1 : -1);
        });
    };*/

    /*this.deleteFilm = (id) => { //conviene non eliminare un elemento dall'array su cui sto ciclando
        this.films = this.films.filter((film) => film.id !== id);
    };*/

    /*this.resetWatchedFilms = () => {
        this.films.forEach((film) => film.watchDate = null);
    };*/

    /*this. getRated = () => {
        return [...this.films].filter(film => film.rating > 0).sort((a, b) => a.score - b.score);
    };*/
    
    /*this.toString = () => {
        let result ='Elenco film:\n';
        this.films.forEach((film) => {
            result += (film.toString() + '\n')
        });
        return result;
    };*/

    this.allFilm = () => {
        return new Promise((resolve, reject) => {
            const sql = 'SELECT * FROM films';
            db.all(sql, (err, rows) => {
                if (err) {
                    reject (err);
                } else if (rows !== undefined) {
                    const result = rows.map(row => new Film(row.id, row.title, row.isFavorite, row.rating, row.watchDate, row.userId));
                    resolve (result);
                } else {
                    reject ('No films found');
                }
            });
        });
    }

    this.allFavoriteFilm = () => {
        return new Promise((resolve, reject) => {
            const sql = 'SELECT * FROM films WHERE isFavorite=1';
            db.all(sql, (err, rows) => {
                if (err) {
                    reject (err);
                } else if (rows !== undefined) {
                    const result = rows.map(row => new Film(row.id, row.title, row.isFavorite, row.rating, row.watchDate, row.userId));
                    resolve (result);
                } else {
                    reject ('No films found');
                }
            });
        });
    }

    this.todayFilm = () => {
        return new Promise((resolve, reject) => {
            const sql = 'SELECT * FROM films WHERE watchDate=DATE(?)';
            db.all(sql, dayjs().toISOString(),(err, rows) => {
                if (err) {
                    reject (err);
                } else if (rows !== undefined) {
                    const result = rows.map(row => new Film(row.id, row.title, row.isFavorite, row.rating, row.watchDate, row.userId));
                    resolve (result);
                } else {
                    reject ('No films found');
                }
            });
        });
    }

    this.beforeDateFilm = (date) => {  //la data passata è esclusa
        return new Promise((resolve, reject) => {
            const sql = 'SELECT * FROM films WHERE watchDate<?';
            db.all(sql, dayjs(date).toISOString(),(err, rows) => {
                if (err) {
                    reject (err);
                } else if (rows !== undefined) {
                    const result = rows.map(row => new Film(row.id, row.title, row.isFavorite, row.rating, row.watchDate, row.userId));
                    resolve (result);
                } else {
                    reject ('No films found');
                }
            });
        });
    }
}

async function main() {
    const libreria = new FilmLibrary();
    const films = await libreria.beforeDateFilm('2024-03-22');
    films.forEach(film => console.log(film.toString()));
    //console.log('Number of films watched today: ' + films.length);
}
main();