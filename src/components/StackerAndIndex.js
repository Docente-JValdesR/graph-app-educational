import React, { useContext, useState } from "react";
import { GraphContext } from "../context/graphContext";

const StackerAndIndex = () => {
  const { chartOptions, setChartOptions } = useContext(GraphContext);
  const [indexAxis, setIndexAxis] = useState("x");
  const [scales, setScales] = useState(false);

  const handleIndexAxisChange = (event) => {
    setIndexAxis(event.target.value);
  };


  const handleScalesChange = (event) => {
    setScales(event.target.checked);
  };

  const handleSave = () => {
    const newChartOptions = {
      ...chartOptions,
      indexAxis,
      scales: scales
        ? {
            x: {
              stacked: true,
            },
            y: {
              stacked: true,
            },
          }
        : { undefined },
    };

    setChartOptions(newChartOptions);
  };

  return (
    <div className="container align-self-center">
      <div className="row justify-content-center">
        <div className="col-12 col-lg-6">
          <div className="mb-3 form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="scales-check"
              checked={scales}
              onChange={handleScalesChange}
            />
            <label className="form-check-label" htmlFor="scales-check">
              Apilar Barras
            </label>
          </div>
          <div className="mb-3">
            <label htmlFor="index-axis-select" className="form-label">
              Selecciona el eje
            </label>
            <select
              className="form-select"
              id="index-axis-select"
              value={indexAxis}
              onChange={handleIndexAxisChange}
            >
              <option value="x">X</option>
              <option value="y">Y</option>
            </select>
          </div>

          <button className="btn btn-primary" onClick={handleSave}>
            Guardar opciones
          </button>
        </div>
      </div>
    </div>
  );
};

export default StackerAndIndex;
