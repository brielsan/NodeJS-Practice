const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jst = require("jsonwebtoken");
const { User } = require("../db.js");
const { SECRET_KEY, USER_EXPIRES_IN, SENDGRID_API_KEY, SENDGRID_EMAIL } =
  process.env;
const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(`${SENDGRID_API_KEY}`);

router.post("/register", async (req, res) => {
  const { name, email } = req.body;
  if (!name || !email) {
    return res.status(500).json({
      response: "Please enter all the necessary fields",
      status: 500,
    });
  }
  let password = bcrypt.hashSync(req.body.password, 10);
  try {
    const user = await User.create({ name, email, password });
    let token = jst.sign({ user: user }, SECRET_KEY, {
      expiresIn: USER_EXPIRES_IN,
    });
    const msg = {
      to: `${email}`,
      from: `${SENDGRID_EMAIL}`,
      subject: "NodeJS API Test",
      text: "Welcome to the NodeJS API Test",
      html: "<h1>Thanks for signing up!</h1><p>You can now use the API</p>",
    };

    await sgMail.send(msg);

    return res.json({
      user: user,
      token: token,
    });
  } catch (error) {
    if (error.message.includes("users_email_key"))
      return res.status(400).json({ error: "Email already exists" });
    return res.status(500).json({ message: "Error" });
  }
});

router.get("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(500).json({
      response: "Please enter all the necessary fields",
      status: 500,
    });
  }
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
    return res.json({
      user: user,
      token: token,
    });
  } catch (error) {
    return res.status(500).json({ message: "Error" });
  }
});

module.exports = router;
