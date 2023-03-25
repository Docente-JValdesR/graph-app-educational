import React, { useState, useContext, useEffect } from "react";
import { GraphContext } from "../context/graphContext";
import ColorPicker from "./ColorPicker";
import { notifySuccess } from "../components/AlertComponent";

const AddSetData = () => {
  const { chartOptions, setChartOptions } = useContext(GraphContext);
  const [labels, setLabels] = useState([]);
  const [dataInputs, setDataInputs] = useState([]);

  useEffect(() => {
    if (
      !chartOptions.datasets ||
      chartOptions.datasets.length === 0 ||
      !chartOptions.labels ||
      chartOptions.labels.length === 0
    ) {
      return;
    }

    const newLabels = chartOptions.labels;
    const newDataInputs = chartOptions.datasets.map((dataset) => {
      return {
        label: dataset.label,
        data: dataset.data || [],
        backgroundColor: dataset.backgroundColor,
        borderColor: dataset.borderColor,
      };
    });

    setLabels(newLabels);
    setDataInputs(newDataInputs);
  }, [chartOptions]);

  useEffect(() => {
    if (chartOptions.labels) {
      setLabels(chartOptions.labels);
    }
  }, [chartOptions.labels]);

  const handleAddRow = () => {
    const newDataInput = {
      label: "",
      data: Array(labels.length).fill(""),
      backgroundColor: "rgba(255, 99, 132, 1)",
      borderColor: "rgba(255, 99, 132, 1)",
    };
    setDataInputs([...dataInputs, newDataInput]);
  };

  const handleLabelChange = (rowIndex, value) => {
    const newDataInputs = [...dataInputs];
    newDataInputs[rowIndex].label = value;
    setDataInputs(newDataInputs);
  };

  const handleDataChange = (rowIndex, colIndex, value) => {
    const newDataInputs = [...dataInputs];
    newDataInputs[rowIndex].data[colIndex] = value;
    setDataInputs(newDataInputs);
  };

  const handleBackgroundColorChange = (rowIndex, color) => {
    const newDataInputs = [...dataInputs];
    const newColor = `rgba(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}, ${color.rgb.a})`;
    newDataInputs[rowIndex].backgroundColor = newColor;
    setDataInputs(newDataInputs);
  };

  const handleBorderColorChange = (rowIndex, color) => {
    const newDataInputs = [...dataInputs];
    const newColor = `rgba(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}, ${color.rgb.a})`;
    newDataInputs[rowIndex].borderColor = newColor;
    setDataInputs(newDataInputs);
  };

  const handleRemoveRow = (rowIndex) => {
    const newDataInputs = [...dataInputs];
    newDataInputs.splice(rowIndex, 1);
    setDataInputs(newDataInputs);
  };

  const handleSubirDatos = () => {
    const newChartOptions = { ...chartOptions };
    const datasets = dataInputs.map(
      ({ label, data, backgroundColor, borderColor }) => {
        const newData = data.length > 0 ? data.map((d) => Number(d)) : [0]; // Verificar que el array tenga al menos un elemento
        return {
          data: newData,
          backgroundColor,
          borderColor,
          label,
        };
      }
    );
    newChartOptions.datasets = datasets;
    // Incluir el color de fondo en el objeto "chartOptions"

    setChartOptions(newChartOptions);

    notifySuccess();
  };

  const isValidData = dataInputs.every(
    (dataInput) => dataInput.data.length === labels.length
  );

  return (
    <div className="container align-self-center py-5 mb-3 custom-shadow">
      <div className="row justify-content-center">
        <div className="col-12 mb-5">Ingresa los set de datos</div>
        <div className="col-12">
          <table className="table table-responsive-sm table-sm table-striped border">
            <thead>
              <tr style={{ fontSize: "12px" }}>
                <th>Etiqueta</th>
                {labels.map((label, index) => (
                  <th key={index}>{label}</th>
                ))}
                <th>fondo</th>
                <th>Borrar</th>
              </tr>
            </thead>
            <tbody>
              {dataInputs.map((dataInput, rowIndex) => (
                <tr key={rowIndex}>
                  <td>
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      placeholder="name"
                      value={dataInput.label}
                      onChange={(e) =>
                        handleLabelChange(rowIndex, e.target.value)
                      }
                    />
                  </td>
                  {dataInput.data.length > 0 &&
                    dataInput.data.map((data, colIndex) => (
                      <td key={colIndex}>
                        {dataInputs.length > colIndex && (
                          <input
                            type="number"
                            className="form-control form-control-sm"
                            placeholder="value"
                            value={dataInput.data[colIndex]}
                            onChange={(e) =>
                              handleDataChange(
                                rowIndex,
                                colIndex,
                                e.target.value
                              )
                            }
                          />
                        )}
                      </td>
                    ))}
                  <td>
                    <ColorPicker
                      color={dataInput.backgroundColor}
                      onChange={(color) => {
                        handleBackgroundColorChange(rowIndex, color);
                        handleBorderColorChange(rowIndex, color);
                      }}
                    />
                  </td>
                  <td>
                    <i
                      className="btn bi bi-trash-fill text-white p-0 fs-5 btn-danger"
                      onClick={() => handleRemoveRow(rowIndex)}
                    ></i>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="col-12 d-flex justify-content-evenly">
          <button
            type="button"
            className="btn btn-custom"
            onClick={handleAddRow}
          >
            Agregar fila
          </button>
          <button
            type="button"
            className="btn btn-custom"
            disabled={!isValidData}
            onClick={handleSubirDatos}
          >
            Subir datos
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddSetData;
