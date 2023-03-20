import React, { useState, useContext } from "react";
import { GraphContext } from "../context/graphContext";
import ColorPicker from "./ColorPicker";

const AddSetColors = () => {
  const { chartOptions, setChartOptions } = useContext(GraphContext);
  const [data, setData] = useState([]);
  const [backgroundColors, setBackgroundColors] = useState([]);
  const [borderColors, setBorderColors] = useState([]);
  const [newDatasetLabel, setNewDatasetLabel] = useState("");
  // Validación para no renderizar el componente si chartOptions.labels está vacío o indefinido
  if (!chartOptions || !chartOptions.labels) {
    return null;
  }

  const isAddButtonDisabled =
    data.length !== chartOptions.labels.length ||
    backgroundColors.length !== chartOptions.labels.length ||
    borderColors.length !== chartOptions.labels.length ||
    newDatasetLabel.trim() === "";

  const handleAddClick = () => {
    const newDatasets = chartOptions.datasets || [];

    const newDataset = {
      label: newDatasetLabel.trim(),
      data: data,
      backgroundColor: backgroundColors.map(
        (color) => `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`
      ),
      borderColor: borderColors.map(
        (color) => `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`
      ),
      borderWidth: 1,
    };

    setChartOptions({
      ...chartOptions,
      datasets: [...newDatasets, newDataset],
    });
  };

  const handleDataChange = (index, value) => {
    setData((prevState) => {
      const newData = [...prevState];
      newData[index] = value;
      return newData;
    });
  };

  const handleBackgroundColorChange = (index, color) => {
    const newColors = [...backgroundColors];
    newColors[index] = {
      r: color.rgb.r,
      g: color.rgb.g,
      b: color.rgb.b,
      a: color.rgb.a,
    };
    setBackgroundColors(newColors);
    setBackgroundColors((prevColors) => [...prevColors]); // Forzar actualización
  };

  const handleBorderColorChange = (index, color) => {
    const newColors = [...borderColors];
    newColors[index] = {
      r: color.rgb.r,
      g: color.rgb.g,
      b: color.rgb.b,
      a: color.rgb.a,
    };
    setBorderColors(newColors);
    setBorderColors((prevColors) => [...prevColors]); // Forzar actualización
  };

  const handleLabelChange = (event) => {
    setNewDatasetLabel(event.target.value);
  };
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6">
        <div class="table-responsive">
  <table class="table">
    <thead>
      <tr>
        <th>Variable</th>
        <th>Dato</th>
        <th>Color de Fondo</th>
        <th>Color de Borde</th>
      </tr>
    </thead>
    <tbody>
      {chartOptions.labels.map((label, index) => (
        <tr key={index}>
          <td>{label}</td>
          <td>
            <input
              type="number"
              class="form-control"
              value={data[index] || ""}
              onChange={(e) => handleDataChange(index, e.target.value)}
            />
          </td>
          <td>
            <ColorPicker
              onChange={(color) => handleBackgroundColorChange(index, color)}
              color={backgroundColors[index]}
            />
          </td>
          <td>
            <ColorPicker
              color={borderColors[index]}
              onChange={(color) => handleBorderColorChange(index, color)}
            />
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

        </div>
        <div className="col-md-6">
          <div className="form-group">
            <label for="newDatasetLabelInput">Descripción de la variable</label>
            <input
              type="text"
              className="form-control"
              id="newDatasetLabelInput"
              placeholder="ej. Cantidad de votos"
              value={newDatasetLabel}
              onChange={handleLabelChange}
            />
          </div>
          <button
            className="btn btn-outline-secondary"
            onClick={handleAddClick}
            disabled={isAddButtonDisabled}
          >
            Agregar
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddSetColors;
