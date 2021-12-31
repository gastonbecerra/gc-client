import React from 'react'
import { Container } from 'react-bootstrap' 
import Alert from '@mui/material/Alert';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';
import { useSelector } from "react-redux";
import * as Chart from './index';

export default function ChartContainer(indicator) {
    const { sample } = useSelector(state => state.indicator);
    const { user_value } = useSelector(state => state.indicator); 

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
            
                default:
                    type = 'Benchmark'
                    return 'no chart designed yet'
                    
            }
            const Component = Chart[type]
            return <Component/>
        }
        
    }

    return (
        <Container>
           
            
                <strong>Chart</strong>
            

            {!sample && <Alert variant="outlined" severity="error"> No hay un valor de muestra para el contexto seleccionado</Alert> }

            
            <div  className="chart-container">
                {renderRequiredChart()}    
            </div>

            <strong>Highlights</strong>

        </Container>
    )
}
