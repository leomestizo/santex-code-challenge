import { useEffect, useRef } from 'react';

const useInterval = (callback, delay) => {
  const savedCallback = useRef();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    let id = null;

    if (delay !== null) {
      id = setInterval(() => {
        savedCallback.current();
      }, delay);
    }

    return () => {
      if (id) {
        clearInterval(id);
      }
    };
  }, [delay]);
};

export default useInterval;
