import React, { useEffect, useState } from "react";
import StarRating from "./StarRating";
import Loader from "./Loader";
import Message from "./Message";
import { BASE_URL, KEY } from "../config";
import { useWatched } from "../contexts/WatchedMoviesContext";

function MovieDetails({ setSelectedMovieId, selectedMovieId }) {
  const [rating, setRating] = useState(0);
  const [movie, setMovie] = useState({});
  const [isloading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { handleAddMovie, watchedUserRating } = useWatched();
  const watchedRating = watchedUserRating(selectedMovieId);
  useEffect(
    function () {
      async function fetchMovieDetails() {
        try {
          setIsLoading(true);
          const res = await fetch(
            `${BASE_URL}?apikey=${KEY}&i=${selectedMovieId}`
          );
          const data = await res.json();
          setMovie(data);
        } catch (err) {
          console.log(err);
          setError(err.message);
        } finally {
          setIsLoading(false);
        }
      }
      fetchMovieDetails();
    },
    [selectedMovieId]
  );
  const {
    Title: title,
    Poster: poster,
    imdbRating,
    Runtime: runtime,
    Released: released,
    Plot: plot,
    Actors: actors,
    Director: director,
    Year: year,
  } = movie;

  function handleAddWatchedMovie() {
    const updatedMovie = {
      imdbID: selectedMovieId,
      title,
      year,
      poster,
      imdbRating: Number(imdbRating),
      runtime: Number(runtime.split(" ").at(0)),
      userRating: rating,
    };
    handleAddMovie(updatedMovie);
    setRating(0);
  }
  useEffect(
    function () {
      setRating(0);
    },
    [selectedMovieId]
  );
  if (isloading) return <Loader />;
  if (error) return <Message message={error} />;

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
          {watchedRating ? (
            <p>You rated with movie {watchedRating}⭐</p>
          ) : (
            <>
              <StarRating size={24} onSetRate={setRating} />
              {rating > 0 && (
                <button className="rate_btn" onClick={handleAddWatchedMovie}>
                  +Add to list
                </button>
              )}
            </>
          )}
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
