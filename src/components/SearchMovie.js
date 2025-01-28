import React, { useRef } from "react";
import { useKey } from "../hooks/useKey";

function SearchMovie({ query, onSetQuery }) {
  const searchRef = useRef(null);

  useKey("Enter", function () {
    if (document.activeElement === searchRef.current) return;
    searchRef.current.focus();
    onSetQuery("");
  });

  return (
    <input
      className="search"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => onSetQuery(e.target.value)}
      ref={searchRef}
    />
  );
}

export default SearchMovie;
