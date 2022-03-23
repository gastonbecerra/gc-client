import React, { useState } from "react";
import "./messaging.scss";
import { MdOutlineModeComment } from "react-icons/md";
import { FiShare2 } from "react-icons/fi";
import { BsArrowUpSquare, BsArrowDownSquare } from "react-icons/bs";
import { useEffect } from "react";
import CommentBase from "./listCommentBase";
import BaseInput from "./baseComment";
import Axios from "axios";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function Message({muestra}) {
  const [ counterM, setMCounter ] = useState(87); // t2
  const [ counterL, setLCounter ] = useState(27); // t2
  const [ flag, setFlag ] = useState(false); // if true available comments are displayed
  const [ message, setMessage ] = useState(false); // setter and getter for messaage object sended by user
  const [ stack, setStack ] = useState([]); // stores comments send by client. If repeated in stack, not sended to DB (provisional solution to bug)
  const [ loading, setoLading] = useState(false);
  const [responseTree, setResponseTree ] = useState({
    reference : {
      entity: 'chart',
      context: muestra.context,
      indicator: muestra.indicator,
    },
    comments: [ 
        /* 
        { 
          user: 'jp', 
          message: 'coso', 
          timestamp: '0202002342 
        },
        { 
          user: 'jp', 
          message: 'coso', 
          timestamp: '0202002342 },
          comments
        
          */
    ]
  });

  /*---------------------------------CICLOS--------------------------------- */
  //ON INNIT => get responseTree if exists
  useEffect(()=>{
    getResponseTree()
  },[])

  //When MESSAGE hcanges IT SEEMS NOT USED
  useEffect(()=>{
    try{
      if(message !== false && stack.length > 0) {      
        var index = stack.findIndex(m => (m.message === message.message && m.user === message.user))
        index === -1 && commentApiHandler(message)
      }
      if(message !== false && stack.length === 0){
        commentApiHandler(message)
      }
    }catch(e){
      console.log('failure saving none repetead comments')
    }
    if(message !== false) {
        var aux = Object.assign({}, responseTree); 
        aux.comments.push(message)
        setResponseTree(aux)
    }
  },[message])

  //when ResponseTree changes
  useEffect(()=>{
    
  },[responseTree])


  /*---------------------------------FUNCIONES--------------------------------- */

  //Update comments an inner.comments in UI
  const handleAnswer = (obj, idx) => {
    let aux = Object.assign({}, responseTree);
    aux.comments[idx] = obj;
    setResponseTree(aux);
    alert(JSON.stringify(obj))
  }


  // Check the existence of charts' comments in DDBB
  const getResponseTree = () =>{
    Axios({
      method: 'GET',
      url: `/comments/${muestra.context}/${muestra.indicator}`,
      withCredentials: true,
    }).then((data)=>{
      setResponseTree(data)
    }).catch((e)=>{
      console.log('no comments added yet');
    })
    setoLading(true)
  }

  // POST or PUT new comments 
  const commentApiHandler = (message) => {
    Axios({
      method: 'POST',
      url: '/comments/create',
      withCredentials: true,
      data: { message, base_reference: responseTree.reference, comment_reference: false }
    })
    .then(()=>{
      setStack([...stack, message])
    })
    .then(()=>{
      
    })
    .catch(()=>{
      console.log('failure saving comments')
    })
  }

  useEffect(()=>{
    console.log(stack);
  },[stack])


  
  return (
    <>

    {
      
      loading 
      
      ?
      
      <>
      <div onClick={() => setFlag(!flag)} className="message-container">
        <div className="p-2">
          <BsArrowDownSquare />
          <span>{" " + counterL + " "}</span>
          <BsArrowUpSquare />
        </div>
        <div className="p-2">
          {!flag ? 'show ' : ' hide '}
          <MdOutlineModeComment />
          {" " + counterM}
        </div>
        <div>
          <FiShare2 /> Share
        </div>
      </div>
      <>
      
      { flag &&
      
        responseTree.comments.length > 0 ?

          <>
          {responseTree.comments.map((message,i)=>(
            <>
              <CommentBase message={message} handleAnswer={handleAnswer} key={i} idx={i}/>
            </>
          ))} 
          <BaseInput setMessage={setMessage}/>          
          </>
          :          
          <BaseInput setMessage={setMessage}/>          
      }
      </>
      </>
      :  
      <Box sx={{ display: 'flex' }}>
        <CircularProgress />
      </Box>
 
    }
          
    </>
)
}

/* 
reference : {
  entity: 'context',
  context: 'muestra.context',
},
comments: [ 
    { 
      user: 'Juancho', 
      message: 'Miren el carpincho tirándose un peod', 
      timestamp: '0202002342,
      media: 'www.youtube.com/carpincho-gastrico'
      comments [ 
        { 
          user: 'Juancho', 
          message: 'Miren el carpincho tirándose un peod', 
          timestamp: '0202002342,
        },
        { 
          user: 'Juancho', 
          message: 'Miren el carpincho tirándose un peod', 
          timestamp: '0202002342, 
          reference: '-......'
        },
         { 
          user: 'Juancho', 
          message: 'Miren el carpincho tirándose un peod', 
          timestamp: '0202002342, 
          reference: '-......',
          lvel: 1

        },
      ] 
    },
*/
