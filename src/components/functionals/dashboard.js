import { useEffect, useState, useContext } from "react";
import {Link} from 'react-router-dom';
import { Card, Button, ListGroup, Alert, ListGroupItem, Spinner } from 'react-bootstrap';
import Axios from 'axios'; 
import { UserContext } from "../context/context";

export default function Dashboard(){
    
    const [modulos, setModulos] = useState(false);
    const {setUser} = useContext(UserContext);
    const [show, setShow] = useState(false);

    useEffect(()=>{
        fetch('/modules/mindicators')
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
    },[]) 

    useEffect(()=>{
        console.log(modulos);
    },[modulos])
    return(
        <div className="modulo-container">
        
        {show ? 
        
            <Alert variant="success" onClose={() => setShow(false)} dismissible>
                <Alert.Heading>Hey!</Alert.Heading>
                <p>
                    En <strong>Get Context( )</strong> tendrás acceso a diferentes indicadores, separados en módulos, 
                    que te permitirán situarte en contextos diferentes en relación a otros usuarios.
                </p>
                <hr />
                <p className="mb-0">
                    Para ellos te pediremos compartir ciertos datos, anonimizados, que te permitirán seguir conociéndoto, y conociendo a otros en un marco de respecto y tolerancia. 
                </p>
                <strong>More info right here...</strong>
            </Alert>

            :

            <Alert onClick={() => setShow(true)} variant="success"><strong>What is this all about?</strong></Alert>

        }

            <div className="modulo-list">
            {modulos !== false ? 
                modulos.map((m,i)=>(
                    <Card key={i} className="modulo-card" border="success">
                        <Card.Header as="h5">{m.title}</Card.Header>
                        
                        <Card.Body>
                            <Card.Text>{m.text}</Card.Text>
                        </Card.Body>

                        {m.indicators.length === 0  ? 
                        
                        null

                            :
                        <ListGroup>
                         {m.indicators.map((ind, i)=>(
                            <ListGroupItem>
                            <div className="ms-2 me-auto">
                            <div className="fw-bold">{ind.name}</div>
                            <Card.Text>{ind.description}</Card.Text>
                            </div>
                            <Link  to={{ pathname: `/innermodulo/${ind._id}`, state: { indicator: `${ind.name}`, modulo: `${m.title}` } }}>
                                <Button size="sm" variant="outline-primary">Acceder</Button>    
                            </Link>
                            </ListGroupItem>
                         ))}
                         </ListGroup>

                        }
                    </Card>
                ))
            :
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
            }

            <Link  to={{ pathname: `/modulo/618043fa8d4b26307ac61c76`, state: { indicator: ' ' } }}>
                <Button size="sm" variant="outline-primary">Acceder</Button>    
            </Link>
            </div>
        </div>
    )
}