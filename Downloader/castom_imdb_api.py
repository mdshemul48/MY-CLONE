from imdb import IMDb


class Imdb_api:

    imdb_api = IMDb()

    def __init__(self, id) -> None:
        self.id = id
        self.movie = self.imdb_api.get_movie(id)

    def get_language(self):
        return self.movie["language"][0]

    def get_genres(self):
        genres_array = self.movie.data["genres"]
        genres = ""
        for genre in genres_array:
            genres = f"{genre},{genres}"
        return genres

    def get_poster(self):
        movie = self.movie.data["cover url"].split("._", 1)[0]
        return movie + "._V1_.jpg"

    def get_rated_movie(self):
        restricted_content = self.imdb_api.get_movie_parents_guide(self.id)
        try:
            return str(restricted_content["data"])
        except:
            return "{}"


if __name__ == "__main__":
    movie = Imdb_api("2322441")
    print(movie.get_language())
    print(movie.get_genres())
    print(movie.get_poster())
    print(movie.get_rated_movie())
