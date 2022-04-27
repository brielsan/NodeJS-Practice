const { Genre } = require("../../db.js");

const notFound = { response: { message: "Movie not found" }, status: 404 };

const responseFunction = (r) => {
  if (r.length > 0) return { response: r, status: 200 };
  else return notFound;
};

async function allGenres() {
  try {
    const allGenres = await Genre.findAll();
    return responseFunction(allGenres);
  } catch (error) {
    return notFound;
  }
}

async function Detail(id) {
  try {
    const response = await Genre.findByPk(id);
    return responseFunction(response);
  } catch (error) {
    return notFound;
  }
}

module.exports = { allGenres, Detail };
