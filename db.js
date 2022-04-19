const { Sequelize } = require("sequelize");
const CharactersModel = require("./models/Character.js");
const MovieorserieModel = require("./models/Movieorserie.js");
const GenreModel = require("./models/Genre.js");
const UserModel = require("./models/User.js");
require("dotenv").config();
const { DB_USER, DB_PASSWORD, DB_HOST } = process.env;

const sequelize = new Sequelize(
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/disney`,
  {
    logging: false, // set to console.log to see the raw SQL queries
    native: false, // lets Sequelize know we can use pg-native for ~30% more speed
  }
);

const modelDefiners = [
  CharactersModel,
  MovieorserieModel,
  GenreModel,
  UserModel,
];

modelDefiners.forEach((model) => model(sequelize)); // Se convierten los modelos en modelos de sequelize

let entries = Object.entries(sequelize.models); // Se obtienen los modelos de sequelize

let capsEntries = entries.map((entry) => [
  // Se convierte a mayusculas para prevenir errores
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);

sequelize.models = Object.fromEntries(capsEntries); // Definimos los modelos de sequelize

const { Character, Movieorserie, Genre, User } = sequelize.models; // Se obtienen los modelos de sequelize

console.log(sequelize.models);

// Se crean las relaciones
Character.belongsToMany(Movieorserie, { through: "Character_MovieOrSerie" });
Movieorserie.belongsToMany(Character, { through: "Character_MovieOrSerie" });
Movieorserie.belongsToMany(Genre, { through: "MovieOrSerie_Genre" });
Genre.belongsToMany(Movieorserie, { through: "MovieOrSerie_Genre" });

module.exports = {
  ...sequelize.models,
  conn: sequelize,
};
