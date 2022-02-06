const express = require("express");
const router = express.Router();
const { getPlatforms } = require("./getVideogamesInfo");

router.get("/", async (req, res) => {
  try {
    let platforms = await getPlatforms();

    res.status(200).send(platforms);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
