const { Op } = require("sequelize");
const { Character, Movie, Genre } = require("../../db.js");

const notFound = { response: { message: "Movie not found" }, status: 404 };

const responseFunction = (r) => {
  if (r.length > 0) return { response: r, status: 200 };
  else return notFound;
};

async function allMovies() {
  try {
    const allMovies = await Movie.findAll({
      attributes: {
        exclude: ["createdAt"],
      },
      include: {
        model: Genre,
        through: { attributes: [] },
        attributes: {
          include: ["name", "image"],
          exclude: ["createdAt", "updatedAt"],
        },
      },
    });

    return responseFunction(allMovies);
  } catch (error) {
    return notFound;
  }
}

async function ByName(name) {
  try {
    const movieWithName = await Movie.findAll({
      where: {
        title: {
          [Op.iLike]: `%${name}%`,
        },
      },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
      include: {
        model: Genre,
        through: { attributes: [] },
        attributes: {
          include: ["name", "image"],
          exclude: ["createdAt", "updatedAt"],
        },
      },
    });
    return responseFunction(movieWithName);
  } catch (error) {
    return notFound;
  }
}

async function ByGenre(genre) {
  try {
    let movieWithGenre = await Movie.findAll({
      include: {
        model: Genre,
        through: { attributes: [] },
        attributes: {
          include: ["name", "image"],
          exclude: ["createdAt", "updatedAt"],
        },
      },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });

    movieWithGenre = movieWithGenre.filter((movie) =>
      movie.Genres.some(
        (movie) => movie.name.toLowerCase() === genre.toLowerCase()
      )
    );
    return responseFunction(movieWithGenre);
  } catch (error) {
    return notFound;
  }
}

async function ByOrder(order) {
  try {
    const orderAllMovies = await Movie.findAll({
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
      include: {
        model: Genre,
        through: { attributes: [] },
        attributes: {
          include: ["name", "image"],
          exclude: ["createdAt", "updatedAt"],
        },
      },
      order: [["title", `${order.toUpperCase()}`]],
    });

    return responseFunction(orderAllMovies);
  } catch (error) {
    return notFound;
  }
}

async function Detail(id) {
  try {
    const response = await Movie.findByPk(id, {
      include: [
        {
          model: Character,
          through: { attributes: [] },
        },
      ],
    });
    return responseFunction(response);
  } catch (error) {
    return notFound;
  }
}

module.exports = {
  allMovies,
  ByName,
  ByGenre,
  ByOrder,
  Detail,
};
