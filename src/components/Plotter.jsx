import functionPlot from "function-plot";
import { useEffect } from "react";

//Funcion que pertenece a la libreria para graficar donde se especifica la funcion a graficar, así como el id del elemento HTML donde se graficará
function plot(f, id) {
    if (!isEmptyOrSpacesOrNull(f)) {
        functionPlot({
            target: `#m${id}`,
            data: [
                {
                    fn: f,
                },
            ],
            grid: true,
            yAxis: { label: "y" },
            xAxis: { label: "x" },
        });
    } else {
        functionPlot({
            target: `#m${id}`,
            data: [
                {
                    fn: 'x',
                },
            ],
            grid: true,
            yAxis: { label: "y" },
            xAxis: { label: "x" },
        });
    }
}

//Se comprueba que la ecuacion no sea vacio ni nula
function isEmptyOrSpacesOrNull(str) {
    return str === null || str === undefined || str === true || str?.match(/^ *$/) !== null;
}

const Plotter = ({ ecuacion, id }) => {

    //Variable del id para el parrafo
    let idp = `m${id}`;

    //useEffect que ejecuta la funcion para graficar
    useEffect(() => {
        plot(ecuacion, id);
    }, [ecuacion, id])

    return (
        <>
            <span id={idp}></span>
        </>
    );
};

export default Plotter;