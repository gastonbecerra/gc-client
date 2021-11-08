import React,{useEffect, useState, useContext} from 'react'
import SelectContext from "./selectContext";
import { UserContext } from "../context/context";

export default function InnerModule({indicatorId, indicadores}) {
    const {context, user} = useContext(UserContext);
    console.log(user);
    useEffect(()=>{
    
    },[])
    return (
        <div className="inner-modulo">
            <SelectContext/>
            <br></br>
            Indicador: {indicatorId}
            <br></br>
            Context: {context ? context : "select context"}
            <br></br>
            User: {user ? user.id : "login required"}
            <br></br>           
            <input type="button" value={'LLAMAR API'}/>
        </div>
        
    )
}
