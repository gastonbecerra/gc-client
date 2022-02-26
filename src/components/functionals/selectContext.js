
import React, { useEffect } from "react";
import { Form, FloatingLabel } from 'react-bootstrap';
import { useDispatch, useSelector } from "react-redux"; 
import { pickContext } from "../../store/slices/context";
import { fetchIndicatorByUser } from "../../store/slices/indicator";

export default function SelectContext(){
    const dispatch = useDispatch();
    const {contexts, selectedContext: context_id} = useSelector(state => state.context)
    const { username:  user_id} = useSelector(state => state.user)
    const { selectedIndicator } = useSelector(state => state.indicator)

    useEffect(()=>{
    ![false, undefined].includes(selectedIndicator.indicator && context_id) &&
        dispatch(fetchIndicatorByUser(selectedIndicator.indicator, context_id, user_id));
    },[context_id])

    
    

    return(
        <div className="context-container">
        <FloatingLabel style={{marginBottom: '5px', fontWeight:'900'}} controlId="context" label="Select a Context" defaultValue={context_id}>
        <Form.Select onChange={(e)=>dispatch(pickContext(e.target.value))} >
            
            {contexts ? 
            contexts.map((c,i)=>(
                <option key={i} id={c._id}>
                    {c.context}
                </option>
            ))
            :
            null
        }
        </Form.Select>
        </FloatingLabel>
        </div>
    )
}