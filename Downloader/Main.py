import time
from guessit import guessit
from difflib import SequenceMatcher

# castom imports
from info import bot_name
from db_request_api import Db_request_api
from circle_net_search import search_movies
from castom_imdb_api import Imdb_api
from qbit_download_api import Qbit_download


def save_error(bot_title, error_message):
    detabase = Db_request_api()
    detabase.log_error(bot_title, error_message)


def get_movie_title_and_year(title):
    movie = guessit(title)
    return movie["title"], movie["year"]


def compare_two_movie(first_movie: dict, secend_movie: dict):
    first_title, first_year = first_movie["title"], first_movie["year"]
    second_title, second_year = secend_movie["title"], secend_movie["year"]
    title_matched_percentage = (
        SequenceMatcher(None, first_title, second_title).ratio() * 100
    )
    if title_matched_percentage >= 70 and first_year == second_year:
        return True
    else:
        return False


def downloader(movie):
    title = movie["title"]
    size = movie["size"] / 1024 / 1024 / 1024
    megnet_link = movie["download"]
    imdb_id = movie["episode_info"]["imdb"][2:]
    # ------- extracting title and year ------------------
    movie_title, movie_year = get_movie_title_and_year(title)

    # ----------checking if movie size under 5gb---------
    if size >= 5:
        return

    # -------- movie chaking or insterting in databace working history---------------
    detabace = Db_request_api()

    db_response = detabace.check_working_history(title)
    if db_response["found"]:
        return

    # search on our database and check if exist.
    search_response = detabace.search_movie_in_db(movie_title)
    if len(search_response) != 0:
        for result in search_response:
            result_full_title = result["title"]
            result_title, result_year = get_movie_title_and_year(result_full_title)

            found = compare_two_movie(
                {"title": movie_title, "year": movie_year},
                {"title": result_title, "year": result_year},
            )
            if found:
                return

    # getting movie info from imdb. like poster genres etc.
    movie = Imdb_api(imdb_id)
    language = movie.get_language()
    genres = movie.get_genres()
    poster = movie.get_poster()
    rated_movie = movie.get_rated_movie()

    # searching in out ftp server. if movie alredy exist. :- http://circleftp.net
    search_in_circle_ftp = search_movies(movie_title, movie_year)
    search_boolean = search_in_circle_ftp["found"]
    search_result = search_in_circle_ftp["searchResult"]
    if search_boolean:
        return

    # adding data to the db
    detabace.create_movie_with_info(
        title=title,
        language=language,
        genres=genres,
        imdbLink=imdb_id,
        downloadSearchResult=str(search_result),
        movieRating=rated_movie,
        posterLink=poster,
    )

    # download using qbitTorrent
    qbit = Qbit_download()
    qbit.download_movie(megnet_link, language)


def main():
    api = Db_request_api()

    letest_movies = api.get_letest_movie()

    for movie in letest_movies:
        try:
            downloader(movie)
        except Exception as err:
            save_error(bot_name, str(err))
        break


if __name__ == "__main__":
    while True:
        print("start..")
        try:
            main()
        except Exception as err:
            save_error(bot_name, str(err))
        print("end..")

        time.sleep(300)
