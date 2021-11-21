
import { useEffect } from "react";
import { Form, FloatingLabel } from 'react-bootstrap';
import { useDispatch, useSelector } from "react-redux"; 
import { pickContext } from "../../store/slices/context";
import { fetchIndicatorByUser } from "../../store/slices/indicator";
export default function SelectContext(props){
    
    const dispatch = useDispatch();
    const {contexts, selectedContext: context_id} = useSelector(state => state.context)
    const {auth, id: user_id} = useSelector(state => state.user);
    const {id : indicator_id, name: indicator_name } = useSelector(state => state.indicator.selectedIndicator);

    useEffect(()=>{
        dispatch(fetchIndicatorByUser(indicator_id, context_id, user_id));
    },[context_id])

    return(
        <>
        <FloatingLabel style={{marginBottom: '7px'}} controlId="context" label="Select a Context" defaultValue={context_id}>
        <Form.Select onChange={(e)=>dispatch(pickContext(e.target.value))}  >
            
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