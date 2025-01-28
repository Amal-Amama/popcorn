import React from "react";
import { useWatched } from "./contexts/WatchedMoviesContext";

function WatchedMovie({ movie }) {
  const { imdbID, imdbRating, poster, runtime, title, userRating } = movie;
  const { handleDeleteWatchedMovie } = useWatched();
  return (
    <div className="watchedMovie">
      <img
        src={poster}
        alt={`poster of the movie ${title}`}
        width={40}
        height={58.8}
      />
      <h2>{title}</h2>
      <div>
        <p>
          <span>⭐</span>
          {imdbRating}
        </p>
        <p>
          <span>🌟</span>
          {userRating}
        </p>
        <p>
          <span>⏳</span>
          {runtime}
        </p>
      </div>
      <button onClick={() => handleDeleteWatchedMovie(imdbID)}>x</button>
    </div>
  );
}

export default WatchedMovie;
