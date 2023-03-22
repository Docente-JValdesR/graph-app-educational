import React, { useState, useContext, useEffect } from "react";
import { GraphContext } from "../context/graphContext";
import ColorPicker from "./ColorPicker";

const AddArrayBubble = () => {
  const { chartOptions, setChartOptions } = useContext(GraphContext);

  const [datasets, setDatasets] = useState([
    { label: "", data: [{ x: "", y: "", r: "" }], backgroundColor: "" },
  ]);

  const [labelState, setLabelState] = useState(datasets.map(() => ""));
  const [dataState, setDataState] = useState(
    datasets.map(() => [{ x: "", y: "", r: "" }])
  );
  const [backgroundColorState, setBackgroundColorState] = useState(
    datasets.map(() => "rgba(0, 0, 0, 1)")
  );

  const handleLabelChange = (index, event) => {
    const newLabelState = [...labelState];
    newLabelState[index] = event.target.value;
    setLabelState(newLabelState);
  };

  const handleDataChange = (index, dataIndex, key, event) => {
    const newDataState = [...dataState];
    newDataState[index][dataIndex][key] = event.target.value;
    setDataState(newDataState);
  };

  const handleColorChange = (index, color) => {
    const newBackgroundColorState = [...backgroundColorState];
    newBackgroundColorState[      index    ] = `${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}, ${color.rgb.a}`;
    setBackgroundColorState(newBackgroundColorState);
  };

  const handleAddDataset = () => {
    setDatasets([
      ...datasets,
      { label: "", data: [{ x: "", y: "", r: "" }], backgroundColor: "" },
    ]);
    setLabelState([...labelState, ""]);
    setDataState([...dataState, [{ x: "", y: "", r: "" }]]);
    setBackgroundColorState([...backgroundColorState, "rgba(0, 0, 0, 1)"]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newDatasets = [...datasets];
    newDatasets.forEach((dataset, index) => {
      dataset.backgroundColor = `rgba(${backgroundColorState[index]})`;
      dataset.label = labelState[index];
      dataset.data = dataState[index].map((data) => ({
        x: data.x,
        y: data.y,
        r: data.r,
      }));
    });
    const newChartOptions = { ...chartOptions };
    newChartOptions.datasets = newDatasets;
    console.log(newChartOptions);
    setChartOptions(newChartOptions);
  };

  useEffect(() => {
    if (chartOptions.datasets && chartOptions.datasets.length > 0) {
      setDatasets(chartOptions.datasets);
      setLabelState(chartOptions.datasets.map((dataset) => dataset.label));
      setDataState(
        chartOptions.datasets.map((dataset) => dataset.data.map((data) => ({ x: data.x, y: data.y, r: data.r })))
      );
      setBackgroundColorState(
        chartOptions.datasets.map((dataset) => dataset.backgroundColor)
      );
    }
  }, [chartOptions.datasets]);

  return (
    <div className="container align-self-center py-5 mb-3 border rounded custom-shadow">
      <div className="row justify-content-center">
        <div className="col-12 mb-5">Ingresa los set de datos</div>
       
        <div className="col-12">
      <form onSubmit={handleSubmit}>
        <table className="table table-dark table-responsive-sm table-sm table-striped border">
          <thead>
            <tr style={{ fontSize: "12px" }}>
              <th>Etiqueta</th>
              <th>Agregar coordenada</th>
              <th>Punto (x, y, r)</th>
              <th>Color</th>
            </tr>
          </thead>
          <tbody>
            {datasets.map((dataset, index) => (
              <tr key={index}>
                <td>
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    placeholder="name"
                    value={labelState[index]}
                    onChange={(e) => handleLabelChange(index, e)}
                  />
                </td>
                <td>
                  <button
                    type="button"
                    className="btn btn-outline-secondary text-white btn-sm"
                    onClick={() => {
                      const newDataState = [...dataState];
                      newDataState[index].push({ x: "", y: "", r: "" });
                      setDataState(newDataState);
                    }}
                  >
                    Agregar Puntos
                  </button>
                </td>
                <td>
                  {dataState[index].map((data, i) => (
                    <div className="d-flex flex-row" key={i}>
                      <input
                        type="number"
                        className="form-control form-control-sm"
                        placeholder="x: value"
                        value={data.x}
                        onChange={(e) => handleDataChange(index, i, "x", e)}
                      />
                      <input
                        type="number"
                        className="form-control form-control-sm"
                        placeholder="y: value"
                        value={data.y}
                        onChange={(e) => handleDataChange(index, i, "y", e)}
                      />
                      <input
                        type="number"
                        className="form-control form-control-sm"
                        placeholder="r: value"
                        value={data.r}
                        onChange={(e) => handleDataChange(index, i, "r", e)}
                      />
                    </div>
                  ))}
                </td>

                <td>
                  <ColorPicker
                    color={
                      backgroundColorState[index]
                        ? {
                            r: parseInt(
                              backgroundColorState[index].split(",")[0]
                            ),
                            g: parseInt(
                              backgroundColorState[index].split(",")[1]
                            ),
                            b: parseInt(
                              backgroundColorState[index].split(",")[2]
                            ),
                            a: parseFloat(
                              backgroundColorState[index].split(",")[3]
                            ),
                          }
                        : null
                    }
                    onChange={(color) => handleColorChange(index, color)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="col-12 d-flex justify-content-evenly">
          <button
            type="button"
            className="btn btn-outline-secondary text-white"
            onClick={handleAddDataset}
          >
            Agregar Variable
          </button>
          <button
            type="submit"
            className="btn btn-outline-secondary text-white"
          >
            Subir Datos
          </button>
        </div>
      </form>
    </div>
  </div>
</div>
);
};

export default AddArrayBubble;