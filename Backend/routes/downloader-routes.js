const router = require("express").Router();

// importing controllers
const downloaderControllers = require("../controllers/downloader-controllers");

// -----------------------error routes--------------------------
// this route save error message in server
router.get("/", downloaderControllers.rarbg);

module.exports = router;
