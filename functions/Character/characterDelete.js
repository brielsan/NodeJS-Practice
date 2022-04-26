const { Character } = require("../../db.js");

async function Delete(id) {
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
