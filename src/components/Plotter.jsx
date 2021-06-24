import functionPlot from "function-plot";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";

const Plotter2 = ({ ecuacion, id }) => {

    const [btn1, setBtn1] = useState(false);
    const [btn2, setBtn2] = useState(false);
    const [btn3, setBtn3] = useState(false);
    const [grid, setGrid] = useState(true);
    const [plotx, setPlotx] = useState(false);
    const [plotmx, setPlotmx] = useState(false);
    const [p, setp] = useState(false);
    let idp = `m${id}`;
    const plot = () => {
        if (document.contains(document.getElementById(idp))) {
            document.getElementById(idp).remove();
        }
        const w = document.getElementById("wrapper-" + idp)
        const sidp = document.createElement("span")
        const att = document.createAttribute("id");
        att.value = idp;
        sidp.setAttributeNode(att);
        w.appendChild(sidp)
        functionPlot(p)
    }
    function getData() {
        if (!plotx && !plotmx) {
            return [{ fn: ecuacion }]
        } else if (plotx && !plotmx) {
            return [{ fn: ecuacion }, { fn: "x" }]
        } else if (!plotx && plotmx) {
            return [{ fn: ecuacion }, { fn: "-x" }];
        } else {
            return [{ fn: ecuacion }, { fn: "x" }, { fn: "-x" }];
        }
    }
    useEffect(() => {
        setp({
            target: `#m${id}`,
            data: getData(),
            grid: grid,
            yAxis: { label: "y" },
            xAxis: { label: "x" },
        });
    }, [grid, ecuacion, id, plotx, plotmx]);
    useEffect(() => {
        if (!p) {
            return
        }
        plot()
    }, [p]);
    return (
        <>
            <div id={"wrapper-" + idp}>
                <span id={idp}></span>
                <Button active={btn1} name="b1" variant="info" onClick={() => { setGrid(!grid); setBtn1(!btn1); }}>Grid</Button>
                <Button active={btn2} name="b1" className="ml-1 mr-1" variant="info" onClick={() => { setPlotx(!plotx); setBtn2(!btn2); }}>Plot x</Button>
                <Button active={btn3} name="b1" variant="info" onClick={() => { setPlotmx(!plotmx); setBtn3(!btn3); }}>Plot -x</Button>
            </div>
        </>
    );
};

export default Plotter2;
