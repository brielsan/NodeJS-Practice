const { Genre, Movie } = require("../../db.js");

async function newMovie({ image, title, date, calification, genre }) {
  const newMovie = {
    image,
    title,
    date,
    calification,
  };

  const genreInDB = await Genre.findAll({ where: { name: genre } });

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
