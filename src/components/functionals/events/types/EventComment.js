import React, { useState, useEffect } from "react";
import ChartContainer from "../../charts/chartContainer";
import { useSelector } from "react-redux";

export default function EventComment({event}) {
    const { samples } = useSelector((state) => state.samples);
    const [ sample, setSample ] = useState(false);

    useEffect(()=>{
        checkSample(event)
    },[])

    const checkSample = (event) => {
        try{
            if(samples){
                var aux = samples.filter(samp => ((samp.context ===  event.base_reference.context) && (samp.indicator === event.base_reference.indicator)));
                (aux !== undefined) && (aux.length > 0) && setSample(...aux);
            }
        }catch(e){
            console.log(e);
        }
    }

    useEffect(()=>{
        console.log(25,sample);
    },[sample])

    return (
        <>
        { sample !== (false && undefined) ? 
        <>
        <div className="event-title">
            <span>últimos comentarios sobre 
                <span style={{color: 'blue', fontStyle: 'bold'}}>
                    {' ' + sample.indicator + ' '  } 
                </span>
                
                para 
                <span style={{color: 'tomato', fontStyle: 'bold'}}>
                    {' ' + sample.context}</span>
                </span>
        </div>
            <ChartContainer muestra={sample} event={event}/>
            
        </>
        : null}
        {/* {event !== undefined &&
            <Message event={event}/>
        } */}
        
        </>
    )
}
