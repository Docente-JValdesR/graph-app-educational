import {
  useState,
  useEffect,
  useContext,
  useRef,
  useLayoutEffect,
} from "react";
import { GraphContext } from "../context/graphContext";

const StatusGraph = () => {
  const { chartOptions } = useContext(GraphContext);
  const [consoleText, setConsoleText] = useState("");
  const consoleTextRef = useRef("");
  const preRef = useRef(null);
  const [isPrinting, setIsPrinting] = useState(false);
  const isFirstRender = useRef(true);

  useEffect(() => {
    // Evita ejecutar el efecto en la primera renderización
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    setIsPrinting(true); // Comienza la impresión
    const textToPrint = JSON.stringify(chartOptions, null, 2);
    let i = 0;
    const printLetter = () => {
      if (i < textToPrint.length) {
        consoleTextRef.current += textToPrint.charAt(i);
        setConsoleText(consoleTextRef.current);
        i++;
        setTimeout(printLetter, 15);
      } else {
        setIsPrinting(false); // Termina la impresión
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
    <div className="ps-5 py-5 position-fixed" style={{ width: "inherit" }}>
      <div className="container text-center">
        <h2>Estado de datos.</h2>
        <div className="row justify-content-center text-start p-lg-5 custom-shadow">
          <div className="col-12" style={{ height: "75vh" }}>
            {/* Mostramos el texto letra por letra */}
              <pre
                ref={preRef}
                className="overflow-auto pb-5"
                style={{ height: "100%" }}
              >
                {consoleText}
                {!isPrinting && (
                  <span className="blink">esperando actualizar datos</span>
                )}
                <span className="blink"> | </span>
              </pre>
            </div>
        </div>
      </div>
    </div>
  );
};

export default StatusGraph;
