const { Sequelize } = require("sequelize");
const CharactersModel = require("./models/Character.js");
const MovieModel = require("./models/Movie.js");
const GenreModel = require("./models/Genre.js");
const UserModel = require("./models/User.js");
const { DATABASE_URL } = process.env;

const sequelize = new Sequelize(DATABASE_URL, {
  logging: false,
  native: false,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

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
