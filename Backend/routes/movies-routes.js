const router = require("express").Router();

// castom import
const moviesControllers = require("../controllers/movies-controllers");

// -----------------------movies routes--------------------------

// movie info
router.get("/movieinfo/:movieTitle", moviesControllers.getMovieByTitle);

// movie search
router.get("/search/:movieTitle", moviesControllers.searchMovie);

// add new movie to db
router.put("/storeMovie/", moviesControllers.enterMovieIn);

// this will edit movie data..
router.patch("/edit/", moviesControllers.editMovie);
// this will check if movie exsist in the server
// if exist the it will return true else false with movie insert in db
router.post("/check/:movieTitle", moviesControllers.checkMovie);
module.exports = router;
