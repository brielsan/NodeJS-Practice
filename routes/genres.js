const express = require("express");
const router = express.Router();
const getGenre = require("../functions/Genre/genreGet.js");
const postGenre = require("../functions/Genre/genrePost.js");
const putGenre = require("../functions/Genre/genrePut.js");
const deleteGenre = require("../functions/Genre/genreDelete.js");

router.get("/", async (req, res) => {
  const { response, status } = await getGenre.allGenres();
  return res.status(status).json(response);
});

router.get("/:id", async (req, res) => {
  const { response, status } = await getGenre.Detail(req.params.id);
  return res.status(status).json(response);
});

router.post("/", async (req, res) => {
  const { response, status } = await postGenre.newGenre(req.body);
  return res.status(status).json(response);
});

router.put("/:id", async (req, res) => {
  const { response, status } = await putGenre.Update(req.params.id, req.body);
  return res.status(status).json(response);
});

router.delete("/:id", async (req, res) => {
  const { response, status } = await deleteGenre.Delete(req.params.id);
  return res.status(status).json(response);
});

module.exports = router;
