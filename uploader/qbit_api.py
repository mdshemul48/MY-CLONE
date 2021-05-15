from qbittorrent import Client


# -- castom import -----
from info import qbit_link, qbit_username, qbit_password, block_category


class Qbit:
    def __init__(self):
        self.qbit = Client(qbit_link)
        self.qbit.login(qbit_username, qbit_password)

    def get_all_torrent(self):
        all_torents = self.qbit.torrents()
        torrent_without_blocked_cetagory = [
            torrent
            for torrent in all_torents
            if not torrent["category"] in block_category
        ]

        return torrent_without_blocked_cetagory

    def pause_torrent(self, info_hash):
        self.qbit.pause(info_hash)

    def delete_torrent(self, info_hash):
        self.qbit.delete_permanently(info_hash)


if __name__ == "__main__":
    qbit = Qbit()
    print(qbit.get_all_torrent())
