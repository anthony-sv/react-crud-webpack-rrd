import { Image, Container, Col, Row } from 'react-bootstrap'
import { useState, useEffect } from "react";
import axios from "axios";

const Read = () => {

    //Estado que almacena el JSON obtenido de la peticion
    const [data, setData] = useState({ ecuaciones: [] });

    //useEffect que hace la peticion al servlet por la pregunta con cierto id
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

    return (
        <>
            <Container className="mt-3">
                <Row>
                    <Col>
                        <h1>Información de la pregunta</h1>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <h3>Nombre de la pregunta: </h3>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <p>{data.nombre}</p>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <h3>Pregunta: </h3>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <p>{data.pregunta}</p>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <h3>Ecuaciones ingresadas: </h3>
                    </Col>
                </Row>
                <Row>
                    {data.ecuaciones.map((item, id) => (
                        <Col>
                            <p>
                                {id === 0 && <i>a) </i>}
                                {id === 1 && <i>b) </i>}
                                {id === 2 && <i>c) </i>}
                                {id === 3 && <i>d) </i>}
                                {item.ecuacion}</p>
                        </Col>
                    ))}
                </Row>
                <Row>
                    <Col>
                        <h3>Respuesta: </h3>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <p>{data.respuesta}</p>
                    </Col>
                </Row>
                {
                    data.hint !== "" &&
                    <>
                        <Row>
                            <Col><h3>Pista ingresada</h3></Col>
                        </Row>
                        <Row>
                            <Col><Image src={data.hint} style={{ width: "40vh", }} alt={data.hint} rounded /></Col>
                        </Row>
                    </>
                }
            </Container>

        </>
    );
};

export default Read;
