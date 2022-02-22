const express = require("express");
const router = express.Router();
const { Videogame, Genres } = require("../db");
const {
  videogamesAll,
  videogameById,
  videogameByName,
} = require("../routes/getVideogamesInfo");

router.get("/", async (req, res) => {
  let allVideogames = await videogamesAll();
  let { name } = req.query;

  if (!name) {
    try {
      res.status(200).send(allVideogames);
    } catch (error) {
      console.log(error);
    }
  } else {
    try {
      let videogamesByName = await videogameByName(name);

      videogamesByName
        ? res.status(200).send(videogamesByName)
        : res.status(204).send({ message: "Not get videogame by name" });
    } catch (error) {
      console.log(error);
    }
  }
});

router.get("/:id/", async (req, res) => {
  let { id } = req.params;

  try {
    let apiSearch = await videogameById(id);

    apiSearch
      ? res.status(200).send(apiSearch)
      : res.status(204).json({ msg: "not get videogame in api" });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
