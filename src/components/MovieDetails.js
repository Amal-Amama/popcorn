import React from "react";

function MovieDetails({ movie }) {
  const {
    Title: title,
    Poster: poster,
    imdbRating,
    Runtime: runtime,
    Released: released,
    Plot,
    Actors: actors,
    Director: director,
  } = movie;
  return (
    <header>
      <img src={poster} alt={`poster of the film ${poster}`} />
      <div>
        <h2>{title}</h2>
        <p>
          {released}.{runtime}
        </p>
        <p>
          <span>⭐</span>
          {imdbRating} IMDb Rating
        </p>
      </div>
    </header>
  );
}

export default MovieDetails;
