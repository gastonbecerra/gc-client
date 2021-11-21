import { useEffect, useState } from "react";
import {Link} from 'react-router-dom';
import { Card, Button, ListGroup, Alert, ListGroupItem, Spinner } from 'react-bootstrap';
//redux
import { fetchUser } from "../../store/slices/user";
import { fetchContexts } from "../../store/slices/context";
import { useDispatch, useSelector } from "react-redux";

export default function Dashboard(){
    
    const [modulos, setModulos] = useState(false);
    const [show, setShow] = useState(false);
    const dispatch = useDispatch();
    const {auth} = useSelector(state => state.user)

    useEffect(()=>{
        dispatch(fetchUser());
        dispatch(fetchContexts());
    },[dispatch])

    useEffect(()=>{
        fetch('/modules/mindicators')
        .then(response => {
            return response.json();
        })
        .then(data =>{
            setModulos(data)
        })
        .catch(()=>{
            setModulos(false)
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

        {auth == false ? <Alert color='primary'>You need to <Alert.Link href="/signin">login</Alert.Link> before access to indicator data</Alert>
        
        : 
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
                            <ListGroupItem key={i}>
                            <div className="ms-2">
                            <div className="fw-bold">{ind.name}</div>
                            <Card.Text className="my-2">{ind.description}</Card.Text>
                            </div>
                            <Link to={{ pathname: `/innermodulo/${ind._id}`, state: { indicator: `${ind.name}`, modulo: `${m.title}` } }}>
                                <Button size="sm" className="my-0.5 pl-1" variant="outline-primary">Acceder</Button>    
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
        </div>
        
        }
            <Link  to={{ pathname: `/modulo/618043fa8d4b26307ac61c76`, state: { id: '61803b098d4b26307ac61c71', name: "Ahorro" } }}>
                <Button size="sm" variant="outline-primary">Test new UI</Button>    
            </Link>
        </div>
    )
}