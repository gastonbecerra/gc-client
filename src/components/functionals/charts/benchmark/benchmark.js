import React, { useEffect } from "react";
import { Chart } from "react-google-charts";
import { useSelector } from "react-redux";

export default function Benchmark({ muestra }) {
  const { sample } = useSelector((state) => state.indicator);
  const { user_value } = useSelector((state) => state.indicator);
  const { selectedIndicator } = useSelector((state) => state.indicator);
  const { selectedContext } = useSelector((state) => state.context);
  const [dataChart, setDataChart] = React.useState(false);
  const [options, setOptions] = React.useState(false);
  const [width, setWidth] = React.useState("0%");
  var route = window.location.pathname;
  const [counter, setCounter] = React.useState(0);

  // on init actions
  React.useEffect(() => {
    try {
      if (window.innerWidth < 490) {
        setWidth("100%");
      } else if (window.innerWidth > 490 && window.innerWidth < 700) {
        setWidth("100%");
      } else {
        if (window.innerWidth > 700) {
          setWidth("600px");
        }
      }
    } catch (e) {
      console.log({ status: "failed benchmark render", e });
    }
  }, []);

  const setData = (route) => {
    let data;
    route === "/context" ? (data = muestra) : (data = sample);
    try {
      let holder = [];
      holder.push([data.context, data.context, { role: "style" }]);
      data &&
        data.chart === "benchmark" &&
        holder.push([data.values.val_max, 0, "color: blue"]);
      holder.push([data.values.val_min, 0, "color: blue"]);

      if (route === "/modulo" && user_value)
        holder.push([user_value.value, 0, "color: tomato"]);

      setOptions({
        title: data.indicator,
        hAxis: {
          gridlines: { color: "white" },
          minValue: 0,
          maxValue: data.values.val_max + data.values.val_max * 0.1,
        },
        vAxis: { gridlines: { color: "white" }, minValue: 0, maxValue: 0 },
        // legend: 'none',
      });

      setDataChart(holder);
      setCounter(counter + 1);
    } catch (e) {
      console.log({ status: "err setting benchmark data" });
    }
  };

  React.useEffect(() => {
    setData(route);
  }, [sample, user_value, route, muestra]);

  React.useEffect(() => {
    console.log(counter);
  }, [counter]);

  return (
    <>
      {route === "/context" ? (
        <>
        <Chart
          id={1}
          chartType="ScatterChart"
          data={dataChart}
          options={options}
          width={[width]}
          rootProps={{ "data-testid": "1" }}
        />
        </>
      ) : null}

      {route === "/modulo" ? (
        <>
          <Chart
            chartType="ScatterChart"
            loader={<div>Loading Chart</div>}
            data={dataChart}
            options={options}
            width={[width]}
            rootProps={{ "data-testid": "1" }}
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
                , your
                <span className="highlight-context">
                  {" " + selectedIndicator.indicator}
                </span>{" "}
                level is:
                <li>
                  {![false, undefined].includes(user_value) &&
                  sample.values.val_min > user_value.value ? (
                    <>
                      {" "}
                      <span className="highlight-text">below </span> the min
                      value by
                      <span className="highlight-value">
                        {" " +
                          Math.round(
                            ((sample.values.val_min - user_value.value) * 100) /
                              user_value.value
                          )}
                        %
                      </span>
                    </>
                  ) : (
                    <>
                      {" "}
                      <span className="highlight-text">
                        above the min value by{" "}
                      </span>
                      <span className="highlight-value">
                        {" " +
                          Math.round(
                            ((sample.values.val_min - user_value.value) * 100) /
                              user_value.value
                          )}
                        %
                      </span>
                      <span>{}</span>.
                    </>
                  )}
                </li>
                <li>
                  {![false, undefined].includes(user_value) &&
                  sample.values.val_min > user_value.value ? (
                    <>
                      {" "}
                      <span className="highlight-text">above </span> the max
                      value by
                      <span className="highlight-value">
                        {" " +
                          Math.round(
                            (user_value.value * 100) / sample.values.val_max
                          )}
                        %
                      </span>
                    </>
                  ) : (
                    <>
                      {" "}
                      <span className="highlight-text">
                        above the max value by{" "}
                      </span>
                      <span className="highlight-value">
                        {" " +
                          Math.round(
                            (user_value.value * 100) / sample.values.val_max
                          )}
                        %
                      </span>
                      <span>{}</span>.
                    </>
                  )}
                </li>
              </div>
            )}
            <hr></hr>
          </div>
        </>
      ) : null}
    </>
  );
}
