import { useEffect } from "react";

export function useKey(key, action) {
  useEffect(
    function () {
      function handleEvent(e) {
        if (e.code.toLowerCase() === key.toLowerCase()) {
          action();
        }
      }
      document.addEventListener("keydown", handleEvent);
      return () => {
        document.removeEventListener("keydown", handleEvent);
      };
    },
    [key, action]
  );
}
