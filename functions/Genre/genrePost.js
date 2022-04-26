const { Genre } = require("../../db.js");

async function newGenre({ name, image }) {
  try {
    await Genre.create(name, image);
    return { response: "Genre created", status: 200 };
  } catch (error) {
    return { response: "Error", status: 500 };
  }
}

module.exports = { newGenre };
