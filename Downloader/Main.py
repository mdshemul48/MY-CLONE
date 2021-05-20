import time
from guessit import guessit
from difflib import SequenceMatcher
import traceback

# custom imports
from info import bot_name, block_word_in_parents_guide
from db_request_api import Db_request_api
from circle_net_search import search_movies
from castom_imdb_api import Imdb_api
from qbit_download_api import Qbit_download


def save_error(bot_title, error_message):
    database = Db_request_api()
    database.log_error(bot_title, error_message)


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
    print(title)
    # ----------checking if movie size under 5gb---------
    if size >= 5:
        return

    # -------- movie chaking or insterting in databace working history---------------
    database = Db_request_api()

    db_response = database.check_working_history(title)
    if db_response["found"]:
        return

    # search on our database and check if exist.
    search_response = database.search_movie_in_db(movie_title)
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

    # this will ignore movie that include animation genres.
    if "animation" in genres.lower():
        print("animation")
        print("-----------------------------------------------------------------")
        return

    # this will return if the movie has any adult tag in its MPAA
    for word in block_word_in_parents_guide:
        if word in movie.get_rated_movie().lower():
            print(word)
            print("-----------------------------------------------------------------")
            return

    # searching in out ftp server. if movie already exist. :- http://circleftp.net
    search_in_circle_ftp = search_movies(movie_title, movie_year)
    search_boolean = search_in_circle_ftp["found"]
    search_result = search_in_circle_ftp["searchResult"]
    if search_boolean:
        return

    # adding data to the db
    database.create_movie_with_info(
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
    print("done")


def main():
    api = Db_request_api()
    status_id = api.bot_status({"botName": bot_name})
    letest_movies = api.get_letest_movie()

    for movie in letest_movies:
        try:
            downloader(movie)
        except:
            err = traceback.format_exc()
            save_error(bot_name, str(err + " " + str(movie)))

    api.bot_status({"createdId": status_id})


if __name__ == "__main__":
    while True:
        print("start..")
        try:
            main()
        except:
            err = traceback.format_exc()
            save_error(bot_name, str(err))
        print("end..")
        for i in range(1000):
            print(f"counter:   {str(i)}", end="\r")
            time.sleep(1)
