import Option from "./Option";
import { useState, useEffect } from "react";
import axios from "axios";

const Read = () => {
    const [data, setData] = useState({ drags: [], targets: [] });

    useEffect(() => {
        async function fetchData() {
            const id = obtenerId();
            const result = await axios(
                `http://localhost:8084/CRUD/PreguntaPorId?id=${id}`
            );

            setData(result.data.data);
            console.log(result.data.data);
        }

        fetchData();
    }, []);

    const obtenerId = () => {
        const fullpath = window.location.pathname;
        const path = fullpath.split("/");
        return path[2];
    };

    return (
        <>
            <h1>Información de la pregunta</h1>
            <h3>Nombre de la pregunta: </h3>
            <h4>{/*data.nombre*/}</h4>
            <h3>Pregunta: </h3>
            <h4>{/*data.pregunta*/}</h4>
            <h3>Respuesta: </h3>
            <h4>{/*data.respuesta*/}</h4>
            <h3>Drag options</h3>
            {/*data.drags.map((item) => (
                <Option
                    key={"drag" + 0}
                    image={item.imagen}
                    foot={item.texto}
                />
            ))}
            <h3>Target options</h3>
            {data.targets.map((item) => (
                <Option key={"tar" + 0} image={item.imagen} foot={item.texto} />
            ))*/}
        </>
    );
};

export default Read;
