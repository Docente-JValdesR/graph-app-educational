import { useContext, useState, useEffect } from "react";
import { GraphContext } from "../context/graphContext";

const AddLabelsName = () => {
  const { chartOptions, setChartOptions } = useContext(GraphContext);
  const [labels, setLabels] = useState([]);
  const [newLabel, setNewLabel] = useState("");

  useEffect(() => {
    if (chartOptions.labels) {
      setLabels(chartOptions.labels);
    }
  }, [chartOptions.labels]);

  const handleAddLabel = () => {
    if (newLabel.trim() !== "") {
      setLabels([...labels, newLabel.trim()]);
      setNewLabel("");
    }
  };

  const handleRemoveLabel = (index) => {
    const newLabels = [...labels];
    newLabels.splice(index, 1);
    setLabels(newLabels);
  };

  return (
    <div className="container align-self-center p-5 mb-3 border rounded custom-shadow">
      <div className="row justify-content-center">
        <div className="col-12 mb-5">Etiquetas Abscisas</div>
        <div className="col-12 col-lg-5">
          {labels.map((label, index) => (
            <div className="mb-3 input-group input-group-sm" key={index}>
              <input
                type="text"
                className="form-control"
                id={`label-input-${index + 1}`}
                placeholder="Label"
                value={label}
                readOnly={index !== labels.length - 1}
                onChange={(event) => {
                  const newLabels = [...labels];
                  newLabels[index] = event.target.value;
                  setLabels(newLabels);
                }}
              />
              {index >= labels.length ? (
                <span className="input-group">
                  <i
                    className="btn bi bi-plus-circle p-0 m-0 fs-5"
                    type="button"
                    onClick={handleAddLabel}
                  ></i>
                </span>
              ) : (
                <span className="input-group-text">
                  <i
                    className=" btn bi bi-x-circle p-0 fs-5"
                    type="button"
                    onClick={() => handleRemoveLabel(index)}
                  ></i>
                </span>
              )}
            </div>
          ))}
          <div className="mb-3 input-group input-group-sm">
            <input
              type="text"
              className="form-control"
              placeholder="Label"
              value={newLabel}
              readOnly={
                labels.length !== 0 && labels[labels.length - 1].length === 0
              }
              onChange={(event) => setNewLabel(event.target.value)}
              onKeyPress={(event) => {
                if (event.key === "Enter" && newLabel.trim() !== "") {
                  handleAddLabel();
                }
              }}
            />
            <span className="input-group-text">
              <i
                className="btn bi bi-plus-circle p-0 fs-5"
                type="button"
                onClick={handleAddLabel}
                disabled={
                  newLabel.trim() === "" ||
                  (labels.length !== 0 &&
                    labels[labels.length - 1].length === 0)
                }
              ></i>
            </span>
          </div>
        </div>
      </div>
      <button
        className="btn btn-outline-secondary btn-sm text-white mt-4"
        onClick={() => setChartOptions({ ...chartOptions, labels: labels })}
      >
        Agregar Labels
      </button>
    </div>
  );
};

export default AddLabelsName;
