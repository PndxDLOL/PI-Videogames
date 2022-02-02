const axios = require("axios");
const express = require("express");
const router = express.Router();
const { API_KEY } = process.env;
const { Genres } = require("../db");
const { getGenres } = require("./getVideogamesInfo");

router.get("/", async (req, res) => {
  try {
    await getGenres();

    let genres = await Genres.findAll();

    res.status(200).send(genres);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
