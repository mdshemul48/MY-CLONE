import shutil

# ------------------ castom imports ------------------------
from qbit_api import Qbit
from day_added import total_added_days
from file_mover import move_to_temp_folder
from renamer import rename_all_folders_movie
from upload_with_rclone import upload
from info import temp_folder

# if any movie moves to temp folder then this will update.
movie_on_temp = 0


def torrent_mover(torrent):
    title = torrent["name"]
    progress = torrent["progress"]
    state = torrent["state"]
    category = torrent["category"]
    info_hash = torrent["hash"]
    folder_path = torrent["content_path"]
    added_on_time = total_added_days(torrent["added_on"])

    # if file was moving then it will return from here.
    if state == "moving":
        return

    # initalizing qbit again because after someting it can't login. for that i'm initalizing it in every time.
    qbit = Qbit()

    # deleting torernt because added time > 3days.
    if progress != 1 and added_on_time >= 3:
        qbit.delete_torrent(info_hash)
        return

    # if file download not 100% complete then return.
    if progress != 1:
        return

    # pausing torrent for moving.
    qbit.pause_torrent(info_hash)

    # moving to the temp folder..
    # it can throw FileNotFoundError error. so if it throw error then i will delete the torrent from qbit.
    try:
        move_to_temp_folder(category, folder_path)
    except FileNotFoundError:
        qbit.delete_torrent(info_hash)
        return

    # deleting torernt from qbitTorrent
    qbit.delete_torrent(info_hash)

    # this will tigger the rename function latter
    global movie_on_temp
    movie_on_temp += 1


def main():
    qbit = Qbit()
    global movie_on_temp
    movie_on_temp = 0
    all_torrents = qbit.get_all_torrent()

    # this will move all the complete file to the temp folder.
    for torrent in all_torrents:
        torrent_mover(torrent)
        break

    if movie_on_temp == 0:
        return

    # renameing all file(movies).
    rename_all_folders_movie()

    # this will upload content from temp to
    upload()

    # deleteting full temp folder.
    shutil.rmtree(temp_folder)


if __name__ == "__main__":
    main()
