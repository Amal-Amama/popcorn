import { useEffect, useState } from "react";

export function useLocalStorage(key, initialState) {
  const [value, setValue] = useState(function () {
    const storedValues = localStorage.getItem(key);
    console.log("Valeur initiale dans localStorage :", storedValues);
    return storedValues ? JSON.parse(storedValues) : initialState;
  });
  useEffect(
    function () {
      localStorage.setItem(key, JSON.stringify(value));
    },
    [value, key]
  );

  return [value, setValue];
}
