import React, { useState, useContext } from "react";
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
    newBackgroundColorState[
      index
    ] = `${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}, ${color.rgb.a}`;
    setBackgroundColorState(newBackgroundColorState);
  };

  const handleAddDataset = () => {
    setDatasets([
      ...datasets,
      { label: "", data: [{ x: "", y: "" }], backgroundColor: "" },
    ]);
    setLabelState([...labelState, ""]);
    setDataState([...dataState, [{ x: "", y: "" }]]);
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
    setChartOptions(newChartOptions);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <table className="table table-striped table-hover table-sm">
          <thead>
            <tr>
              <th scope="col">Label</th>
            </tr>
          </thead>
          <tbody>
            {datasets.map((dataset, index) => (
              <tr key={index}>
                <td>
                  <input
                    type="text"
                    value={labelState[index]}
                    onChange={(e) => handleLabelChange(index, e)}
                  />
                </td>
                <td>
  <button
    type="button"
    onClick={() => {
      const newDataState = [...dataState];
      newDataState[index].push({ x: "", y: "", r: "" });
      setDataState(newDataState);
    }}
  >
    Add Data
  </button>
  <ul>
    {dataState[index].map((data, i) => (
      <li key={i}>
        x:
        <input
          type="text"
          value={data.x}
          onChange={(e) => handleDataChange(index, i, "x", e)}
        />
        y:
        <input
          type="text"
          value={data.y}
          onChange={(e) => handleDataChange(index, i, "y", e)}
        />
        r:
        <input
          type="text"
          value={data.r}
          onChange={(e) => handleDataChange(index, i, "r", e)}
        />
      </li>
    ))}
  </ul>
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
        <button type="button" onClick={handleAddDataset}>
          Add Dataset
        </button>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};
export default AddArrayBubble;
