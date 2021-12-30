import React from 'react'
import { Chart } from "react-google-charts";
import { useSelector } from "react-redux";
import { Container } from 'react-bootstrap' 
import Alert from '@mui/material/Alert';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';

export default function Benchmark() {
    const { sample } = useSelector(state => state.indicator);
    const { user_value } = useSelector(state => state.indicator); 
    const { selectedIndicator } = useSelector(state => state.indicator);

    return (
        <Container>
            <Divider textAlign="left" className='mb-2'>
                <Chip label={"Chart" } style={{width:'100px'}}/>          
            </Divider>
            
            {sample ? 

            <>

            <Chart
                chartType="ScatterChart"
                loader={<div>Loading Chart</div>}
                data={[
                    ['', sample.context], // columnas
                    [sample.values.val_max, 0], //min
                    [sample.values.val_min, 0], //max
                    [user_value && user_value.value, 0], //user
                ]}
                options={{                        
                    title: 'Ahorro',
                    hAxis: { minValue: 0, maxValue: sample.values.val_max * 1.2 },
                    vAxis: { minValue: 0, maxValue: 0 },
                    legend: 'none',
                }}
                rootProps={{ 'data-testid': '1' }}/>
                </>

            : 
            <Alert variant="outlined" severity="error"> No hay un valor de muestra para el contexto seleccionado</Alert>
            }        

    </Container>
        
    )
}
