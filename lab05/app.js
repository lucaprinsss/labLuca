'use strict';

let filterStatus ="all";    //Per non complicarsi la vita con questa variabile, era sufficiente rimuvere il nodo HTML con .remove() e rimuovere il film dalla libreria con deleteFilm()
                            //Non è necessario ricaricare tutti i film!

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

    this.getFavorite = () => {
        const newList = this.list.filter(function(film, index, arr) {
        return film.favorite == true;
        })
        return newList;
    }

    this.getBestRated = () => {
        const newList = this.list.filter(function(film, index, arr) {
        return film.rating === 5;
        })
        return newList;
    }

    this.getSortByDate = () => {
        const newArray = [...this.list];
        newArray.sort((d1, d2) => {
        if(!(d1.watchDate)) return  1;   // null/empty watchDate is the lower value
        if(!(d2.watchDate)) return -1;
        return d1.watchDate.diff(d2.watchDate, 'day')
        });
        return newArray;
    }

    this.getSeenLastMonth = () => {
        const newArray = [...this.list].filter(function(film, index, arr) {
            return film.watchDate !== null;
            });
        const finalArray = newArray.filter(function(film, index, arr) {
            return film.watchDate.isAfter(dayjs().add(1,'hour').subtract(1,'month'));
            });
        finalArray.sort((d1, d2) => {
        if(!(d1.watchDate)) return  1;   // null/empty watchDate is the lower value
        if(!(d2.watchDate)) return -1;
        return d2.watchDate.diff(d1.watchDate, 'day')
        });
        return finalArray;
    }

    this.getUnseen = () => {
        const newArray = [...this.list].filter(function(film, index, arr) {
            return film.watchDate === null;
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
    const shark = new Film(7, "Shark", true, "2024-04-24", 5);

    // Adding the films to the FilmLibrary
    library.addNewFilm(pulpFiction);
    library.addNewFilm(grams21);
    library.addNewFilm(starWars);
    library.addNewFilm(matrix);
    library.addNewFilm(shrek);
    library.addNewFilm(brutto);
    library.addNewFilm(shark);
}

function fillFilmsList(films, library) {
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
            div.innerText = film.watchDate.format('MMMM DD, YYYY');
        } else {
            div.innerText = '';
        }
        row.append(div);

        div = document.createElement('div');
        div.classList.add('actions-container', 'col-8', 'col-xl-3', 'text-end', 'rating');
        if (film.rating) {
            for (let c=0; c<film.rating; c++){
                div.innerHTML = div.innerHTML + `<i class="bi bi-star-fill"></i>`;
            }
            for (let c=film.rating; c<5; c++){
                div.innerHTML = div.innerHTML + `<i class="bi bi-star"></i>`;
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
        const pencil = document.createElement('i');
        pencil.classList.add('bi', 'bi-pencil');
        div.append(pencil);
        const trash = document.createElement('i');
        trash.classList.add('bi', 'bi-trash');
        trash.addEventListener('click', event => {
            //event.currentTarget.parentElement.parentElement.parentElement.remove();
            library.deleteFilm(film.id);
            switch (filterStatus) {
                case 'all':
                    fillFilmsList(library.list, library);
                    break;
                case 'fav':
                    fillFilmsList(library.getFavorite(), library);
                    break;
                case 'best':
                    fillFilmsList(library.getBestRated(), library);
                    break;
                case 'last':
                    fillFilmsList(library.getSeenLastMonth(), library);
                    break;
                case 'unseen':
                    fillFilmsList(library.getUnseen(), library);
                    break;
                default:
                    console.log("Filter not found!")
            } 
        });
        div.append(trash);
        row.append(div);
    }
}

function addFiltersListener(library) {
    const all = document.getElementById('button-filter-all');
    const fav = document.getElementById('button-filter-favorites');
    const best = document.getElementById('button-filter-best');
    const last = document.getElementById('button-filter-lastSeen');
    const unseen = document.getElementById('button-filter-unseen');
    const title = document.getElementById('filter-title');

    all.addEventListener('click', event => {
        all.classList.add('active');
        all.classList.remove('link-dark');
        fav.classList.remove('active');
        fav.classList.add('link-dark');
        best.classList.remove('active');
        best.classList.add('link-dark');
        last.classList.remove('active');
        last.classList.add('link-dark');
        unseen.classList.remove('active');
        unseen.classList.add('link-dark');
        title.innerText = 'All';

        const films = [...library.list];
        fillFilmsList(films, library);

        filterStatus = 'all';
    });
    
    fav.addEventListener('click', event => {
        all.classList.remove('active');
        all.classList.add('link-dark');
        fav.classList.add('active');
        fav.classList.remove('link-dark');
        best.classList.remove('active');
        best.classList.add('link-dark');
        last.classList.remove('active');
        last.classList.add('link-dark');
        unseen.classList.remove('active');
        unseen.classList.add('link-dark');
        title.innerText = 'Favorites';

        const films = library.getFavorite();
        fillFilmsList(films, library);

        filterStatus = 'fav';
    });

    best.addEventListener('click', event => {
        all.classList.remove('active');
        all.classList.add('link-dark');
        fav.classList.remove('active');
        fav.classList.add('link-dark');
        best.classList.add('active');
        best.classList.remove('link-dark');
        last.classList.remove('active');
        last.classList.add('link-dark');
        unseen.classList.remove('active');
        unseen.classList.add('link-dark');
        title.innerText = 'Best';

        const films = library.getBestRated();
        fillFilmsList(films, library);

        filterStatus = 'best';
    });

    last.addEventListener('click', event => {
        all.classList.remove('active');
        all.classList.add('link-dark');
        fav.classList.remove('active');
        fav.classList.add('link-dark');
        best.classList.remove('active');
        best.classList.add('link-dark');
        last.classList.add('active');
        last.classList.remove('link-dark');
        unseen.classList.remove('active');
        unseen.classList.add('link-dark');
        title.innerText = 'Last seen';

        const films = library.getSeenLastMonth();
        fillFilmsList(films, library);

        filterStatus = 'last';
    });

    unseen.addEventListener('click', event => {
        all.classList.remove('active');
        all.classList.add('link-dark');
        fav.classList.remove('active');
        fav.classList.add('link-dark');
        best.classList.remove('active');
        best.classList.add('link-dark');
        last.classList.remove('active');
        last.classList.add('link-dark');
        unseen.classList.add('active');
        unseen.classList.remove('link-dark');
        title.innerText = 'Unseen';

        const films = library.getUnseen();
        fillFilmsList(films, library);

        filterStatus = 'unseen';
    });
}

function main() {
    const library = new FilmLibrary();
    init(library);
    const films = library.list;  //[...library.list];
    fillFilmsList(films, library);  //passo la library così da avere i metodi e la lista film disponibile
    addFiltersListener(library);  //passo la library così da avere i metodi e la lista film disponibile
}

main();