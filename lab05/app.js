'use strict';

function Film(id, title, isFavorite = false, watchDate = null, rating = 0, userId = 1) {
    this.id = id;
    this.title = title;
    this.favorite = isFavorite;
    this.rating = rating;
    // saved as dayjs object only if watchDate is truthy
    this.watchDate = watchDate && dayjs(watchDate);
    this.userId = userId

    this.toString = () => {
        return `Id: ${this.id}, ` +
        `Title: ${this.title}, Favorite: ${this.favorite}, ` +
        `Watch date: ${this.watchDate}, Score: ${this.rating}, ` +
        `User: ${this.userId}` ;
    }
}


function FilmLibrary() {
    this.list = [];

    this.addNewFilm = (film) => {
        if(!this.list.some(f => f.id == film.id))
        this.list.push(film);
        else
        throw new Error('Duplicate id');
    };

    this.deleteFilm = (id) => {
        const newList = this.list.filter(function(film, index, arr) {
        return film.id !== id;
        })
        this.list = newList;
    }

    this.getRated = () => {
        const newList = this.list.filter(function(film, index, arr) {
        return film.rating > 0;
        })
        return newList;
    }

    this.sortByDate = () => {
        const newArray = [...this.list];
        newArray.sort((d1, d2) => {
        if(!(d1.watchDate)) return  1;   // null/empty watchDate is the lower value
        if(!(d2.watchDate)) return -1;
        return d1.watchDate.diff(d2.watchDate, 'day')
        });
        return newArray;
    }
}


function init(library) {
    // Creating some film entries
    const pulpFiction = new Film(1, "Pulp Fiction", true, "2024-03-10", 5);
    const grams21 = new Film(2, "21 Grams", true, "2024-03-17", 4);
    const starWars = new Film(3, "Star Wars", false);
    const matrix = new Film(4, "Matrix", false);
    const shrek = new Film(5, "Shrek", false, "2024-03-21", 3);
    const brutto = new Film(6, "Brutto", false, "2024-03-30", 1);

    // Adding the films to the FilmLibrary
    library.addNewFilm(pulpFiction);
    library.addNewFilm(grams21);
    library.addNewFilm(starWars);
    library.addNewFilm(matrix);
    library.addNewFilm(shrek);
    library.addNewFilm(brutto);
}

function fillFilmsList(films) {
    const ul = document.getElementById('films-list');
    ul.innerHTML='';  //for clean the list from the old films

    for(const film of films){
        const li = document.createElement('li');
        ul.append(li);
        li.classList.add('list-group-item');
        const row = document.createElement('div');
        row.classList.add('row','gy-2');
        li.append(row);

        let div = document.createElement('div');
        div.classList.add('col-6', 'col-xl-3', 'd-flex', 'gap-2', 'align-items-center');
        div.innerText = film.title;
        row.append(div);

        div = document.createElement('div');
        div.classList.add('col-6', 'col-xl-3', 'text-end', 'text-xl-center');
        if(film.favorite){
            div.innerHTML = `<span class="custom-control custom-checkbox">
            <input type="checkbox" class="custom-control-input" id="films[2][favorite]" checked>
            <label class="custom-control-label" for="films[2][favorite]">Favorite</label>
          </span>`;
        } else {
            div.innerHTML = `<span class="custom-control custom-checkbox">
            <input type="checkbox" class="custom-control-input" id="films[2][favorite]">
            <label class="custom-control-label" for="films[2][favorite]">Favorite</label>
          </span>`;
        }
        row.append(div);


        div = document.createElement('div');
        div.classList.add('col-4', 'col-xl-3', 'text-xl-cente');
        if (film.watchDate){
            div.innerText = film.watchDate.format('MMMMDD, YYYY');
        } else {
            div.innerText = '';
        }
        row.append(div);

        div = document.createElement('div');
        div.classList.add('actions-container', 'col-8', 'col-xl-3', 'text-end', 'rating');
        if (film.rating) {
            for (let c=0; c<film.rating; c++){
                div.innerHTML = div.innerHTML + `<i class="bi bi-star-fill"></i>`;
                console.log('Add filled star');
            }
            for (let c=film.rating; c<5; c++){
                div.innerHTML = div.innerHTML + `<i class="bi bi-star"></i>`;
                console.log('Add star');
            }
        } else {
            div.innerHTML = `<i class="bi bi-star"></i>
            <i class="bi bi-star"></i>
            <i class="bi bi-star"></i>
            <i class="bi bi-star"></i>
            <i class="bi bi-star"></i>`;
        }
        
        row.append(div);

        div = document.createElement('div');
        div.classList.add('d-none', 'd-xl-flex', 'actions');
        div.innerHTML = `<i class="bi bi-pencil"></i>
        <i class="bi bi-trash"></i>`;
        row.append(div);
        
    }
}

function addFiltersListener() {
    
}

function main() {
    const library = new FilmLibrary();
    init(library);
    const films = [...library.list];
    fillFilmsList(films);
    addFiltersListener();

}

main();