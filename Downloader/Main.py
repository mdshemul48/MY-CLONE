from guessit import guessit
from difflib import SequenceMatcher

# castom imports
from info import letest_movies_link
from rarbg_api import download as rargb_letest_torrent
from db_request_api import Db_request_api
from circle_net_search import search_movies


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
    size = movie["size"]
    link = movie["href_link"]
    imdb_id = movie["imdb"]

    # ------- extracting title and year ------------------
    movie_title, movie_year = get_movie_title_and_year(title)

    # ----------checking if movie size under 5gb---------
    if size >= 5:
        return

    detabace = Db_request_api()

    # -------- movie chaking or insterting in databace working history---------------
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

    # searching in out ftp server. if movie alredy exist. :- http://circleftp.net
    search_in_circle_ftp = search_movies(movie_title, movie_year)
    search_boolean = search_in_circle_ftp["found"]
    search_result = search_in_circle_ftp["searchResult"]
    if search_boolean:
        return

    print("ready to search")


def main():

    letest_movies = rargb_letest_torrent(letest_movies_link)
    if letest_movies["success"] is False:
        raise Exception("RARBG torrent not return valid data.")

    for movie in letest_movies["data"]:
        print(movie)
        downloader(movie)
        break


if __name__ == "__main__":

    downloader(
        {
            "title": "No Place (2021) 1080p WEBRip x264",
            "size": 2.08,
            "seeds": "1",
            "leeches": "1",
            "uploader": "Scene",
            "href_link": "https://rarbgmirror.org/torrent/xblizw1",
            "imdb": "4215674",
        }
    )
    # main()
