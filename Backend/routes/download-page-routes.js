const router = require("express").Router();

const downloaderPage = require("../controllers/download-history-page");

router.get("/", downloaderPage.downloadHistoryAllDate);

module.exports = router;
