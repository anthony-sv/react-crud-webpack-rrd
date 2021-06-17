import { Form, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import axios from "axios";

const Update = () => {

    //Estado para habilitar o deshabilitar el boton submit
    const [active, setActive] = useState(true);
    //Estado para validar que esten correctos todos los input
    const [valida, setValida] = useState({
        nnp: true,
        ne1: true,
        ne2: true,
        ne3: true,
        ne4: true,
        nr: true,
    });
    //Estado que almacena los valores ingresados en los input por el cliente
    const [datos, setDatos] = useState({
        nnp: "",
        ne1: "",
        ne2: "",
        ne3: "",
        ne4: "",
        nr: "",
    });

    //Funcion que guarda cada valor del JSON de la peticion
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

    //useEffect que hace la peticion al servlet por la pregunta con cierto id
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

    //useEffect que valida en todo momento que los campos estén correctos
    useEffect(() => {
        if (datos.nnp !== "" && datos.ne1 !== "" && datos.ne2 !== "" && datos.ne3 !== "" && datos.ne4 !== "" && valida.nnp === true && valida.ne1 === true && valida.ne2 === true && valida.ne3 === true && valida.ne4 === true) {
            setActive(false);
        } else {
            setActive(true);
        }
    }, [valida, datos]);

    //Funcion que guarda en tiempo real los valores de cada input así como su validacion
    const handleInputChange = (event) => {
        setDatos({
            ...datos,
            [event.target.name]: event.target.value,
        });
        setValida({
            ...valida,
            [event.target.name]: true,
        });
    };

    //Funcion que valida los campos de las ecuaciones permitiendo ingresar ecuaciones del tipo y=mx+b unicamente
    const validaInput = (event) => {

        let exp = /^(\d*x)$|^(\d*x\s?(\+|\-)\s?\d+)$|^(\d+\/[1-9][0-9]*x\s?(\+|\-)\s?\d+\/[1-9][0-9]*)$|^(\d*x\s?(\+|\-)\s?\d+\/[1-9][0-9]*)$|^(\d+\/[1-9][0-9]*x\s?(\+|\-)\s?\d+)$|^(\d+\/[1-9][0-9]*x)$|^(\d+)$|^(\d+\/[1-9][0-9]*)$|^(\d+\s?(\+|\-)\s?\d*x)$|^(\d+\/[1-9][0-9]*\s?(\+|\-)\s?\d*x)$|^(\d+\s?(\+|\-)\s?\d+\/[1-9][0-9]*x)$|^(\d+\/[1-9][0-9]*\s?(\+|\-)\s?\d+\/[1-9][0-9]*x)$/;

        //Si es valida con la expresion regular se guarda la ecuacion y se valida el input
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
                        placeholder={datos.nnp}
                        defaultValue={datos.nnp}
                        autoComplete="off"
                        onChange={handleInputChange}
                    />
                    {valida.nnp === false && <p className="adv">Oh oh! Al parecer no es válido ese dato :c</p>}
                </Form.Group>
                <Form.Group>
                    <Form.Label>a) Ecuación 1</Form.Label>
                    <Form.Control
                        type="text"
                        name="ne1"
                        placeholder={datos.ne1}
                        defaultValue={datos.ne1}
                        autoComplete="off"
                        onChange={validaInput}
                    />
                    {valida.ne1 === false && <p className="adv">Oh oh! Al parecer no es válido ese dato :c</p>}
                </Form.Group>
                <Form.Group>
                    <Form.Label>b) Ecuación 2</Form.Label>
                    <Form.Control
                        type="text"
                        name="ne2"
                        placeholder={datos.ne2}
                        defaultValue={datos.ne2}
                        autoComplete="off"
                        onChange={validaInput}
                    />
                    {valida.ne2 === false && <p className="adv">Oh oh! Al parecer no es válido ese dato :c</p>}
                </Form.Group>
                <Form.Group>
                    <Form.Label>c) Ecuación 3</Form.Label>
                    <Form.Control
                        type="text"
                        name="ne3"
                        placeholder={datos.ne3}
                        defaultValue={datos.ne3}
                        autoComplete="off"
                        onChange={validaInput}
                    />
                    {valida.ne3 === false && <p className="adv">Oh oh! Al parecer no es válido ese dato :c</p>}
                </Form.Group>
                <Form.Group>
                    <Form.Label>d) Ecuación 4</Form.Label>
                    <Form.Control
                        type="text"
                        name="ne4"
                        placeholder={datos.ne4}
                        defaultValue={datos.ne4}
                        autoComplete="off"
                        onChange={validaInput}
                    />
                    {valida.ne4 === false && <p className="adv">Oh oh! Al parecer no es válido ese dato :c</p>}
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
                <Button variant="primary" type="submit" disabled={active}>
                    Submit
                </Button>
            </Form>
            <div style={{ marginTop: "1rem" }}></div>
        </>
    );
};

export default Update;
