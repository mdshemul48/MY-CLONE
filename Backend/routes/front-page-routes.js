const router = require("express").Router();

const frontPageController = require("../controllers/front-page-controllers");

router.get("/", frontPageController.frontPageData);

module.exports = router;
