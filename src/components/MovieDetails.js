import React from "react";
import StarRating from "./StarRating";

function MovieDetails({ movie, setSelectedMovieId }) {
  const {
    Title: title,
    Poster: poster,
    imdbRating,
    Runtime: runtime,
    Released: released,
    Plot: plot,
    Actors: actors,
    Director: director,
  } = movie;
  return (
    <>
      <header className="movie-details">
        <img src={poster} alt={`poster of the film ${poster}`} />
        <div className="details-overview">
          <h2>{title}</h2>
          <p>
            {released} . {runtime}
          </p>
          <p>
            <span>⭐</span>
            {imdbRating} IMDb Rating
          </p>
        </div>
        <button className="exit_btn" onClick={() => setSelectedMovieId("")}>
          &larr;
        </button>
      </header>

      <section className="section_details">
        <div className="rating">
          <StarRating />
          <button className="rate_btn">+Add to list</button>
        </div>
        <p>
          <em>{plot}</em>
        </p>
        <p>Staring {actors}</p>
        <p> Directed by {director}</p>
      </section>
    </>
  );
}

export default MovieDetails;
