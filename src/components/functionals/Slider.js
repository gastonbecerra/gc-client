import React, {useEffect, useState} from 'react';
import { Chart } from "react-google-charts";
import { datos } from './data';

export default function Slider() {
    const [min, setMin] = useState(false);
    const [max, setMax] = useState(false);
    const [diffdata, setDiffdata] = useState(false);
    const [dist, setDist] = useState(false);
    const [date, setDate] = useState(datos[0].historic_values[0].date);

    const SliderBuilder = (datos) => {
        //GET HISTORIC LENGHT        
        var len = [];
        datos[0].historic_values.forEach((element,i)=>{
            len = [...len, element.date]
        })
        
        const slider = (
            <>
            <h4>{date && date}</h4>
            <div style={{display: 'flex', justifyContent: 'space-evenly', width: '350px', border: 'solid 1px black'}}>
                {   len &&
                    len.map((l,i)=>(
                        <div key={i} onClick={()=> historicBarDiff(i, l)} style={{ borderRight: 'solid 1px black'}}>
                            {i}
                        </div>
                    ))
                }
            </div>
            
            </>
        )
        return slider;

    }

    const selectBin = (bin, l) => {        
        var data =  datos[0];
        var chart_data = [];
        chart_data.push(data.indicator, "nivel")
        console.log(chart_data, chart_data.length);

        var holder = [];
        for(var i = 0; i < data.historic_values.length; i ++){
            if(data.historic_values[i].date === l){
                var k = Object.keys(data.historic_values[i]);
                var v = Object.values(data.historic_values[i]);   
                console.log(data.historic_values[i]);
                holder.push([
                    k[0],
                    v[0],
                ]);        
            }
        }
        var aux = [chart_data, ...holder]
        setDist(aux)
        console.log(dist);
    }

    const historicBarDiff = (bin, l) => {
        setDate(l)
        if(datos){
            SliderBuilder(datos)
          try{
            var aux = datos.filter(samp => samp.indicator === 'ahorro')
            var amin = [
              ["Context", "Min"],
            ]
            console.log(aux);
            for(var i = 0; i < aux.length; i++){
                for(var z = 0; z < aux[i].historic_values.length; z++){
                    if(aux[i].historic_values[z].date === date){
                        amin.push([aux[i].context, aux[i].historic_values[z].val_min])                     
                    }                  
                }
            }
            setMin(amin)
            console.log(min);

            var amax = [
              ["Context", "Max"],
            ]           
            for(var i = 0; i < aux.length; i++){
                for(var z = 0; z < aux[i].historic_values.length; z++){
                    if(aux[i].historic_values[z].date === date){
                        amax.push([aux[i].context, aux[i].historic_values[z].val_max])
                    }
                }
            }
            setMax(amax)
            console.log(max);

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

    const options = {
        title: "Min and Max saving values for contexts through time",
        legend: { position: "top" },
        vAxis: { scaleType: "$ARS" },
      };

    useEffect(()=>{
        if(datos){
            setDate(datos[0].historic_values[0].date)
            historicBarDiff(datos)
            console.log(date);
        } 
    },[datos])
  return (
      <>
      <h4>Slider</h4>
        <div style={{display: 'flex', flexDirection:'column', alignItems: 'center'}}>
        {diffdata !== false && 
            <Chart
                chartType="ColumnChart"
                width="100%"
                height="400px"
                diffdata={diffdata}
                options={options}
            />
        }
            {datos &&
                SliderBuilder(datos)
            }
        </div>
      </>
  )
}
