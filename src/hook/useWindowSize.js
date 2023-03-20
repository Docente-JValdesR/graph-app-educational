import { useState, useEffect } from "react";

const useWindowSize = callback => {
  const [windowSize, setWindowSize] = useState({
    width: 0,
    height: 0
  });

  useEffect(() => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight
    });
    window.addEventListener("resize", callback);

    return () => window.removeEventListener("resize", callback);
  }, [callback]);

  return windowSize;
};

export default useWindowSize;


// este custom hook devuelve el ancho de la pantalla 