import os
import time
import requests
import pytesseract
from PIL import Image
from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.firefox.options import Options
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.firefox.firefox_binary import FirefoxBinary


# importing importent info
from ..info import geckhodriver_location, tesseract

options = Options()
options.add_argument('--no-sandbox')
options.add_argument("--headless")

cookie = ''

user_agent = {
    'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64; rv:68.0) Gecko/20100101 Firefox/68.0',
    'cookie': cookie
}


def Captcha_Solve():
    FFprofile = webdriver.FirefoxProfile()
    FFprofile.set_preference('network.http.spdy.enabled.http2', False)
    driver = webdriver.Firefox(options=options, firefox_profile=FFprofile,
                               executable_path=geckhodriver_location, firefox_binary=os.environ.get("FIREFOX_BIN"))
    driver.implicitly_wait(10)
    driver.get('https://rarbgmirror.org/torrents.php')
    try:
        clk_here_button = driver.find_element_by_link_text('Click here')
        clk_here_button.click()
        time.sleep(10)
    except:
        pass

    try:
        WebDriverWait(driver, 10).until(
            EC.element_to_be_clickable((By.ID, 'solve_string'))
        )
    finally:
        element = driver.find_elements_by_css_selector('img')[1]
        location = element.location
        size = element.size

        driver.save_screenshot("image.png")

        x = location['x']
        y = location['y']
        width = location['x']+size['width']
        height = location['y']+size['height']

        im = Image.open('image.png')
        im = im.crop((int(x), int(y), int(width), int(height)))
        im.save('final.png')

        pytesseract.pytesseract.tesseract_cmd = tesseract
        solution = pytesseract.image_to_string(Image.open("final.png"))

        text_field = driver.find_element_by_id('solve_string')
        text_field.send_keys(solution)
        text_field.send_keys(Keys.RETURN)
        time.sleep(3)
        selCookie = driver.get_cookies()
        dest = ''
        for item in selCookie:
            name = item['name']
            value = item['value']
            dest += f'{name}={value};'
        driver.close()
        return dest[:-1]


def Captcha_Check():
    url = 'https://rarbgmirror.org/torrents.php'

    response = requests.post(url, headers=user_agent)
    soup = BeautifulSoup(response.content, 'html.parser')
    if "verify your browser" in soup.text:
        #print("Captcha found.")
        return True
    else:
        return False


def getMegnet(url):
    response = requests.get(url, headers=user_agent)
    soup = BeautifulSoup(response.content, 'html.parser')
    magnetLink = soup.select('a[href^="magnet"]')[0]['href']
    # print(magnetLink)
    return magnetLink


def download(url):
    global user_agent
    global cookie
    if Captcha_Check():
        while True:
            cookie = Captcha_Solve()
            if len(cookie) >= 100:
                break
            else:
                continue

    user_agent = {
        'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64; rv:68.0) Gecko/20100101 Firefox/68.0',
        'cookie': cookie
    }
    rarbgDictionary = {
        'success': True,
        'data': []
    }
    try:
        response = requests.get(url, headers=user_agent)
    except requests.exceptions.RequestException:
        rarbgDictionary['success'] = False
        return rarbgDictionary

    soup = BeautifulSoup(response.content, 'html.parser')
    lista2 = soup.select('.lista2')

    for i in range(len(lista2)):
        torrent_name = lista2[i].contents[1].contents[0].contents[0][:75]
        torrent_size = lista2[i].contents[3].contents[0]
        torrent_seeds = lista2[i].contents[4].contents[0].contents[0]
        torrent_leeches = lista2[i].contents[5].contents[0]
        torrent_uploader = lista2[0].contents[7].contents[0]
        try:
            torrent_imdb = lista2[i].contents[1].find_all("a")[1]["href"].split("=")[
                1].replace("tt", "")
        except:
            continue
        torrent_size = torrent_size.split(" ")
        if torrent_size[1] == "GB":
            torrent_size = float(torrent_size[0])
        elif torrent_size[1] == "MB":
            try:
                torrent_size = float(float(torrent_size[0])/1024)
            except:
                torrent_size = 5.1

        href_link = f'https://rarbgmirror.org{lista2[i].contents[1].contents[0]["href"]}'
        torrentDict = {
            'title': torrent_name,
            'size': torrent_size,
            'seeds': torrent_seeds,
            'leeches': torrent_leeches,
            'uploader': torrent_uploader,
            'href_link': href_link,
            "imdb": torrent_imdb
        }
        rarbgDictionary['data'].append(torrentDict)
    return rarbgDictionary


if __name__ == "__main__":

    print(download("https://rarbgmirror.org/torrents.php?category=44%3B54&page=1")["data"])