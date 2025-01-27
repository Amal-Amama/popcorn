import { useEffect, useState } from "react";
import Box from "./components/Box";
import Logo from "./components/Logo";
import MoviesList from "./components/MoviesList";
import SearchMovie from "./components/SearchMovie";
import SearchResult from "./components/SearchResult";
import Loader from "./components/Loader";
import Message from "./components/Message";
import WatchedSum from "./components/WatchedSum";
import MovieDetails from "./components/MovieDetails";
import { BASE_URL, KEY } from "./config";
import WatchedMoviesList from "./components/WatchedMoviesList";

function App() {
  const [movies, setMovies] = useState([]);
  const [watchedMovies, setWatchedMovies] = useState(function () {
    const storedValues = localStorage.getItem("watched");
    return storedValues ? JSON.parse(storedValues) : [];
  });
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedMovieId, setSelectedMovieId] = useState("");

  function handleAddWatchedMovie(movie) {
    if (watchedMovies.map((movie) => movie.imdbID).includes(movie.imdbID))
      return;
    setWatchedMovies((watchedMovies) => [movie, ...watchedMovies]);
  }
  function handleDeleteWatchedMovie(id) {
    console.log({ idDelete: id });
    setWatchedMovies((watchedList) =>
      watchedList.filter((movie) => movie.imdbID !== id)
    );
  }
  useEffect(
    function () {
      localStorage.setItem("watched", JSON.stringify(watchedMovies));
    },
    [watchedMovies]
  );
  useEffect(
    function () {
      const controller = new AbortController();
      async function fetchMovies() {
        try {
          setIsLoading(true);
          setError("");
          const res = await fetch(`${BASE_URL}?apikey=${KEY}&s=${query}`, {
            signal: controller.signal,
          });
          const data = await res.json();
          if (!res.ok)
            throw new Error("Something went wrong with fetching movies");
          if (data.Response === "False") throw new Error("Movie not found");
          setMovies(data.Search);
          setError("");
        } catch (err) {
          console.error(err.message);
          if (err.name !== "AbortError") {
            setError(err.message);
          }
        } finally {
          setIsLoading(false);
        }
      }
      if (query.length < 3) {
        setMovies([]);
        setError("");
        return;
      }
      setSelectedMovieId("");
      fetchMovies();
      return function () {
        controller.abort();
      };
    },
    [query]
  );
  const numMovies = movies.length;

  const watchedUserRating = watchedMovies.find(
    (movie) => movie.imdbID === selectedMovieId
  )?.userRating;

  return (
    <div className="App">
      <header>
        <nav className="nav">
          <Logo />
          <SearchMovie query={query} onSetQuery={setQuery} />
          <SearchResult numMovies={numMovies} />
        </nav>
      </header>
      <main>
        <Box>
          {!error && !isLoading && (
            <MoviesList
              query={query}
              setIsLoading={setIsLoading}
              movies={movies}
              setMovies={setMovies}
              setError={setError}
              setSelectedMovieId={setSelectedMovieId}
            />
          )}
          {error && !selectedMovieId && <Message message={error} />}
          {isLoading && <Loader />}
        </Box>
        <Box>
          {!selectedMovieId ? (
            <>
              <WatchedSum watchedMovies={watchedMovies} />
              <WatchedMoviesList
                watchedMovies={watchedMovies}
                onDeleteWatchedMovie={handleDeleteWatchedMovie}
              />
            </>
          ) : (
            <MovieDetails
              setSelectedMovieId={setSelectedMovieId}
              selectedMovieId={selectedMovieId}
              onAddMovie={handleAddWatchedMovie}
              watchedUserRating={watchedUserRating}
            />
          )}
        </Box>
      </main>
    </div>
  );
}

export default App;
