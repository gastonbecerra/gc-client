import React,{useEffect, useState, useContext} from 'react'
import SelectContext from "./selectContext";
import { UserContext } from "../context/context";

export default function InnerModule({indicatorId}) {
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
            Context: {context ? context : "select cntext"}
            <br></br>
            User: {user ? user.id : "login rqured"}
            <br></br>
            <input type="button" value={'LLAMAR API'}/>
        </div>
        
    )
}
