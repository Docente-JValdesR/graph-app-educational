import { Link } from "react-router-dom";
import { Container, Row, Col, Button } from "react-bootstrap";

export default function HomePage() {
  return (
    <Container
      fluid
      className="vh-100 d-flex align-items-center justify-content-center"
      style={{ backgroundColor: "#000000", color: "#FFFFFF" }}
    >
      <Row>
        <Col className="text-center">
          <h1 className="display-4">Bienvenido a la Graficadora</h1>
          <p className="lead">
            La herramienta de visualización de datos más poderosa (beta)
          </p>
          <Button
            as={Link}
            to="/selectgraph"
            size="lg"
            className="mt-4"
            style={{ backgroundColor: "#000", borderColor: "#F29F05" }}
          >
            <i class="bi bi-bar-chart me-2"></i>
            Ir a la Graficadora
          </Button>
          <div className="mt-3 fixed-bottom" style={{ fontSize: "1.5rem" }}>
            <p>Profesor de Matemáticas e Informática Educativa, José Valdés</p>
            <footer className="mt-5 fs-6">
              <p>© 2023, Todos los derechos reservados</p>
            </footer>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
