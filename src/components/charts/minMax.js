import React,{useState, useEffect} from 'react'
import { Chart } from "react-google-charts";

export default function MinMax({sample, userValue}) {
    const [uservalue, setUservalue] = useState(false)
    const [contextsample, setContextsample] = useState(false);

    useEffect(() => {
        if(typeof(userValue) !== 'undefined'){
            setUservalue(userValue);
            console.log(uservalue);
        }
        if(typeof(sample[0].contexto) !== 'undefined' && sample){
            setContextsample(sample);
            console.log(contextsample);
        }
    }, [userValue, sample]);

    return (
        <div>
            
            {userValue !== false && contextsample !== false ? 
                <Chart
                    width={'95vw'}
                    height={'400px'}
                    chartType="ScatterChart"
                    loader={<div>Loading Chart</div>}
                    data={[
                        ['', sample[0].contexto], // columnas
                        [contextsample[0].values.val_max, 0], //min
                        [contextsample[0].values.val_min, 0], //max
                        [uservalue, 0], //max
                    ]}
                    options={{
                        title: 'Ahorro',
                        hAxis: { minValue: 0, maxValue: contextsample[0].values.val_max * 1.3 },
                        vAxis: { minValue: 0, maxValue: 0 },
                        legend: 'none',
                    }}
                    rootProps={{ 'data-testid': '1' }}
                />
                
                :

               'Null'

            }
            
            
            </div>
    )
}
