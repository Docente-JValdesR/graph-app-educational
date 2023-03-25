import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GraphContext } from "../context/graphContext";
import useScrollToTop from "../hook/useScrollToTop";

export default function SelectGraph() {
  useScrollToTop();

  const { setChartOptions } = useContext(GraphContext);
  const menuItems = [
    { to: "bar", label: "Grafico de Barras" },
    { to: "line", label: "Grafico de Lineas" },
    { to: "area", label: "Grafico de Areas" },
    { to: "multiaxisline", label: "Grafico de doble eje" },
    { to: "scatter", label: "Grafico de Puntos" },
    { to: "bubble", label: "Grafico de Burbujas" },
    { to: "pie", label: "Grafico de Torta" },
    { to: "doughnut", label: "Grafico de Dona" },
    { to: "polararea", label: "Grafico de Area Polar" },
    { to: "radar", label: "Grafico de Radar" },
  ];

  const [activeIndex, setActiveIndex] = useState(null);
  const navigate = useNavigate(); // <- Agregar esta línea

  const handleMouseEnter = (index) => {
    setActiveIndex(index);
  };

  const handleMouseLeave = () => {
    setActiveIndex(null);
  };

  const handleMenuItemClick = (chartType) => {
    setChartOptions({ selectedChartType: chartType });
    navigate("/additems");
  };

  return (
    <div className="container text-center vh-100 d-flex flex-column justify-content-evenly">
      <div className="row">
        <div className="col-12">
          <h2 className="py-lg-4">Selecciona el tipo de Gráfico</h2>
        </div>
      </div>
      <div className="row text-center mx-2 px-3 justify-content-center">
        <div
          className="col-12 col-lg-6 p-0 rounded"
          style={{ border: "1px solid #F29F05" }}
        >
          {menuItems.map((item, index) => (
            <Link
              key={item.to}
              to="/additems"
              state={{ selectedChartType: item.to }}
              className={`nav-link d-flex justify-content-center align-items-center ${
                activeIndex === index ? "active" : ""
              } ${index === 0 ? "" : ""}`}
              style={{
                height: "50px",
                width: "100%",
                opacity:
                  activeIndex !== null && activeIndex !== index ? "0.3" : "1",
                borderColor: `${index === 0 ? "" : "#F29F05"}`,
                borderTop: `${index === 0 ? "" : "1px solid #F29F05"}`,
              }}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
              onClick={() => handleMenuItemClick(item.to)}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
      <div className="row text-center justify-content-center py-5">
        <div className="col-12 col-lg-4">
          <Link className="btn btn-custom" to="/">
            Volver a Home
          </Link>
        </div>
      </div>
    </div>
  );
}
