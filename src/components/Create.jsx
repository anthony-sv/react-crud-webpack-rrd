import { Form, Button } from "react-bootstrap";
import { useState } from "react";

const Create = () => {

    const [valida, setValida] = useState({
        np: "",
        e1: "",
        e2: "",
        e3: "",
        e4: "",
    });
    const [datos, setDatos] = useState({
        np: "",
        e1: "",
        e2: "",
        e3: "",
        e4: "",
        r: ""
    });

    const handleInputChange = (event) => {

        setDatos({
            ...datos,
            [event.target.name]: event.target.value,
        });
        setValida({
            ...valida,
            [event.target.name]: true,
        });

        //if(datos.np !== "" && datos.e1 !== "" && datos.)

    };

    const validaInput = (event) => {

        let exp = /^((\-*)\d*x)$|^((\-*)\d*x(\+|\-)\d+)$|^((\-*)\d+\/\d+x(\+|\-)\d+\/\d+)$|^((\-*)\d*x(\+|\-)\d+\/\d+)$|^((\-*)\d+\/\d+x(\+|\-)\d+)$|^((\-*)\d+\/\d+x)$|^(\-*\d+)$|^((\-*)\d+\/\d+)$/;

        if (exp.test(event.target.value)) {
            handleInputChange(event);
        } else {
            setValida({
                ...valida,
                [event.target.name]: false,
            });
        }

    }

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
                        onChange={handleInputChange}
                        required
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>a) Ecuación 1</Form.Label>
                    <Form.Control
                        type="text"
                        name="e1"
                        autoComplete="off"
                        onChange={validaInput}
                        required
                    />
                    {valida.e1 === false && <p>Oh oh! Al parecer no es válido ese dato.</p>}
                </Form.Group>
                <Form.Group>
                    <Form.Label>b) Ecuación 2</Form.Label>
                    <Form.Control
                        type="text"
                        name="e2"
                        autoComplete="off"
                        onChange={validaInput}
                        required
                    />
                    {valida.e2 === false && <p>Oh oh! Al parecer no es válido ese dato.</p>}
                </Form.Group>
                <Form.Group>
                    <Form.Label>c) Ecuación 3</Form.Label>
                    <Form.Control
                        type="text"
                        name="e3"
                        autoComplete="off"
                        onChange={validaInput}
                        required
                    />
                    {valida.e3 === false && <p>Oh oh! Al parecer no es válido ese dato.</p>}
                </Form.Group>
                <Form.Group>
                    <Form.Label>d) Ecuación 4</Form.Label>
                    <Form.Control
                        type="text"
                        name="e4"
                        autoComplete="off"
                        onChange={validaInput}
                        required
                    />
                    {valida.e4 === false && <p>Oh oh! Al parecer no es válido ese dato.</p>}
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
