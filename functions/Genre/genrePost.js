const { Genre } = require("../../db.js");

async function newGenre({ name, image }) {
  if (!name || !image)
    return {
      response: "Please enter all the necessary fields",
      status: 500,
    };

  const genre = {
    name: name,
    image: image,
  };
  try {
    await Genre.create(genre);
    return { response: "Genre created", status: 200 };
  } catch (error) {
    return { response: error, status: 500 };
  }
}

module.exports = { newGenre };
