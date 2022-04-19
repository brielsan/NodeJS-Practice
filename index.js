const express = require("express");
const app = express();
const characters = require("./routes/characters");
const auth = require("./routes/auth");
require("./db.js");
const { conn } = require("./db.js");

app.use(express.json());

app.use("/characters", characters);
app.use("/auth", auth);

conn.sync({ force: true }).then(() => {
  app.listen(3001, () => {
    console.log("Port 3001");
  });
});
