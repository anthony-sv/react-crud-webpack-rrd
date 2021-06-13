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
                <p>Recuerde que todas las preguntas son del tipo "¿Cual gráfica es la correcta para la ecuación con pendiente m y que pasa por el punto P(0,b)?" para toda ecuación del tipo <i>y = mx + b</i>.</p>
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
                    <Form.Label>a) Ecuación 1</Form.Label>
                    <Form.Control
                        type="text"
                        name="e1"
                        autoComplete="off"
                        required
                        onChange={handleInputChange}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>b) Ecuación 2</Form.Label>
                    <Form.Control
                        type="text"
                        name="e2"
                        autoComplete="off"
                        required
                        onChange={handleInputChange}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>c) Ecuación 3</Form.Label>
                    <Form.Control
                        type="text"
                        name="e3"
                        autoComplete="off"
                        required
                        onChange={handleInputChange}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>d) Ecuación 4</Form.Label>
                    <Form.Control
                        type="text"
                        name="e4"
                        autoComplete="off"
                        required
                        onChange={handleInputChange}
                    />
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
                <Button variant="primary" type="submit">
                    Crear nueva pregunta
                </Button>
            </Form>
            <div style={{ padding: "1rem" }}></div>
        </>
    );
};

export default Create;
