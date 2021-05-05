import time
import shutil

# ------------------ castom imports ------------------------
from qbit_api import Qbit
from day_added import total_added_days
from file_mover import move_to_temp_folder
from junk import remove_junk
from upload_with_rclone import upload
from info import temp_folder, bot_name, upload_folder
from db_request_api import Db_request_api


def save_error(bot_title: str, error_message: str):
    detabase = Db_request_api()
    detabase.log_error(bot_title, error_message)


# if any movie moves to temp folder then this will update.
movie_on_temp = 0


def move_torrent_and_remove_junk_file(torrent):
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
    if progress != 1 and added_on_time >= 3 or state == "missingFiles":
        qbit.delete_torrent(info_hash)
        return {"file_moved": False}

    # if file download not 100% complete then return.
    if progress != 1:
        return {"file_moved": False}
    # pausing torrent for moving.
    qbit.pause_torrent(info_hash)

    # moving to the temp folder..
    # it can throw FileNotFoundError error. so if it throw error then i will delete the torrent from qbit.
    try:
        file_location = move_to_temp_folder(category, folder_path)
    except FileNotFoundError as err:
        save_error(bot_name, str(err))
        qbit.delete_torrent(info_hash)
        return {"file_moved": False}

    # deleting torernt from qbitTorrent
    qbit.delete_torrent(info_hash)

    # this will tigger the rename function latter
    global movie_on_temp
    movie_on_temp += 1

    # getting upload location folder.
    new_location = file_location.replace(temp_folder, upload_folder)

    # initalizing db connection with api.
    detabase = Db_request_api()

    # creating update content
    updated_content = {"status": "uploaded..", "path": new_location}
    # updating movie status and path
    detabase.update_content(title, updated_content)
    return {"file_moved": True}


def main():
    qbit = Qbit()
    all_torrents = qbit.get_all_torrent()

    file_moved_to_temp = False

    # this will move all the complete file to the temp folder.
    for torrent in all_torrents:
        is_moved = move_torrent_and_remove_junk_file(torrent)
        if is_moved["file_moved"]:
            file_moved_to_temp = True

    if file_moved_to_temp is not True:
        print("hello ass")
        return

    # renameing all file(movies).
    remove_junk()

    # this will upload content from temp to
    upload()

    # deleteting full temp folder.
    shutil.rmtree(temp_folder)


if __name__ == "__main__":
    while True:
        print("start.. uploader.")
        try:
            main()
        except Exception as err:
            save_error(bot_name, str(err))

        print("end..")
        time.sleep(300)
