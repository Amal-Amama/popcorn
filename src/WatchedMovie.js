import React from "react";

function WatchedMovie({ movie, onDeleteWatchedMovie }) {
  const { imdbID, imdbRating, poster, runtime, title, userRating } = movie;
  console.log({ mv: movie });
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
      <button onClick={() => onDeleteWatchedMovie(imdbID)}>x</button>
    </div>
  );
}

export default WatchedMovie;
