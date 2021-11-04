import { useState, useEffect } from "react";
import { useParams } from "react-router";
import SelectContext from "./selectContext";
import {Tabs, Tab} from 'react-bootstrap'

export default function Modulo(props){
    let {id} = useParams();
    var moduleSelected = props.location.state.modulo;
    const [indicadores, setIndicadores] = useState(false); 
    
    useEffect(()=>{
        fetch(`/indicators/api/basics/${id}`)
        .then(response => {
            return response.json();
        })
        .then(data =>{
            setIndicadores(data)
        })
    },[])

    return(
        <div className="indicadores-container">

        <h4>Indicadores {moduleSelected}</h4>
        <Tabs id="modulo-indicadores">
        
        {indicadores !== false ? 
            indicadores.indicadores.map((ind,i)=>(
                <Tab eventKey={ind.name} title={ind.name}   key={i}>
                    {ind.name}
                </Tab>
            ))
            :
            "Fetching data from server..."
        }
        </Tabs>
        <SelectContext/>
        {/* grafico> */}
        
        </div>
    )
}