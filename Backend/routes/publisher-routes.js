const router = require("express").Router();

const publisherControllers = require("../controllers/publisher-controllers");

router.post("/", publisherControllers.createEntry);

module.exports = router;
