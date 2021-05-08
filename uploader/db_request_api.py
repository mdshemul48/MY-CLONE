import requests

from info import error_link, movie_edit_link


class Db_request_api:
    def __init__(self) -> None:
        self.api = requests

    def log_error(self, bot_title: str, error_text: str):
        error = {"botName": bot_title, "errorText": error_text}

        response = self.api.put(error_link, json=error)

        if response.status_code != 201:
            raise Exception("log error function not working.")

    def update_content(self, title: str, content: dict):
        data = {
            "title": title,
            "content": content,
        }
        response = self.api.patch(movie_edit_link, json=data)

        if response.status_code != 200:
            raise Exception(response.json())

        if response.json()["successful"] != True:
            raise Exception(response.json())
        print("ok")
        return response.json()


if __name__ == "__main__":
    api = Db_request_api()
    api.update_content(
        "To.Each.His.Own.1946.1080p.WEBRip.x265-RARBG",
        {"status": "uploaded....", "path": "E:\\Temp\\Record"},
    )
