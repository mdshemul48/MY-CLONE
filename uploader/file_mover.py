import os, shutil


# ------------- castom import  ------------
from info import temp_folder


def move_to_temp_folder(category, content_path):
    # if folder doesn't exist then this will create folder.
    if not os.path.exists(temp_folder):
        os.mkdir(temp_folder)

    # creating new folder in temp folder and moving to the temp folder.
    folder_name = content_path[::-1].replace("\\", "$$$$$$", 1)[::-1].split("$$$$$$")[1]

    # this will remove uploader name from back of the title.
    new_folder_name = (
        folder_name[::-1].replace("-", "###", 1)[::-1].split("###")[0].replace(".", " ")
    )
    final_temp_folder = temp_folder + "\\" + category + "\\" + new_folder_name

    for i in range(0, 2):
        try:
            os.makedirs(temp_folder + "\\" + category, exist_ok=True)
            shutil.move(content_path, final_temp_folder)
            break
        except FileExistsError:
            shutil.rmtree(final_temp_folder)

    return final_temp_folder


if __name__ == "__main__":
    move_to_temp_folder(
        "English", r"E:\downloads\English\A.Dangerous.Son.2018.1080p.WEBRip.x265-RARBG"
    )
