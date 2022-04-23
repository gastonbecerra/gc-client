import React, {useEffect, useState} from 'react'
import ColumnNav from '../../layout/columnNav';
import Axios from 'axios';
import './events.scss'
import * as EventCard from './index';
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "../../../store/slices/user";
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import { fetchContexts, fetchContexts4User } from '../../../store/slices/context';
import { getSamples } from '../../../store/slices/samples';
import { fetchChartComments } from '../../../store/slices/comments';

export default function Event() {
  let history = useHistory();
  const dispatch = useDispatch();
  const [events, setEvents] = useState(false);
  const { username } = useSelector(state => state.user);
  const { contexts, context4user } = useSelector(state => state.context);

  // ONINITIS actions: get event data
  
  useEffect(()=>{
    if((username !== true) || (username === undefined) ) dispatch(fetchUser())
    !contexts && dispatch(fetchContexts());
  },[]);

  useEffect(()=>{
    if(context4user === false) dispatch(fetchContexts4User(username));
  },[username])

  useEffect(()=>{
    try{
      
      dispatch(getSamples('Macristas'));      
      
      dispatch(fetchChartComments());

      Axios({
        method: 'get',
        withCredentials: true,
        url: '/events/20'
      })
      .then((res)=>{
        setEvents(res.data)
      })
      .then(()=>{
        //username === false && history.push('/signin');
      })
      
    }catch(e){
      console.log(e)
    }
  },[])

  //render required event
  const renderequiredEvent = (event) => {
    try{
      
      let type;
  
      switch (event.type) {
        case 'CONTEXT_CREATION':
          type='EventContext'
          break;
  
        case 'VALUE_CREATION':
          type='EventValue'
          break;
        
        case 'comment':
          type='EventComment';
          break;
        
        case 'image':
          type = false;

        default:
          break;
      }
      var Component;
      if(type){
        Component = EventCard[type];
        return <Component event={event} data={event.data}/>;
      }else{
        return null;
      }
    }catch(e){
      console.log(e)
    }
  }
    
  return (
    <div className="main">
      
      <ColumnNav/>

      <div className="wrap-content">

        <div className="content">
          <div className="inner-content">

              <div className="event-list">

              {events.length > 0 ?
                
                events.map((e,i)=>(
                  
                  <Card key={i} sx={{width: '100%'}} className='event'>
                      <div className="event-mold">
                        <Typography className="event-date" sx={{ fontSize: 11 }} color="text.secondary">
                          {e.timestamp}
                        </Typography>
                        <div className='event-card'>
                          {renderequiredEvent(e)}
                        </div>
                      </div>
                      <div className="event-comment">

                      </div>
                  </Card>
                  
                ))
                : null
              }

              </div>


          </div>
        </div>
      </div>

    </div>
  )
}
