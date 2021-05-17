const router = require("express").Router();

const torrentController = require("../controllers/torrent-client-controllers");

router.get("/", torrentController.torrents);
module.exports = router;
