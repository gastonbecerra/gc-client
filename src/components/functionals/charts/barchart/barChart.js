import React from 'react'
import { Chart } from "react-google-charts";
import { useSelector } from "react-redux";
import { Container } from 'react-bootstrap' 
import Alert from '@mui/material/Alert';

export default function BarChart() {
    const { sample } = useSelector(state => state.indicator);
    const { user_value } = useSelector(state => state.indicator); 
    const { selectedIndicator } = useSelector(state => state.indicator);
    
    return (
        <>
            BARCHART

        </>
    )
}
