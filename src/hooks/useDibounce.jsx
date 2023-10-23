import { useEffect, useState } from "react";
export default function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState();
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(timeoutId);
  }, [delay, value]);

  return debouncedValue;
}
