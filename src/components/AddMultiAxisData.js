import React, { useState, useContext, useEffect } from "react";
import { GraphContext } from "../context/graphContext";
import ColorPicker from "./ColorPicker";
import { notifySuccess } from "../components/AlertComponent";

const AddMultiAxisData = () => {
  const [labels, setLabels] = useState([]);
  const { chartOptions, setChartOptions } = useContext(GraphContext);
  const [dataInputs, setDataInputs] = useState(
    chartOptions.datasets?.map((dataset) => ({
      label: dataset.label || "",
      data: dataset.data || [],
      backgroundColor: dataset.backgroundColor || {
        r: 255,
        g: 99,
        b: 132,
        a: 1,
      },
      borderColor: dataset.borderColor || { r: 255, g: 99, b: 132 },
    })) || []
  );

  useEffect(() => {
    setLabels(chartOptions.labels || []);
    setDataInputs(
      chartOptions.datasets?.map((dataset) => ({
        label: dataset.label || "",
        data: dataset.data || [],
        backgroundColor: dataset.backgroundColor || {
          r: 255,
          g: 99,
          b: 132,
          a: 1,
        },
        borderColor: dataset.borderColor || { r: 255, g: 99, b: 132 },
      })) || []
    );
  }, [chartOptions.labels, chartOptions.datasets]);

  const handleAddRow = () => {
    if (dataInputs.length < 2) {
      const newDataInput = {
        label: "",
        data: Array(labels.length).fill(""),
        backgroundColor: { r: 255, g: 99, b: 132, a: 1 },
        borderColor: { r: 255, g: 99, b: 132 },
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
        borderColor: `rgba(${borderColor.r}, ${borderColor.g}, ${borderColor.b})`,
        label,
      })
    );
    newChartOptions.datasets = datasets;
    setChartOptions(newChartOptions);
    notifySuccess();
  };

  const isValidData = dataInputs.every(
    (dataInput) => dataInput.data.length === labels.length
  );

  const isAddRowDisabled = dataInputs.length >= 2;

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
            </thead>{" "}
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
                  {dataInput.data.map((data, colIndex) => (
                    <td key={colIndex}>
                      <input
                        type="number"
                        className="form-control form-control-sm"
                        placeholder="value"
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
                      onChange={(color) => {
                        handleBackgroundColorChange(rowIndex, color);
                        handleBorderColorChange(rowIndex, color);
                      }}
                    />
                  </td>
                  <td>
                    <i
                      style={{ backgroundColor: "#f20505", color: "$f20505" }}
                      className="btn bi bi-trash-fill text-white p-0 fs-3"
                      onClick={() => handleRemoveRow(rowIndex)}
                    ></i>
                  </td>
                </tr>
              ))}
              {!isAddRowDisabled && (
                <tr>
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
              onClick={handleSubirDatos}
            >
              Subir datos
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AddMultiAxisData;
