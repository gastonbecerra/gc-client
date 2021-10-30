import { useState, useEffect } from "react";
import { useParams } from "react-router";
import SelectContext from "./selectContext";

export default function Modulo(props){
    let {id} = useParams();

    const [indicadores, setIndicadores] = useState(false); 
    console.log(id);
    
    useEffect(()=>{
        fetch('/api/indicadores')
        .then(response => {
            return response.json();
        })
        .then(data =>{
            setIndicadores(data)
        })
    },[])

    return(
        <div>

        <h3>Modulo {id}</h3>
        <div id="modulo-indicadores">

        {indicadores ? 
            indicadores.map((ind,i)=>(
                <div key={i}>
                 {ind.title}
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