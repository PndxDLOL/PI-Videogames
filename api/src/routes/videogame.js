const express = require("express");
const router = express.Router();
const { Videogame, Genres } = require("../db");

router.post("/", async (req, res) => {
  try {
    const { name, description, image, released, rating, platforms, genres } =
      req.body;

    const videogameCreated = await Videogame.create({
      name,
      description,
      image,
      released,
      rating,
      platforms,
    });

    for (const i of genres) {
      const genresDB = await Genres.findOne({
        where: {
          name: i,
        },
      });

      videogameCreated.addGenres(genresDB);
    }

    res.status(200).send(videogameCreated.id);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
