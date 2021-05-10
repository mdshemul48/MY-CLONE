from difflib import SequenceMatcher
from guessit import guessit


def compare_two_movie(first_movie: str, secend_movie: str):
    first_movie = guessit(first_movie)
    secend_movie = guessit(secend_movie)
    first_title, first_year = first_movie["title"], first_movie["year"]
    second_title, second_year = secend_movie["title"], secend_movie["year"]
    title_matched_percentage = (
        SequenceMatcher(None, first_title, second_title).ratio() * 100
    )
    if title_matched_percentage >= 70 and first_year == second_year:
        return True
    else:
        return False


if __name__ == "__main__":
    print(
        compare_two_movie(
            "Faith.of.My.Fathers.2005.1080p.AMZN.WEBRip.AAC2.0.x264-PLiSSKEN",
            "Faith.of.My.Fathers.2005.1080p.WEB-DL.AAC2.0.x264-PLiSSKEN",
        )
    )
