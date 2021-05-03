import os

# castom imports
from info import temp_folder, upload_folder


def upload():
    command = f'rclone copy "{temp_folder}" "{upload_folder}" --ignore-existing -P'
    for i in range(0, 3):
        os.system(command)
