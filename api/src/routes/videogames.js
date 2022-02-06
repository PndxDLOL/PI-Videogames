const express = require("express");
const router = express.Router();
/* const axios = require("axios"); */
const { Videogame, Genres } = require("../db");
const { videogamesAll, videogameById } = require("../routes/getVideogamesInfo");
/* const {} */

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
      let videogamesByName = await allVideogames.filter((e) =>
        e.name.toLowerCase().includes(name.toString().toLowerCase())
      );
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
    if (
      id.match(
        /^[a-f0-9]{8}-?[a-f0-9]{4}-?4[a-f0-9]{3}-?[89ab][a-f0-9]{3}-?[a-f0-9]{12}$/i
      )
    ) {
      let dbSearch = await Videogame.findAll({
        where: { id: id },
        include: [
          { model: Genres, attributes: ["name"], through: { attributes: [] } },
        ],
      });
      if (!dbSearch) {
        return res.status(204).json({ msg: "not get videogame in db" });
      } else {
        res.status(200).send(dbSearch);
      }
    } else {
      let apiSearch = await videogameById(id);

      if (!apiSearch) {
        return res.status(204).json({ msg: "not get videogame in api" });
      } else {
        res.status(200).send(apiSearch);
      }
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
