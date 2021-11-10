import { useEffect, useState, useContext } from "react";
import {Link} from 'react-router-dom';
import { Card, Button } from 'react-bootstrap';
import Axios from 'axios'; 
import { UserContext } from "../context/context";

export default function Dashboard(){
    
    //VARIABLES DE ESTADO. "data => variable, setData => controla el valor"
    const [modulos, setModulos] = useState(false)
    
    const {setUser} = useContext(UserContext);

    //CICLO DE VIDA - [] corchetes vacios al inicio del componente
    useEffect(()=>{
        fetch('/modules')
        .then(response => {
            return response.json();
        })
        .then(data =>{
            setModulos(data)
        })
        .then(()=>{
            Axios({
                method: "GET",
                withCredentials: true,
                url: "/user",
            }).then((res) => {
                setUser(res.data)
                console.log(res.data);
            });
        })
    },[]) // [] => corchete vacio efecto se ejecuta al comienzo 

    return(
        <div className="modulo-container">
            <h4>Listado de módulos disponibles</h4>
            <div className="modulo-list">
            {modulos !== false ? 
                modulos.map((m,i)=>(
                    <Card key={i} className="modulo-card">
                        <Card.Header as="h5">{m.title}</Card.Header>
                        <Card.Body>
                            <Card.Text>{m.text}</Card.Text>
                        </Card.Body>
                     <Link to={{ pathname: `/modulo/${m._id}`, state: { modulo: `${m.title}` } }}>
                        <Button variant="primary">Indicadores</Button>    
                    </Link>
                    </Card>
                ))
            :
            "ESPERAME UN CACHO"
            }
            </div>
        </div>
    )
}