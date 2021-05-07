import requests

from auth_info import error_link, movie_edit_link, publish_command


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

    def get_all_arguments(self):
        response = self.api.get(publish_command)
        if response.status_code != 200:
            raise Exception(
                "response code not 200.. maybe some server error. please check.. in get_all_arguments function."
            )
        response_content = response.json()
        if not response_content["successful"]:
            raise Exception(
                "response  not successful.. maybe some server error. please check.. in get_all_arguments function."
            )

        return response_content["allEntry"]


if __name__ == "__main__":
    api = Db_request_api()
    print(api.get_all_arguments())
