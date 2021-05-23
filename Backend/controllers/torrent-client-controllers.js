const qbit = require("qbittorrent-api-v2");

const torrents = async (req, res, next) => {
  let api;
  try {
    api = await qbit.connect(
      process.env.TORRENT_LINK,
      process.env.TORRENT_USER,
      process.env.TORRENT_PASSWORD
    );
  } catch (err) {
    return res.status(500).json({ message: err });
  }

  let allTorrents;
  try {
    allTorrents = await api.torrents();
  } catch (err) {
    return res.status(500).json({ message: err });
  }

  const blockedCategory = JSON.parse(process.env.BLOCK_LIST_FOR_TORRENT);

  const filteredTorrent = allTorrents.filter((torrent) => {
    return !blockedCategory.includes(torrent.category);
  });

  return res.status(200).json(filteredTorrent);
};

const deleteTorrent = async (req, res, next) => {
  const { torrentHash: hashes } = req.params;
  try {
    const api = await qbit.connect(
      process.env.TORRENT_LINK,
      process.env.TORRENT_USER,
      process.env.TORRENT_PASSWORD
    );

    await api.deleteTorrents(hashes, true);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: err });
  }

  return res.status(202).send("deleted.");
};

exports.torrents = torrents;
exports.deleteTorrent = deleteTorrent;
