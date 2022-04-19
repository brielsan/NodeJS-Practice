const express = require("express");
const router = express.Router();
const { Character, MovieOrSerie } = require("../db.js");

router.get("/", async (req, res) => {
  let characters = await Character.findAll({ attributes: ["image", "name"] });
  res.json(characters);
});

router.post("/", async (req, res) => {
  try {
    await Character.create(req.body);
    res.json({ message: "Character created" });
  } catch (error) {
    res.status(500).json(error);
  }
});

router.put("/:id", async (req, res) => {
  try {
    let character = await Character.findByPk(req.params.id);
    console.log(character);
    await character.update(req.body);
    res.json({ message: "Character updated" });
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
