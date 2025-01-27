import React from "react";
import WatchedMovie from "../WatchedMovie";

function WatchedMoviesList({ watchedMovies, onDeleteWatchedMovie }) {
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
