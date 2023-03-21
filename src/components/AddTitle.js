import { useContext, useState } from "react";
import { GraphContext } from "../context/graphContext";

const AddTitle = () => {
  const { chartOptions, setChartOptions } = useContext(GraphContext);
  const [pluginsTitleText, setPluginsTitleText] = useState("");
  const [pluginsLegendPosition, setPluginsLegendPosition] = useState("top");
  const [pluginsTitleDisplay, setPluginsTitleDisplay] = useState(false);

  const handleTitleTextChange = (event) => {
    setPluginsTitleText(event.target.value);
  };

  const handleLegendPositionChange = (event) => {
    setPluginsLegendPosition(event.target.value);
  };

  const handleTitleDisplayChange = (event) => {
    setPluginsTitleDisplay(event.target.checked);
  };
  const handleAddOptions = () => {
    const newOptions = {
      ...chartOptions,
      pluginsTitleText,
      pluginsLegendPosition,
      pluginsTitleDisplay,
    };
    setChartOptions(newOptions);
  };
  return (
    <div className="container align-self-center p-5 mb-3 border rounded custom-shadow">
      <div className="row justify-content-center">
        <div className="col-12 col-lg-6">
          <div className="mb-3 form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="title-display-check"
              checked={pluginsTitleDisplay}
              onChange={handleTitleDisplayChange}
            />
            <label className="form-check-label">
              Mostrar título
            </label>
          </div>
          {pluginsTitleDisplay && (
            <div className="">
              <div className="mb-3">
                <label className="form-label">
                  Título
                </label>
                <input
                  type="text"
                  className="form-control form-control-sm"
                  id="title-text-input"
                  value={pluginsTitleText}
                  onChange={handleTitleTextChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="legend-position-select" className="form-label">
                  Posición de la leyenda
                </label>
                <select
                  className="form-select form-select-sm"
                  id="legend-position-select"
                  value={pluginsLegendPosition}
                  onChange={handleLegendPositionChange}
                >
                  <option value="top">Arriba</option>
                  <option value="right">Derecha</option>
                  <option value="left">Izquierda</option>
                  <option value="bottom">Abajo</option>
                </select>
              </div>
            </div>
          )}
          <button
            className="btn btn-outline-secondary text-white btn-sm mt-4"
            onClick={() => handleAddOptions()}
          >
            Agregar Titulo y Leyendas
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddTitle;
