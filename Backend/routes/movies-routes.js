const router = require("express").Router();

// castom import
const moviesControllers = require("../controllers/movies-controllers");
// movies routes

// this will return  true if movie exist..
// if movie not exist on db it will return false
router.get("/", moviesControllers.getMovieById);

module.exports = router;
