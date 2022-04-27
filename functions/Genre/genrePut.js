const { Genre } = require("../../db.js");

async function Update(id, body) {
  const { name, image } = body;

  if (!name && !image) {
    return {
      response: "Please enter all the necessary fields",
      status: 500,
    };
  }
  try {
    let genre = await Genre.findByPk(id);
    await genre.update(body);
    return { response: "Genre updated", status: 200 };
  } catch (error) {
    return { response: error.message, status: 500 };
  }
}

module.exports = { Update };
