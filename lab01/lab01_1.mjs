'use strict';
import dayjs from 'dayjs';

function Film(id, title, user=1, favorite=false, date='', rating=0) {
    this.id = id;
    this.title = title;
    this.user = user;
    this.favourite = favorite;
    /*if(date)
        this.date = dayjs(date);
    else
        this.date = dayjs('1970-01-01');*/
    this.date = dayjs(date);
    this.rating = rating;

    this.toString = () => {
        return `Id: ${this.id}, title: ${this.title}, user: ${this.user}, is favourite: ${this.favourite}, date: ${this.date.format('DD-MM-YYYY')}, rating: ${this.rating}`;
    };
}

function FilmLibrary() {
    this.films = [];
    
    this.addNewFilm = (film) => {
        this.films.push(film);
    }

    this.sortByDate = () => {
        return [...this.films].sort((a, b) => {
            if(a.date == dayjs('')) return 1;
            if(b.date == dayjs('')) return -1;
            return (a.date.isAfter(b.date) ? 1 : -1);
        });
        /*let result = [...this.films];
        result.sort((a, b) => {
            if(!a.date) return 1;
            if(!b.date) return -1;
            return a.date.isAfter(b.date) ? 1 : -1;
        })
        return result;*/
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
library.addNewFilm(new Film (1, "Pulp Fiction", 1, true, '2024-03-10', 5));
library.addNewFilm(new Film (2, "21 Grams", 1, true, '2024-03-17', 4));
library.addNewFilm(new Film (3, "Star Wars", 1, false));
library.addNewFilm(new Film (4, "Matrix", 1, false));
library.addNewFilm(new Film (5, "Shrek", 1, false, '2021-03-21', 3));

//console.log(library.films[4]);

console.log('library by date:\n' + [...library.getRated()]);