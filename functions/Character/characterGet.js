const { Op } = require("sequelize");
const { Character, Movie } = require("../../db.js");

const notFound = { response: { message: "Character not found" }, status: 404 };

const responseFunction = (r) => {
  if (r.length > 0) return { response: r, status: 200 };
  else return notFound;
};

async function AllCharacters() {
  try {
    const response = await Character.findAll({ attributes: ["image", "name"] });
    return responseFunction(response);
  } catch (error) {
    return notFound;
  }
}

async function ByName(name) {
  try {
    const response = await Character.findAll({
      where: {
        name: {
          [Op.iLike]: `%${name}%`,
        },
      },
    });
    return responseFunction(response);
  } catch (error) {
    return notFound;
  }
}

async function ByAge(age) {
  if (!age) return notFound;
  try {
    const response = await Character.findAll({ where: { age } });
    return responseFunction(response);
  } catch (error) {
    return notFound;
  }
}

async function ByMovies(movies) {
  try {
    const response = await Movie.findByPk(movies, {
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

async function Detail(id) {
  try {
    const response = await Character.findByPk(id, {
      includes: {
        model: Movie,
        as: "moviesorseries",
      },
    });
    if (response == null) return notFound;
    return responseFunction(response);
  } catch (error) {
    return notFound;
  }
}

module.exports = {
  AllCharacters,
  ByName,
  ByAge,
  ByMovies,
  Detail,
};
