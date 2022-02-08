const axios = require("axios");
const { API_KEY } = process.env;
const { Videogame, Genres } = require("../db");

const videogamesAll = async () => {
  try {
    let firstUrl = `https://api.rawg.io/api/games?key=${API_KEY}&page=1&page_size=40`;

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
    let allVideogamesInfo = getDBInfo
      ? [...allVideogamesApi, ...getDBInfo]
      : [...allVideogamesApi];

    let formatedApiInfo = allVideogamesInfo?.map((e) => {
      return {
        id: e.id,
        name: e.name,
        image: e.background_image ? e.background_image : e.image,
        rating: e.rating,
        genres: e.genres.map((e) => e.name),
        platforms: e.platforms.map((e) => e.platform.name),
      };
    });

    return formatedApiInfo;
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
      description: info.description_raw,
      released: info.released,
      rating: info.rating,
      platforms: info.platforms.map((e) => e.platform.name),
    };

    return obj;
  } catch (error) {
    console.log(error);
  }
};

const getGenres = async () => {
  try {
    let genresInfo = (
      await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`)
    ).data.results;

    genresInfo.map(
      async (e) =>
        await Genres.findOrCreate({
          where: {
            id: e.id,
            name: e.name,
          },
        })
    );
  } catch (error) {
    console.log(error);
  }
};

const getPlatforms = async () => {
  try {
    let platformsInfo = `https://api.rawg.io/api/games?key=${API_KEY}&page=1&page_size=40`;

    let firstData = (await axios.get(platformsInfo)).data;
    let videogame_1 = await firstData.results;
    let secondData = (await axios.get(firstData.next)).data;
    let videogame_2 = await secondData.results;
    let thirdData = (await axios.get(secondData.next)).data;
    let videogame_3 = await thirdData.results;

    let allVideogamesApi = [...videogame_1, ...videogame_2, ...videogame_3];

    let formatedPlatforms = [];

    let getPlatformsVG = allVideogamesApi?.map((e) => {
      return e.platforms.map((e) => e.platform.name);
    });

    for (let i = 0; i < getPlatformsVG.length; i++) {
      for (let j = 0; j < getPlatformsVG[i].length; j++) {
        if (!formatedPlatforms.includes(getPlatformsVG[i][j])) {
          formatedPlatforms.push(getPlatformsVG[i][j]);
        } else {
          continue;
        }
      }
    }

    return formatedPlatforms;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  videogamesAll,
  videogameById,
  getGenres,
  getPlatforms,
};
