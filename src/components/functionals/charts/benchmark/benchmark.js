import React from 'react'
import { Chart } from "react-google-charts";
import { useSelector } from "react-redux";

export default function Benchmark() {
    const { sample } = useSelector(state => state.indicator);
    const { user_value } = useSelector(state => state.indicator); 
    const { selectedIndicator } = useSelector(state => state.indicator);
    const { selectedContext } = useSelector(state => state.context);
    const [ dataChart, setDataChart ] = React.useState(false)
    const [options, setOptions] = React.useState(false)

    React.useEffect(()=>{
        var holder = []
        holder.push([sample.context, sample.context, {role: 'style'}])
        sample && selectedIndicator.chart === 'benchmark' &&
            holder.push([sample.values.val_max, 0, 'color: blue'])
            holder.push([sample.values.val_min, 0, 'color: blue'])
        user_value &&
            holder.push([user_value.value, 0, 'color: tomato' ])

        setOptions({                        
            title: selectedIndicator.indicator,
            hAxis: { gridlines: {color: 'white'}, minValue: 0, maxValue: sample.values.val_max + sample.values.val_max * 0.1 },
            vAxis: { gridlines: {color: 'white'}, minValue: 0, maxValue: 0 },
            legend: 'none',
        })
        setDataChart(holder)
    },[sample, user_value])

    return (                        
            <>
            {sample && selectedContext &&

            <Chart
                chartType="ScatterChart"
                loader={<div>Loading Chart</div>}
                data={dataChart}
                options={options}
                rootProps={{ 'data-testid': '1' }}/>
            }
            </>
        
    )
}
