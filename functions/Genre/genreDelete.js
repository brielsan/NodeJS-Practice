const { Genre } = require("../../db.js");

async function Delete(id) {
  if (!id)
    return {
      response: "Please enter all the necessary fields",
      status: 500,
    };
  try {
    let genre = await Genre.findByPk(id);
    await genre.destroy();
    return { response: "Genre deleted", status: 200 };
  } catch (error) {
    return { response: error.message, status: 500 };
  }
}

module.exports = {
  Delete,
};
