const { Character, Movie } = require("../../db.js");

async function newCharacter({ image, name, age, weight, history, movies }) {
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
