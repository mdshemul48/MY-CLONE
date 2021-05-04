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
    if not os.path.exists(temp_folder + "\\" + category):
        os.makedirs(temp_folder + "\\" + category)
    shutil.move(content_path, final_temp_folder)

    return final_temp_folder
