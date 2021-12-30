import React from 'react'
import { Chart } from "react-google-charts";
import { useSelector } from "react-redux";
import { Container } from 'react-bootstrap' 
import Alert from '@mui/material/Alert';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip'

export default function BarChart() {
    const { sample } = useSelector(state => state.indicator);
    const { user_value } = useSelector(state => state.indicator); 
    const { selectedIndicator } = useSelector(state => state.indicator);
    
    return (
        <Container>
            <Divider textAlign="left" className='mb-2'>
                    <Chip label={"Chart & Highlights" } style={{width:'100px'}}/>          
            </Divider>
            
            {!sample && <Alert variant="outlined" severity="error"> No hay un valor de muestra para el contexto seleccionado</Alert> }

        </Container>
    )
}
