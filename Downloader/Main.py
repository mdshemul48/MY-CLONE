from guessit import guessit


# castom imports
from info import letest_movies_link
from rarbg_api import download as rargb_letest_torrent
from db_request_api import Db_request_api


def get_movie_title_and_year(title):
    movie = guessit(title)
    return movie["title"], movie["year"]


def downloader(movie):
    title = movie["title"]
    size = movie["size"]
    link = movie["href_link"]
    imdb_id = movie["imdb"]

    # ------- extracting title and year ------------------
    movie_title, movie_year = get_movie_title_and_year(title)

    detabace = Db_request_api()
    # -------- movie chaking or insterting in databace working history---------------
    db_response = detabace.check_working_history(title)
    if db_response["found"] is True:
        return None

    # search on our database
    search_response = detabace.search_movie_in_db


def main():

    letest_movies = rargb_letest_torrent(letest_movies_link)
    if letest_movies["success"] is False:
        raise Exception("RARBG torrent not return valid data.")

    for movie in letest_movies["data"]:
        downloader(movie)
        break


if __name__ == "__main__":
    main()
