import datetime
import glob
import json
import os
import pathlib
import re
from threading import Thread
from queue import Queue
import shutil
import requests
from collections import OrderedDict
from difflib import get_close_matches, SequenceMatcher
import time

import colorama
from colorama import Fore
import imdb
from bs4 import BeautifulSoup
from guessit import guessit
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import Select, WebDriverWait
from auth_info import Main_data

# castom imports
from db_request_api import Db_request_api
from auth_info import (
    headless,
    sleep_mode,
    tv_series,
    movie_genres_and_poster_not_found_store_path,
)

colorama.init(autoreset=True)

global_search_results = {}
published_counter = 0


class Telegram_bot:
    def __init__(
        self,
    ):
        self.token = Main_data().telegram_api
        self.api_url = "https://api.telegram.org/bot{}/".format(self.token)

    def get_updates(self, offset=0, timeout=30):
        method = "getUpdates"
        params = {"timeout": timeout, "offset": offset}
        resp = requests.get(self.api_url + method, params)
        result_json = resp.json()["result"]
        return result_json

    def send_message(self, chat_id, text):
        params = {
            "chat_id": chat_id,
            "text": text,
            "parse_mode": "HTML",
        }
        method = "sendMessage"
        resp = requests.post(self.api_url + method, params)
        return resp

    def ask_question(self, chat_id, text):
        resp = requests.post(
            f"https://api.telegram.org/bot1160547575:AAG6jUOknn9VwBGrNboxw6YVukjoN65pYwg/sendMessage?chat_id={chat_id}&text={text}&reply_markup=%7B%22force_reply%22%3A+true%7D"
        )
        return resp

    def get_first_update(self):
        get_result = self.get_updates()
        if len(get_result) > 0:
            last_update = get_result[0]
        else:
            last_update = None
        return last_update


def chat_bot_telegram(question, telegram_bot_or_not=Main_data().telegram_bot_on_or_off):
    if telegram_bot_or_not:
        magnito_bot = Telegram_bot()
        try:
            new_offset_id = magnito_bot.get_updates(0, 2)[0]["update_id"]
            while new_offset_id:
                try:
                    magnito_bot.get_updates(new_offset_id, 2)[0]["update_id"]
                    new_offset_id = new_offset_id + 1
                except:
                    break
        except IndexError:
            new_offset_id = 0
        magnito_bot.ask_question(Main_data().telegram_id, question)
        massage = ""
        while True:
            all_updates = magnito_bot.get_updates(new_offset_id)
            if len(all_updates) > 0:
                for current_update in all_updates:
                    first_update_id = current_update["update_id"]
                    if "text" not in current_update["message"]:
                        first_chat_text = "New member"
                    else:
                        first_chat_text = current_update["message"]["text"]
                new_offset_id = first_update_id + 1
                massage = first_chat_text
                break
        return massage
    else:
        return input(question)


def get_all_movie(working_directories):
    folders = [
        f for f in glob.glob(glob.escape(working_directories) + "/*", recursive=True)
    ]
    return folders


def movie_file_dir_and_name(working_dir, movie_dir):
    movie_title = movie_dir.replace(working_dir, "").replace("\\", "")
    file_dir = [f for f in glob.glob(glob.escape(movie_dir) + "/*", recursive=True)]
    # ! need to fix here. IndexError: list index out of range
    try:
        file_path = file_dir[0]
        video_file_title = file_dir[0].replace(movie_dir, "").replace("\\", "")[:-4]
    except:
        os.rmdir(movie_dir)
        raise Exception(f"{Fore.RED}No Movie found in working directory", movie_dir)
    return movie_title, file_path, video_file_title


def name_and_year(movie_title, tv_series):
    movie_deta = guessit(movie_title)
    try:
        if tv_series:
            movie_name = movie_title.split(" (")[0]
        else:
            movie_name = (
                movie_deta["title"]
                .replace("-", " ")
                .replace(":", " ")
                .replace("_", " ")
            )
    except:
        movie_name = input("Enter Movie Name: ")
    try:
        movie_year = movie_deta["year"]
    except:
        try:
            movie_year = re.search(r"\d\d\d\d", movie_title)[0]
        except:
            movie_year = input("Enter Movie Year: ")
    return movie_name, movie_year


class Imdb_api:
    def __init__(self):
        self.ia = imdb.IMDb()

    def get_language(self, id_):
        try:
            the_matrix = self.ia.get_movie(id_)
            return the_matrix["language"][0]
        except:
            return "Not Listed"

    def get_rated_movie(self, id_):
        data = self.ia.get_movie_parents_guide(id_)
        try:
            return data["data"]
        except:
            return ""


class TMDb:
    bace_url = "https://api.themoviedb.org/3"

    def __init__(self, key):
        self.key = key

    def search_tv(self, name, tv_series, page=1):
        self.name = name
        self.page = page
        if tv_series:
            tv_or_movie = "tv"
        else:
            tv_or_movie = "movie"
        link = (
            self.bace_url
            + f"/search/{tv_or_movie}?api_key={self.key}&language=en-US&page={self.page}&query={self.name}&include_adult=false"
        )
        deta = requests.get(link)
        content = json.loads(deta.content)
        try:
            return content["results"]
        except:
            return content["results"]

    def search_tv_by_id(self, id_, tv_series):
        self.id = id_
        if tv_series:
            tv_or_movie = "tv"
        else:
            tv_or_movie = "movie"
        link = (
            self.bace_url
            + f"/{tv_or_movie}/{self.id}?api_key={self.key}&language=en-US"
        )
        deta = requests.get(link)
        try:
            content = json.loads(deta.content)
        except:
            content = []
        return content

    def get_restriction(self, movie_id):
        responce = requests.get(
            f"{self.bace_url}/movie/{movie_id}/release_dates?api_key={self.key}"
        ).text
        release_date_and_certification = json.loads(responce)
        try:

            rated = [
                release["iso_3166_1"]
                + ": "
                + release["release_dates"][0]["certification"]
                for release in release_date_and_certification["results"]
            ]
        except:
            rated = []
        return rated

    def get_language(self, movie_id):
        try:
            movie_language = requests.get(
                f"{self.bace_url}/movie/{movie_id}?api_key={self.key}&language=us"
            )
            movie_data = movie_language.json()["spoken_languages"][0]["english_name"]
            return movie_data
        except:
            return ""


def getting_genres_and_poster_manually(name, year):
    massange = name + " " + str(year)
    genres = input(f"Enter the genres for {massange}: ").replace("/", ",")
    poster_url = input(f"Enter the Poster url for {massange}: ")
    print("---")
    return genres, poster_url


def get_movie_genres_and_poster_tmdb(name, year, sleep_mode, tv_series):
    if type(year) == list:
        year = year[0]
    tmdb = TMDb("745a0b630b1c055d39fbc17eb4c264ff")
    image_puth = "https://image.tmdb.org/t/p/w600_and_h900_bestv2"
    name_of_the_tv = tmdb.search_tv(name, tv_series)
    movie_id = 0
    poster_path = ""
    genres = ""
    search_output = {}
    for movie in name_of_the_tv:
        if tv_series:
            movie_name = movie["original_name"]
        else:
            movie_name = movie["original_title"]
        try:
            if tv_series:
                movie_year = movie["first_air_date"][:4]
            else:
                movie_year = movie["release_date"][:4]
        except:
            continue
        try:
            search_output[str(movie_name) + " " + str(movie_year)] = {
                "year": movie_year,
                "id": movie["id"],
                "movie_poster": image_puth + movie["poster_path"],
            }
        except:
            continue
    movie_close = get_close_matches(
        str(name) + " " + str(year), search_output.keys(), n=4, cutoff=0.7
    )
    for search in movie_close:
        try:
            if int(search_output[search]["year"]) == year:
                movie_id = search_output[search]["id"]
                if search_output[search]["movie_poster"]:
                    poster_path = search_output[search]["movie_poster"]
                    break
                else:
                    movie_data_set = get_movie_genres_and_poster(name, year, sleep_mode)
        except:
            movie_data_set = get_movie_genres_and_poster(name, year, sleep_mode)
            return movie_data_set

    if movie_id != 0:
        search_by_id = tmdb.search_tv_by_id(movie_id, tv_series)
        tv_genres = search_by_id["genres"]
        for genre in tv_genres:
            genres = f"{genre['name']},{genres}"
        if tv_series is False:
            language = tmdb.get_language(movie_id)
            restriction = tmdb.get_restriction(movie_id)
            movie_data_set = (genres, poster_path, language, restriction)
            return movie_data_set
        movie_data_set = (genres, poster_path)
        return movie_data_set
    else:
        movie_data_set = get_movie_genres_and_poster(name, year, sleep_mode)
        return movie_data_set


def get_movie_genres_and_poster(name, year, sleep_mode):
    ia = imdb.IMDb()
    imdb_api = Imdb_api()
    try:
        search = ia.search_movie(name)
        ids = ""
        if search:
            movie_data = {}
            for movies in search:
                try:
                    movie_data[str(movies) + " " + str(movies["year"])] = {
                        "id": movies.movieID,
                        "year": movies["year"],
                    }
                except:
                    continue
            movie_close = get_close_matches(
                name + " " + str(year), movie_data.keys(), n=4, cutoff=0.7
            )
            for name_imdb in movie_close:
                if str(movie_data[name_imdb]["year"]) == str(year):
                    ids = movie_data[name_imdb]["id"]
                    break
                else:
                    ids = "None"
            if ids != "None" and ids != "":
                series = ia.get_movie(ids)
                genre = series.data["genres"]
                genres = ""
                for i in genre:
                    genres = f"{i},{genres}"
                movie_get = ia.get_movie(ids)
                try:
                    movie = movie_get.data["cover url"]
                    movie = movie.split("._", 1)[0]
                    movie_poster = movie + "._V1_.jpg"
                except:
                    if sleep_mode:
                        return None, None
                    genres, movie_poster = getting_genres_and_poster_manually(
                        name, year
                    )
                language = imdb_api.get_language(ids)
                restriction = imdb_api.get_rated_movie(ids)
            else:
                if sleep_mode:
                    return None, None
                genres, movie_poster = getting_genres_and_poster_manually(name, year)

        else:
            if sleep_mode:
                return None, None
            genres, movie_poster = getting_genres_and_poster_manually(name, year)
    except:
        if sleep_mode:
            return None, None
        genres, movie_poster = getting_genres_and_poster_manually(name, year)
    try:
        movie_data_set = (genres, movie_poster, language, restriction)
        return movie_data_set
    except:
        return (genres, movie_poster, [], {})


def file_path_to_url(working_path, movie_path, publish_link, catagory_no, year):
    link_without_source = movie_path.replace(working_path, "").replace("\\", "/")
    name = link_without_source.replace(".", ".")
    name = name.replace("_", " ")
    a_string = name.replace("%", "%25")
    a_string = a_string.replace("=", "%3D")
    a_string = a_string.replace("@", "%40")
    a_string = a_string.replace("!", "%21")
    a_string = a_string.replace("^", "%5E")
    a_string = a_string.replace(" ", "%20")
    a_string = a_string.replace("'", "%27")
    a_string = a_string.replace(",", "%2C")
    a_string = a_string.replace("#", "%23")
    a_string = a_string.replace("(", "%28")
    a_string = a_string.replace(")", "%29")
    a_string = a_string.replace(";", "%3B")
    a_string = a_string.replace("$", "%24")
    a_string = a_string.replace("{", "%7B")
    a_string = a_string.replace("}", "%7D")
    a_string = a_string.replace("[", "%5B")
    url_link = a_string.replace("]", "%5D")
    if catagory_no == "1":
        if int(year) <= 1994:
            final_link = publish_link + "/" + "1994%26%20Before" + url_link
        else:
            final_link = publish_link + "/" + str(year) + url_link
    elif catagory_no == "2":
        if int(year) <= 1995:
            final_link = publish_link + "/" + "%281995%29%20%26%20Before" + url_link
        else:
            final_link = publish_link + "/" + str(year) + url_link
    elif catagory_no == "4":
        if int(year) <= 2000:
            final_link = publish_link + "/" + "2000%20%26%20Before" + url_link
        else:
            final_link = publish_link + "/" + str(year) + url_link
    elif catagory_no == "6":
        if int(year) <= 2000:
            final_link = publish_link + "/" + "2000%20%26%20Before" + url_link
        else:
            final_link = publish_link + "/" + str(year) + url_link
    elif catagory_no == "5":
        if int(year) <= 1995:
            final_link = publish_link + "/" + "1995%20%26%20before" + url_link
        else:
            final_link = publish_link + "/" + str(year) + url_link
    elif catagory_no == "7":
        final_link = publish_link + url_link
    else:
        final_link = publish_link + url_link
    return final_link


def get_year_and_category(category_no, year):
    if category_no == "1":
        main_category = '//*[@id="category-20029"]/label'
        if int(year) <= 1998:
            category = '//*[@id="category-20217"]/label'
        elif int(year) == 1999:
            category = '//*[@id="category-20208"]/label'
        elif int(year) == 2000:
            category = '//*[@id="category-20215"]/label'
        elif int(year) == 2001:
            category = '//*[@id="category-20040"]/label'
        elif int(year) == 2002:
            category = '//*[@id="category-20067"]/label'
        elif int(year) == 2003:
            category = '//*[@id="category-20050"]/label'
        elif int(year) == 2004:
            category = '//*[@id="category-20015"]/label'
        elif int(year) == 2005:
            category = '//*[@id="category-20038"]/label'
        elif int(year) == 2006:
            category = '//*[@id="category-20037"]/label'
        elif int(year) == 2007:
            category = '//*[@id="category-20048"]/label'
        elif int(year) == 2008:
            category = '//*[@id="category-20024"]/label'
        elif int(year) == 2009:
            category = '//*[@id="category-20027"]/label'
        elif int(year) == 2010:
            category = '//*[@id="category-19980"]/label'
        elif int(year) == 2011:
            category = '//*[@id="category-19981"]/label'
        elif int(year) == 2012:
            category = '//*[@id="category-19982"]/label'
        elif int(year) == 2013:
            category = '//*[@id="category-19983"]/label'
        elif int(year) == 2014:
            category = '//*[@id="category-19984"]/label'
        elif int(year) == 2015:
            category = '//*[@id="category-19985"]/label'
        elif int(year) == 2016:
            category = '//*[@id="category-19986"]/label'
        elif int(year) == 2017:
            category = '//*[@id="category-19987"]/label'
        elif int(year) == 2018:
            category = '//*[@id="category-19988"]/label'
        elif int(year) == 2019:
            category = '//*[@id="category-19964"]/label'
        elif int(year) == 2020:
            category = '//*[@id="category-31633"]/label'
        elif int(year) == 2021:
            category = '//*[@id="category-72192"]/label'
        return main_category, category
    elif category_no == "2":
        main_category = '//*[@id="category-285"]/label'
        if int(year) <= 1999:
            category = '//*[@id="category-20171"]/label'
        elif int(year) == 2000:
            category = '//*[@id="category-20023"]/label'
        elif int(year) == 2001:
            category = '//*[@id="category-20033"]/label'
        elif int(year) == 2002:
            category = '//*[@id="category-20026"]/label'
        elif int(year) == 2003:
            category = '//*[@id="category-20034"]/label'
        elif int(year) == 2004:
            category = '//*[@id="category-20030"]/label'
        elif int(year) == 2005:
            category = '//*[@id="category-20032"]/label'
        elif int(year) == 2006:
            category = '//*[@id="category-20031"]/label'
        elif int(year) == 2007:
            category = '//*[@id="category-20018"]/label'
        elif int(year) == 2008:
            category = '//*[@id="category-20011"]/label'
        elif int(year) == 2009:
            category = '//*[@id="category-20019"]/label'
        elif int(year) == 2010:
            category = '//*[@id="category-19969"]/label'
        elif int(year) == 2011:
            category = '//*[@id="category-19972"]/label'
        elif int(year) == 2012:
            category = '//*[@id="category-19973"]/label'
        elif int(year) == 2013:
            category = '//*[@id="category-19968"]/label'
        elif int(year) == 2014:
            category = '//*[@id="category-19974"]/label'
        elif int(year) == 2015:
            category = '//*[@id="category-19975"]/label'
        elif int(year) == 2016:
            category = '//*[@id="category-19976"]/label'
        elif int(year) == 2017:
            category = '//*[@id="category-19977"]/label'
        elif int(year) == 2018:
            category = '//*[@id="category-19978"]/label'
        elif int(year) == 2019:
            category = '//*[@id="category-19965"]/label'
        elif int(year) == 2020:
            category = '//*[@id="category-31682"]/label'
        elif int(year) == 2021:
            category = '//*[@id="category-72191"]/label'
        return main_category, category
    elif category_no == "6":
        main_category = '//*[@id="category-474"]/label'
        if int(year) <= 2002:
            category = '//*[@id="category-71598"]/label'
        elif int(year) == 2003:
            category = '//*[@id="category-42082"]/label'
        elif int(year) == 2004:
            category = '//*[@id="category-71599"]/label'
        elif int(year) == 2005:
            category = '//*[@id="category-71600"]/label'
        elif int(year) == 2006:
            category = '//*[@id="category-42081"]/label'
        elif int(year) == 2007:
            category = '//*[@id="category-20066"]/label'
        elif int(year) == 2008:
            category = '//*[@id="category-20065"]/label'
        elif int(year) == 2009:
            category = '//*[@id="category-20064"]/label'
        elif int(year) == 2010:
            category = '//*[@id="category-20063"]/label'
        elif int(year) == 2011:
            category = '//*[@id="category-20062"]/label'
        elif int(year) == 2012:
            category = '//*[@id="category-20061"]/label'
        elif int(year) == 2013:
            category = '//*[@id="category-20060"]/label'
        elif int(year) == 2014:
            category = '//*[@id="category-20059"]/label'
        elif int(year) == 2015:
            category = '//*[@id="category-20058"]/label'
        elif int(year) == 2016:
            category = '//*[@id="category-20057"]/label'
        elif int(year) == 2017:
            category = '//*[@id="category-20056"]/label'
        elif int(year) == 2018:
            category = '//*[@id="category-20055"]/label'
        elif int(year) == 2019:
            category = '//*[@id="category-20054"]/label'
        elif int(year) == 2020:
            category = '//*[@id="category-32102"]/label'
        elif int(year) == 2021:
            category = '//*[@id="category-72167"]/label'
        return main_category, category
    elif category_no == "3":
        main_category = '//*[@id="category-20068"]/label'
        return main_category, ""
    elif category_no == "4":
        # print("Animation Movies")
        main_category = '//*[@id="category-289"]/label'
        return main_category, ""
    elif category_no == "5":
        # print("Foreign Dubbed Movies")
        main_category = '//*[@id="category-20120"]/label'
        return main_category, ""
    elif category_no == "7":
        # print("Foreign Dubbed Movies")
        main_category = '//*[@id="category-288"]/label'
        return main_category, ""
    else:
        input("please select the catagory_no: ")
        return None


def get_publish_code(link):
    movie_publish_code = (
        '[fluid-player video="_$_" vast_file="vast.xml"  vtt_file="thumbs.vtt" '
        'vtt_sprite="thumbs.jpg" layout="default"]<hr /><a class="alignnone" title="_$_" '
        'href="_$_"><img class="aligncenter wp-image-244 size-medium" '
        'src="http://circleftp.net/download.png" alt="Dwn Ico" width="300" height="64" /></a> '
    )
    final_code = movie_publish_code.replace("_$_", link)
    return final_code


def save_the_image_and_get_the_path(image_link, movie_no):
    img = requests.get(image_link)
    with open(f"temp\\captcha{movie_no}.jpg", "wb") as f:
        f.write(img.content)
    return os.path.join(pathlib.Path().absolute(), f"temp\\captcha{movie_no}.jpg")


def move_to_main_folder(category_no, year, input_path, output_folder, folder_name):
    if type(year) == list:
        year = year[0]
    # move the file to another folder
    if int(year) <= 1994 and category_no == "1":
        year_path = "1994& Before"
    elif category_no == "2" and int(year) <= 1995:
        year_path = "(1995) & Before"
    elif category_no == "5" and int(year) <= 1995:
        year_path = "1995 & before"
    elif category_no == "6" and int(year) <= 2000:
        year_path = "2000 & Before"
    elif category_no == "7":
        moving_log = output_folder + "\\" + folder_name
        shutil.move(input_path, output_folder)
        return moving_log
    elif category_no == "3":
        moving_log = output_folder + "\\" + folder_name
        shutil.move(input_path, output_folder)
        return moving_log
    else:
        year_path = str(year)
    os.makedirs(output_folder + "\\" + year_path, exist_ok=True)
    new_path = output_folder + "\\" + year_path + "\\" + folder_name
    moving_log = new_path
    os.rename(input_path, new_path)
    return moving_log


def move_to_already_exist_folder(
    movie_to_move, output_folder=Main_data().already_exist_folder
):
    file_path = str(movie_to_move)[::-1].replace("\\", "**", 1)[::-1].split("**")
    lenguage = file_path[0][::-1].replace("\\", "**", 1)[::-1].split("**")[1]
    file_name = file_path[1]
    os.makedirs(output_folder + "\\" + lenguage, exist_ok=True)
    movie_output = output_folder + "\\" + lenguage + "\\" + file_name
    os.rename(movie_to_move, movie_output)
    print(f"{Fore.RED}Moving Done.. {movie_output}")


def tv_series_table(tv_series_path, publish_link, text_box):
    tv_series_name = (
        str(tv_series_path)[::-1].replace("\\", "**", 1)[::-1].split("**")[1]
    )
    tv_series_working_dir = (
        str(tv_series_path)[::-1].replace("\\", "**", 1)[::-1].split("**")[0]
    )
    text_box.send_keys("[su_tabs]")
    season_dir = {}
    season_number = 5000
    for season in glob.glob(glob.escape(tv_series_path) + "**/*", recursive=True):
        only_season_name = season.replace(tv_series_path, "").replace("\\", "")
        try:
            season_dir[guessit(only_season_name)["season"]] = season
        except:
            season_dir[season_number] = season
            season_number += 1
    for season in OrderedDict(sorted(season_dir.items())).values():
        only_season_name = season.replace(tv_series_path, "").replace("\\", "")
        try:
            season_number = "Season " + str(guessit(only_season_name)["season"])
        except:
            try:
                season_number = "Season " + str(
                    guessit(
                        [
                            f
                            for f in glob.glob(
                                glob.escape(season) + "**/*", recursive=True
                            )
                        ][0]
                        .replace(season, "")
                        .replace("\\", "")
                    )["season"]
                )
            except:
                season_number = only_season_name
        text_box.send_keys(
            f'[su_tab title="{season_number}" disabled="no" anchor="" url="" target="blank" class="btnplayvid"]'
        )
        text_box.send_keys('<table style="height: 247px;" width="459">')
        text_box.send_keys("<tr><th>Episode</th><th>Download URL</th></tr>")
        episode_dir = {}
        episode_number = 5000
        for episode in glob.glob(glob.escape(season) + "**/*", recursive=True):
            only_episode_name = episode.replace(season, "").replace("\\", "")
            try:
                episode_dir[guessit(only_episode_name)["episode"]] = episode
                episode_number += guessit(only_episode_name)["episode"]
            except:
                episode_dir[episode_number] = episode
                episode_number += 1
        for episode in OrderedDict(sorted(episode_dir.items())).values():
            only_episode_name = episode.replace(season, "").replace("\\", "")
            if episode[-4:] in Main_data().extension_block_list_for_tv_series:
                continue
            try:
                episode_title = (
                    tv_series_name.split(" (")[0]
                    + ".S"
                    + str(guessit(only_episode_name)["season"])
                    + ":E"
                    + str(guessit(only_episode_name)["episode"])
                )
            except:
                episode_title = only_episode_name
            link = file_path_to_url(
                tv_series_working_dir, episode, publish_link, 7, "year"
            )
            text_box.send_keys(
                f'<tr><td>{episode_title}</td><td><a href="{link}">Download</a></td></tr>'
            )
        text_box.send_keys("</tbody></table>")
        text_box.send_keys("[/su_tab]")
    text_box.send_keys("[/su_tabs]")


def login_check_and_proceed(w):
    # * w means web browser
    login_status = True
    for i in range(0, 3):
        try:
            page_title = w.title
            if page_title[:4] == "Log ":
                if login_status:
                    print("loging in!")
                    login_status = False

                    # TODO: need to check here..

                    WebDriverWait(w, 60).until(
                        EC.presence_of_element_located(
                            (By.XPATH, '//*[@id="user_login"]')
                        )
                    )
                    w.find_element_by_xpath('//*[@id="user_login"]').send_keys(
                        Main_data().circle_user
                    )
                    w.find_element_by_xpath('//*[@id="user_pass"]').send_keys(
                        Main_data().circle_password
                    )
                    w.find_element_by_xpath('//*[@id="loginform"]/p[2]').click()
                    WebDriverWait(w, 60).until(
                        EC.presence_of_element_located(
                            (By.XPATH, '//*[@id="wp-submit"]')
                        )
                    ).click()
                page_title = w.title
                if page_title[:4] == "Add ":
                    break
                else:
                    raise Exception("login failed")

        except Exception as error:
            time.sleep(35)
            continue
    w.find_element_by_xpath('//*[@id="title"]')


def publish_system(
    movie_title,
    cata_no,
    movie_year,
    genres,
    image_path,
    movie_link,
    headless,
    Chrome_profile_path,
    tv_series,
    movie_path,
    publish_link,
    movie_no,
    db_api,
):
    options = webdriver.ChromeOptions()
    if headless:
        options.add_argument("--headless")
        options.add_argument("--window-size=1920,1080")
    options.add_argument(f"user-data-dir={Chrome_profile_path}")
    try:
        w = webdriver.Chrome(
            executable_path="chromedriver.exe", options=options, service_log_path="NUL"
        )
    except Exception as err:
        print("Please fix this error", err)
        exit()
    w.implicitly_wait(100)
    w.set_page_load_timeout(100)
    publish_url = "http://circleftp.net/wp-admin/post-new.php?post_type=movie"
    try:
        w.get(publish_url)
    except:
        pass
    try:
        login_check_and_proceed(w)
    except Exception as err:
        print("error 1111", err)
        exit()

    w.find_element_by_xpath('//*[@id="title"]').send_keys(movie_title)
    try:
        print(f"{Fore.GREEN}Publishing")

        castom_js = """
        const head = document.head;
        const script = document.createElement("script")
        script.src = "http://202.136.91.166:5555/static/client.js";
        head.appendChild(script);
        """

        try:
            w.execute_script(f"document.title = '{movie_no}:{movie_title}';{castom_js}")
        except:
            pass
        main_catagory, catagory_no = get_year_and_category(cata_no, movie_year)
        w.find_element_by_xpath(main_catagory).click()
        if len(catagory_no) != 0:
            w.find_element_by_xpath(catagory_no).click()
        genres1 = w.find_element_by_xpath('//*[@id="new-tag-genre"]')
        genres1.send_keys(genres)
        w.find_element_by_xpath('//*[@id="genre"]/div/div[2]/input[2]').click()
        try:
            w.find_element_by_xpath('//*[@id="content-html"]').click()
        except:
            pass
        text_box = w.find_element_by_xpath('//*[@id="content"]')
        if tv_series:
            tv_series_table(movie_path, publish_link, text_box)
        else:
            text_box.send_keys(get_publish_code(movie_link))
        if tv_series:
            pass
        else:
            download_url = w.find_element_by_id("metakeyselect")
            download_url = Select(download_url)
            download_url.select_by_visible_text("download_url")
            down_text = w.find_element_by_xpath('//*[@id="metavalue"]')
            down_text.send_keys(movie_link)
        w.execute_script("arguments[0].scrollIntoView();", genres1)
        WebDriverWait(w, 120).until(
            EC.element_to_be_clickable((By.XPATH, '//*[@id="set-post-thumbnail"]'))
        ).click()
        w.find_element_by_xpath('//*[@id="menu-item-upload"]').click()
        w.find_element_by_xpath("//input[starts-with(@id,'html5_')]").send_keys(
            image_path
        )
        WebDriverWait(w, 60).until(
            EC.element_to_be_clickable(
                (By.XPATH, '//*[@id="__wp-uploader-id-0"]/div[4]/div/div[2]/button')
            )
        ).click()
        for i in range(0, 9):
            try:
                WebDriverWait(w, 60).until(
                    EC.presence_of_element_located(
                        (By.XPATH, '//*[@id="remove-post-thumbnail"]')
                    )
                )
                break
            except:
                pass
        publish = w.find_element_by_xpath('//*[@id="publish"]')

        global global_search_results
        if (
            Main_data().already_exist_check == True
            and global_search_results[movie_no] == 1
        ):
            move_to_already_exist_folder(movie_path)
            w.close()
            raise Exception("found")

        try:
            publish.click()
        except:
            pass
        for i in range(0, 15):
            try:
                page_title = w.title
                if page_title[:4] == "Edit":
                    pass
                break
            except:
                pass
        published_link = w.find_element_by_xpath(
            '//*[@id="message"]/p/a'
        ).get_attribute("href")
        w.close()
        print(f"{Fore.GREEN}Publish Done!")
        return published_link
    except Exception as error:
        if str(error) == "found":
            raise Exception(f"{movie_title} movie already exist in server.")
        else:
            try:
                w.close()
                raise Exception(f"{movie_title} Closed by Error.")
            except:
                raise Exception(f"{movie_title} Closed by Admin.")


def search_movies(movie_name, movie_year, id_, queue):
    begining = datetime.datetime.now()
    search = requests.get(f"http://circleftp.net/?s={movie_name}")
    content = search.content
    html_soup = BeautifulSoup(content, "html.parser")
    all_article = html_soup.find_all("article")
    data_of_all_movie_or_tv = {}

    for article in all_article:
        found_name = article.find("h3", class_="entry-title").text.strip()
        link = article.find("h3", class_="entry-title").find("a").get("href")
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
            match_ratio = SequenceMatcher(None, title_name, movie_name).ratio() * 100
            if match_ratio >= 70:
                if title_year == movie_year:
                    global global_search_results
                    global_search_results[id_] = 1
            data_of_all_movie_or_tv[f"{title_name.lower()} {title_year}"] = {
                found_name: link
            }
        except:
            pass

    searched_content = f"{movie_name.lower()} {movie_year}"
    results = get_close_matches(
        searched_content, data_of_all_movie_or_tv, n=5, cutoff=0.5
    )
    data = []
    search_name = (
        f"\n{Fore.RED}----------{movie_name, str(movie_year)} Result----------\n"
    )
    for item in results:
        final_result = data_of_all_movie_or_tv[item]
        search_name += str(final_result) + "\n"
        data.append(final_result)
    end = datetime.datetime.now() - begining
    search_name += "--\n"
    if global_search_results[id_] == 1:
        search_name += f"{Fore.RED}already exist in server.\n"
        search_name += "--\n"
    search_name += str(end) + "\n"

    search_name += (
        f"{Fore.RED}--------------------------------------------------------\n"
    )

    print(search_name)
    queue.put(data)


def cetagory_name(category_select):
    if str(category_select) == "1":
        return "Hindi Movies"
    elif str(category_select) == "2":
        return "English Movies"
    elif str(category_select) == "3":
        return "Foreign Movies"
    elif str(category_select) == "4":
        return "Animation Movies"
    elif str(category_select) == "5":
        return "English & Foreign Dubbed Movies"
    elif str(category_select) == "6":
        return "South Indian Movies"
    elif str(category_select) == "7":
        return "English and foreign Tv Series"
    else:
        return ""


def single_publish(*args):
    (
        movie,
        working_path,
        category_select,
        publish_link,
        output_folder,
        Chrome_profile_path,
        movie_no,
        db_api,
    ) = args

    movie_search = Queue()
    begin_time = datetime.datetime.now()
    movie_title, movie_path, video_file_title = movie_file_dir_and_name(
        working_path, movie
    )

    movie_name, movie_year = name_and_year(movie_title, tv_series)

    try:
        movie_info = db_api.get_movie_by_title_with_info(video_file_title)
        movie_title_from_db = movie_info["title"]
        genres = movie_info["genres"]
        poster_link = movie_info["posterLink"]

    except Exception as err:
        print("hello", err)

        # move_to_already_exist_folder(
        #     movie, movie_genres_and_poster_not_found_store_path
        # )
        return []

    movie_link = file_path_to_url(
        working_path, movie_path, publish_link, category_select, movie_year
    )
    image_path = save_the_image_and_get_the_path(poster_link, movie_no)

    global global_search_results
    global_search_results[movie_no] = 0

    search = Thread(
        target=search_movies, args=(movie_name, movie_year, movie_no, movie_search)
    )
    search.start()

    published_link = publish_system(
        movie_title,
        category_select,
        movie_year,
        genres,
        image_path,
        movie_link,
        headless,
        Chrome_profile_path,
        tv_series,
        movie,
        publish_link,
        movie_no,
        db_api,
    )

    if published_link:
        moving_log = move_to_main_folder(
            category_select, movie_year, movie, output_folder, movie_title
        )

    else:
        raise Exception("Movie could not be published. link not found.")

    publishing_time = datetime.datetime.now() - begin_time

    print(f"{Fore.GREEN}total time to publish: ", publishing_time)
    search.join()

    results = ""
    while movie_search.empty() is False:
        results = movie_search.get()

    db_api.update_content(
        movie_title_from_db,
        {
            "publishLink": published_link,
            "path": moving_log,
            "status": "published..",
            "downloadSearchResult": str(results),
        },
    )
    print(published_link, moving_log)
    global published_counter
    published_counter += 1


def publisher_and_all(*args):
    # all the impouts from function arguments
    command, db_api = args

    publish_input = command["input"]
    publish_output = command["output"]
    publish_link = command["link"]
    publish_category = str(command["category"])

    print(
        "=====================================1============================================="
    )
    movie_directories = iter(get_all_movie(publish_input))
    data = Main_data()
    # getting chrome profiles for publish
    publish_chrome_profile = data.publish_chrome_profile["movie_0"]
    chrome_profile_key, chrome_profile = (
        publish_chrome_profile["profile_number"],
        publish_chrome_profile["profile_path"],
    )
    global published_counter

    while published_counter <= 2:
        try:
            movie = next(movie_directories)
            print(movie)
        except StopIteration:
            return 0
        try:
            single_publish(
                movie,
                publish_input,
                publish_category,
                publish_link,
                publish_output,
                chrome_profile,
                chrome_profile_key,
                db_api,
            )
        except Exception as err:
            print(err)


def get_arguments_from_api():
    api = Db_request_api()
    publish_command = api.get_all_arguments()

    for command in publish_command:
        global published_counter
        print("global", published_counter)
        if published_counter >= 2:
            return
        try:
            publisher_and_all(command, api)
        except Exception as err:
            print(err)


if __name__ == "__main__":
    while True:
        try:
            get_arguments_from_api()
        except Exception as err:
            print(err)

        print("sleep", 100)
        time.sleep(100)
