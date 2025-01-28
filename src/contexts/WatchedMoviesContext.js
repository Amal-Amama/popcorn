import { createContext, useContext } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

const WatchedContext = createContext();
function WatchedProvider({ children }) {
  const [watchedMovies, setWatchedMovies] = useLocalStorage("watched", []);

  function handleAddMovie(movie) {
    if (watchedMovies.map((movie) => movie.imdbID).includes(movie.imdbID))
      return;
    setWatchedMovies((watchedMovies) => [movie, ...watchedMovies]);
  }
  function handleDeleteWatchedMovie(id) {
    setWatchedMovies((watchedList) =>
      watchedList.filter((movie) => movie.imdbID !== id)
    );
  }

  function watchedUserRating(selectedMovieId) {
    return watchedMovies.find((movie) => movie.imdbID === selectedMovieId)
      ?.userRating;
  }
  return (
    <WatchedContext.Provider
      value={{
        watchedMovies,
        handleAddMovie,
        handleDeleteWatchedMovie,
        watchedUserRating,
      }}
    >
      {children}
    </WatchedContext.Provider>
  );
}
function useWatched() {
  const context = useContext(WatchedContext);
  if (context === undefined)
    throw new Error("PostContext was used outside of the PostProvider");
  return context;
}
export { WatchedProvider, useWatched };
