const express = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const videogames = require("./videogames");
const genres = require("./genres");
const videogame = require("./videogame");
const platforms = require("./platforms");

const router = express.Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use("/videogames", videogames);
router.use("/genres", genres);
router.use("/platforms", platforms);
router.use("/videogame", videogame);

module.exports = router;
