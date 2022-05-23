import React, {useEffect, useState} from 'react'
import { useSelector } from 'react-redux';
import { distribution } from './data';
import { Chart } from "react-google-charts";

export default function Distribution() {
  const { samples } = useSelector(state => state.samples);
  const indicator = "nivel_estudio";
  const [basicd, setBasicd] = useState(false);

  const BasicHistogramDistribution = (sample) => {
    var data =  sample[0];
    var chart_data = [];
    chart_data.push(data.indicator, "nivel")
    console.log(chart_data, chart_data.length);

    var holder = [];
    data.values.data.forEach((row, i) => {
      var k = Object.keys(row);
      var v = Object.values(row);      
        holder.push([
          k[0],
          v[0],
        ]);        
    });
    var aux = [chart_data, ...holder]
    setBasicd(aux)
    console.log(aux);
  }

  // const MultiHistogramDistribution = (sample) => {
  //   //1ra columna con los nombres de contextos
  //   var contexts = [];
  //   sample.forEach((element)=>{
  //     contexts = [...contexts, element.context]
  //   })
  //   //columnas ... de valores
  //   var values = [];
  //   for (var i = 0; i < sample.length; i++){
  //     for (var z = 0; z < sample[0].values.data.length; z++){
  //       console.log(sample[i].values.data[z]);

  //     }
  //   }
  // }

  useEffect(()=>{
    if(distribution){      
      BasicHistogramDistribution(distribution)
      //MultiHistogramDistribution(distribution)
    }
  },[distribution])

  const options = {
    title: "Lengths of dinosaurs, in meters",
    legend: { position: "none" },
    colors: ["#e7711c"],
    histogram: { lastBucketPercentile: 5 },
    vAxis: { scaleType: "mirrorLog" },
  };


  return (
    <>
    <div>Distribution</div>
    <h4>basic distribution</h4>
     {basicd &&
      <Chart
        chartType="Histogram"
        width="100%"
        height="400px"
        data={basicd}
        options={options}
    />
     }
    </>
    
  )
}
