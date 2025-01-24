import React, { useState } from "react";

function SearchMovie({ query, onSetQuery }) {
  return (
    <input
      className="search"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => onSetQuery(e.target.value)}
    />
  );
}

export default SearchMovie;
