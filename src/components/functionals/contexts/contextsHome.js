import { Select } from '@mui/material';
import { fontSize } from '@mui/system';
import React, { useEffect , useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import context, { fetchContexts, fetchContexts4User, removeContexts4User, addContexts4User } from '../../../store/slices/context';
import Axios from 'axios';

import LabComponent from './labComponents/labComponent';
export default function Context(props) {

    const dispatch = useDispatch();
    const { username } = useSelector(state => state.user);
    const { context4user } = useSelector(state => state.context);
    const { contexts } = useSelector(state => state.context);
    const [contextForUser, setContextForUser] = useState([]);
    const [inputs, setInputs] = useState(false);
    const [title, setTitle] = useState()
    const [rule1, setRule1] = useState(false);
    const [rule2, setRule2] = useState(false);
    const [selected1, setSelected1] = useState(1);
    const [selected2, setSelected2] = useState(2);
    const [counter, setCounter] = useState(false);
    const [createdContext, setCreatedContext] = useState(
    //     {
    //     context: 'PRUEBA',
    //     conditions: {
    //         var: {$in: ['edad', 'ingresos']},
    //         edad: { $gt: 17, $lt: 66 },
    //         ingresos: {$gte: 100000}
    //     },
    //     info: 'xxxxxx',
    //     timestamp: Date.now(),
    // }
    );

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
        setContextForUser(context4user)

    },[])

    useEffect(() => {
        setContextForUser(context4user)
    }, [context4user]);

    useEffect(()=>{
        try{
            // if(rule1.variable !== rule2.variable){
                var r1 = rule1[0]
                setCreatedContext({
                    context: title,
                    conditions :[
                        rule1 && rule1,
                        rule2 && rule2
                    ],
                    info: 'xxxxxx',
                    timestamp: Date.now(),
                })
            // }

        }catch(err){
            console.log(err);
        }
        
    },[rule1, rule2, title, selected1, selected2])

    

    const addContext = context => {
        try{

            if(contextForUser.length === 0){
                setContextForUser([context])
            }else{
                const index = contextForUser.findIndex((item) => item.context === context.context)
                index === -1 && setContextForUser([...contextForUser, context])
            } 
        }catch(err){
            console.log(err);
        }
    }

    const removeContext = context => {
        try{
            contextForUser.splice(contextForUser.findIndex(c => c.context === context.context), 1);
            setContextForUser([...contextForUser]);
        }catch(err){
            console.log(err);
        }
    };

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

    return( 
        <div style={{minHeight:'200vh !important', overflowY:'scroll', fontSize: 'smaller'}}>

        <div >
        <h5>Tus contextos</h5>
        <p>Estos son los contextos que usas para comparar tus indicadores: </p>
        {
            contextForUser && 
            <ul>
            {
            contextForUser.map(( context, i ) => (
                <li onClick={()=> removeContext(context)}>
                    {context.context} 
                        &nbsp;                     
                </li>
            ))}
            </ul>
        }
        </div>

        <div>

            <h5>Todos los contextos de nuestra base</h5>

            {
                contexts &&
                <ul>
                    {
                        contexts.map(( context,i ) => (
                            <li onClick={()=> addContext(context)}>
                                {context.context}
                                &nbsp;
                            </li>
                        ))
                    }
                </ul>
            }
        </div>

        <div>
            <h5>Lab context</h5>
            {selected1 === selected2 && <p style={{fontSize: '12px', color: 'tomato', fontWeight:'700'}}>Choose None repited variable</p>}
            Give your context a title:
                <input type="text" id="title" defaultVale={'undefined'} onChange={(e)=> setTitle(e.target.value)}/>
            <div style={{height:'100vh !important', overflowY: 'scroll', display: 'flex'}}>
                
                <LabComponent inputs={inputs} ruler={setRule1} selecter={setSelected1} s1={selected1} s2={selected2}/>
                <LabComponent inputs={inputs} ruler={setRule2} selecter={setSelected2} s1={selected1} s2={selected2}/>
            </div>
        </div>

        
        <pre style={{fontSize: '9px', color: 'red', fontWeight: '700'}}>{JSON.stringify(createdContext)}</pre>

        <div style={{fontSize: '9px'}}>
            <h5 onClick={() => getCountContext()}>Users touched by context</h5>
            <span style={{fontWeight: '700', fontSize: '12px', paddingLeft:'10px', color: 'tomato'}}>{counter && counter}</span>
        </div>

        </div>
     );
}