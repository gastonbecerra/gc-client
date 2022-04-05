import React, { useState, useEffect } from "react";
import ChartContainer from "../../charts/chartContainer";
import { useSelector } from "react-redux";
import Message from "../../messaging";
export default function EventComment({event}) {
    const { samples } = useSelector((state) => state.samples);
    const [ sample, setSample ] = useState(false);

    useEffect(()=>{
        checkSample(event)
    },[])

    const checkSample = (event) => {
        if(samples){
            var aux = samples.filter(samp => (samp.context ===  event.base_reference.context && samp.indicator === event.base_reference.indicator));
            aux !== undefined && setSample(...aux);
        }
    }

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
