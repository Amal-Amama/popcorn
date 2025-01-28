import React from "react";
import WatchedMovie from "../WatchedMovie";
import { useWatched } from "../contexts/WatchedMoviesContext";

function WatchedMoviesList() {
  const { watchedMovies, onDeleteWatchedMovie } = useWatched();
  if (watchedMovies.length === 0)
    return (
      <p className="watchedMessage">
        <span>😉</span>
        Don't forget to add the movies you've watched and share your favorites!
      </p>
    );
  return (
    <ul>
      {watchedMovies.map((watched) => (
        <WatchedMovie
          movie={watched}
          key={watched.imdbID}
          onDeleteWatchedMovie={onDeleteWatchedMovie}
        />
      ))}
    </ul>
  );
}

export default WatchedMoviesList;
