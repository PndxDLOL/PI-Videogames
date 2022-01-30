const axios = require("axios");
const { API_KEY } = process.env;
const { Videogame, Genres } = require("../db");

const videogamesAll = async () => {
  try {
    let firstUrl = `https://api.rawg.io/api/games?key=${API_KEY}&page=2&page_size=40`;

    let firstData = (await axios.get(firstUrl)).data;
    let videogame_1 = await firstData.results;
    let secondData = (await axios.get(firstData.next)).data;
    let videogame_2 = await secondData.results;
    let thirdData = (await axios.get(secondData.next)).data;
    let videogame_3 = await thirdData.results;

    let allVideogamesApi = [...videogame_1, ...videogame_2, ...videogame_3];

    let getDBInfo = await Videogame.findAll({
      include: {
        model: Genres,
        attributes: ["name"],
        through: { attributes: [] },
      },
    });

    let formatedApiInfo = allVideogamesApi?.map((e) => {
      return {
        id: e.id,
        name: e.name,
        image: e.background_image,
        rating: e.rating,
        genres: e.genres.map((e) => e.name),
      };
    });

    let allVideogamesInfo = getDBInfo
      ? [...formatedApiInfo, ...getDBInfo]
      : [...formatedApiInfo];

    return allVideogamesInfo;
  } catch (error) {
    console.log(error);
  }
};

const videogameById = async (id) => {
  try {
    let info = (
      await axios.get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`)
    ).data;

    let obj = {
      id: info.id,
      name: info.name,
      image: info.background_image,
      genres: info.genres.map((e) => e.name),
      description: info.description,
      released: info.released,
      rating: info.rating,
      platforms: info.platforms.map((e) => e.platform.name),
    };

    return obj;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  videogamesAll,
  videogameById,
};
