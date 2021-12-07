import { useEffect, useState } from "react";
import Inputer from "./innermodule/inputer";
import Indicator from "./innermodule/indicator";
import Info from './innermodule/info';
import { useDispatch, useSelector } from "react-redux";
import { setSelectedIndicator, fetchIndicatorByUser } from "../../store/slices/indicator";
import { Link } from 'react-router-dom';
import { Container } from "react-bootstrap";

export default function Modulo(props){
    const dispatch = useDispatch()
    let tabs = ["Inputs", "Indicator", "Info", "Muestra"]
    const { id: user_id} = useSelector(state => state.user)
    const {id : indicator_id, name: indicator_name } = useSelector(state => state.indicator.selectedIndicator);
    const { selectedContext: context_id } = useSelector(state => state.context)
    const { modules } = useSelector(state => state.modulo)
    let indicatorState = props.location.state;
    const [flag, setFlag] = useState(false);

    useEffect(()=>{
        dispatch(setSelectedIndicator(indicatorState)); 
    },[])

    useEffect(()=>{
        if(indicator_id === indicatorState.id) setFlag(true);
    },[indicator_id])

    useEffect(()=>{
        if(flag){
            dispatch(fetchIndicatorByUser(indicator_id, context_id, user_id));
        }  
    },[flag])

    const [key, setKey] = useState();

    return(
        <>
        <div className="d-flex justify-content-center">
            <div className="bg-light border text-center" style={{width:'50px'}}><Link style={{textDecoration:'none'}}to={'/'}>Back</Link></div>
            <div className="bg-light border text-center" style={{width:'100%', paddingRight: '5vw'}}>{indicator_name}</div>
        </div> 

        <div className="d-flex justify-content-evenly">
            {tabs.map((t,i)=>(
                <div className="border text-center"  style={{width:'25%'}}>{t}</div>
            ))}
        </div>
            
        <Container className="indicador-container">
            <Indicator/>
            <Inputer/>
            <Info/>
        </Container>
        
        </>
    )
}

