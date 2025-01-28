import { useState } from "react";
import Box from "./components/Box";
import Logo from "./components/Logo";
import MoviesList from "./components/MoviesList";
import SearchMovie from "./components/SearchMovie";
import SearchResult from "./components/SearchResult";
import Loader from "./components/Loader";
import Message from "./components/Message";
import WatchedSum from "./components/WatchedSum";
import MovieDetails from "./components/MovieDetails";
import WatchedMoviesList from "./components/WatchedMoviesList";
import { useMovies } from "./hooks/useMovies";
import { useLocalStorage } from "./hooks/useLocalStorage";

function App() {
  const [query, setQuery] = useState("");
  const [selectedMovieId, setSelectedMovieId] = useState("");
  const { movies, error, isLoading } = useMovies(query, setSelectedMovieId);
  const [watchedMovies, setWatchedMovies] = useLocalStorage("watched", []);

  function handleAddWatchedMovie(movie) {
    if (watchedMovies.map((movie) => movie.imdbID).includes(movie.imdbID))
      return;
    setWatchedMovies((watchedMovies) => [movie, ...watchedMovies]);
  }
  function handleDeleteWatchedMovie(id) {
    setWatchedMovies((watchedList) =>
      watchedList.filter((movie) => movie.imdbID !== id)
    );
  }

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
              movies={movies}
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
