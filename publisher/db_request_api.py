from guessit import guessit
import requests
from difflib import SequenceMatcher
from utils import compare_two_movie
from auth_info import (
    backend_api_link,
)


class Db_request_api:
    def __init__(self) -> None:
        self.api = requests

    def log_error(self, bot_title: str, error_text: str):
        error = {"botName": bot_title, "errorText": error_text}

        response = self.api.put(backend_api_link + "/error", json=error)

        if response.status_code != 201:
            raise Exception("log error function not working.")

    def update_content(self, title: str, content: dict):
        data = {
            "title": title,
            "content": content,
        }
        response = self.api.patch(backend_api_link + "/movies/edit", json=data)

        if response.status_code != 200:
            raise Exception(response.json())

        if response.json()["successful"] != True:
            raise Exception(response.json())

    def get_all_arguments(self):
        response = self.api.get(backend_api_link + "/publisher")
        if response.status_code != 200:
            raise Exception(
                "response code not 200.. maybe some server error. please check.. in get_all_arguments function."
            )
        response_content = response.json()
        if not response_content["successful"]:
            raise Exception(
                "response not successful.. maybe some server error. please check.. in get_all_arguments function."
            )

        return response_content["allEntry"]

    def search_movie_in_db(self, only_title):
        response = self.api.get(backend_api_link + f"/movies/search/{only_title}")
        if response.status_code != 200:
            raise Exception(
                "something wrong with the server. please check. search_movie_in_db function. error 1 "
            )
        responseText = response.json()

        if responseText["successful"] is False:
            raise Exception(
                "something wrong with the server. please check. search_movie_in_db function error 2"
            )
        return responseText["movies"]

    def get_movie_by_title_with_info(self, movieTitle):

        response = self.api.get(backend_api_link + f"/movies/movieinfo/{movieTitle}")
        if response.status_code != 200:
            raise Exception("fail to get 200 response at get_movie_by_title_with_info")

        response_data = response.json()

        if response_data["successful"] is False:
            raise Exception(
                "something went wrong with the server at get_movie_by_title_with_info"
            )
        # if movie found by the title then it will return or continue the process
        if response_data["found"]:
            return response_data["movie"]
        # this will search movie and find the right movie and return the movie..
        search_movie = self.search_movie_in_db(movieTitle)
        for result in search_movie:
            if SequenceMatcher(None, result["title"], movieTitle).ratio() < 0.5:
                continue
            if compare_two_movie(result["title"], movieTitle):
                return result

    def bot_status(self, update: dict):
        response = self.api.post(backend_api_link + "/bot-status", json=update)
        if not response.ok:
            raise Exception("botStatus function not working..")

        response_text = response.json()

        if not response_text["successful"]:
            raise Exception("botStatus function not working..")

        try:
            return response_text["createdStatus"]["_id"]
        except:
            return


if __name__ == "__main__":
    api = Db_request_api()
    print(api.get_movie_by_title_with_info("i.am.all.girls.2021.1080p.web.h264-naisu"))
