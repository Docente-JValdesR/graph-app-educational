import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="col-6 d-flex justify-content-center">
        <Link className="nav-link btn rounded bg-secondary" to="selectgraph" style={{width:"300px", height:"200px"}}>
          Ir a la Graficadora
        </Link>
      </div>
    </div>
  );
}
