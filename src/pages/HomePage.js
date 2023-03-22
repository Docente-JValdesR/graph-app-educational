import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div
      fluid
      className="container vh-100 d-flex align-items-center justify-content-center"
      style={{ backgroundColor: "#000000", color: "#FFFFFF" }}
    >
      <div className="row">
        <div className="col text-center">
          <h1 className="display-4">Bienvenido a la Graficadora</h1>
          <p className="lead">
            La herramienta de visualización de datos más poderosa (beta)
          </p>
          <Link
            to="/selectgraph"
            className=" btn btn-outline mt-4 btn-lg text-white"
            style={{ backgroundColor: "#000", borderColor: "#F29F05" }}
          >
            <i className="bi bi-bar-chart me-2"></i>
            Ir a la Graficadora
          </Link>
          <footer className="mt-3 fixed-bottom" style={{ fontSize: "1rem" }}>
            <p>Profesor de Matemáticas e Informática Educativa, José Valdés</p>

            <p>© 2023, Todos los derechos reservados</p>
          </footer>
        </div>
      </div>
    </div>
  );
}
