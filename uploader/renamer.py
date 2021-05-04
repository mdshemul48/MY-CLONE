import glob, shutil, os

# castom import
from info import block_list, temp_folder


def rename_full_folder(path):
    for file_path in glob.glob(glob.escape(path) + "/*", recursive=True):
        file_name = file_path.replace(path, "").replace("\\", "")

        for movie_path in glob.glob(glob.escape(file_path) + "/*", recursive=True):
            try:
                file_extension = (
                    movie_path[::-1].replace(".", "_-_", 1)[::-1].split("_-_")[1]
                )
            except:
                continue
            file_or_folder_name = movie_path.replace(file_path, "").replace("\\", "")
            if file_or_folder_name == "Subs":
                shutil.rmtree(movie_path)
            elif file_extension in block_list:
                os.remove(movie_path)


def rename_all_folders_movie():
    for category in glob.glob(glob.escape(temp_folder) + "/*"):
        rename_full_folder(category)
