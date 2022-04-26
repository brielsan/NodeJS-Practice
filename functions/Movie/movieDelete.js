const { Movie } = require("../../db.js");

async function Delete(id) {
  try {
    let movie = await Movie.findByPk(id);
    if (!movie) {
      return { response: "Movie not found", status: 404 };
    }
    await movie.destroy();
    return { response: "Movie deleted", status: 200 };
  } catch (error) {
    return { response: "Error", status: 500 };
  }
}

module.exports = { Delete };
