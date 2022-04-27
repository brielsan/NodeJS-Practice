const { Genre } = require("../../db.js");

async function newGenre(name, image) {
  if (!name || !image)
    return {
      response: "Please enter all the necessary fields",
      status: 500,
    };
  try {
    await Genre.create(name, image);
    return { response: "Genre created", status: 200 };
  } catch (error) {
    return { response: "Error", status: 500 };
  }
}

module.exports = { newGenre };
