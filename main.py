from threading import Thread
import os, json, time


def run_time(script):
    os.system(script)


def main():
    all_command = json.load(
        open(
            "command_to_run_all_bot.json",
        )
    )

    all_threads = []

    for command in all_command:
        command_thread = Thread(target=run_time, args=(command["path"],))
        all_threads.append(command_thread)
        command_thread.start()
        time.sleep(5)

    [command.join() for command in all_threads]


if __name__ == "__main__":
    main()
# scriptone = Thread(target=run_time, args=("server.py",))
# scriptone.start()
