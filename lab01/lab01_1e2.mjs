'use strict';
import dayjs from 'dayjs';

function Film(id, title, favorite=false, date=null, rating=0, user=1) {
    this.id = id;
    this.title = title;
    this.favourite = favorite;

    if(date)
        this.date = dayjs(date);
    else
        this.date = null;  //i film non visti hanno data nulla
        
    this.rating = rating;
    this.user = user;

    this.toString = () => {
        let string = `Id: ${this.id},  Title: ${this.title},  Is favourite: ${this.favourite},  Date: `;
        if (this.date)
            string += this.date.format('DD-MM-YYYY');
        else
            string += ' ';
        string += `,  Rating: ${this.rating},  User: ${this.user}`;
        return string;
    };
}

function FilmLibrary() {
    this.films = [];
    
    this.addNewFilm = (film) => {
        this.films.push(film);
        //SOLUZIONE CON CONTROLLO:
        //if(!this.list.some(f => f.id == film.id))
            //this.list.push(film);
        //else
            //throw new Error('Duplicate id');
    }

    this.sortByDate = () => {
        return [...this.films].sort((a, b) => {
            if(!(a.date)) return 1;
            if(!(b.date)) return -1;
            return (a.date.isAfter(b.date) ? 1 : -1);
        });
    };

    this.deleteFilm = (id) => { //conviene non eliminare un elemento dall'array su cui sto ciclando
        this.films = this.films.filter((film) => film.id !== id);
    };

    this.resetWatchedFilms = () => {
        this.films.forEach((film) => film.date = null);
    };

    this. getRated = () => {
        return [...this.films].filter(film => film.rating > 0).sort((a, b) => a.score - b.score);
    };
    

    this.toString = () => {
        let result ='';
        this.films.forEach((film) => {
            result += (film.toString() + '\n')
        });
        return result;
    };
}


let library = new FilmLibrary();
library.addNewFilm(new Film (1, "Pulp Fiction", true, '2024-03-10', 5, 1));
library.addNewFilm(new Film (2, "21 Grams", true, '2024-03-17', 4, 1));
library.addNewFilm(new Film (3, "Star Wars", false));
library.addNewFilm(new Film (4, "Matrix", false));
library.addNewFilm(new Film (5, "Shrek", false, '2024-03-21', 3, 1));

//console.log(library.films[4]);
//library.films.forEach(film => {console.log(film.toString())});

//library.sortByDate().forEach(film => {console.log(film.toString())});

//library.deleteFilm(2);
//library.films.forEach(film => {console.log(film.toString())});

//library.resetWatchedFilms();
//library.films.forEach(film => {console.log(film.toString())});

library.getRated().forEach(film => {console.log(film.toString())});