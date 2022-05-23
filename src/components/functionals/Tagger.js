import React, { useEffect, useState } from 'react'
import { datos, subscribedContexts, createdContexts, otherContexts } from './data';
import { Chart } from "react-google-charts";
import { useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Slider from '@mui/material/Slider';

export default function Tagger() {
    const [bin, setBin] = useState(0);
    const [date, setDate] = useState(datos[0].historic_values[0].date);
    // const [indicators, setIndicators] = useState(false);
    const [state, setState] = useState({
        contexts: false,
        selectedContexts: [],
        selectedIndicators: [],
    })
    const [ dataChart, setDataCahart ] = useState(false);
    
    const multiBardataBuilder = () => {
        
        var contexts = [...state.selectedContexts];
        if(contexts.length > 0){
            var indicators = [];
            var chart_data = [];
            var first_row = ["Contexts"]; 
    
            datos.forEach((samp,i)=>{
                if(!first_row.includes(samp.indicator)){
                    first_row.push(samp.indicator)
                }     
                if(!indicators.includes(samp.indicator)){
                    indicators.push(samp.indicator)                
                }            
            })
            chart_data.push(first_row)
            
            try{
                for(var i = 0; i < contexts.length; i++){
                    var data_row = [contexts[i]]
                    for(var z = 0; z < indicators.length; z++){                        
                        var aux = datos.filter(d=> (d.indicator === indicators[z]) && (d.context === contexts[i]) );
                        data_row.push(aux[0].values.val_max);
                    }
                    chart_data.push(data_row)
                }
                setDataCahart(chart_data)
            }catch(e){
                console.log({e, ms: 'err building multi bar in tagger'});
            }
        }else{
            setDataCahart(false)
        }
    }

    const multiBarHistoricDataBuilder = () => {
        
        var contexts = [...state.selectedContexts];
        //var indicators = [...state.selectedIndicators];
        var indicators = [];
        if(contexts.length > 0){
            var indicators = [];
            var chart_data = [];
            var first_row = ["Contexts"]; 
    
            datos.forEach((samp,i)=>{
                if(!first_row.includes(samp.indicator)){
                    first_row.push(samp.indicator)
                }     
                if(!indicators.includes(samp.indicator)){
                    indicators.push(samp.indicator)                
                }            
            })
            chart_data.push(first_row)
            
            try{
                for(var i = 0; i < contexts.length; i++){
                    var data_row = [contexts[i]]
                    for(var z = 0; z < indicators.length; z++){                        
                        var aux = datos.filter(d=> (d.indicator === indicators[z]) && (d.context === contexts[i]) );                        
                        data_row.push(aux[0].historic_values[bin].value);
                    }
                    chart_data.push(data_row)
                }
                setDataCahart(chart_data)
            }catch(e){
                console.log({e, ms: 'err building multi bar in tagger'});
            }
        }else{
            setDataCahart(false)
        }
    }

    const contextPicker = () =>{
        try{
            if(subscribedContexts && createdContexts){
                var aux = subscribedContexts.concat(createdContexts);
                var contexts = [];
                aux.map((element,i)=>{
                    !contexts.includes(element.context) && contexts.push(element.context);
                })                
                setState({
                    ...state,
                    contexts: contexts,
                });
            }
        }catch(e){
            console.log('err building context picker');
        }
    }

    const selectContext = (c) => {        
        const index = state.selectedContexts.findIndex((item) => item === c);
        if(index === -1){
            setState({...state, selectedContexts: [...state.selectedContexts, c]})
        }else{
            var aux = [...state.selectedContexts];
            aux.splice(index, 1)
            setState({...state, selectedContexts: aux})
        }
    }
    
    // const selectIndicator = (ind) => {        
    //     const index = state.selectedIndicators.findIndex((item) => item === ind);
    //     if(index === -1){
    //         setState({...state, selectedIndicators: [...state.selectedIndicators, ind]})
    //     }else{
    //         var aux = [...state.selectedIndicators];
    //         aux.splice(index, 1)
    //         setState({...state, selectedIndicators: aux})
    //     }
    // }

    // const indicatorPicker = () =>{
    //     try{
    //         var inds = [];
    //         datos.map((element,i)=>{
    //             !inds.includes(element.indicator) && inds.push(element.indicator);
    //         }) 
    //         setIndicators(inds);
    //         console.log(indicators);
    //     }catch(e){
    //         console.log('err building indicator picker');
    //     }
    // }

    const options = {
        chart: {
            title: "Company Performance",
            subtitle: "Ingresos, Ahorros,y Gastos",
            'legend':'bottom',
            seriesType: 'bars',
            series: {5: {type: 'line'}},
            hAxis: {color: '#333', minSpacing: 100}
        },
    };

    const sliderBuilder = (datos) => {
        //GET HISTORIC LENGHT        
        var len = [];
        datos[0].historic_values.forEach((element,i)=>{
            len = [...len, element.date]
        })

        if(len.length > 0){
            const sliderDate = (
                <Box sx={{width: '50px', height: '300px',display: 'flex', flexDirection: 'row-reverse', alignItems:'center'}}>
                    <Slider
                        aria-label={datos[0].indicator}
                        defaultValue={bin}
                        getAriaValueText={dataHandlder}
                        valueLabelDisplay="auto"
                        step={len.length / len.length}
                        marks={true}
                        orientation="vertical"
                        min={0}
                        max={len.length - 1}                    
                    />
                    <h4 style={{textAlign:'center'}}>{date && date}</h4>
                </Box>
            )    
            return sliderDate;
        }        
    }

    const dataHandlder = (b) => {
        setBin(b)
        setDate(datos[0].historic_values[b].date);
        return date;
    }

    useEffect(()=>{
        contextPicker();
    },[subscribedContexts, createdContexts])

    useEffect(()=>{
        datos && multiBarHistoricDataBuilder();
    },[state.selectedContexts, bin])

    // useEffect(()=>{
    //     try{
    //         indicatorPicker();
    //     }catch(e){
    //         console.log('err buil');
    //     }
    // },[datos])

return (
    <div style={{display: 'flex', flexDirection: 'row-reverse', alignItems:'center', justifyContent: 'center'}}>

    <div style={{display: 'flex', flexDirection:'column', justifyContent: 'center', alignItems: 'center'}}>
    {
        dataChart && 
        <Chart
            chartType="Bar"
            width="500px"
            height="600px"
            data={dataChart}
            options={options}
        />
    }

    <Box
      sx={{
        width: 400,
        height: 70,
        backgroundColor: '#F7F7F7',
        border: 'solid lightgrey 1px',
        borderRadius: '4%',
        cursor: 'pointer',      
        overflow: 'hidden',
        overflowX:'scroll',
        padding: '7px',
        display: 'flex',
        justifyContent: 'center'
      }}
    >
    {
        state.contexts && 
        <>
        <Stack direction="row" spacing={1}>
        {state.contexts.map((s,i)=>(
            state.selectedContexts.includes(s) ?
            <Chip 
                key={i}
                label={s}
                clickable={true}
                onClick={()=>selectContext(s)}
            />
            :
            <Chip
                key={i}
                label={s}
                clickable={true}
                onClick={()=>selectContext(s)}
                variant="outlined"
            />
        ))}
        </Stack>

        {/* <Stack direction="row" spacing={1}>
            {indicators.map((ind,i)=>(
                state.selectedIndicators.includes(ind) ?
                <Chip
                    key={i}
                    label={ind}
                    clickable={true}
                    onClick={()=>selectIndicator(ind)}
                />
                :
                <Chip
                    key={i}
                    label={ind}
                    variant="outlined"
                    clickable={true}
                    onClick={()=>selectIndicator(ind)}
                />
            ))}
        </Stack> */}
        </>
    }
    </Box>

    </div>
    <div style={{}}>
        {datos && sliderBuilder(datos)}
    </div>
    </div>
    )
}
