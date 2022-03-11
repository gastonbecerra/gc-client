import './indicators.scss';
import { useEffect } from "react";
import { Link } from 'react-router-dom';
import { Card, ListGroup, ListGroupItem } from 'react-bootstrap';
import { fetchUser } from "../../../store/slices/user";
import { fetchContexts } from "../../../store/slices/context";
import { useDispatch, useSelector } from "react-redux";
import { saveModules, setSelectedModule } from "../../../store/slices/modules";
import { setSelectedIndicator } from "../../../store/slices/indicator";
import Alert from '@mui/material/Alert';
import { useHistory } from "react-router-dom";
import ColumnNav from "../../layout/columnNav";
import { Typography } from '@mui/material';
import Button from '@mui/material/Button';



export default function Dashboard(){
    
    const dispatch = useDispatch();
    const { id: user_id, auth} = useSelector(state => state.user)
    const { contexts } = useSelector(state => state.context);
    const { modules } = useSelector(state => state.modulo);
    let history = useHistory();

    useEffect(()=>{
        auth === false && dispatch(fetchUser());
        contexts === false && dispatch(fetchContexts());
    },[dispatch])

    useEffect(()=>{
        auth === true && dispatch(fetchUser())
    },[user_id])

    useEffect(()=>{
        if(modules === false){
        fetch('/modules')
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

    async function handleModuleNavigation (mod, indicator, id) {
        await dispatch(setSelectedModule(mod));
        await dispatch(setSelectedIndicator(indicator));
        history.push(
            {
                pathname: '/modulo',
                state: {  
                  id: id, 
                },
              }
        );
    }

    return(
        <div className="main">

        <ColumnNav/>

        <div className="wrap-content">

        
        <div className="content">
        {auth == false && 
        <Alert 
            className="my-2" 
            variant="outlined" 
            severity="info"
            style={{width: '90%'}}
            >
            
                You need to <Link to="/signin" style={{color: 'black'}}>login</Link> to access all available data
        </Alert>}

        {modules !== false && 
        <div className="inner-content">
            {modules.map((mod,i)=>(
                <div key={i}>
                <Card className="modulo-card" >
                        <Card.Header><Typography variant="h6">{mod.module}</Typography></Card.Header>
                        
                        <Card.Body>
                            <Card.Text>{mod.description}</Card.Text>
                        </Card.Body>

                        {mod.indicators.length > 0  && 
                        
                        <ListGroup>
                        {mod.indicators.map((ind, y)=>(
                            <ListGroupItem key={y}>
                            <>
                            
                            <Typography variant="subtitle1" style={{fontStyle: 'bold'}}>    {ind.indicator}</Typography>
                            
                            <Card.Text className="my-2">
                                <Typography variant="body2">{ind.description}</Typography>
                            </Card.Text>
                            </>
                            <Button variant="text" size="small" onClick={()=>handleModuleNavigation(modules[i], modules[i].indicators[y], ind._id)}>Acceder</Button>
                            </ListGroupItem>
                        ))}
                        </ListGroup>

                        }
                    </Card>
                </div>
            ))}
        </div>
        }
        </div>
        </div>
        </div>
    )
}

