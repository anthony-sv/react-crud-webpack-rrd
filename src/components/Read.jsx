import Option from "./Option";
import { useState, useEffect } from "react";
import axios from "axios";

const Read = () => {
    const [data, setData] = useState({ ecuaciones: [] });

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
            <h1>Información de la pregunta</h1>
            <h3>Nombre de la pregunta: </h3>
            <p>{data.nombre}</p>
            <h3>Ecuaciones ingresadas: </h3>
            {data.ecuaciones.map((item) => (
                <p>{item.ecuacion}</p>
            ))}
            <h3>Respuesta: </h3>
            <p>{data.respuesta}</p>
        </>
    );
};

export default Read;
