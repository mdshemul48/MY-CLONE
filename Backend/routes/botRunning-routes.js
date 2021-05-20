const router = require("express").Router();

const botStatus = require("../controllers/bot-working-status");

router.get("/", botStatus.botStatus);
router.post("/", botStatus.startingTime);

module.exports = router;
