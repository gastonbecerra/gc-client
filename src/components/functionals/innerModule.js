import React from 'react'
import Inputer from './inputer';
import ChartContainer from './charts/chartContainer';
import { useSelector } from "react-redux";

export default function InnerModule() {
    const { selectedIndicator} = useSelector(state => state.indicator);
    
    return (
        <div>

            <ChartContainer indicator={selectedIndicator} />

            <Inputer/>
        </div>
        )
}
