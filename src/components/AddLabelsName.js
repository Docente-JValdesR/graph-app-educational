import { useContext, useState } from "react";
import { GraphContext } from "../context/graphContext";

const AddLabelsName = () => {
  const { chartOptions, setChartOptions } = useContext(GraphContext);
  const [labels, setLabels] = useState([]);
  const [newLabel, setNewLabel] = useState("");

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
    <div className="container">
      <div className="row">
        <div className="col-12 col-lg-5 justify-content-center">
          {labels.map((label, index) => (
            <div className="mb-3 input-group" key={index}>
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
                <span className="input-group-append ms-2">
                  <button
                    className="btn btn-success rounded-circle"
                    type="button"
                    onClick={handleAddLabel}
                  >
                    <i className="bi bi-plus-circle"></i>
                  </button>
                </span>
              ) : (
                <span className="input-group-append ms-2">
                  <button
                    className="btn btn-danger rounded-circle"
                    type="button"
                    onClick={() => handleRemoveLabel(index)}
                  >
                    <i className="bi bi-x-circle"></i>
                  </button>
                </span>
              )}
            </div>
          ))}
          <div className="mb-3 input-group">
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
            <span className="input-group-append ms-2">
              <button
                className="btn btn-success rounded-circle"
                type="button"
                onClick={handleAddLabel}
                disabled={
                  newLabel.trim() === "" ||
                  (labels.length !== 0 &&
                    labels[labels.length - 1].length === 0)
                }
              >
                <i className="bi bi-plus-circle"></i>
              </button>
            </span>
          </div>
        </div>
        <button
          className="btn btn-primary"
          onClick={() => setChartOptions({ ...chartOptions, labels: labels })}
        >
          Agregar Labels
        </button>
      </div>
    </div>
  );
};

export default AddLabelsName;
