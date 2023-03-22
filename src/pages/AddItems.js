import { useContext } from "react";
import { Link } from "react-router-dom";
import { GraphContext } from "../context/graphContext";
import AddLabelsName from "../components/AddLabelsName";
import AddSetData from "../components/AddSetData";
import AddSetColor from "../components/AddSetColors";
import AddTitle from "../components/AddTitle";
import StackerAndIndex from "../components/StackerAndIndex";
import AddMultiAxisData from "../components/AddMultiAxisData";
import AddArrayScatter from "../components/AddArrayScatter";
import AddArrayBubble from "../components/AddArrayBubble";
import useScrollToTop from "../hook/useScrollToTop";

export default function AddItems() {
  useScrollToTop();
  const { chartOptions } = useContext(GraphContext);
  let componentToRender;
  let title;
  switch (chartOptions.selectedChartType) {
    case "area":
      componentToRender = (
        <>
          <AddLabelsName />
          <AddSetData />
        </>
      );
      title = "Agregar datos para gráfico de Area";
      break;
    case "bar":
      componentToRender = (
        <>
          <StackerAndIndex />
          <AddLabelsName />
          <AddSetData />
        </>
      );
      title = "Agregar datos para gráfico de Barras";
      break;
    case "line":
      componentToRender = (
        <>
          <AddLabelsName />
          <AddSetData />
        </>
      );
      title = "Agregar datos para gráfico de Lineas";
      break;
    case "radar":
      componentToRender = (
        <>
          <AddLabelsName />
          <AddSetData />
        </>
      );
      title = "Agregar datos para gráfico de Radar";
      break;
    case "pie":
      componentToRender = (
        <>
          <AddLabelsName />
          <AddSetColor />
        </>
      );
      title = "Agregar datos para gráfico de Torta";
      break;
    case "doughnut":
      componentToRender = (
        <>
          <AddLabelsName />
          <AddSetColor />
        </>
      );
      title = "Agregar datos para gráfico de Donas";
      break;
    case "polararea":
      componentToRender = (
        <>
          <AddLabelsName />
          <AddSetColor />
        </>
      );
      title = "Agregar datos para gráfico de Area Polar";
      break;
    case "multiaxisline":
      componentToRender = (
        <>
          <AddLabelsName />
          <AddMultiAxisData />
        </>
      );
      title = "Agregar datos para gráfico de Doble Eje";
      break;
    case "bubble":
      componentToRender = (
        <>
          <AddArrayBubble />
        </>
      );
      title = "Agregar datos para gráfico de Burbujas";
      break;
    case "scatter":
      componentToRender = (
        <>
          <AddArrayScatter />
        </>
      );
      title = "Agregar datos para gráfico de Puntos";
      break;
    default:
      componentToRender = <p>Tipo de gráfico no válido</p>;
      break;
  }

  return (
    <div className="container text-center py-5">
      <h2>{title}</h2>
      <AddTitle />
      {componentToRender}
      <div className="fixed-bottom d-flex">
        <Link to="/SelectGraph" className="btn bi bi-back text-white flex-fill">
          <span className="ms-4">Change graph</span>
        </Link>
        <Link
          to="/showgraph"
          className="btn bi bi-bar-chart-line flex-fill text-white"
        >
          <span className="ms-4">View graph</span>
        </Link>
        <Link to="/" className="btn bi bi-houses flex-fill text-white">
          <span className="ms-4">Homepage</span>
        </Link>
      </div>
    </div>
  );
}
