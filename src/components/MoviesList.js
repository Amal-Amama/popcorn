import React from "react";
import Movie from "./Movie";

function MoviesList({ movies, setSelectedMovieId }) {
  return (
    <ul className="moviesList">
      {movies?.map((movie) => (
        <Movie
          movie={movie}
          key={movie.imdbID}
          setSelectedMovieId={setSelectedMovieId}
        />
      ))}
    </ul>
  );
}

export default MoviesList;
