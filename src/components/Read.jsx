import Option from "./Option";
import { useState, useEffect } from "react";
import axios from "axios";

const Read = () => {
    const [data, setData] = useState({ drags: [] });

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
            <h4>{data.nombre}</h4>
            <h3>Ecuacion ingresada: </h3>
            <h4>y = ({data.m1}/{data.m2})x + {data.b}</h4>
            <h3>Respuesta: </h3>
            <h4>{data.respuesta}</h4>
            <h3>Drag options</h3>
            <div style={{ display: "flex", justifyContent: "space-around", flexWrap: "wrap" }}>
                {data.drags.map((item) => (
                    <Option
                        key={"drag" + 0}
                        image={item.imagen}
                    />
                ))}
            </div>
        </>
    );
};

export default Read;
