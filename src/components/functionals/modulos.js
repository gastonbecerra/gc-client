import { useState, useEffect } from "react";
import { useParams } from "react-router";
import {Tabs, Tab} from 'react-bootstrap'
import InnerModule from "./innerModule";

export default function Modulo(props){
    let {id_module} = useParams();
    var moduleSelected = props.location.state.modulo;
    const [indicadores, setIndicadores] = useState(false); 
    
    useEffect(()=>{
        fetch(`/modules/${id_module}`)
        .then(response => {
            return response.json();
        })
        .then(data =>{
            setIndicadores(data)
            console.log(data);
        })

    },[])

    return(
        <div className="indicadores-container">

        <h4>Indicadores {moduleSelected}</h4>
        <Tabs id="modulo-indicadores">
        
        {indicadores !== false ?
            indicadores.map((ind,i)=>(
                <Tab eventKey={ind.name} title={ind.name} key={i}>
                    <InnerModule 
                        indicatorId={ind._id} 
                        
                        />
                </Tab>
            ))
            :
            "Fetching data from server..."
        }
        </Tabs>
        </div>

    )
}