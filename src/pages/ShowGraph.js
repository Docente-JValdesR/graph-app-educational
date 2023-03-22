import { useContext } from "react";
import { Link } from "react-router-dom";
import { GraphContext } from "../context/graphContext";
import AreaModel from "../Models/AreaModel";
import BarModel from "../Models/BarModel";
import BubbleModel from "../Models/BubbleModel";
import DoughnutModel from "../Models/DoughnutModel";
import LineModel from "../Models/LineModel";
import MultiAxisLineModel from "../Models/MultiAxisLineModel";
import PieModel from "../Models/PieModel";
import PolarAreaModel from "../Models/PolarAreaModel";
import RadarModel from "../Models/RadarModel";
import ScatterModel from "../Models/ScatterModel";
import useScrollToTop from "../hook/useScrollToTop";

export default function ShowGraph() {
  useScrollToTop();
  const { chartOptions } = useContext(GraphContext);
  const ruta = chartOptions.selectedChartType;

  let componentToRender;
  let title;

  switch (ruta) {
    case "area":
      componentToRender = <AreaModel />;
      title = "Gráfico de Área";
      break;
    case "bar":
      componentToRender = <BarModel />;
      title = "Gráfico de Barras";
      break;
    case "line":
      componentToRender = <LineModel />;
      title = "Gráfico de Líneas";
      break;
    case "radar":
      componentToRender = <RadarModel />;
      title = "Gráfico de Radar";
      break;
    case "pie":
      componentToRender = <PieModel />;
      title = "Gráfico de Torta";
      break;
    case "doughnut":
      componentToRender = <DoughnutModel />;
      title = "Gráfico de Dona";
      break;
    case "polararea":
      componentToRender = <PolarAreaModel />;
      title = "Gráfico de Área Polar";
      break;
    case "multiaxisline":
      componentToRender = <MultiAxisLineModel />;
      title = "Gráfico de Doble Eje";
      break;
    case "bubble":
      componentToRender = <BubbleModel />;
      title = "Gráfico de Burbujas";
      break;
    case "scatter":
      componentToRender = <ScatterModel />;
      title = "Gráfico de Puntos";
      break;
    default:
      componentToRender = <p>Tipo de gráfico no válido</p>;
      title = "";
      break;
  }

  return (
    <div className="">
      <div className="">
        <div className="">
          <h4 className="">{title}</h4>
          {componentToRender}
        </div>
        <div className="fixed-bottom d-flex">
          <Link
            to="/SelectGraph"
            className="btn bi bi-back text-white flex-fill"
          >
            <span className="ms-4">Change graph</span>
          </Link>
          <Link
            to="/additems"
            className="btn bi bi-pencil-square flex-fill text-white"
          >
            <span className="ms-4">Edit the graph</span>
          </Link>
          <Link to="/" className="btn bi bi-houses flex-fill text-white">
            <span className="ms-4">Homepage</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
