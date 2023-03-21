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
            La herramienta de visualización de datos más poderosa
          </p>
          <Button
            as={Link}
            to="/selectgraph"
            size="lg"
            className="mt-4"
            style={{ backgroundColor: "#000", borderColor: "#F29F05" }}
          >
            <i class="bi bi-bar-chart"></i> Ir a la Graficadora
          </Button>
        </Col>
      </Row>
    </Container>
  );
}
