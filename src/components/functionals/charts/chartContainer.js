import "./charts.scss";
import React, { useState, useEffect } from "react";
import Alert from "@mui/material/Alert";
import { useSelector, useDispatch } from "react-redux";
import * as Chart from "./index";
import Inputer from "../indicators/indicatorInputs";
import { Typography } from "@mui/material";
import Comments from "../messaging";
import { fetchChartComments } from "../../../store/slices/comments";

export default function ChartContainer({ indicator, muestra }) {
  const dispatch = useDispatch();
  const { sample } = useSelector((state) => state.indicator);
  const { samples } = useSelector((state) => state.samples);
  const { selectedIndicator } = useSelector((state) => state.indicator);
  var route = window.location.pathname;
  const { chart_comments } = useSelector((state) => state.comments);
  const [comments, setComments] = useState(false);

  useEffect(() => {
    dispatch(fetchChartComments());
  }, [muestra]);

  useEffect(()=>{
    if (chart_comments) {
      try {
        var comments = chart_comments.filter(
          (com) => com.base_reference.indicator === muestra.indicator
        );

        if (comments.length === 0 || comments == undefined) {
          comments = false;
        }

        setComments(comments);
      } catch (e) {
        console.log("failure setting comments for each chart");
      }
    }
  },[chart_comments])

  function renderRequiredChart() {
    try {
      let chart;
      let type;
      if (muestra) {
        chart = muestra.chart;
      } else {
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
      return (
        <>
          <Component muestra={muestra} />
          {muestra && <Comments muestra={muestra} comments={comments} />}
          {/* Y aquí debería el componente dinámico de highlights */}
        </>
      );
    } catch (e) {
      console.log({ status: "fail chart rendering", e: e });
    }
  }
  return (
    <>
      {route === "/context" ? <>{renderRequiredChart()}</> : null}

      {route === "/modulo" ? (
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
      ) : null}
    </>
  );
}
