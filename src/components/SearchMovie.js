import React, { useEffect, useRef } from "react";

function SearchMovie({ query, onSetQuery }) {
  const searchRef = useRef(null);

  useEffect(
    function () {
      function handleEnterEvent(e) {
        if (document.activeElement === searchRef.current) return;
        if (e.key === "Enter") {
          searchRef.current.focus();
          onSetQuery("");
        }
      }
      document.addEventListener("keydown", handleEnterEvent);
      return () => {
        document.removeEventListener("keydown", handleEnterEvent);
      };
    },
    [onSetQuery]
  );

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
