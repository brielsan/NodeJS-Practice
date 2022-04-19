const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jst = require("jsonwebtoken");
const { User } = require("../db.js");
const { SECRET_KEY, USER_EXPIRES_IN } = process.env;

router.post("/register", async (req, res) => {
  const { name, email } = req.body;
  let password = bcrypt.hashSync(req.body.password, 10);
  try {
    const user = await User.create({ name, email, password });
    let token = jst.sign({ user: user }, SECRET_KEY, {
      expiresIn: USER_EXPIRES_IN,
    });
    res.json({
      user: user,
      token: token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

router.get("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }
    const validPassword = bcrypt.compareSync(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ message: "Invalid password" });
    }
    let token = jst.sign({ user: user }, SECRET_KEY, {
      expiresIn: USER_EXPIRES_IN,
    });
    res.json({
      user: user,
      token: token,
    });
  } catch (error) {
    return res.status(500).json(error);
  }
});

module.exports = router;
