import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { useState, useEffect } from "react";
import axios from "axios";

const Update = () => {
    const [datos, setDatos] = useState({
        nnp: "",
        nm1: "",
        nm2: "",
        nb: "",
        nr: "",
    });

    useEffect(() => {
        async function fetchData() {
            const result = await axios(
                `http://localhost:8080/react-crud/PreguntaPorId?id=${window.location.href.split("=")[1]
                }`
            );

            guardaDatos(result.data.data);
        }

        fetchData();
    }, []);

    const guardaDatos = (data) => {
        setDatos({
            nnp: data.nombre,
            nm1: data.m1,
            nm2: data.m2,
            nb: data.b,
            nr: data.respuesta,
        });
    };

    const handleInputChange = (event) => {
        setDatos({
            ...datos,
            [event.target.name]: event.target.value,
        });
    };

    return (
        <>
            <h1>Modificar la pregunta</h1>
            <Form
                action="http://localhost:8080/react-crud/GuardaPreguntaModificada"
                method="get"
            >
                <Form.Group>
                    <Form.Control
                        type="hidden"
                        name="id"
                        value={window.location.href.split("=")[1]}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Nombre de la pregunta:</Form.Label>
                    <Form.Control
                        type="text"
                        name="nnp"
                        value={datos.nnp}
                        autoComplete="off"
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
                                            name="nm1"
                                            value={datos.nm1}
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
                                            name="nm2"
                                            value={datos.nm2}
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
                                    name="nb"
                                    value={datos.nb}
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
                        name="nr"
                        value={datos.nr}
                        onChange={handleInputChange}
                        required
                    >
                        <option>a</option>
                        <option>b</option>
                        <option>c</option>
                        <option>d</option>
                    </Form.Control>
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
            <div style={{ marginTop: "1rem" }}></div>
        </>
    );
};

export default Update;
