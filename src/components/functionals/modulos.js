import { useEffect } from "react";
import { Tabs, Tab} from "react-bootstrap";
import Inputer from "./innermodule/inputer";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedIndicator, fetchIndicatorByUser } from "../../store/slices/indicator";

export default function Modulo(props){
    let tabs = ["Inputs", "Indicator", "Documentation", "Muestra"]
    var indicatorState = props.location.state;
    const dispatch = useDispatch()
    const {auth, id: user_id} = useSelector(state => state.user)
    const {id : indicator_id, name: indicator_name } = useSelector(state => state.indicator.selectedIndicator)
    const { inputs_faltantes } = useSelector(state => state.indicator)
    const { selectedContext: context_id } = useSelector(state => state.context)
    
    useEffect(()=>{
        dispatch(setSelectedIndicator(indicatorState))
    },[dispatch])
    
    useEffect(()=>{
        dispatch(fetchIndicatorByUser(indicator_id, context_id, user_id))
    },[indicator_id])

    return(
        <>
            <Tabs className="tab-indicator" defaultActiveKey={inputs_faltantes === false ? 'Indicator': 'Inputs'}> 
            
                <Tab eventKey={tabs[0]} title={tabs[0]} key={tabs[0]}>
                    <Inputer/>
                </Tab>

                <Tab eventKey={tabs[1]} title={tabs[1]} key={tabs[1]}>
                        {tabs[1]}
                </Tab>

                <Tab eventKey={tabs[2]} title={tabs[2]} key={tabs[2]}>
                        {tabs[2]}
                </Tab>

                <Tab eventKey={tabs[3]} title={tabs[3]} key={tabs[3]}>
                        {tabs[4]}
                </Tab>
            
            </Tabs>


        
        </>
    )
}
