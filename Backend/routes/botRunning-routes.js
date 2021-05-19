const router = require("express").Router();

const botStatus = require("../controllers/bot-working-status");
router.post("/", botStatus.startingTime);

module.exports = router;
