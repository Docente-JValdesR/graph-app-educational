import { useState, useEffect, useContext, useRef, useLayoutEffect } from "react";
import { GraphContext } from "../context/graphContext";

const StatusGraph = () => {
  const { chartOptions } = useContext(GraphContext);
  const [consoleText, setConsoleText] = useState("");
  const consoleTextRef = useRef("");
  const preRef = useRef(null);

  useEffect(() => {
    // Cada vez que se actualice el estado de chartOptions, simulamos el comportamiento de una consola
    const textToPrint = JSON.stringify(chartOptions, null, 2);
    let i = 0;
    const printLetter = () => {
      if (i < textToPrint.length) {
        consoleTextRef.current += textToPrint.charAt(i);
        setConsoleText(consoleTextRef.current);
        i++;
        setTimeout(printLetter, 15);
      }
    };
    setTimeout(printLetter, 100);
  }, [chartOptions]);

  useLayoutEffect(() => {
    // Desplazamos automáticamente al final del contenido
    if (preRef.current) {
      preRef.current.scrollTop = preRef.current.scrollHeight;
    }
  }, [consoleText]);

  return (
    <div className="py-5 position-fixed">
      <div className="container text-center">
        <h2>Estado de datos.</h2>
        <div className="row justify-content-center text-start">
          <div className="col-12 border rounded w-100" style={{ height: "75vh" }}>
            {/* Mostramos el texto letra por letra */}
            <pre ref={preRef} className="overflow-auto pb-5" style={{ height: "100%" }}>
              {consoleText}<div className="blink">|</div>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatusGraph;
