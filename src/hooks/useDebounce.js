import { useState, useEffect } from "react";

const useDebounce = (input, ms) => {
  const [debounced, setDebounced] = useState("");

  useEffect(() => {
    const timeout = setTimeout(() => setDebounced(input), ms);
    return () => clearTimeout(timeout);
  }, [input, ms]);

  return debounced;
};

export default useDebounce;