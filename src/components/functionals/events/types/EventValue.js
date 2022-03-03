import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { fetchInputsByUser, submitInput } from '../../../../store/slices/inputs';
import { fetchUser } from "../../../../store/slices/user";
import Button from '@mui/material/Button';
import { MdInput } from 'react-icons/md';

export default function EventValue({event, data}) {
  const { inputs } = useSelector(state => state.inputs);
  const { username, auth } = useSelector(state => state.user);
  const dispatch = useDispatch();
  const [ uservalue, setUservalue] = useState(false);

  useEffect(()=>{
    (inputs === false && username) && dispatch(fetchInputsByUser(username));
  },[])

  useEffect(()=>{
    if (inputs !== false){
      var value = inputs.filter(val => val.var === data.var)
      setUservalue(value);
    } 
  },[inputs])

  useEffect(()=>{
    console.log(uservalue)
  },[uservalue])
  
  return (
    <>
    
    <div className='event-title'>
        <span>
            A user has filled a new value! 
        </span> 
    </div>

    <div className='event-main'>
    <span style={{color: 'dodgerblue'}}>
            {' ' + data.var + ' '}
        </span>
         {' ' + ' = ' + ' '}
        <span style={{color: 'tomato'}}>
            {' ' + data.value}
        </span>
    </div>

    <div className='content'>
        
    {/* {
      
      uservalue &&
      
      <Button size="small" variant="outlined" color="primary" startIcon={<MdInput/>} style={{ width: '110px'}}>
        Inputs!
        
      </Button>
    } */}
   
    
    { uservalue &&

       <>
      {
        uservalue[0].var === "edad" && 
        <>
          <span>
            Your value: {uservalue[0].value}
          </span>
        </>
        }
        {
          uservalue.var === "ingresos" && 
        <>
            
        </>
        }
        {
          uservalue.var === "gastos" && 
        <>
            
        </>                                            
        }
      </> 
      
      }
    </div>


    </>
  )
}
