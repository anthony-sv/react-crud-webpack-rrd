import functionPlot from "function-plot";
import { useEffect } from "react";
const parameters = {
    target: "#myFunction",
    data: [
        {
            fn: "x",
        },
    ],
    grid: true,
    yAxis: { domain: [-5, 5] },
    xAxis: { domain: [-5, 5] },
};
function plot(f) {
    console.log(`f es ${f}`);
    if (!isEmptyOrSpacesOrNull(f)){
        parameters.data[0].fn = f;
    }
    functionPlot(parameters);
}
function isEmptyOrSpacesOrNull(str) {
    return str === null || str === undefined || str ===true || str?.match(/^ *$/) !== null;
}
const Plotter = ({ecuacion}) => {
    useEffect(() => {
        plot(ecuacion);
    }, [ecuacion])
    return (
        <>
            <section>
                <div id="myFunction"></div>
            </section>
        </>
    );
};

export default Plotter;