from qbittorrent import Client

from info import qbit_link, qbit_username, qbit_password, download_location


class Qbit_download:
    link_of_qbit = qbit_link
    username = qbit_username
    password = qbit_password
    download_path = download_location

    def __init__(self):
        self.qbit = Client(self.link_of_qbit)
        self.qbit.login(self.username, self.password)

    def download_movie(self, link, language):
        self.qbit.download_from_link(
            link, savepath=self.download_path + "\\" + language, category=language
        )

    def normal_download(self, link, category):
        self.qbit.download_from_link(
            link, savepath=self.download_path, category=category
        )


if __name__ == "__main__":
    qbit = Qbit_download()
    qbit.download_movie(
        "magnet:?xt=urn:btih:E3A2642EC57BBE632974AB62EEC4F120DF515586&dn=Tom.Clancys.Without.Remorse.2021.720p.WEBRip.800MB.x264-GalaxyRG+%E2%AD%90&tr=udp%3A%2F%2Fopen.stealth.si%3A80%2Fannounce&tr=udp%3A%2F%2Ftracker.tiny-vps.com%3A6969%2Fannounce&tr=udp%3A%2F%2Ffasttracker.foreverpirates.co%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337%2Fannounce&tr=udp%3A%2F%2Fexplodie.org%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.cyberia.is%3A6969%2Fannounce&tr=udp%3A%2F%2Fipv4.tracker.harry.lu%3A80%2Fannounce&tr=udp%3A%2F%2Ftracker.uw0.xyz%3A6969%2Fannounce&tr=udp%3A%2F%2Fopentracker.i2p.rocks%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.birkenwald.de%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.torrent.eu.org%3A451%2Fannounce&tr=udp%3A%2F%2Ftracker.moeking.me%3A6969%2Fannounce&tr=udp%3A%2F%2Fopentor.org%3A2710%2Fannounce&tr=udp%3A%2F%2Ftracker.dler.org%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.zer0day.to%3A1337%2Fannounce&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969%2Fannounce&tr=udp%3A%2F%2Fcoppersurfer.tk%3A6969%2Fannounce",
        "English",
    )
