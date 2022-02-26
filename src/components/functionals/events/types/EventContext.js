import React, { useState, useEffect } from 'react';
import {  useSelector } from "react-redux";

export default function EventContext({event, data}) {

    const { context4user } = useSelector(state => state.context);
    const [ ascription, setAscription ] = useState(false);
    
    const checker = () => {
        context4user &&
        context4user.forEach(element => {
            if(element.context === data.context){
                setAscription(true)
            }
        });   
    }

    useEffect(()=>{
        checker()
    },[context4user])

  return (
    <>
        <div className='event-title'>
            <span style={{color: 'dodgerblue'}}>
                {event.user + ' '}
            </span> 
                has created a new context! 
        </div>

        <div className='event-main'>
            <span style={{color: 'tomato'}}>
                {' ' + data.context}
            </span>
        </div>
        <div className="event-content">
            <div className="info">
                <span><strong>Description</strong></span>
                <div>{data.info}</div>
            </div>    
            <div className="scope">
            <span><strong>Condition</strong></span>
            {
            data.condition.length > 0 && 

            data.condition.map((e,i)=>(
                <>
                    {e && 
                    <>
                        <li style={{listStyle: 'none'}}><strong>{e.var}</strong>
                        <>
                        {
                            e.op === "$gte" && 
                            <>
                                {' '} bigger than {e.value}
                            </>
                            }
                            {e.op === "$lte" && 
                            <>
                                {' '} lesser than {e.value}
                            </>
                            }
                            {e.op === "btw" && 
                            <>
                                {' between'} {e.value[0]} {' '} and {' '} {e.value[1]}
                            </>                                            
                            }
                            {e.op === "$eq" && 
                            <>
                                {' equals to '} {e.value}
                            </>
                            }
                            {e.op === "$in" && 
                            <>
                                {' is any of '} {e.value.map((m)=> (<>{m}{', '}</>)) }
                            </>
                        }
                        </>
                        </li>                    
                    </>
                    }
                </>
            ))
            }            
            </div>
            <div className="subscribtion">
                {ascription ? ' suscribed ' : ' subscribe!'}
            </div>
        </div>
        
        
    </>
  )
}
