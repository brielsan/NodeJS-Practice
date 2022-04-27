const { Character } = require("../../db.js");

async function Delete(id) {
  if (!id)
    return {
      response: "Please enter all the necessary fields",
      status: 500,
    };

  try {
    let character = await Character.findByPk(id);
    await character.destroy();
    return { response: "Character deleted", status: 200 };
  } catch (error) {
    return { response: error.message, status: 500 };
  }
}

module.exports = {
  Delete,
};
