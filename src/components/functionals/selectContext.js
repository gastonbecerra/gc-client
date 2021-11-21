
import { useState, useEffect } from "react";
import {Form, FloatingLabel} from 'react-bootstrap';
import { useDispatch, useSelector } from "react-redux"; 
import { pickContext } from "../../store/slices/context";

export default function SelectContext(props){
    
    const dispatch = useDispatch();
    const {contexts, selectedContext} = useSelector(state => state.context)

    return(
        <>
        <FloatingLabel style={{marginBottom: '7px'}} controlId="context" label="Select a Context">
        <Form.Select onChange={(e)=>dispatch(pickContext(e.target.value))} defaultValue={selectedContext === false ? ' ' : null} >
            
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