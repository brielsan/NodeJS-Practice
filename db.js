require("dotenv").config();
const { Sequelize } = require("sequelize");
const CharactersModel = require("./models/Character.js");
const MovieModel = require("./models/Movie.js");
const GenreModel = require("./models/Genre.js");
const UserModel = require("./models/User.js");
const { DB_USER, DB_PASSWORD, DB_HOST } = process.env;

const sequelize = new Sequelize(
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/disney`,
  {
    logging: false,
    native: false,
  }
);

const modelDefiners = [CharactersModel, MovieModel, GenreModel, UserModel];

modelDefiners.forEach((model) => model(sequelize));

let entries = Object.entries(sequelize.models);

let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);

sequelize.models = Object.fromEntries(capsEntries);

const { Character, Movie, Genre } = sequelize.models;

Character.belongsToMany(Movie, { through: "Character_Movie" });
Movie.belongsToMany(Character, { through: "Character_Movie" });
Movie.belongsToMany(Genre, { through: "Movie_Genre" });
Genre.belongsToMany(Movie, { through: "Movie_Genre" });

module.exports = {
  ...sequelize.models,
  conn: sequelize,
};
