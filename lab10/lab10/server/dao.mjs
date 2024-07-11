/* Data Access Object (DAO) module for accessing the database "films.db"*/
import sqlite3 from "sqlite3";
import Film from "./Film.mjs";
import dayjs from "dayjs";

function mapRowsToFilms(rows) {
    return rows.map(row => new Film(row.id, row.title, row.isFavorite === 1, dayjs(row.watchDate).add(1, 'hour'), row.rating, row.userId));
}

//open the database
const db = new sqlite3.Database('films.db', (err) => {
    if (err) throw err;
});

export const closeDB = () => {
    try {
        db.close();
    } catch (error) {
        console.error(`Impossible to close the database! ${error}`);
    }
}

export const getAll = () => {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM films';
        db.all(query, [], (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(mapRowsToFilms(rows));
            }
        });
    });
};

export const getFavorites = () => {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM films WHERE isFavorite = 1';
        db.all(query, [], (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(mapRowsToFilms(rows));
            }
        });
    });
};

export const getWatchedToday = () => {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM films WHERE watchdate = ?';
        const today = dayjs().format('YYYY-MM-DD');
        db.all(query, [today], (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(mapRowsToFilms(rows));
            }
        });
    });
}

export const getWatchedBefore = (watchDate) => {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM films WHERE watchDate < ?';
        db.all(query, [watchDate.format('YYYY-MM-DD')], (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(mapRowsToFilms(rows));
            }
        });
    });
};

export const getWatchedThisMonth = () => {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM films WHERE watchDate > ?';
        const aMonthAgo = dayjs().add(1,'hour').subtract(1, 'month').format('YYYY-MM-DD');
        db.all(query, aMonthAgo, (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(mapRowsToFilms(rows));
            }
        });
    });
};

export const getUnseen = () => {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM films WHERE watchDate IS NULL';
        db.all(query, (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(mapRowsToFilms(rows));
            }
        });
    });
};

export const getRatedAbove = (rating) => {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM films WHERE rating >= ?';
        db.all(query, [rating], (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(mapRowsToFilms(rows));
            }
        });
    });
};

export const getContainingString = (string) => {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM films WHERE title LIKE ?';
        db.all(query, [`%${string}%`], (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(mapRowsToFilms(rows));
            }
        });
    });
};

export const getFilm = (id) => {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM films WHERE id = ?';
        db.get(query, id, (err, row) => {
            if (err) {
                reject(err);
            } 
            if (row === undefined) {
                resolve({error: 'Film not found'});
            } else {
                resolve(mapRowsToFilms([row])[0]);
            }

        });
    });
};

export const deleteFilm = (id) => {
    return new Promise((resolve, reject) => {
        const query = 'DELETE FROM films WHERE id = ?';
        db.run(query, [id], function (err) {
            if (err) {
                reject(err);
            } else
                resolve(this.changes);
        });
    });
};

export const addFilm = (film) => {
    return new Promise((resolve, reject) => {
        const query = 'INSERT INTO films (title, isFavorite, watchDate, rating, userId) VALUES (?, ?, ?, ?, ?)';
        const watchDate = film.watchDate ? film.watchDate.format("YYYY-MM-DD") : null;
        let rating = 0;
        if (film.rating && film.rating > 0 && film.rating < 6) 

            rating = film.rating;
        db.run(query, [film.title, film.favorite, watchDate, rating, film.userId], function (err) {
            if (err) {
                reject(err);
            } else {
                film.id = this.lastID;
                resolve(film);
            }
        });
    });
};

export const updateFilm = (film) => {
    return new Promise((resolve, reject) => {
        const query = `UPDATE films SET title=?, isFavorite=?, rating=?, watchDate=?, userId=? WHERE id=?`;
        db.run(query, [film.title, film.favorite, film.rating, film.watchDate, film.userId, film.id], function (err) {
            if (err) {
                reject(err);
            }
            if (this.changes !== 1) {
                resolve({error: 'Film not found.'});
            } else {
                resolve(film);
            }
        });
    });
};

export const updateFilmFavorite = (id) => {
    return new Promise((resolve, reject) => {
        const query = `UPDATE films SET isFavorite=true WHERE id=?`;
        db.run(query, id, function (err) {
            if (err) {
                reject(err);
            }
            if (this.changes !== 1) {
                resolve({error: 'Film not found.'});
            } else {
                resolve(getFilm(id));
            }
        });
    });
};

export const resetWatchDates = () => {
    return new Promise((resolve, reject) => {
        const query = 'UPDATE films SET watchDate = NULL';
        db.run(query, [], (err) => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
};
