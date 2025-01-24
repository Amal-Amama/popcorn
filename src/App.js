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

const BASE_URL = "http://www.omdbapi.com/";
const KEY = "50702ac0";

function App() {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedMovieId, setSelectedMovieId] = useState("");
  const [movie, setMovie] = useState({});
  console.log({ heeeeh: selectedMovieId });
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

      fetchMovies();
      return function () {
        controller.abort();
      };
    },
    [query]
  );
  const numMovies = movies.length;

  useEffect(
    function () {
      async function fetchMovieDetails() {
        try {
          const res = await fetch(
            `${BASE_URL}?apikey=${KEY}&i=${selectedMovieId}`
          );
          const data = await res.json();
          console.log({ movieData: data });
          setMovie(data);
        } catch (err) {
          console.log(err);
        } finally {
        }
      }
      fetchMovieDetails();
    },
    [selectedMovieId]
  );
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
          {error && <Message message={error} />}
          {isLoading && <Loader />}
        </Box>
        <Box>
          <WatchedSum />
          {selectedMovieId && <MovieDetails movie={movie} />}
        </Box>
      </main>
    </div>
  );
}

export default App;
