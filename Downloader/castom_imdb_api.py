from imdb import IMDb



class imdb_api:
    imdb_api = IMDb()
    def __init__(self, id) -> None:
        self.movie = self.imdb_api.get_movie(id)

    def get_language(self):
        return self.movie["language"][0]

if __name__ == "__main__":
    movie = imdb_api("2372222")
    print(movie.get_language())