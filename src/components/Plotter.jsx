import functionPlot from "function-plot";
import { useEffect } from "react";
const parameters = {
    title: `y = x`,
    target: "#1",
    data: [
        {
            fn: "x",
        },
    ],
    grid: true,
    yAxis: { label: 'y' },
    xAxis: { label: 'x' },
};
function plot(f, id) {
    if (!isEmptyOrSpacesOrNull(f)) {
        parameters.data[0].fn = f;
        parameters.title = `y = ${f}`
    }
    parameters.target = `#m${id}`;
    functionPlot(parameters);
}
function isEmptyOrSpacesOrNull(str) {
    return str === null || str === undefined || str === true || str?.match(/^ *$/) !== null;
}
const Plotter = ({ ecuacion, id }) => {
    let idp = `m${id}`
    useEffect(() => {
        plot(ecuacion, id);
    }, [ecuacion])
    return (
        <>
            <section>
                <div id={idp}></div>
            </section>
        </>
    );
};

export default Plotter;