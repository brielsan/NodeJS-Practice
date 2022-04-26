const express = require("express");
const router = express.Router();
const getGenre = require("../functions/Genre/genreGet.js");
const postGenre = require("../functions/Genre/genrePost.js");

router.get("/", async (req, res) => {
  const { response, status } = await getGenre.allGenres();
  return res.status(status).json(response);
});

router.post("/", async (req, res) => {
  const { response, status } = await postGenre.newGenre(req.body);
  return res.status(status).json(response);
});

module.exports = router;
