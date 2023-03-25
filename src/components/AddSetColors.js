import React, { useState, useContext, useEffect } from "react";
import { GraphContext } from "../context/graphContext";
import ColorPicker from "./ColorPicker";
import { notifySuccess } from "../components/AlertComponent";

const AddSetColors = () => {
  const { chartOptions, setChartOptions } = useContext(GraphContext);
  const [data, setData] = useState([]);
  const [backgroundColors, setBackgroundColors] = useState([]);
  const [borderColors, setBorderColors] = useState([]);
  const [newDatasetLabel, setNewDatasetLabel] = useState("");

  useEffect(() => {
    if (chartOptions && chartOptions.datasets) {
      const datasets = chartOptions.datasets[0];
      setData(datasets.data);
      setBackgroundColors(
        datasets.backgroundColor.map((color) => ({
          r: parseInt(color.slice(5, 8)),
          g: parseInt(color.slice(9, 12)),
          b: parseInt(color.slice(13, 16)),
          a: parseFloat(color.slice(17)),
        }))
      );
      setBorderColors(
        datasets.borderColor.map((color) => ({
          r: parseInt(color.slice(5, 8)),
          g: parseInt(color.slice(9, 12)),
          b: parseInt(color.slice(13, 16)),
        }))
      );
      setNewDatasetLabel(datasets.label);
    } else {
      setData([]);
      setBackgroundColors([]);
      setBorderColors([]);
      setNewDatasetLabel("");
    }
  }, []);

  const handleAddClick = () => {
    const newDataset = {
      label: newDatasetLabel.trim(),
      data: data,
      backgroundColor: backgroundColors.map(
        (color) => `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`
      ),
      borderColor: borderColors.map(
        (color) => `rgba(${color.r}, ${color.g}, ${color.b}, 1)`
      ),
      borderWidth: 1,
    };

    // Crear un nuevo objeto de opciones de gráfico que contenga solo el nuevo conjunto de datos
    const newChartOptions = {
      ...chartOptions,
      datasets: [newDataset],
    };

    // Actualizar el estado de chartOptions en el contexto, eliminando los conjuntos de datos existentes
    setChartOptions({
      ...chartOptions,
      datasets: [],
    });

    // Esperar un ciclo de renderizado para actualizar el estado con el nuevo conjunto de datos
    setTimeout(() => {
      setChartOptions(newChartOptions);
    }, 0);
    notifySuccess();
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

  // Validación para no renderizar el componente si chartOptions.labels está vacío o indefinido
  if (!chartOptions || !chartOptions.labels) {
    return null;
  }

  return (
    <div className="container align-self-center py-5 mb-3 custom-shadow">
      <div className="row justify-content-center">
        <div className="col-12 mb-5">Ingresa el set de datos</div>
        <div className="col-12">
          <table className="table table-responsive-sm table-sm table-striped border">
            <thead>
              <tr style={{ fontSize: "12px" }}>
                <th>Etiqueta</th>
                <th>Dato</th>
                <th>Color de Fondo</th>
              </tr>
            </thead>
            <tbody>
              {chartOptions.labels.map((label, index) => (
                <tr key={index}>
                  <td>{label}</td>
                  <td>
                    <input
                      type="number"
                      className="form-control form-control-sm"
                      value={data[index] || ""}
                      onChange={(e) => handleDataChange(index, e.target.value)}
                    />
                  </td>
                  <td>
                    <ColorPicker
                      onChange={(color) => {
                        handleBackgroundColorChange(index, color);
                        handleBorderColorChange(index, color);
                      }}
                      color={backgroundColors[index]}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="col-12 col-lg-6">
          <div className="mb-3">
            <label className="form-label" htmlFor="newDatasetLabelInput">
              Descripción de la variable
            </label>
            <input
              type="text"
              className="form-control form-control-sm"
              id="newDatasetLabelInput"
              placeholder="ej. Cantidad de votos"
              value={newDatasetLabel}
              onChange={handleLabelChange}
            />
          </div>
        </div>
      </div>
      <button className="btn btn-custom" onClick={handleAddClick}>
        Agregar los Datos
      </button>
    </div>
  );
};

export default AddSetColors;
