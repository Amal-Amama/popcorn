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
import { WatchedProvider } from "./contexts/WatchedMoviesContext";

function App() {
  const [query, setQuery] = useState("");
  const [selectedMovieId, setSelectedMovieId] = useState("");
  const { movies, error, isLoading } = useMovies(query, setSelectedMovieId);

  const numMovies = movies.length;

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
        <WatchedProvider>
          <Box>
            {!selectedMovieId ? (
              <>
                <WatchedSum />
                <WatchedMoviesList />
              </>
            ) : (
              <MovieDetails
                setSelectedMovieId={setSelectedMovieId}
                selectedMovieId={selectedMovieId}
              />
            )}
          </Box>
        </WatchedProvider>
      </main>
    </div>
  );
}

export default App;
