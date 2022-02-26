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

    const [width, setWidth] = React.useState('0%');

    React.useEffect(()=>{
        console.log(window.innerWidth);
        if (window.innerWidth < 490) {
            setWidth('100%')
        }else if (window.innerWidth > 490  && window.innerWidth  < 700) {
            setWidth('100%')
        }else{
            if (window.innerWidth > 700) {
                setWidth('600px')
            }
        }
        
    },[])

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
            // legend: 'none',
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
                width={[width]}
                rootProps={{ 'data-testid': '1' }}/>
            }
            <hr></hr>
            <div className="highlights-container">
                <h5>Highlights</h5>                
                {![false, undefined].includes(user_value) &&
                
                
                <div>
                Regarding the context 
                    <span className='highlight-context'>
                        {' ' + sample.context}
                    </span>, 
                    your 
                    <span className='highlight-context'>  
                        {' ' + selectedIndicator.indicator}
                    </span> 
                    {' '} level is:
                    <li>
                    {
                        ![false, undefined].includes(user_value) && sample.values.val_min > user_value.value 

                        ?   <> 
                                {' '} <span className="highlight-text">below </span> the min value by 
                                <span className="highlight-value">{' -' + Math.round(((sample.values.val_min - user_value.value)* 100) / user_value.value )}%</span>
                            </>
                        :   <> 
                                {' '} <span className="highlight-text">above the min value by </span>
                                <span className="highlight-value">{' ' + Math.round(((sample.values.val_min - user_value.value)* 100) / user_value.value )}%</span>
                                <span>{}</span>.
                            </>
                        }
                    </li>

                    <li>
                    {
                        ![false, undefined].includes(user_value) && sample.values.val_min > user_value.value 
                         
                        ?   <> 
                                {' '} <span className="highlight-text">above </span> the max value by 
                                <span className="highlight-value">{' -' + Math.round((user_value.value * 100) / sample.values.val_max)}%</span>
                            </>
                        :   <> 
                                {' '} <span className="highlight-text">below the max value by </span>
                                <span className="highlight-value">{' +' + Math.round((user_value.value * 100) / sample.values.val_max)}%</span>
                                <span>{}</span>.
                            </>

                        }
                    </li>   
                </div>
                }
                <hr></hr>
            </div>

            </>
        
    )
}
