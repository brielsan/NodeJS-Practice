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

const port = process.env.PORT || 3001;

conn.sync({ force: false }).then(() => {
  app.listen(port, () => {
    console.log(`Running on ${port}`);
  });
});
