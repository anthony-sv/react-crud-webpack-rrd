import Option from "./Option";
import { useState, useEffect } from "react";
import axios from "axios";

const Read = () => {
    const [data, setData] = useState({ drags: [], targets: [] });

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
            <h3>Pregunta: </h3>
            <h4>{data.pregunta}</h4>
            <h3>Respuesta: </h3>
            <h4>{data.respuesta}</h4>
            <h3>Drag options</h3>
            <div style={{ display: "flex", justifyContent: "space-around", flexWrap: "wrap" }}>
                {data.drags.map((item) => (
                    <Option
                        key={"drag" + 0}
                        image={item.imagen}
                        foot={item.texto}
                    />
                ))}
            </div>
            <h3>Target options</h3>
            <div style={{ display: "flex", justifyContent: "space-around", flexWrap: "wrap" }}>
                {data.targets.map((item) => (
                    <Option key={"tar" + 0} image={item.imagen} foot={item.texto} />
                ))}
            </div>
        </>
    );
};

export default Read;
