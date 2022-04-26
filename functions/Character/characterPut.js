const { Character } = require("../../db.js");

async function Update(id, body) {
  try {
    let character = await Character.findByPk(id);
    await character.update(body);
    return { response: "Character updated", status: 200 };
  } catch (error) {
    return { response: error.message, status: 500 };
  }
}

module.exports = { Update };
