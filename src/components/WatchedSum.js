import React from "react";
import { useWatched } from "../contexts/WatchedMoviesContext";

const average = (arr) => {
  return arr.reduce(function (acc, cur) {
    return (acc + cur) / arr.length;
  }, 0);
};

function WatchedSum() {
  const { watchedMovies } = useWatched();
  const avgImdbRating = average(watchedMovies.map((movie) => movie.imdbRating));
  const avgUserRating = average(watchedMovies.map((movie) => movie.userRating));
  const avgRuntime = average(watchedMovies.map((movie) => movie.runtime));

  return (
    <div className="summary">
      <h2>movies you watched</h2>
      <div>
        <p>
          <span>#️⃣</span> {watchedMovies.length}{" "}
          {watchedMovies.length === 1 ? "movie" : "movies"}
        </p>
        <p>
          <span>⭐</span>
          {avgImdbRating.toFixed(2)}
        </p>
        <p>
          <span>🌟</span>
          {avgUserRating.toFixed(2)}
        </p>
        <p>
          <span>⏳</span>
          {avgRuntime.toFixed(2)}
        </p>
      </div>
    </div>
  );
}

export default WatchedSum;
