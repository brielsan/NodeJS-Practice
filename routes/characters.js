const express = require("express");
const router = express.Router();
const getCharacter = require("../functions/Character/characterGet.js");
const postCharacter = require("../functions/Character/characterPost.js");
const putCharacter = require("../functions/Character/characterPut.js");
const deleteCharacter = require("../functions/Character/characterDelete.js");

router.get("/", async (req, res) => {
  const { name, age, movies } = req.query;
  if (name) {
    const { response, status } = await getCharacter.ByName(name);
    return res.status(status).json(response);
  } else if (age) {
    const { response, status } = await getCharacter.ByAge(age);
    return res.status(status).json(response);
  } else if (movies) {
    const { response, status } = await getCharacter.ByMovies(movies);
    return res.status(status).json(response);
  } else {
    const { response, status } = await getCharacter.AllCharacters();
    returnres.status(status).json(response);
  }
});

router.get("/:id", async (req, res) => {
  const { response, status } = await getCharacter.Detail(req.params.id);
  return res.status(status).json(response);
});

router.post("/", async (req, res) => {
  const { response, status } = await postCharacter.newCharacter(req.body);
  return res.status(status).json(response);
});

router.put("/:id", async (req, res) => {
  const { response, status } = await putCharacter.Update(
    req.params.id,
    req.body
  );
  return res.status(status).json(response);
});

router.delete("/:id", async (req, res) => {
  const { response, status } = await deleteCharacter.Delete(req.params.id);
  return res.status(status).json(response);
});

module.exports = router;
