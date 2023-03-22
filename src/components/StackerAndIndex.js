import React, { useContext, useState, useEffect } from "react";
import { GraphContext } from "../context/graphContext";

const StackerAndIndex = () => {
  const { chartOptions, setChartOptions } = useContext(GraphContext);
  const [indexAxis, setIndexAxis] = useState("x");
  const [scales, setScales] = useState(false);

  useEffect(() => {
    if (chartOptions.indexAxis) {
      setIndexAxis(chartOptions.indexAxis);
    }
    if (chartOptions.scales) {
      setScales(chartOptions.scales.x?.stacked || false);
    }
  }, [chartOptions]);

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
    <div className="container align-self-center p-5 mb-3 border rounded custom-shadow">
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
            <label className="form-check-label">
              Selecciona para apilar las barras
            </label>
          </div>
          <div className="mb-3">
            <label htmlFor="index-axis-select" className="form-label">
              Selecciona el eje de simetría
            </label>
            <select
              className="form-select form-select-sm"
              id="index-axis-select"
              value={indexAxis}
              onChange={handleIndexAxisChange}
            >
              <option value="x">X</option>
              <option value="y">Y</option>
            </select>
          </div>

          <button
            className="btn btn-outline-secondary btn-sm text-white mt-4"
            onClick={handleSave}
          >
            Agregar Eje y Diseño
          </button>
        </div>
      </div>
    </div>
  );
};

export default StackerAndIndex;
