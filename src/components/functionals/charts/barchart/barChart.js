import React, { useEffect, useState } from "react";
import { Chart } from "react-google-charts";
import { useSelector } from "react-redux";

export default function BarChart({ muestra }) {
  const { sample } = useSelector((state) => state.indicator);
  const { user_value } = useSelector((state) => state.indicator);
  const { selectedIndicator } = useSelector((state) => state.indicator);
  const [dataChart, setDataChart] = useState(false);
  const [options, setOptions] = React.useState(false);
  const [acc, setAcc] = useState(0);
  const [belonging, setBelonging] = useState(0);
  const [width, setWidth] = useState("0%");
  var route = window.location.pathname;
  
  // sets accs (accumulator) of all barchart total values
  const accSetter = (route) => {
    let data;
    // set chart's data on route based criteria
    route !== "/modulo" ? (data = muestra) : (data = sample);
    // acc (accuulator) is the 100% of cases within sample => this helps to render stats highlights
    try {
      setAcc(0);
      var values = [];
      for (var i = 0; i < data.values.data.length; i++) {
        var v = Object.values(data.values.data[i]);
        values.push(v[0]);
        setAcc(acc + v[0]);
      }
      setAcc(values.reduce((pv, cv) => pv + cv, 0));
      console.log(acc);
    } catch (e) {
      console.log({ status: "err render barchart" });
    }
  };

  const setData = (route) => {
    let data;
    route === "/context" ? (data = muestra) : (data = sample);

    let holder = [];

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
          holder.push([
            k[0],
            v[0],
            "stroke-color: #871B47; stroke-opacity: 0.6; stroke-width: 8; fill-color: #BC5679; fill-opacity: 0.2",
            k[0],
          ]);
          setBelonging(v[0]);
        } else {
          holder.push([k[0], v[0], "color: #76A7FA", k[0]]);
        }
      });
    } catch (e) {
      console.log({ status: "err render barchart - l 78" });
    }

    setOptions({
      title: data.indicator,
      chartArea: { width: "90%" },
      hAxis: {
        title: "Cantidad",
        minValue: 0,
        gridlines: { color: "white" },
      },
      vAxis: {
        title: data.indicator,
        gridlines: { color: "white" },
      },
    });

    setDataChart(holder);
  };
  
  // on init actions => set responsive witdh
  useEffect(() => {
    if (window.innerWidth < 490) {
      setWidth("100%");
    } else if (window.innerWidth > 490 && window.innerWidth < 700) {
      setWidth("100%");
    } else {
      if (window.innerWidth > 700) {
        setWidth("600px");
      }
    }
  }, []);
  

  useEffect(() => {
    accSetter(route);
  }, [route]);


  useEffect(() => {
    setData(route)
  }, [sample, user_value, route, muestra]);

  return (
    <>
      {route !== "/modulo" ? (
        <>
          <Chart
            chartType="BarChart"
            width={[width]}
            height="400px"
            data={dataChart}
            options={options}
          />
        </>
      ) : null}

      {route === "/modulo"
        ? sample &&
          dataChart &&
          options && (
            <>
              <Chart
                chartType="BarChart"
                width={[width]}
                height="400px"
                data={dataChart}
                options={options}
              />

              <hr></hr>
              <div className="highlights-container">
                <h5>Highlights</h5>
                {![false, undefined].includes(user_value) && (
                  <div>
                    Regarding the context
                    <span className="highlight-context">
                      {" " + sample.context}
                    </span>
                    , you are part of a group of
                    <span className="highlight-text">
                      {" " + belonging + " "}
                    </span>
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
          )
        : null}
    </>
  );
}
