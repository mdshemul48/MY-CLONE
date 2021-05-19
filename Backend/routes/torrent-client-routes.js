const router = require("express").Router();

const torrentController = require("../controllers/torrent-client-controllers");

router.get("/", torrentController.torrents);
router.delete("/delete/:torrentHash", torrentController.deleteTorrent);
module.exports = router;
