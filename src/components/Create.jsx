import { Form, Button, Row, Col, Container } from "react-bootstrap";
import { useState } from "react";

const Create = () => {
    const [datos, setDatos] = useState({
        np: "",
        m1: "",
        m2: "",
        b: "",
        r: "",
        do1: "",
        do2: "",
        do3: "",
        do4: "",
    });

    const handleInputChange = (event) => {
        setDatos({
            ...datos,
            [event.target.name]: event.target.value,
        });
    };

    return (
        <>
            <h1>Crear nueva pregunta</h1>
            <Form
                action="http://localhost:8080/react-crud/NuevaPregunta"
                method="POST"
                encType="multipart/form-data"
            >
                <p>Recuerde que todas las preguntas son del tipo "¿Cual gráfica es la correcta para la siguiente ecuación?" para toda ecuación del tipo <i>y = mx + b</i>.</p>
                <Form.Group>
                    <Form.Label>Nombre de la pregunta:</Form.Label>
                    <Form.Control
                        type="text"
                        name="np"
                        autoComplete="off"
                        required
                        onChange={handleInputChange}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Ecuación:</Form.Label>
                    <Container fluid>
                        <Row>
                            <Col xs lg="auto">
                                y =
                            </Col>
                            <Col xs lg={2}>
                                <Row>
                                    <Col>
                                        <Form.Control
                                            type="number"
                                            name="m1"
                                            autoComplete="off"
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </Col>
                                </Row>
                                <hr />
                                <Row>
                                    <Col>
                                        <Form.Control
                                            type="number"
                                            name="m2"
                                            autoComplete="off"
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </Col>
                                </Row>
                            </Col>
                            <Col xs lg="auto">
                                x +
                            </Col>
                            <Col xs lg={2}>
                                <Form.Control
                                    type="number"
                                    name="b"
                                    autoComplete="off"
                                    onChange={handleInputChange}
                                    required
                                />
                            </Col>
                        </Row>
                    </Container>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Iniciso correcto:</Form.Label>
                    <Form.Control
                        as="select"
                        name="r"
                        onChange={handleInputChange}
                        required
                    >
                        <option>a</option>
                        <option>b</option>
                        <option>c</option>
                        <option>d</option>
                    </Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Opción a)</Form.Label>
                    <Form.File
                        name="do1"
                        style={{ marginTop: "0.5rem" }}
                        onChange={handleInputChange}
                        required
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Opción b)</Form.Label>
                    <Form.File
                        name="do2"
                        style={{ marginTop: "0.5rem" }}
                        onChange={handleInputChange}
                        required
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Opción c)</Form.Label>
                    <Form.File
                        name="do3"
                        style={{ marginTop: "0.5rem" }}
                        onChange={handleInputChange}
                        required
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Opción d)</Form.Label>
                    <Form.File
                        name="do4"
                        style={{ marginTop: "0.5rem" }}
                        onChange={handleInputChange}
                        required
                    />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Crear nueva pregunta
                </Button>
            </Form>
            <div style={{ padding: "1rem" }}></div>
        </>
    );
};

export default Create;
