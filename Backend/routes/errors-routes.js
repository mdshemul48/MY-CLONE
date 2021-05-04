const router = require("express").Router();

// importing controllers
const errorControllers = require("../controllers/errors-controllers");

// -----------------------error routes--------------------------
// this route save error message in server
router.put("/", errorControllers.errorHandler);

module.exports = router;
