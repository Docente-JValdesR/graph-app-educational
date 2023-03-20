import { useContext } from "react";
import { GraphContext } from "../context/graphContext";

export default function StatusGraph() {
  const { chartOptions } = useContext(GraphContext);

  return (
    <div className="py-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 border rounded">
            {/* Incluye aquí el código para mostrar el gráfico */}
            {chartOptions && <pre>{JSON.stringify(chartOptions, null, 2)}</pre>}
          </div>
        </div>
      </div>
    </div>
  );
}
