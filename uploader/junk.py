import glob, shutil, os
import mimetypes

# castom import
from info import temp_folder


def remove_junk_files(path):
    for folder_path in glob.glob(glob.escape(path) + "/*", recursive=True):
        for file_path in glob.glob(glob.escape(folder_path) + "/*", recursive=True):
            # this will delete any files except video..
            if os.path.isfile(file_path):
                if mimetypes.guess_type(file_path)[0].startswith("video") is False:
                    os.remove(file_path)

            # this will delete every folder with movie..
            elif os.path.isdir(file_path):
                shutil.rmtree(file_path)


def remove_junk():
    for category in glob.glob(glob.escape(temp_folder) + "/*"):
        remove_junk_files(category)


if __name__ == "__main__":
    remove_junk()
