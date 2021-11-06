
import { useState, useEffect, useContext } from "react";
import { UserContext } from "../context/context";
// import {Form, Select} from 'react-bootstrap';

export default function SelectContext(props){
    // 1) capturamos el id del usuario

    const [contexts, setContexts] = useState(false);
    const {setContext} = useContext(UserContext);
    // 2) traemos de api contextos correspondientes
    useEffect(()=>{
        fetch('/contexts/api/basics')
        .then(response => {
            return response.json();
        })
        .then(data =>{
            setContexts(data)
            // console.log(data);
        })
    },[])

    useEffect(()=>{
        console.log(contexts);
    },[contexts])

    return(
        <>
        <label>Select Context </label>
        <select onChange={(e)=>setContext(e.target.value)}>
            {contexts ? 
            contexts.map((c,i)=>(
                <option key={i} id={c._id}>
                    {c.name}
                </option>
            ))
            :
            null
        }
        </select>
        </>
    )
}