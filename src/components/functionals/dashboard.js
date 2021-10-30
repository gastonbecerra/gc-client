import { useEffect, useState } from "react";
import {Link} from 'react-router-dom';

export default function Dashboard(){
    
    //VARIABLES DE ESTADO. "data => variable, setData => controla el valor"
    const [modulos, setModulos] = useState(false)
    
    //CICLO DE VIDA - [] corchetes vacios al inicio del componente
    useEffect(()=>{
        fetch('/api/modulos')
        .then(response => {
            return response.json();
        })
        .then(data =>{
            setModulos(data)
        })
    },[]) // [] => corchete vacio efecto se ejecuta al comienzo 

    return(
        <div>
            <h3>Dashboard</h3>
            {modulos ? 
                modulos.map((m,i)=>(
                    <div key={i}>
                     <Link to={{ pathname: `/modulo/${m.id}`}}>
                         {m}
                    </Link>
                    </div>
                ))
            :
            "ESPERAME UN CACHO"
            }
        </div>
    )
}