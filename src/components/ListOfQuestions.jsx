import { Table, Container } from "react-bootstrap";
import Question from "./Question";
import { useState, useEffect } from "react";
import axios from "axios";
const ListOfQuestions = () => {
    const [data, setData] = useState({ preguntas: [] });

    useEffect(() => {
        async function fetchData() {
            const result = await axios("http://localhost:8080/CRUD/Inicio");

            setData(result.data);
        }

        fetchData();
    }, []);

    return (
        <>
            <h1>ALTAS, BAJAS, CAMBIOS Y CONSULTAS</h1>
            <Table striped bordered hover style={{ textAlign: "center" }}>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Nombre de la pregunta</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {data.state === 200 &&
                        data.preguntas.map((item) => (
                            <Question
                                key={item.id}
                                id={item.id}
                                name={item.nombre}
                            />
                        ))}
                </tbody>
            </Table>
            {data.state !== 200 && (
                <Container>
                    <h1>Sin preguntas</h1>
                </Container>
            )}
        </>
    );
};

export default ListOfQuestions;
