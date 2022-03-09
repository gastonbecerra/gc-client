import "./charts.scss";
import React from "react";
import Alert from "@mui/material/Alert";
import { useSelector } from "react-redux";
import * as Chart from "./index";
import Inputer from "../indicators/indicatorInputs";
import { Typography } from "@mui/material";

export default function ChartContainer({ indicator, muestra }) {
  const { sample } = useSelector((state) => state.indicator);
  const { samples } = useSelector((state) => state.samples);
  const { selectedIndicator } = useSelector((state) => state.indicator);
  var route = window.location.pathname;

  function renderRequiredChart() {
    try {
      let chart;
      let type;
      if (muestra) {
        chart = muestra.chart;
      } else  {
        chart = selectedIndicator.chart;
      }

      switch (chart) {
        case "benchmark":
          type = "Benchmark";
          break;

        case "barras":
          type = "BarChart";
          break;

        case "wordcloud":
          type = "BarChart";
          break;

        case "pie":
          type = "PieChart";
          break;

        default:
          return null;
      }
      const Component = Chart[type];
      return( 
        <>
          {
            muestra && 
            <Typography variant="overline" display="block" gutterBottom>
              {muestra.indicator}
            </Typography>
          }
          <Component muestra={muestra} />
        </>
        )
    } catch (e) {
      console.log({ status: "fail chart rendering", e: e });
    }
  }
    return (
      <>
      { route === "/context" ? 
        <>{renderRequiredChart()}</>
      : null}

      { route === '/modulo' ? 
      <div className="chart-container">
          <div className="chart">
            <h5>Chart</h5>

            {!sample && (
              <Alert variant="outlined" severity="error">
                {" "}
                No hay un valor de muestra para el contexto seleccionado
              </Alert>
            )}
            {![false, undefined].includes(sample)
              ? renderRequiredChart()
              : null}
          </div>

          <div className="inner-chart mt-3">
            <h5>Info</h5>
            <div>{selectedIndicator.description}</div>
            <hr></hr>
          </div>

          <Inputer className="inner-chart" />
        </div>
      : null }
      </>
    );
  }

