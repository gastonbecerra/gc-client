import { useEffect, useState } from "react";
import { Tabs, Tab, Stack } from "react-bootstrap";
import Inputer from "./innermodule/inputer";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedIndicator, fetchIndicatorByUser } from "../../store/slices/indicator";
import Indicator from "./innermodule/indicator";
import { Link } from 'react-router-dom';

export default function Modulo(props){
    const dispatch = useDispatch()
    let tabs = ["Inputs", "Indicator", "Documentation", "Muestra"]
    const {auth, id: user_id} = useSelector(state => state.user)
    const {id : indicator_id, name: indicator_name } = useSelector(state => state.indicator.selectedIndicator)
    const { inputs_faltantes } = useSelector(state => state.indicator)
    const { selectedContext: context_id } = useSelector(state => state.context)
    let indicatorState = props.location.state;
    const [flag, setFlag] = useState(false);

    useEffect(()=>{
        dispatch(setSelectedIndicator(indicatorState)) 
    },[])

    useEffect(()=>{
        if(indicator_id === indicatorState.id) setFlag(true);
    },[indicator_id])

    useEffect(()=>{
        if(flag) dispatch(fetchIndicatorByUser(indicator_id, context_id, user_id));
    },[flag])

    return(
        <>
        <div id="indicator-nav" className="d-flex justify-content-center">
            {/* <div className="bg-light border text-center" style={{width:'20%'}}><Link style={{textDecoration:'none'}}to={'/'}>Back</Link></div> */}
            <div className="bg-light border text-center"><Link style={{textDecoration:'none', color: 'black', fontWeight: '700'}}to={'/'}>Back</Link></div>
            <div className="bg-light border text-center"><Link style={{textDecoration:'none'}}to={'/'}>Ahorro</Link></div>
            <div className="bg-light border text-center"><Link style={{textDecoration:'none'}}to={'/'}>Ingr. x hora</Link></div>
            <div className="bg-light border text-center"><Link style={{textDecoration:'none'}}to={'/'}>Ind. 3</Link></div>
        </div>
            <Tabs className="tab-indicator" defaultActiveKey={inputs_faltantes == false ? 'Indicator': 'Inputs'}> 
            

                <Tab eventKey={tabs[0]} title={tabs[0]} key={tabs[0]}>
                    <Inputer/>
                </Tab>

                <Tab eventKey={tabs[1]} title={tabs[1]} key={tabs[1]} disabled={inputs_faltantes !== false ? true: false }>                
                        <Indicator/>
                </Tab>

                <Tab eventKey={tabs[2]} title={tabs[2]} key={tabs[2]}>
                
                        {tabs[2]}
                </Tab>

                <Tab eventKey={tabs[3]} title={tabs[3]} key={tabs[3]}>
                <span>{indicator_name}</span>
                        {tabs[4]}
                </Tab>
            
            </Tabs>        
        </>
    )
}
