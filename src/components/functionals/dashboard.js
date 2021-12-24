import { useEffect, useState } from "react";
import {Link} from 'react-router-dom';
import { Card, Button, ListGroup, Alert, ListGroupItem, Spinner, Container } from 'react-bootstrap';
import { fetchUser } from "../../store/slices/user";
import { fetchContexts } from "../../store/slices/context";
import { useDispatch, useSelector } from "react-redux";
import { saveModules } from "../../store/slices/modules";

export default function Dashboard(){
    
    const [show, setShow] = useState(false);
    const dispatch = useDispatch();
    const { id: user_id, auth} = useSelector(state => state.user)
    const { contexts } = useSelector(state => state.context);
    const { modules } = useSelector(state => state.modulo)

    useEffect(()=>{
        auth === false && dispatch(fetchUser());
        contexts === false && dispatch(fetchContexts());
    },[dispatch])

    useEffect(()=>{
        auth === true && dispatch(fetchUser())
    },[user_id])

    useEffect(()=>{
        if(modules === false){
        fetch('/indicators')
        .then(response => {
            return response.json();
        })
        .then(data =>{
            dispatch(saveModules(data))
        })
        .catch(()=>{
            dispatch(saveModules(false))
        })
    } 
    },[]) 

    return(
        <Container className="modulo-container">

        {auth == false ? <Alert color='primary'>You need to <Alert.Link href="/signin">login</Alert.Link> to access to all available data</Alert>
        
        : 
        
        <div className="modulo-list">
            {modules !== false ? 
                modules.map((m,i)=>(
                    <Card key={i} className="modulo-card" >
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
                            <Link to={{ pathname: `/modulo/${ind._id}`, state: { id: `${ind._id}`, name: `${ind.name}` } }}>
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
        </Container>
    )
}