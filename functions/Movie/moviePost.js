const { Genre, Movie } = require("../../db.js");

async function newMovie({ image, title, date, calification, genre }) {
  const newMovie = {
    image,
    title,
    date,
    calification,
  };

  if (!image || !title || !date || !calification || !genre)
    return {
      response: "Please enter all the necessary fields",
      status: 500,
    };

  const genreInDB = await Genre.findAll({ where: { name: genre } });

  if (genreInDB.length === 0) {
    return {
      response: "Genre not found",
      status: 404,
    };
  }

  try {
    let movie = await Movie.create(newMovie);
    await movie.addGenre(genreInDB);
    return { response: "Movie created", status: 200 };
  } catch (error) {
    return { response: error.message, status: 500 };
  }
}

module.exports = {
  newMovie,
};
