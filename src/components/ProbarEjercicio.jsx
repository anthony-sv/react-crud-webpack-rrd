import { useEffect, useState } from "react";
import { Container, Row, Col, Button, Form, Modal, Image } from 'react-bootstrap'
import ReactTimerStopwatch from "react-stopwatch-timer";
import Plotter from "./Plotter"
import '../styles/Probar.css'
import axios from "axios";
import MostrarMultimedia from "./MostrarMultimedia"

const fromTime = new Date(0, 0, 0, 0, 0, 0, 0);

function msToTime(ms) {
    let seconds = (ms / 1000).toFixed(1);
    let minutes = (ms / (1000 * 60)).toFixed(1);
    let hours = (ms / (1000 * 60 * 60)).toFixed(1);
    let days = (ms / (1000 * 60 * 60 * 24)).toFixed(1);
    if (seconds < 60) return seconds + " segundos";
    else if (minutes < 60) return minutes + " minutos";
    else if (hours < 24) return hours + " horas";
    else return days + " dias";
}

const ProbarEjercicio = () => {

    const [isOn, setIsOn] = useState(true);
    const [timeElapsed, setTimeElapsed] = useState(0);
    const [date, setDate] = useState(null);
    const [data, setData] = useState({ ecuaciones: [], hint: "" });
    const [valida, setValida] = useState("");
    const [active, setActive] = useState(false);
    const [respuesta, setRespuesta] = useState("");
    const [ecuacion, setEcuacion] = useState({ m: "", b: "", });
    const [showModalDelete, setShowModalDelete] = useState(false);

    const stopWatch = () => {
        setIsOn(false);
        let date2 = new Date()
        let elapsed = date2.getTime() - date.getTime()
        let readableElapsed = msToTime(elapsed)
        setTimeElapsed(readableElapsed);
        if (data.respuesta === respuesta) {
            setValida("Correcto");
        } else {
            setValida("Incorrecto");
        }
        setActive(true);
    }

    const handleClose = () => setShowModalDelete(false);
    const handleShow = () => setShowModalDelete(true);

    const separa = () => {

        var ecuacion = "";

        if (data.respuesta === "a") {
            ecuacion = data.ecuaciones[0].ecuacion;
        } else if (data.respuesta === "b") {
            ecuacion = data.ecuaciones[1].ecuacion;
        } else if (data.respuesta === "c") {
            ecuacion = data.ecuaciones[2].ecuacion;
        } else if (data.respuesta === "d") {
            ecuacion = data.ecuaciones[3].ecuacion;
        }

        var m = ecuacion.split("x");

        if (m.length === 1) {
            setEcuacion({
                m: 0,
                b: m[0]
            });
        } else {
            setEcuacion({
                m: m[0],
                b: m[1]
            });
        }

    }

    const handleInputChange = (event) => {

        setRespuesta(event.target.value);

    };

    useEffect(() => {
        let x = new Date()
        setDate(x)
    }, [])

    useEffect(() => {
        async function fetchData() {
            const result = await axios(
                `http://localhost:8080/react-crud/PreguntaPorId?id=${window.location.href.split("=")[1]
                }`
            );

            setData(result.data.data);
        }

        fetchData();
    }, []);

    useEffect(() => {
        separa();
    }, [data]);

    return (
        <>
            <Container>
                <Row>
                    <Col>
                        <Row>
                            <h1>{data.nombre}</h1>
                        </Row>
                        <Row className="mt-4">
                            <h4>¿Cuál es la gráfica correcta para la ecuacion que tiene pendiente m={ecuacion.m} y para por el punto P(0,{ecuacion.b})?</h4>
                        </Row>
                    </Col>
                    <Col>
                        <Row>
                            <Col>
                                <ReactTimerStopwatch
                                    isOn={isOn}
                                    className="react-stopwatch-timer__table"
                                    watchType="stopwatch"
                                    displayCircle={true}
                                    color="gray"
                                    hintColor="red"
                                    fromTime={fromTime}
                                    displayHours={false}
                                />
                            </Col>
                            {
                                data.hint !== "" &&
                                <Col className="centra text-center justify-content-center">
                                    <Button variant="primary" onClick={handleShow}>Ver pista</Button>
                                </Col>
                            }
                        </Row>
                    </Col>
                </Row>
                <Row>
                    {data.ecuaciones.map((item, id) => (
                        <Col>
                            {id === 0 && <p>a)</p>}
                            {id === 1 && <p>b)</p>}
                            {id === 2 && <p>c)</p>}
                            {id === 3 && <p>d)</p>}
                            <Plotter key={id} ecuacion={item.ecuacion} id={id} />
                        </Col>
                    ))}
                </Row>
                <Row className="mt-3">
                    <Col>
                        <Form.Group>
                            <Form.Label>Seleccione una opción:</Form.Label>
                            <Form.Control
                                as="select"
                                name="r"
                                onChange={handleInputChange}
                                disabled={active}
                            >
                                <option>a</option>
                                <option>b</option>
                                <option>c</option>
                                <option>d</option>
                            </Form.Control>
                        </Form.Group>
                    </Col>
                </Row>
                <Row className="mt-3 pb-5">
                    <Col>
                        <Button variant="success" onClick={() => stopWatch()} disabled={active}>Evaluar</Button>
                    </Col>
                    <Col><h4>Resultado: <i>{valida}</i></h4></Col>
                    <Col><h4>Tiempo: <i>{timeElapsed}</i></h4></Col>
                </Row>
            </Container>
            <Modal show={showModalDelete} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Pista del ejercicio</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    La pista es:
                    <MostrarMultimedia hint={data.hint} />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="success" onClick={handleClose}>
                        Ok
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ProbarEjercicio;