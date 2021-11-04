
import { useState, useEffect } from "react";
// import {Form, Select} from 'react-bootstrap';

export default function SelectContext(props){
    // 1) capturamos el id del usuario

    const [contexts, setContexts] = useState(false);

    // 2) traemos de api contextos correspondientes
    useEffect(()=>{
        fetch('/contexts/api/basics')
        .then(response => {
            return response.json();
        })
        .then(data =>{
            setContexts(data[0].contexts)
        })
    },[])

    return(
        <>
        <label>Select Context </label>
        <select>
            {contexts ? 
            contexts.map((c,i)=>(
                <option key={i}>
                    {c}
                </option>
            ))
            :
            null
        }
        </select>
        </>
    )
}