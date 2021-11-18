
import { useState, useEffect, useContext } from "react";
import { UserContext } from "../context/context";
import {Form, FloatingLabel} from 'react-bootstrap';

export default function SelectContext(props){
    const [contexts, setContexts] = useState(false);
    const {setContext, context} = useContext(UserContext);

    useEffect(()=>{
        fetch('/contexts')
        .then(response => {
            return response.json();
        })
        .then(data =>{
            setContexts(data)
        })
    },[])

    return(
        <>
        <FloatingLabel style={{marginBottom: '7px'}} controlId="context" label="Select a Context">
        <Form.Select onClick={(e)=>setContext(e.target.value)} defaultValue={context === false ? ' ' : null} >
            
            {contexts ? 
            contexts.map((c,i)=>(
                <option key={i} id={c._id}>
                    {c.name}
                </option>
            ))
            :
            null
        }
        </Form.Select>
        </FloatingLabel>
        </>
    )
}