import React from "react";

function Movie({ movie, setSelectedMovieId }) {
  const { Poster: poster, Title: title, Year: year, imdbID } = movie;

  return (
    <li className="movie" onClick={() => setSelectedMovieId(imdbID)}>
      <img src={poster} alt={`film ${title}`} width={40} height={58.8} />
      <div>
        <h3>{title}</h3>
        <p>
          <span>🗓</span>
          <span>{year}</span>
        </p>
      </div>
    </li>
  );
}

export default Movie;
