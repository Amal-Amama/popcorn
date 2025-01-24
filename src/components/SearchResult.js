import React from "react";

function SearchResult({ numMovies }) {
  return (
    <p className="num-results">
      Found<strong> {numMovies} </strong>results
    </p>
  );
}

export default SearchResult;
