import React, { useEffect , useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import  { fetchContexts, fetchContexts4User, removeContexts4User, addContexts4User } from '../../../store/slices/context';
import Axios from 'axios';
import './context.scss';
import LabComponent from './labComponents/labComponent';
import ColumnNav from "../../layout/columnNav";
import { fetchUser } from "../../../store/slices/user";
import { useHistory } from "react-router-dom";
import { Button, Card, Tabs, Tab, Alert, Form } from 'react-bootstrap';

export default function Context(props) {
    const { context4user } = useSelector(state => state.context);
    let history = useHistory();
    const dispatch = useDispatch();
    const { username, auth } = useSelector(state => state.user);
    const { contexts } = useSelector(state => state.context);
    const [contextForUser, setContextForUser] = useState([]);
    const [inputs, setInputs] = useState(false);
    const [title, setTitle] = useState(false)
    const [rule1, setRule1] = useState(false);
    const [rule2, setRule2] = useState(false);
    const [selected1, setSelected1] = useState(1);
    const [selected2, setSelected2] = useState(2);
    const [counter, setCounter] = useState(false);
    const [createdContext, setCreatedContext] = useState();
    const [description, setDescription] = useState(false)

    // on init functions
    useEffect(()=>{
        auth === false && dispatch(fetchUser());
        if( !auth || !username )  history.push('/')
    },[])

    useEffect(()=>{
        if(selected1 === selected2){
            setRule1(false)
            setRule2(false)
        }
    },[selected1, selected2])

    useEffect(() => {
        Axios({
            method: 'GET',
            withCredentials: true,
            url: '/vars'
        })
        .then((res)=>{
            setInputs(res.data)
        })
        .catch((error)=>{
            console.log(error, ' error fetching inputs');
        })
        dispatch(fetchContexts4User(username))
        dispatch(fetchContexts())
        setContextForUser(JSON.parse(JSON.stringify(context4user)))
    },[])

    // set created context data 
    useEffect(()=>{
        try{            
                setCreatedContext({
                    context: title,
                    conditions :[
                        rule1 && rule1,
                        rule2 !== null && rule2
                    ],
                    user: username,
                    description: description,
                    timestamp: Date.now(),
                    scope: counter
                })
        }catch(err){
            console.log(err);
        }
        
    },[rule1, rule2, title, selected1, selected2])  

    // add context4user (both in component memory and database)
    const addContext = (context, e) => {
        e.preventDefault();
        try{
            if(contextForUser.length === 0){
                setContextForUser([context])
                dispatch(addContexts4User(username, context.context))
            }else{
                if(contextForUser.length < 3){
                    var index = contextForUser.findIndex((item) => item.context === context.context)
                    index === -1 && setContextForUser([...contextForUser, context])
                    index === -1 && dispatch(addContexts4User(username, context.context));
                }
            } 
        }catch(err){
            console.log(err);
        }
    }

    // remove context4user (both in component memory and database)
    const removeContext = (context, e) => {
        e.preventDefault();
        try{
            contextForUser.splice(contextForUser.findIndex(c => c.context === context), 1);
            setContextForUser([...contextForUser]);
            dispatch(removeContexts4User(username, context.context))
        }catch(err){
            console.log(err);
        }
    };

    // brings qty of users involved by created context
    const getCountContext = () => {
        try{
            Axios({
                method: 'POST',
                withCredentials: true,
                url: '/contexts/counter',
                data: createdContext
            })
            .then((res)=>{
                setCounter(res.data.matches)
            })
        }catch(e){
            console.log(e);
        }
    }

    // save context into the database
    const saveContext = (createdContext) => {
        Axios({
            method: 'post',
            withCredentials: true,
            url: '/contexts/create',
            data: createdContext
        })
        .then(()=>{
            console.log('TODO PIPI');
    })
    }

    return( 
        <div className="main">

            <ColumnNav/>

            <div className="wrap-content">

            <div className="content">

            <div className='inner-content'>

            <Tabs defaultActiveKey="Contexts" id="uncontrolled-tab-example" className="mb-3" style={{margin: 'auto'}}>
        
            <Tab eventKey="Contexts" title="Contexts">
            <div className='context-content' >
                <div className="lister-wrapper">
                <h5>Your contexts</h5>
                {
                    !contextForUser                        
                    
                    ? 
                    
                    <p>Elige de los contextos disponibles para adcribirte</p> 
                    
                    :
                    
                    <>
                    <Alert  className='info'>These are the contexts you will use to compare your self through indicators</Alert>
                    <div className='lister'>
                    {
                        contextForUser.map(( context, i ) => (
                        <Card className='context-item'>
                            <Card.Body key={i} >
                            {context.context} 
                                &nbsp;                     
                        </Card.Body>
                        <Button
                            size="sm"
                            variant="danger"
                            type={'button'} 
                            className='item-button' 
                            onClick={(e)=> removeContext(context, e)} 
                        >
                            -
                        </Button>
                        </Card>
                    ))}
                    </div>
                    </>
                }
                </div>
                
                

                <div className="lister-wrapper" style={{marginTop: '10px'}}>
                    <h5>Every context</h5>
                    <Alert className='info'>
                        These are all the contexts you can use to compare your self through indicators.
                        You may only choose 3 differents context for your comparisitions.
                    </Alert>
                    

                    {
                        contexts &&
                        <div className='lister'>
                            {
                                contexts.map(( context, i ) => (
                                    <Card className='context-item'>
                                    <Card.Body key={i}>
                                        {context.context}
                                        &nbsp;
                                    </Card.Body>
                                    <Button 
                                        size="sm"
                                        variant="success"
                                        type={'button'} 
                                        className='item-button' 
                                        onClick={(e)=> addContext(context, e)} 
                                    >+</Button>
                                    </Card>
                                ))
                            }
                        </div>
                    }
                </div>

            </div>

            </Tab>
            
            <Tab eventKey="Lab" title="Lab" style={{height:'100%'}}>
                <div className='lab-context'>
               
                    <h5 style={{textAlign: 'center'}}>Lab context</h5>
               
                    <Alert variant={'info'}>
                    <span>You are also able to create our own contexts to be used by all the community. </span>
                        You may choose between two differents variables or indicators to encapsulate a social group. And the check for avaibility and scope.
                    </Alert>

                    <div className="selecter">
                        <h6> 1) Give your context a title and a description:</h6>
                        <Form.Control type="text" id="title" placeholder='Enter a title' defaultVale={'undefined'} onChange={(e)=> setTitle(e.target.value)}/>                            
                        <Form.Control type="text" id="description" placeholder='Enter a description' as="textarea" defaultVale={'undefined'} rows={3} onChange={(e)=> setDescription(e.target.value)} style={{fontSize: 'small'}}/>                            
                    </div>

                    <div className="selecter">
                        
                        <h6> 2) Choose a value for each indicator</h6>

                        <div>
                            <LabComponent inputs={inputs} ruler={setRule1} selecter={setSelected1} s1={selected1} s2={selected2}/>
                        </div>    

                        <div style={{display: 'flex', justifyContent: 'center', margin: '-10'}}>
                            <hr style={{width: '270px', maxWidth: '450', color: 'black', border: 'solid 1px'}}></hr>    
                        </div>
                            
                        <div style={{marginTop: '7px'}}>
                            <LabComponent inputs={inputs} ruler={setRule2} selecter={setSelected2} s1={selected1} s2={selected2}/>
                        </div>
               
                        {selected1 === selected2 && <p style={{backgroundColor: 'lightcoral', textAlign: 'center', color: 'white', fontWeight:'700', marginTop:'5px'}}>Choose none repited variable</p>}

                    </div>     

                    <div className="selecter" style={{
                            textAlign: 'center',
                            fontStyle: 'italic',
                            color: rule1 || rule2 ? 'black' : 'lightgrey'
                        }}>

                        {!title ? <h6>preview</h6> : <h6 style={{color: 'tomato'}}>{title}</h6>}                        

                        {description ? <p style={{fontStyle:'normal', color: 'black', textAlign: 'left', padding: '5px'}}>{description}</p> : ' ' }

                        {(rule1 || rule2) &&
                            
                            <div className="rule-content">
                            
                            {rule1 &&
                                <div className='rule-box'>
                                    
                                    <li style={{listStyle: 'none'}}><strong>a) {rule1.var}</strong> 
                                        {rule1.op === "$gte" && 
                                        <>
                                            {' '} bigger than {rule1.value}
                                        </>
                                        }
                                        {rule1.op === "$lte" && 
                                        <>
                                            {' '} lesser than {rule1.value}
                                        </>
                                        }
                                        {rule1.op === "btw" && 
                                        <>
                                            {' between'} {rule1.value[0]} {' '} and {' '} {rule1.value[1]}
                                        </>                                            
                                        }
                                        {rule1.op === "$eq" && 
                                        <>
                                            {' equals to '} {rule1.value}
                                        </>
                                        }
                                        {rule1.op === "$in" && 
                                        <>
                                            {' is any of '} {rule1.value.map((m)=> (<>{m}{', '}</>)) }
                                        </>
                                        }
                                    </li>
                                    
                                </div>
                            }

                            {rule2 &&
                                <div className='rule-box'>
                                    
                                    <li style={{listStyle: 'none'}}><strong>b) {rule2.var}</strong> 
                                        {rule2.op === "$gte" && 
                                        <>
                                            {' '} bigger than {rule2.value}
                                        </>
                                        }
                                        {rule2.op === "$lte" && 
                                        <>
                                            {' '} lesser than {rule2.value}
                                        </>
                                        }
                                        {rule1.op === "btw" && 
                                        <>
                                            {' between'} {rule2.value[0]} {' '} and {' '} {rule2.value[1]}
                                        </>                                            
                                        }
                                        {rule2.op === "$eq" && 
                                        <>
                                            {' equals to '} {rule2.value}
                                        </>
                                        }
                                        {rule2.op === "$in" && 
                                        <>
                                            {' is any of '} {rule2.value.map((m)=> (<>{m}{', '}</>)) }
                                        </>
                                        }
                                    </li>
                                    
                                </div>
                            }

                        </div>
                        }
                        
                    
                    </div>

                    <div className="selecter">
                    <div className='checker'> 
                    <h6> 3) Check avability and scope</h6>                   
                    
                    <div style={{display: 'flex', justifyContent: 'flex-start', alignItems: 'center', marginBottom: '7px'}}>
                        
                        <Button 
                            style={{position: 'relative', bottom: 8, marginRight:'7px' }}
                            variant="outline-primary" 
                            size='sm'
                            id="check" 
                            onClick={() => getCountContext()} 
                            disabled={!rule1 && !rule2 && !title}
                        >
                            Check it!
                        </Button>

                        {counter && <span> There are <span className='counter'>{counter}</span> users implied in this context</span>}
                    </div>
                    
                    {
                        counter &&                     
                        <div style={{display: 'flex', justifyContent: 'flex-start', alignItems: 'center', marginBottom: '7px'}}>
                        
                        
                        <Button 
                            style={{position: 'relative', bottom: 8, marginRight:'7px' }}
                            variant="outline-primary" 
                            size='sm'
                            id="check" 
                            disabled={!counter}
                            onClick={()=> saveContext(createdContext)}
                        >
                            Create it!
                        </Button>

                        <span> Would you like to create this context?</span>
                    </div>
                    }
                    </div>
                    </div>

                </div>
            </Tab>    

            <Tab eventKey={"Explorer"} title="Explorer">

            </Tab>

            </Tabs>
            </div>
            </div>
            </div>
        </div>
     );
}