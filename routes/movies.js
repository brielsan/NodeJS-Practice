const express = require("express");
const router = express.Router();

const getMovie = require("../functions/Movie/movieGet.js");
const postMovie = require("../functions/Movie/moviePost.js");
const putMovie = require("../functions/Movie/moviePut.js");
const deleteMovie = require("../functions/Movie/movieDelete.js");

router.get("/", async (req, res) => {
  const { name, genre, order } = req.query;
  if (name) {
    const { response, status } = await getMovie.ByName(name);
    return res.status(status).json(response);
  }
  if (genre) {
    const { response, status } = await getMovie.ByGenre(genre);
    return res.status(status).json(response);
  }
  if (order) {
    const { response, status } = await getMovie.ByOrder(order);
    return res.status(status).json(response);
  }
  if (!name && !genre && !order) {
    const { response, status } = await getMovie.allMovies();
    return res.status(status).json(response);
  }
});

router.post("/", async (req, res) => {
  const { response, status } = await postMovie.newMovie(req.body);
  return res.status(status).json(response);
});

router.get("/:id", async (req, res) => {
  const { response, status } = await getMovie.Detail(req.params.id);
  return res.status(status).json(response);
});

router.put("/:id", async (req, res) => {
  const { response, status } = await putMovie.Update(req.params.id, req.body);
  return res.status(status).json(response);
});

router.delete("/:id", async (req, res) => {
  const { response, status } = await deleteMovie.Delete(req.params.id);
  return res.status(status).json(response);
});

module.exports = router;
