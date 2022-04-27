const express = require("express");
const app = express();
const characters = require("./routes/characters.js");
const auth = require("./routes/auth.js");
const movies = require("./routes/movies.js");
const genres = require("./routes/genres.js");

require("./db.js");
const { conn } = require("./db.js");

app.use(express.json());

app.use("/characters", characters);
app.use("/auth", auth);
app.use("/movies", movies);
app.use("/genres", genres);

conn.sync({ force: false }).then(() => {
  app.listen(process.env.PORT || 3001, () => {
    console.log(`Running on ${process.env.PORT || 3001}`);
  });
});
