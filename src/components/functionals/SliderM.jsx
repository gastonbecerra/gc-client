import React, { useEffect, useState } from 'react'
import { Chart } from "react-google-charts";
import { datos } from './data';
import Slider from '@mui/material/Slider';
import Box from '@mui/material/Box';

export default function SliderM() {
    const [bin, setBin] = useState(0);
    const [date, setDate] = useState(datos[0].historic_values[0].date);
    const [min, setMin] = useState(false);
    const [max, setMax] = useState(false);
    const [diffdata, setDiffdata] = useState(false);

    const dataHandlder = (b) => {
        setBin(b)
        setDate(datos[0].historic_values[b].date);
        return date;
    }

    const dataBuilder = () => {
        try{
            var aux = datos.filter(samp => samp.indicator === 'ahorro')
            
            var amin = [
              ["Context", "Ahorro"],
            ];    
            for(var i = 0; i < aux.length; i++){                
                amin.push([aux[i].context, aux[i].historic_values[bin].val_min])                
            }   

            setMin(amin);
            console.log(min);

            var amax = [
              ["Context", "Ahorro"],
            ]
            
            for(var i = 0; i < aux.length; i++){    
                amax.push([aux[i].context, aux[i].historic_values[bin].val_max])                
            }           

            setMax(amax);
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

    const sliderBuilder = (datos) => {
        //GET HISTORIC LENGHT        
        var len = [];
        datos[0].historic_values.forEach((element,i)=>{
            len = [...len, element.date]
        })

        if(len.length > 0){
            const sliderDate = (
                <Box sx={{width: '300px'}}>
                    <Slider
                        aria-label={datos[0].indicator}
                        defaultValue={bin}
                        getAriaValueText={dataHandlder}
                        valueLabelDisplay="auto"
                        step={len.length / len.length}
                        marks={true}
                        min={0}
                        max={len.length - 1}                    
                    />
                    <h4 style={{textAlign:'center'}}>{date && date}</h4>
                </Box>
            )    
            return sliderDate;
        }        
    }

    const options = {
        title: "Min and Max saving values for contexts through time",
        legend: { position: "top" },
        vAxis: { scaleType: "$ARS" },
      };

    useEffect(()=>{
        dataBuilder()
    },[bin])


    return (
        <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
            SliderM
            {
                diffdata && 
                <Chart
                    chartType="ColumnChart"
                    width="400px%"
                    height="400px"
                    diffdata={diffdata}
                    options={options}
                />  
                
            }
            {datos && sliderBuilder(datos)}
        </div>
    )
}
