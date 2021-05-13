import { Form, Button } from "react-bootstrap";
import { useState } from "react";

const Create = () => {
    const [datos, setDatos] = useState({
        np: "",
        p: "",
        r: "",
        do1: "",
        do2: "",
        do3: "",
        do4: "",
        dt1: "",
        dt2: "",
        dt3: "",
        dt4: "",
        to1: "",
        to2: "",
        to3: "",
        to4: "",
        tt1: "",
        tt2: "",
        tt3: "",
        tt4: "",
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
                action="http://localhost:8084/CRUD/NuevaPregunta"
                method="POST"
                encType="multipart/form-data"
            >
                <Form.Group>
                    <Form.Label>Nombre de la pregunta { }:</Form.Label>
                    <Form.Control
                        type="text"
                        name="np"
                        autoComplete="off"
                        required
                        onChange={handleInputChange}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Pregunta:</Form.Label>
                    <Form.Control
                        type="text"
                        name="p"
                        autoComplete="off"
                        onChange={handleInputChange}
                        required
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Respuesta:</Form.Label>
                    <Form.Control
                        type="text"
                        name="r"
                        autoComplete="off"
                        onChange={handleInputChange}
                        required
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Drag Opción 1:</Form.Label>
                    <Form.Control
                        type="text"
                        name="dt1"
                        autoComplete="off"
                        onChange={handleInputChange}
                        required
                    />
                    <Form.File
                        name="do1"
                        required
                        style={{ marginTop: "0.5rem" }}
                        onChange={handleInputChange}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Drag Opción 2:</Form.Label>
                    <Form.Control
                        type="text"
                        name="dt2"
                        autoComplete="off"
                        onChange={handleInputChange}
                        required
                    />
                    <Form.File
                        name="do2"
                        required
                        style={{ marginTop: "0.5rem" }}
                        onChange={handleInputChange}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Drag Opción 3:</Form.Label>
                    <Form.Control
                        type="text"
                        name="dt3"
                        autoComplete="off"
                        onChange={handleInputChange}
                        required
                    />
                    <Form.File
                        name="do3"
                        required
                        style={{ marginTop: "0.5rem" }}
                        onChange={handleInputChange}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Drag Opción 4:</Form.Label>
                    <Form.Control
                        type="text"
                        name="dt4"
                        autoComplete="off"
                        onChange={handleInputChange}
                        required
                    />
                    <Form.File
                        name="do4"
                        required
                        style={{ marginTop: "0.5rem" }}
                        onChange={handleInputChange}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Target opcion 1:</Form.Label>
                    <Form.Control
                        type="text"
                        name="tt1"
                        autoComplete="off"
                        onChange={handleInputChange}
                        required
                    />
                    <Form.File
                        name="to1"
                        required
                        style={{ marginTop: "0.5rem" }}
                        onChange={handleInputChange}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Target opcion 2:</Form.Label>
                    <Form.Control
                        type="text"
                        name="tt2"
                        autoComplete="off"
                        onChange={handleInputChange}
                        required
                    />
                    <Form.File
                        name="to2"
                        required
                        style={{ marginTop: "0.5rem" }}
                        onChange={handleInputChange}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Target opcion 3:</Form.Label>
                    <Form.Control
                        type="text"
                        name="tt3"
                        autoComplete="off"
                        onChange={handleInputChange}
                        required
                    />
                    <Form.File
                        name="to3"
                        required
                        style={{ marginTop: "0.5rem" }}
                        onChange={handleInputChange}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Target opcion 4:</Form.Label>
                    <Form.Control
                        type="text"
                        name="tt4"
                        autoComplete="off"
                        onChange={handleInputChange}
                        required
                    />
                    <Form.File
                        name="to4"
                        required
                        style={{ marginTop: "0.5rem" }}
                        onChange={handleInputChange}
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
