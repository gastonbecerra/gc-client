import React, {useState, useEffect} from 'react'
import { Chart } from "react-google-charts";
import { useSelector } from 'react-redux';
import {datos} from './data';

export default function Indicators() {
  const {samples} = useSelector(state => state.samples);
  const [min, setMin] = useState(false);
  const [max, setMax] = useState(false);
  const [diffdata, setDiffdata] = useState(false);
  const [data, setData] = useState(false);
  const [lines, setLines] = useState(false);
  const [dlines, setDIilnes] = useState(false);
  const [sample, setSample] = useState(
    {
      "values": {
        "val_max": 105000,
        "val_min": 90000
      },
      "context": "Macristas",
      "indicator": "ahorro",
      "info": "xxx",
      "timestamp": {
        "$date": {
          "$numberLong": "1639969200000"
        }
      },
      "chart": "benchmark",
      "historic_values": [
        {"date": "01/01/2022", value: 94000},
        {"date": "08/01/2022", value: 92000},
        {"date": "15/01/2022", value: 99000},
        {"date": "22/01/2022", value: 94000},
        {"date": "29/01/2022", value: 82000},
        {"date": "05/02/2022", value: 87000},
        {"date": "12/01/2022", value: 89000},    
    ]  
    }
  )

  useEffect(()=>{
    if (sample)
    try{
      var data = [
        [sample.indicator, sample.context], //contexts        
      ]
      sample.historic_values.forEach(element => {
        data.push([element.date,element.value]) 
      });
      setData(data);
    }catch(e){
      console.error('err settng lines chart');
    }

  },[sample])

  const options = {
    chart: {
      title: "Ahorro para las locos",
      subtitle: "in millions of dollars (USD)",
    },
  };

  const setLinesChart = (datos) => {
    if(datos){
      var chart_holder = [];
      var contexts = ["Context"];
      for (var z = 0; z < datos.length; z++){
        contexts = [...contexts, datos[z].context]   
      }
      console.log("CNTEXTS: ", contexts);      
      try{
        // FILL DATE VALUES
        for (var i = 0; i < 1; i++){
          for (var z = 0; z < datos[i].historic_values.length; z++){
            if(datos[i].historic_values[z].date){
              chart_holder.push([datos[i].historic_values[z].date])
            }            
          }
        }
        console.log("DATES: ", chart_holder);      
        for (var i = 0; i < datos[0].historic_values.length; i++){
          for (var z = 0; z < datos[i].historic_values.length; z++){
              
              chart_holder[z] = [...chart_holder[z], datos[i].historic_values[z].value] 
            
            
            if((i === datos.length - 1) && (z === datos[i].historic_values.length - 1)){
              var aux;
              chart_holder.splice(i, datos[0].historic_values[0].length);               
              aux = [contexts,...chart_holder]

              setDIilnes(aux)
            }
          }                    
        }
      }catch(e){

      }
    }
  }

  
  const setCoso = () => {
    if(samples){
      try{
        var aux = samples.filter(samp => samp.indicator === 'ahorro')
        var amin = [
          ["Context", "Min"],
        ]
        aux.forEach((element)=>{
          amin.push([element.context, element.values.val_min])
        })
        setMin(amin)

        var amax = [
          ["Context", "Max"],
        ]
        aux.forEach((element)=>{
          amax.push([element.context, element.values.val_max])
        })
        setMax(amax)
       
        if(min && max){
          setDiffdata({
          new: min,
          old: max,
        });
      }
      }catch(e){
        console.error('err fitering contexts for column chart');
      }
    }
  }
  
  useEffect(()=>{
    setCoso()
  },[samples])

  

    
    useEffect(()=>{      
        setLinesChart(datos);
    },[datos])

    useEffect(()=>{      
      console.log(dlines);
    },[dlines])
  

  return (
    <div style={{overflowY: 'scroll', height:'200vh'}}>
      <div>Indicators</div>
      <h5>LINE</h5>
    {data && 
  
      <Chart
        chartType="Line"
        width="500px"
        height="200px"
        data={data}
        options={options}
      />
    }
    <hr />
    {
      dlines &&
      <Chart
      chartType="Line"
      width="500px"
      height="200px"
      data={dlines}
      options={options}
    />
    }
    <hr />
    <h5>COLUMN</h5>
    <span>if many samples, combined</span>
    { 
      diffdata !== false && 
    <Chart
      chartType="ColumnChart"
      width="500px"
      height="200px"
      diffdata={diffdata}
    />
    }
    </div>
  )
}

/* 
NECESITO SABER 
- INPUTS
-- INPUTS -- SAMPLES

--- TODAS LAS MUESTRAS
--- .................contexts
----.................indicators
*/
