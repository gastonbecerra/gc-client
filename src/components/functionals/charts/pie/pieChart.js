import React, { useEffect, useState } from "react";
import { Chart } from "react-google-charts";
import { useSelector } from "react-redux";

export default function PieChart({ muestra }) {
  const { sample } = useSelector((state) => state.indicator);
  const { user_value } = useSelector((state) => state.indicator);
  const { selectedIndicator } = useSelector((state) => state.indicator);
  const [dataChart, setDataChart] = useState(false);
  const [options, setOptions] = React.useState(false);
  const [acc, setAcc] = useState(0);
  const [belonging, setBelonging] = useState(0);
  const [index, setIndex] = useState(false);
  var route = window.location.pathname;

  // set acc  (accumulator) for all cases within sample / discriminates data source by routing criteria
  const accSetter = (route) => {
    let data;
    route !== "/modulo" ? (data = muestra) : (data = sample);

    try {
      setAcc(0);
      var values = [];
      for (var i = 0; i < data.values.data.length; i++) {
        var v = Object.values(data.values.data[i]);
        values.push(v[0]);
        setAcc(acc + v[0]);
      }
      setAcc(values.reduce((pv, cv) => pv + cv, 0));
    } catch (e) {
      console.log({ status: "err setting acc for piechart - l30?" });
    }
  };

  useEffect(() => {
    accSetter(route);
  }, []);

  const setData = (route) => {
    let holder = [];
    let data;
    route === "/context" ? (data = muestra) : (data = sample);

    try {
      holder.push([
        data.indicator,
        data.context,
        { role: "style" },
        { role: "annotation" },
      ]);
      data.values.data.forEach((row, i) => {
        var k = Object.keys(row);
        var v = Object.values(row);
        if (route === "/modulo" && k[0] === user_value.value) {
          setIndex(holder.length - 1);
          holder.push([k[0], v[0], "border: 2px solid black", k[0]]);
          setBelonging(v[0]);
        } else {
          holder.push([k[0], v[0], "color: #76A7FA", k[0]]);
        }
      });
    } catch (error) {
      console.log({ status: "err setting pie data" });
    }

    setOptions({
      title: data.indicator,
      chartArea: { width: "90%" },
      legend: { position: "bottom" },
      hAxis: {
        title: "Cantidad",
        minValue: 0,
        gridlines: { color: "white" },
      },
      vAxis: {
        title: data.indicator,
        gridlines: { color: "white" },
      },
      slices: {
        [index]: { offset: 0.05 },
      },
    });

    
    const dataOld = [
      ["Major", "Degrees"],
      ["Business", 256070],
      ["Education", 108034],
      ["Social Sciences &amp; History", 127101],
      ["Health", 81863],
      ["Psychology", 74194],
    ];
    
    const dataNew = [
      ["Major", "Degrees"],
      ["Business", 358293],
      ["Education", 101265],
      ["Social Sciences &amp; History", 172780],
      ["Health", 129634],
      ["Psychology", 97216],
    ];
    
     const diffdata = {
      old: dataOld,
      new: dataNew,
    };
    setDataChart(holder);
  };

  useEffect(() => {
    setData(route)
  }, [sample, user_value, route, muestra]);

  return (
    <>
    {route !== '/modulo' ? 
      <>
      <Chart
          chartType="PieChart"
          width="100%"
          height="400px"
          data={dataChart}
          options={options}
        />      
      </>
      : null
    }

    { route === '/modulo' && options && sample  ? 
      <>
        <Chart
          chartType="PieChart"
          width="100%"
          height="400px"
          data={dataChart}
          options={options}
        />
      
        <hr></hr>
        <div className="highlights-container">
          <strong>Highlights</strong>
          {![false, undefined].includes(user_value) && (
            <div>
              Regarding the context
              <span className="highlight-context">{" " + sample.context}</span>,
              you are part of a group of
              <span className="highlight-text">{" " + belonging + " "}</span>
              users from a
              <span className="highlight-text">{" " + acc + " "}</span>
              group that has a
              <span className="highlight-value">
                {" " + user_value.value + " "}
              </span>
              as
              <span className="highlight-text">
                {" " + selectedIndicator.indicator}
              </span>
              .
            </div>
          )}
          <hr></hr>
        </div>
      </>
    : null }
    </>
  );
}
