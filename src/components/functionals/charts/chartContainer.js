import './charts.scss'
import React from 'react'
import Alert from '@mui/material/Alert';
import { useSelector } from "react-redux";
import * as Chart from './index';
import Inputer from '../inputer';

export default function ChartContainer(indicator) {
    const { sample } = useSelector(state => state.indicator);
    const { selectedIndicator } = useSelector(state => state.indicator);

    function renderRequiredChart (){
        let type;
        if(indicator){
            switch (indicator.indicator.chart) {
                    case 'benchmark':
                        type = 'Benchmark'
                        break;
        
                    case 'barras':
                        type = 'BarChart'
                        break;

                    case 'wordcloud':
                        type = 'BarChart'
                        break;

                    case 'pie':
                        type = 'PieChart'
                        break;
            
                default:
                    type = 'Benchmark'
                    return 'no chart designed yet'
                    
            }
            const Component = Chart[type]
            return <Component/>
        }
        
    }

    return (
        <div className='chart-container'>

            <div  className="chart">                
            <h5>Chart</h5>
            
            {!sample && <Alert variant="outlined" severity="error"> No hay un valor de muestra para el contexto seleccionado</Alert> }
                {![false, undefined].includes(sample) ? renderRequiredChart() : null}    
            </div>

            <div className='inner-chart mt-3'>
                
                <h5>Info</h5>
                <div>
                    {selectedIndicator.description}
                </div>
                <hr></hr>
            </div>
            
            <Inputer className='inner-chart'/>
        </div>
    )
}
