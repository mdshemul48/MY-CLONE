const router = require("express").Router();

const publisherControllers = require("../controllers/publisher-controllers");

router.get("/", publisherControllers.getAllEntry);

router.post("/", publisherControllers.createEntry);

module.exports = router;
