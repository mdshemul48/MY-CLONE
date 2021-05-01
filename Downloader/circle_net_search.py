import datetime
import requests
from bs4 import BeautifulSoup
from guessit import guessit
from difflib import SequenceMatcher,get_close_matches
import re




def search_movies(movie_name, movie_year):
    search = requests.get(f"http://circleftp.net/",  params={"s": movie_name})
    content = search.content
    html_soup = BeautifulSoup(content, "html.parser")
    all_article = html_soup.find_all("article")
    data_of_all_movie_or_tv = {}

    movie_Found = False

    for article in all_article:
        found_name = article.find(
            "h3", class_="entry-title").text.strip()
        link = article.find(
            "h3", class_="entry-title").find("a").get("href")
        try:
            title = guessit(found_name)
        except:
            continue
        try:
            title_name = title["title"]
            try:
                title_year = title["year"]
            except:
                title_year = re.search(r"\d\d\d\d", found_name)[0]
            match_ratio = SequenceMatcher(
                None, title_name, movie_name).ratio() * 100
            if match_ratio >= 70:
                if title_year == movie_year:
                    movie_Found = True
            data_of_all_movie_or_tv[f"{title_name.lower()} {title_year}"] = {
                found_name: link}
        except:
            pass

    searched_content = f"{movie_name.lower()} {movie_year}"
    results = get_close_matches(
        searched_content, data_of_all_movie_or_tv, n=5, cutoff=0.5)
    data = []
    for item in results:
        final_result = (data_of_all_movie_or_tv[item])
        data.append(final_result)


    print(data)
    return {"found":movie_Found, "searchResult": data }


if __name__ == "__main__":
    search_movies("kick", 2014)