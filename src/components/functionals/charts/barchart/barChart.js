import React, {useEffect, useState} from 'react'
import { Chart } from "react-google-charts";
import { useSelector } from "react-redux";
import { selectContext } from '../../../../store/slices/context';

export default function BarChart() {

    const { sample } = useSelector(state => state.indicator);
    const { user_value } = useSelector(state => state.indicator); 
    const { selectedIndicator } = useSelector(state => state.indicator);
    const [ dataChart, setDataChart ] = useState(false);
    const [options, setOptions] = React.useState(false);
    const [acc, setAcc] = useState(0);
    const [belonging, setBelonging] = useState(0);
    const [width, setWidth] = useState('0%');

    useEffect(()=>{
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

    useEffect(()=>{
        if(sample && typeof(sample.values) !== undefined){        
            setAcc(0);
            var values = []
            for(var i = 0; i < sample.values.data.length; i++){                
                var v = Object.values(sample.values.data[i])
                values.push(v[0])                
                setAcc(acc + v[0])
            }
            setAcc(values.reduce((pv, cv) => pv + cv, 0));
        }
    },[sample])

    useEffect(()=>{
        var holder = []
        if(sample && typeof(sample.values) !== undefined && selectedIndicator && selectContext){
            try{
                holder.push([selectedIndicator.indicator, sample.context, { role: 'style' }, { role: 'annotation' }])
                sample.values.data.forEach((row, i)=>{                    
                    var k = Object.keys(row)
                    var v = Object.values(row)                    
                    if(k[0] === user_value.value ){
                        holder.push([k[0], v[0], 'stroke-color: #871B47; stroke-opacity: 0.6; stroke-width: 8; fill-color: #BC5679; fill-opacity: 0.2', k[0]])                
                        setBelonging(v[0])
                    }else{
                        holder.push([k[0], v[0], 'color: #76A7FA', k[0]])
                    }
            })
            
            }catch(error){

            }
            
            if (user_value && sample) setOptions({                        
                
                    title: selectedIndicator.indicator,
                    chartArea: { width: "90%" },
                    hAxis: { 
                        title: 'Cantidad', 
                        minValue: 0, 
                        gridlines: {color: 'white'}},
                    vAxis: {
                      title: selectedIndicator.indicator, 
                      gridlines: {color: 'white'}
                    },

            })

            setDataChart(holder)
        } 
    },[sample, user_value])
    
    return (
        <>
        {sample && dataChart  && options &&

        <Chart
            chartType="BarChart"
            width={[width]}
            height="400px"
            data={dataChart}
         options={options}   
        />
        }

        <hr></hr>
            <div className="highlights-container">
            <h5>Highlights</h5>                
                {![false, undefined].includes(user_value) &&
                <div>
                    Regarding the context 
                    <span className='highlight-context'>
                        {' ' + sample.context}
                    </span>, you are part of a group of 
                    <span className='highlight-text'>
                        {' ' + belonging + ' '}
                    </span>
                    users from a
                    <span className='highlight-text'>
                        {' ' + acc + ' '}
                    </span>
                    group that has a
                    <span className='highlight-value'>
                        {' ' + user_value.value + ' '}
                    </span>
                    as
                    <span className='highlight-text'>
                        {' ' + selectedIndicator.indicator}
                    </span>.
                </div>
                }
                <hr></hr>
            </div>
        </>
    )
}
  
  