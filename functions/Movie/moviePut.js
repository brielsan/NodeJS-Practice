const { Movie } = require("../../db.js");

async function Update(id, body) {
  try {
    let movie = await Movie.findByPk(id);
    if (!movie) {
      return { response: "Movie not found", status: 404 };
    }
    await movie.update(body);
    return { response: "Movie updated", status: 200 };
  } catch (error) {
    return { response: "Error", status: 500 };
  }
}

module.exports = { Update };
