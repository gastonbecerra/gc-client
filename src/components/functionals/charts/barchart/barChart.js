import React, {useEffect, useState} from 'react'
import { Chart } from "react-google-charts";
import { useSelector } from "react-redux";
import { selectContext } from '../../../../store/slices/context';

export default function BarChart() {

    const { sample } = useSelector(state => state.indicator);
    const { user_value } = useSelector(state => state.indicator); 
    const { selectedIndicator } = useSelector(state => state.indicator);
    const [ dataChart, setDataChart ] = useState(false)
    const [options, setOptions] = React.useState(false)

    useEffect(()=>{
        var holder = []
        if(sample && selectedIndicator && selectContext){
            holder.push([selectedIndicator.indicator, sample.context, { role: 'style' }])
            sample.values.data.forEach((row, i)=>{
                var k = Object.keys(row)
                var v = Object.values(row)
                if(k[0] === user_value.value ){
                    holder.push([k[0], v[0], 'stroke-color: #871B47; stroke-opacity: 0.6; stroke-width: 8; fill-color: #BC5679; fill-opacity: 0.2'])
                }else{
                    holder.push([k[0], v[0], 'color: #76A7FA'])
                }
            })
            if (user_value && sample) setOptions({                        
                
                    title: selectedIndicator.indicator,
                    chartArea: { width: "90%" },
                    hAxis: {
                      title: sample.context,
                      minValue: 0,
                    },
                    vAxis: {
                      title: "Nivel de estudio",
                    },

            })
            setDataChart(holder)
        } 
    },[sample])
    
    return (
        <>
        {sample && dataChart  && options &&
        <Chart
            chartType="BarChart"
            width="100%"
            height="400px"
            data={dataChart}
         options={options}   
        />
        }

        </>
    )
}
  
  