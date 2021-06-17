import { Form, Button } from "react-bootstrap";
import { useState, useEffect } from "react";

const Create = () => {

    //Estado para ver si pondrá una imagen de pista al ejercicio
    const [hint, setHint] = useState(false);
    //Estado para activar el boton submit
    const [active, setActive] = useState(true);
    //Estado para validar cada input
    const [valida, setValida] = useState({
        np: "",
        e1: "",
        e2: "",
        e3: "",
        e4: "",
        r: "",
        hint: "",
    });
    //Estado para guardar los cambios del input
    const [datos, setDatos] = useState({
        np: "",
        e1: "",
        e2: "",
        e3: "",
        e4: "",
        r: "",
        hint: "",
    });

    //Funcion que almacena en tiempo real cada cambio al input y valida si está vacio
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

    //useEffect que valida en tiempo real que se hayan ingresado valores correctos en todos los campos
    useEffect(() => {
        if (datos.np !== "" && datos.e1 !== "" && datos.e2 !== "" && datos.e3 !== "" && datos.e4 !== "" && valida.np === true && valida.e1 === true && valida.e2 === true && valida.e3 === true && valida.e4 === true) {
            //Añade a la validacion el input de la imagen para la pista
            if (hint === true) {
                //Si ya se añadio una imagen se habilita el boton de submit
                if (datos.hint !== "" && valida.hint === true) {
                    setActive(false);
                } else {
                    setActive(true);
                }
            } else {
                setActive(false);
            }
        } else {
            setActive(true);
        }
    }, [valida, datos, hint]);

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
                    {valida.np === false && <p className="adv">Oh oh! Al parecer no es válido ese dato :c</p>}
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
                    {valida.e1 === false && <p className="adv">Oh oh! Al parecer no es válido ese dato :c</p>}
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
                    {valida.e2 === false && <p className="adv">Oh oh! Al parecer no es válido ese dato :c</p>}
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
                    {valida.e3 === false && <p className="adv">Oh oh! Al parecer no es válido ese dato :c</p>}
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
                    {valida.e4 === false && <p className="adv">Oh oh! Al parecer no es válido ese dato :c</p>}
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
                    <Form.Label>¿Desea ingresar una pista al ejercicio?</Form.Label>
                    <Button name="btn-hint-true" className="ml-3" variant="success" onClick={() => setHint(true)} disabled={hint}>Aceptar</Button>
                </Form.Group>
                {
                    hint === true && <Form.Group>
                        <Form.Label>Ingrese la imagen que será la pista.</Form.Label>
                        <Form.File onChange={handleInputChange} name="hint" accept="image/*" />
                    </Form.Group>
                }
                <Button variant="primary" type="submit" disabled={active}>
                    Crear nueva pregunta
                </Button>
            </Form>
            <div style={{ padding: "1rem" }}></div>
        </>
    );
};

export default Create;
