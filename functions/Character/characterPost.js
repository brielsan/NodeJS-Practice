const { Character, Movie } = require("../../db.js");

async function newCharacter({ image, name, age, weight, history, movies }) {
  if (!image || !name || !age || !weight || !history || !movies) {
    return {
      response: "Please enter all the necessary fields",
      status: 500,
    };
  }

  const newCharacter = {
    image,
    name,
    age,
    weight,
    history,
  };

  const movie = await Movie.findAll({
    where: {
      title: movies,
    },
  });

  if (!movie) {
    return {
      response: "Movie not found",
      status: 404,
    };
  }

  try {
    let createCharacter = await Character.create(newCharacter);
    await createCharacter.addMovie(movie);
    return { response: "Character created", status: 200 };
  } catch (error) {
    return { response: error.message, status: 500 };
  }
}

module.exports = {
  newCharacter,
};
