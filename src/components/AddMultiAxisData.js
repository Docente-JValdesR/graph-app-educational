import React, { useState, useContext, useEffect } from "react";
import { GraphContext } from "../context/graphContext";
import ColorPicker from "./ColorPicker";

const AddMultiAxisData = () => {
  const [labels, setLabels] = useState([]);
  const [dataInputs, setDataInputs] = useState([]);
  const { chartOptions, setChartOptions } = useContext(GraphContext);
  useEffect(() => {
    setLabels(chartOptions.labels || []);
  }, [chartOptions.labels]);

  const handleAddRow = () => {
    if (dataInputs.length < 2) {
      const newDataInput = {
        label: "",
        data: Array(labels.length).fill(""),
        backgroundColor: { r: 255, g: 99, b: 132, a: 1 },
        borderColor: { r: 255, g: 99, b: 132, a: 1 },
      };
      setDataInputs([...dataInputs, newDataInput]);
    }
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
    newDataInputs[rowIndex].backgroundColor = color.rgb;
    setDataInputs(newDataInputs);
  };

  const handleBorderColorChange = (rowIndex, color) => {
    const newDataInputs = [...dataInputs];
    newDataInputs[rowIndex].borderColor = color.rgb;
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
      ({ label, data, backgroundColor, borderColor }) => ({
        data: data.map((d) => Number(d)),
        backgroundColor: `rgba(${backgroundColor.r}, ${backgroundColor.g}, ${backgroundColor.b}, ${backgroundColor.a})`,
        borderColor: `rgba(${borderColor.r}, ${borderColor.g}, ${borderColor.b}, ${borderColor.a})`,
        label,
      })
    );
    newChartOptions.datasets = datasets;
    setChartOptions(newChartOptions);
  };

  const isValidData = dataInputs.every(
    (dataInput) => dataInput.data.length === labels.length
  );

  const isAddRowDisabled = dataInputs.length >= 2;

  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <table className="table table-bordered table-responsive-sm table-sm">
            <thead>
              <tr>
                <th className="rotate-90">Etiqueta</th>
                {labels.map((label, index) => (
                  <th key={index} className="rotate-90">
                    {label}
                  </th>
                ))}
                <th className="rotate-90">Color de fondo</th>
                <th className="rotate-90">Color de borde</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {dataInputs.map((dataInput, rowIndex) => (
                <tr key={rowIndex}>
                  <td>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Ingrese etiqueta"
                      value={dataInput.label}
                      onChange={(e) =>
                        handleLabelChange(rowIndex, e.target.value)
                      }
                    />
                  </td>
                  {dataInput.data.map((data, colIndex) => (
                    <td key={colIndex}>
                      <input
                        type="number"
                        className="form-control"
                        placeholder="Ingrese dato"
                        value={data}
                        onChange={(e) =>
                          handleDataChange(rowIndex, colIndex, e.target.value)
                        }
                      />
                    </td>
                  ))}
                  <td>
                    <ColorPicker
                      color={dataInput.backgroundColor}
                      onChange={(color) =>
                        handleBackgroundColorChange(rowIndex, color)
                      }
                    />
                  </td>
                  <td>
                    <ColorPicker
                      color={dataInput.borderColor}
                      onChange={(color) =>
                        handleBorderColorChange(rowIndex, color)
                      }
                    />
                  </td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={() => handleRemoveRow(rowIndex)}
                    >
                      <i className="bi bi-trash-fill"></i>
                    </button>
                  </td>
                </tr>
              ))}
              {!isAddRowDisabled && (
                <tr>
                  <td>
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={handleAddRow}
                    >
                      <i className="bi bi-plus"></i> Agregar fila
                    </button>
                  </td>
                  {labels.map((label, index) => (
                    <td key={index}></td>
                  ))}
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
              )}
            </tbody>
          </table>
          <button
            type="button"
            className="btn btn-success"
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
export default AddMultiAxisData;
