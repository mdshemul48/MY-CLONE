from qbittorrent import Client


# -- castom import -----
from info import qbit_link, qbit_username, qbit_password, block_list


class Qbit:
    def __init__(self):
        self.qbit = Client(qbit_link)
        self.qbit.login(qbit_username, qbit_password)

    def get_all_torrent(self):
        all_torents = self.qbit.torrents()
        torrent_without_blocked_catagory = [
            torrent for torrent in all_torents if torrent["category"] not in block_list
        ]
        return torrent_without_blocked_catagory

    def pause_torrent(self, info_hash):
        self.qbit.pause(info_hash)

    def delete_torrent(self, info_hash):
        self.qbit.delete_permanently(info_hash)


if __name__ == "__main__":
    qbit = Qbit()
    qbit.get_all_torrent()
