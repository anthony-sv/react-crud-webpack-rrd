import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { useState, useEffect } from "react";
import axios from "axios";

const Update = () => {
    const [datos, setDatos] = useState({
        nnp: "",
        ne1: "",
        ne2: "",
        ne3: "",
        ne4: "",
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
            ne1: data.ecuaciones[0].ecuacion,
            ne2: data.ecuaciones[1].ecuacion,
            ne3: data.ecuaciones[2].ecuacion,
            ne4: data.ecuaciones[3].ecuacion,
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
                    <Form.Label>a) Ecuación 1</Form.Label>
                    <Form.Control
                        type="text"
                        name="ne1"
                        value={datos.ne1}
                        autoComplete="off"
                        onChange={handleInputChange}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>b) Ecuación 2</Form.Label>
                    <Form.Control
                        type="text"
                        name="ne2"
                        value={datos.ne2}
                        autoComplete="off"
                        onChange={handleInputChange}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>c) Ecuación 3</Form.Label>
                    <Form.Control
                        type="text"
                        name="ne3"
                        value={datos.ne3}
                        autoComplete="off"
                        onChange={handleInputChange}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>d) Ecuación 4</Form.Label>
                    <Form.Control
                        type="text"
                        name="ne4"
                        value={datos.ne4}
                        autoComplete="off"
                        onChange={handleInputChange}
                    />
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
