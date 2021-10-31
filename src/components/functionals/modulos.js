import { useState, useEffect } from "react";
import { useParams } from "react-router";
import SelectContext from "./selectContext";

export default function Modulo(props){
    let {id} = useParams();
    var moduleSelected = props.location.state.modulo;
    const [indicadores, setIndicadores] = useState(false); 
    console.log(id);
    
    useEffect(()=>{
        fetch(`/indicators/basics/${id}`)
        .then(response => {
            return response.json();
        })
        .then(data =>{
            setIndicadores(data)
        })
    },[])

    useEffect(()=>{
        console.log(indicadores);
    },[indicadores])

    return(
        <div className="indicadores-container">

        <h4>Indicadores {moduleSelected}</h4>
        <div id="modulo-indicadores">
        
        {indicadores !== false ? 
            indicadores.indicadores.map((ind,i)=>(
                <div key={i}>
                 {ind.name}
                </div>
            ))
            :
            "Fetching data from server..."
        }
        </div>
        <SelectContext/>
        {/* grafico> */}

        
        </div>
    )
}