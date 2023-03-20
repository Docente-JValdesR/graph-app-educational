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
    <div>
      <h1 className="text-center">{title}</h1>
     {componentToRender}
      <div className="fixed-bottom d-flex">
        <Link
          to="/SelectGraph"
          className="btn btn-secondary rounded-0 flex-fill"
        >
          Volver a Seleccionar otro grafico
        </Link>
        <Link to="/additems" className="btn btn-primary rounded-0 flex-fill">
          Editar la informacion del grafico
        </Link>
        <Link to="/" className="btn btn-success rounded-0 flex-fill">
          Volver a Home
        </Link>
      </div>
    </div>
  );
}
