import requests, time

from info import (
    backend_api_link,
)


class Db_request_api:
    def __init__(self) -> None:
        self.api = requests

    def get_movie_by_title_with_info(self, movieTitle):
        response = self.api.get(backend_api_link + f"/movies/movieinfo/{movieTitle}")
        if response.status_code != 200:
            raise Exception("fail to get 200 response at get_movie_by_title_with_info")
        response_data = response.json()
        if response_data["successful"] is False:
            raise Exception(
                "something went wrong with the server at get_movie_by_title_with_info"
            )
        if response_data["successful"] is False:
            return {}
        return response_data["movie"]

    def create_movie_with_info(self, **kwargs):

        title = kwargs["title"]
        language = kwargs["language"]
        genres = kwargs["genres"]
        imdbLink = kwargs["imdbLink"]
        downloadSearchResult = kwargs["downloadSearchResult"]
        movieRating = kwargs["movieRating"]
        posterLink = kwargs["posterLink"]

        info = {
            "title": title,
            "language": language,
            "genres": genres,
            "imdbLink": imdbLink,
            "downloadSearchResult": downloadSearchResult,
            "movieRating": movieRating,
            "posterLink": posterLink,
        }

        responce = self.api.put(self.create_movie_with_info_link, json=info)
        if responce.status_code != 201 and responce.status_code != 409:
            raise Exception("something wrong with the server")
        elif responce.status_code == 409:
            raise Exception("movie already exist in the server")

    def check_working_history(self, title):
        response = self.api.post(backend_api_link + f"/movies/check/{title}")

        if response.status_code != 200:
            raise Exception(
                "something not right with the server. in check_working_history function."
            )

        responseText = response.json()
        if responseText["successful"] is False:
            raise Exception(
                "something not right with the server. successful false. in check_working_history function."
            )
        return {"found": responseText["found"], "movie": responseText["movie"]}

    def search_movie_in_db(self, only_title):
        response = self.api.get(backend_api_link + f"/{only_title}")
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

    def log_error(self, bot_title: str, error_text: str):
        error = {"botName": bot_title, "errorText": error_text}
        response = self.api.put(self.error_link, json=error)
        if response.status_code != 201:
            raise Exception("log error function not working.")

    def get_letest_movie(self):
        response = self.api.get(backend_api_link + "/downloader", timeout=30)

        if response.status_code != 200:
            raise Exception(response.text)

        response_content = response.json()

        if not response_content["successful"]:
            raise Exception(response.text)

        return response_content["movies"]

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
            return response_text


if __name__ == "__main__":

    # title = "Immi.the.Vegan.2021.1080p.WEB.H264-NAISU"
    # language = "English"
    # genres = "Thriller,Crime,"
    # imdbLink = "https://www.imdb.com/title/tt13269536"
    # downloadSearchResult = "[]"
    # movieRating = "R-rated"
    # posterLink = "https://m.media-amazon.com/images/M/MV5BMTdkYWE4ZGQtOGZkMy00ZTg1LWE5ODEtZWRlMjQ3NWQ2N2I2XkEyXkFqcGdeQXVyNjU0NTI0Nw@@._V1_.jpg"

    api = Db_request_api()
    # created = api.create_movie_with_info(
    #     title=title,
    #     language=language,
    #     genres=genres,
    #     imdbLink=imdbLink,
    #     downloadSearchResult=downloadSearchResult,
    #     movieRating=movieRating,
    #     posterLink=posterLink,
    # )
    status_id = api.bot_status({"botName": "downloader"})
    api.bot_status({"createdId": status_id})
