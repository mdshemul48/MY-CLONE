import requests
from requests.models import Response

from info import (
    get_movie_by_title_with_info_link,
    create_movie_with_info_link,
    search_movie_in_db_link,
    check_or_create_link,
)


class Db_request_api:
    def __init__(self) -> None:
        self.api = requests
        self.get_movie_by_title_with_info_link = get_movie_by_title_with_info_link
        self.create_movie_with_info_link = create_movie_with_info_link
        self.search_movie_in_db_link = search_movie_in_db_link
        self.check_or_create_link = check_or_create_link

    def get_movie_by_title_with_info(self, movieTitle):

        response = self.api.get(
            self.get_movie_by_title_with_info_link + "/" + movieTitle
        )
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
        print(responce.text)

        if responce.status_code != 201 and responce.status_code != 409:
            raise Exception("something worng with the server")
        elif responce.status_code == 409:
            raise Exception("movie already exist in the server")


if __name__ == "__main__":

    title = "Immi.the.Vegan.2021.1080p.WEB.H264-NAISU"
    language = "English"
    genres = "Thriller,Crime,"
    imdbLink = "https://www.imdb.com/title/tt13269536"
    downloadSearchResult = "[]"
    movieRating = "R-rated"
    posterLink = "https://m.media-amazon.com/images/M/MV5BMTdkYWE4ZGQtOGZkMy00ZTg1LWE5ODEtZWRlMjQ3NWQ2N2I2XkEyXkFqcGdeQXVyNjU0NTI0Nw@@._V1_.jpg"

    api = Db_request_api()
    created = api.create_movie_with_info(
        title=title,
        language=language,
        genres=genres,
        imdbLink=imdbLink,
        downloadSearchResult=downloadSearchResult,
        movieRating=movieRating,
        posterLink=posterLink,
    )
    print(created)
