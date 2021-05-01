from qbittorrent import Client

from info import qbit_link, qbit_username, qbit_password

class Qbit_download:
    link_of_qbit = qbit_link
    username = qbit_username
    password = qbit_password
    
    def __init__(self):
        self.qbit = Client(self.link_of_qbit)
        self.qbit.login(self.username, self.password)

    def download_movie(self, link, download_path, language):
        self.qbit.download_from_link(
            link, savepath=download_path+"\\"+language, category=language)

    def normal_download(self, link, location, category):
        self.qbit.download_from_link(
            link, savepath=location, category=category)


if __name__ == "__main__":
    qbit = Qbit_download()
    print(qbit.get_all_downloading())