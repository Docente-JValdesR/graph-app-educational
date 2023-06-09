import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div className="container vh-100 d-flex align-items-center justify-content-center">
      <div className="row">
        <div className="col text-center">
          <h1 className="display-4">Bienvenido a la Graficadora</h1>
          <p className="lead">
            La herramienta de visualización de datos más poderosa (beta)
          </p>
          <Link
            to="/selectgraph"
            className="btn btn-outline-warning mt-4 btn-lg"
            style={{ borderColor: "#F29F05" }}
          >
            <i className="bi bi-bar-chart me-2"></i>
            <span className="text-black">Ir a la Graficadora</span>
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
