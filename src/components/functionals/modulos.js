import { useState, useEffect } from "react";
import { useParams } from "react-router";
import Axios from 'axios';
import {Link} from 'react-router-dom';;

export default function Modulo(props){
    let {id_module} = useParams();
    var moduleSelected = props.location.state.modulo;
    const [indicadores, setIndicadores] = useState(false); 

    useEffect(()=>{
        Axios.get(`/modules/${id_module}`)
        .then(response => {
            setIndicadores(response.data);
        })
    },[])

    return(
        <div className="indicadores-container">
        <h4>Indicadores {moduleSelected}</h4>
        
        {indicadores !== false ?
            indicadores.map((ind,i)=>(
                <Link  to={{ pathname: `/innermodulo/${ind._id}`, state: { selectedIndicator: `${ind.name}` } }}>
                        {ind.name}
                        {'  '}
                </Link>
            ))
            :
            "Fetching data from server..."
        }
        </div>
    )
}
