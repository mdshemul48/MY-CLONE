from os.path import expanduser
import time
import shutil, os

# ------------------ custom imports ------------------------
from qbit_api import Qbit
from day_added import total_added_days
from file_mover import move_to_temp_folder
from junk import remove_junk
from upload_with_rclone import upload
from info import temp_folder, bot_name, upload_folder
from db_request_api import Db_request_api


def save_error(bot_title: str, error_message: str):
    database = Db_request_api()
    database.log_error(bot_title, error_message)


def move_torrent_and_remove_junk_file(torrent, api):
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

    # deleting torrent because added time > 3days.
    if progress != 1 and added_on_time >= 3 or state == "missingFiles":
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
        file_location = move_to_temp_folder(category, folder_path)
    except FileNotFoundError as err:
        save_error(bot_name, str(err))
        qbit.delete_torrent(info_hash)
        return

    # deleting torrent from qbitTorrent
    qbit.delete_torrent(info_hash)

    # getting upload location folder.
    new_location = file_location.replace(temp_folder, upload_folder)

    # updating movie status and path
    api.update_content(
        title,
        {"path": new_location, "status": "uploading.."},
    )
    return "ok"


def main():
    # initalizing db connection with api.
    api = Db_request_api()

    status_id = api.bot_status({"botName": bot_name})
    # initalizing db connection with qbitTorrent.
    qbit = Qbit()
    all_torrents = qbit.get_all_torrent()

    # this will move all the complete file to the temp folder.
    for torrent in all_torrents:
        try:
            move_torrent_and_remove_junk_file(torrent, api)

            # # test
            # if type(move_torrent_and_remove_junk_file(torrent, api)) == str:
            #     break

        except Exception as err:
            save_error(bot_name, str(err))

    if not os.path.exists(temp_folder):
        api.bot_status({"createdId": status_id})
        return

    # renameing all file(movies).
    remove_junk()

    # this will upload content from temp to
    upload()

    # deleteting full temp folder.
    shutil.rmtree(temp_folder)
    api.bot_status({"createdId": status_id})


if __name__ == "__main__":
    while True:
        print("start u")
        try:
            main()
        except Exception as err:
            save_error(bot_name, str(err))

        print("stop u")
        time.sleep(3600)
