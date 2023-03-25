// eslint-disable-next-line react-hooks/exhaustive-deps
import { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
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
import { notifyError, notifyWarnings } from "../components/AlertComponent";
export default function AddItems() {
  useScrollToTop();
  const { chartOptions } = useContext(GraphContext);
  const [redirect, setRedirect] = useState(false);

  const navigate = useNavigate();
  const isValidChartOptions =
    chartOptions &&
    chartOptions.datasets &&
    Array.isArray(chartOptions.datasets) &&
    chartOptions.datasets.length > 0 &&
    chartOptions.datasets.every(
      (dataset) => Array.isArray(dataset.data) && dataset.data.length > 0
    );

  function handleClick() {
    if (isValidChartOptions) {
      // Si las opciones del gráfico son válidas, navegar al componente de visualización de gráficos
      navigate("/showgraph");
    } else {
      notifyError();
    }
  }

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

  const handleBack = async (e) => {
    e.preventDefault();
    await notifyWarnings();
    setRedirect(true);
    setTimeout(() => {
      setRedirect(false);
    }, 5000);
  };

  useEffect(() => {
    if (redirect) {
      return navigate("/selectgraph");
    }
  }, [redirect]);

  return (
    <div className="container text-center py-5">
      <h2>{title}</h2>
      <AddTitle />
      {componentToRender}
      <div className="fixed-bottom d-flex" style={{ background: "#b5bac9" }}>
        <button
          className="btn bi bi-back  text-white flex-fill"
          onClick={(e) => handleBack(e)}
        >
          <span className="ms-4">Change graph</span>
        </button>
        <button
          onClick={handleClick}
          className="btn bi bi-bar-chart-line text-white flex-fill"
        >
          <span className="ms-4">View graph</span>
        </button>
        <Link to="/" className="btn bi bi-houses text-white flex-fill">
          <span className="ms-4">Homepage</span>
        </Link>
      </div>
    </div>
  );
}
