import React, { useState, useEffect } from 'react';
import { Switch } from '@mui/material';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Typography, Divider, Chip, Grid } from '@mui/material';
import { AiOutlineShareAlt } from 'react-icons/ai';
import { Row, Col} from 'react-bootstrap';
import { useDispatch, useSelector } from "react-redux";
import { addContexts4User, removeContexts4User } from '../../../../store/slices/context';
import { fetchUser } from "../../../../store/slices/user"
import { useHistory } from "react-router-dom";
import Axios from 'axios';

export default function EventContext({event, data}) {
    const dispatch = useDispatch();
    const { context4user } = useSelector(state => state.context);
    const [ ascription, setAscription ] = useState(false);
    const { username, auth } = useSelector(state => state.user);
    const [ rules_qty, setRules_qty] = useState(0); // counts the number of criteria mented for the context
    const [scope, setScope] = useState(0);
    const [reach, setReach] = useState(false)
    const [subscribes, setSubscribers] = useState(0);
    let history = useHistory();

    // on init functions
    useEffect(() =>{
        // auth === false && dispatch(fetchUser());
        // if( !auth || !username )  history.push('/signin')
        try{
            checkReach()
            checkSubscribers()
        }catch(e){
            console.log({msge: 'fail scope checking on init', err: e});
        }
    },[])

    // counts the numebr of rules in the context
    useEffect(()=>{
        try{
            setRules_qty(data.condition.length)
        }catch(e){
            console.log(e);
        }            
    },[context4user])

    // Checks if user is already subscribed into context
    const checker = () => {
        context4user &&
        context4user.forEach(element => {
            if(element.context === data.context){
                setAscription(true)
            }
        });   
    }

    // Checks on initit
    useEffect(()=>{
        checker()
    },[context4user])

    // Manage switch subscrition checked value
    const handleChange = (event) => {
        console.log(event.target.checked);
        setAscription(event.target.checked);
        
        // Manage user context subscription and desuscription 
        event.target.checked === true && dispatch(addContexts4User(username, data.context))
        event.target.checked === false && dispatch(removeContexts4User(username, data.context))
    };
    
    // Check if user is reached by the context's scope
    const checkReach = () => {
        console.log(username)
        console.log(data.condition)
        try{
            Axios({
                method: 'POST',
                withCredentials: true,
                url: '/contexts/checkscope',
                data: [data.condition, username]
            })
            .then((res)=>{
                setScope(res.data.matches.length)
                setReach(res.data.matches.includes(username))
            })
        }catch(e){
            console.log(e);
        }
    }

    // Get subscribers number
    const checkSubscribers = () => {
            try{
                Axios({
                    method: 'POST',
                    withCredentials: true,
                    url: '/contexts/countsubscribers',
                    data: [data.context]
                })
                .then((res)=>{
                    setSubscribers(res.data.length)
                })
        }catch(e){
            console.log({status: 'error', mge: e});
        }
        
    }

  return (
    <>
        <div className='event-title'>
            <span style={{color: 'dodgerblue'}}>
                {event.user + ' '}
            </span> 
                has created a new context! 
        </div>

        <div className='event-main'>
            <span style={{color: 'tomato'}}>
                {' ' + data.context}
            </span>
        </div>

        <div className="event-content">


            <div className="info">
                <span><strong>Info</strong></span>
                <div>{data.info}</div>
            </div>    

            <Row className='highlights'>
                <Col 
                    className="highlight-column"
                >

                    <div className='highlight-header'>
                        {subscribes}
                    </div>

                    <div className='highlight-title'>
                        Subscribers
                    </div>

                </Col>
                
                <Col className="highlight-column">

                    <div className='highlight-header'>
                        {scope}
                    </div>

                    <div className='highlight-title'>
                        Scope 
                    </div>
                </Col>
                
                <Col className="highlight-column">
                    
                    <div className='highlight-header'>
                        {rules_qty}
                    </div>

                    <div className='highlight-title'>
                        Rules
                    </div>

                </Col>

            </Row>
            {
            /* <div className="scope">
            <Divider variant="large" />   
            <span><strong>Condition</strong></span>
            {
            data.condition.length > 0 && 

            data.condition.map((e,i)=>(
                <>
                    {e && 
                    <>
                        <li style={{listStyle: 'none'}}><strong>{e.var}</strong>
                        <>
                        {
                            e.op === "$gte" && 
                            <>
                                {' '} bigger than {e.value}
                            </>
                            }
                            {e.op === "$lte" && 
                            <>
                                {' '} lesser than {e.value}
                            </>
                            }
                            {e.op === "btw" && 
                            <>
                                {' between'} {e.value[0]} {' '} and {' '} {e.value[1]}
                            </>                                            
                            }
                            {e.op === "$eq" && 
                            <>
                                {' equals to '} {e.value}
                            </>
                            }
                            {e.op === "$in" && 
                            <>
                                {' is any of '} {e.value.map((m)=> (<>{m}{', '}</>)) }
                            </>
                        }
                        </>
                        </li>                    
                    </>
                    }
                </>
            ))
            }            
            
            </div> */
            }

            <div className="subscribtion">

            <div style={{width: '25%'}}>
                <FormGroup>
                    <FormControlLabel 
                        control={

                            <Switch                         
                                size="small"
                                checked= {ascription}
                                onChange={(e) => handleChange(e)}                                
                                
                            />
                        } 
                        label={<Typography variant="body3" color="textSecodary">{ascription ? 'Suscribed!' : ' Subscribe!'} </Typography>}
                        labelPlacement="bottom"
                     />
                </FormGroup>
            </div>
                
                <div 
                    style={{width: '50%', textAlign: 'center', fontWeight: '600'}}
                    onClick={()=>checkReach()}
                >
                    
                    {reach ? <span style={{color: 'dodgerblue'}}>Reached</span> : <span>Note reached</span>}
                </div>
                
                <div style={{width: '25%', position: 'relative', right: -24}}>
                    <AiOutlineShareAlt style={{fontSize: '30px'}} />
                </div>
                

                
            </div>
        </div>
        
        
    </>
  )
}
