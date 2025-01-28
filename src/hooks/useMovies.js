import { useEffect, useState } from "react";
import { BASE_URL, KEY } from "../config";

export function useMovies(query, setSelectedMovieId) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(
    function () {
      const controller = new AbortController();
      async function fetchMovies() {
        try {
          setIsLoading(true);
          setError("");
          const res = await fetch(`${BASE_URL}?apikey=${KEY}&s=${query}`, {
            signal: controller.signal,
          });
          const data = await res.json();
          if (!res.ok)
            throw new Error("Something went wrong with fetching movies");
          if (data.Response === "False") throw new Error("Movie not found");
          setMovies(data.Search);
          setError("");
        } catch (err) {
          console.error(err.message);
          if (err.name !== "AbortError") {
            setError(err.message);
          }
        } finally {
          setIsLoading(false);
        }
      }
      if (query.length < 3) {
        setMovies([]);
        setError("");
        return;
      }
      setSelectedMovieId("");
      fetchMovies();
      return function () {
        controller.abort();
      };
    },
    [query, setSelectedMovieId]
  );
  return { movies, isLoading, error };
}
