import { Form, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import axios from "axios";

const Update = () => {
    const [datos, setDatos] = useState({
        nnp: "",
        np: "",
        nr: "",
        ndt1: "",
        ndt2: "",
        ndt3: "",
        ndt4: "",
        ntt1: "",
        ntt2: "",
        ntt3: "",
        ntt4: "",
    });

    useEffect(() => {
        async function fetchData() {
            const result = await axios(
                `http://localhost:8084/react-crud/PreguntaPorId?id=${
                    window.location.href.split("=")[1]
                }`
            );

            guardaDatos(result.data.data);
        }

        fetchData();
    }, []);

    const guardaDatos = (data) => {
        setDatos({
            nnp: data.nombre,
            np: data.pregunta,
            nr: data.respuesta,
            ndt1: data.drags[0].texto,
            ndt2: data.drags[1].texto,
            ndt3: data.drags[2].texto,
            ndt4: data.drags[3].texto,
            ntt1: data.targets[0].texto,
            ntt2: data.targets[1].texto,
            ntt3: data.targets[2].texto,
            ntt4: data.targets[3].texto,
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
                action="http://localhost:8084/react-crud/GuardaPreguntaModificada"
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
                    <Form.Label>Pregunta:</Form.Label>
                    <Form.Control
                        type="text"
                        name="np"
                        value={datos.np}
                        autoComplete="off"
                        onChange={handleInputChange}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Respuesta:</Form.Label>
                    <Form.Control
                        type="text"
                        name="nr"
                        value={datos.nr}
                        autoComplete="off"
                        onChange={handleInputChange}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Drag Opción 1:</Form.Label>
                    <Form.Control
                        type="text"
                        name="ndt1"
                        value={datos.ndt1}
                        autoComplete="off"
                        onChange={handleInputChange}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Drag Opción 2:</Form.Label>
                    <Form.Control
                        type="text"
                        name="ndt2"
                        value={datos.ndt2 ?? "no definido"}
                        autoComplete="off"
                        onChange={handleInputChange}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Drag Opción 3:</Form.Label>
                    <Form.Control
                        type="text"
                        name="ndt3"
                        value={datos.ndt3 ?? "no definido"}
                        autoComplete="off"
                        onChange={handleInputChange}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Drag Opción 4:</Form.Label>
                    <Form.Control
                        type="text"
                        name="ndt4"
                        value={datos.ndt4 ?? "no definido"}
                        autoComplete="off"
                        onChange={handleInputChange}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Target opcion 1:</Form.Label>
                    <Form.Control
                        type="text"
                        name="ntt1"
                        value={datos.ntt1 ?? "no definido"}
                        autoComplete="off"
                        onChange={handleInputChange}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Target opcion 2:</Form.Label>
                    <Form.Control
                        type="text"
                        name="ntt2"
                        value={datos.ntt2 ?? "no definido"}
                        autoComplete="off"
                        onChange={handleInputChange}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Target opcion 3:</Form.Label>
                    <Form.Control
                        type="text"
                        name="ntt3"
                        value={datos.ntt3 ?? "no definido"}
                        autoComplete="off"
                        onChange={handleInputChange}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Target opcion 4:</Form.Label>
                    <Form.Control
                        type="text"
                        name="ntt4"
                        value={datos.ntt4 ?? "no definido"}
                        autoComplete="off"
                        onChange={handleInputChange}
                    />
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
