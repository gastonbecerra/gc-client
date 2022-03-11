import React, {useEffect, useState} from 'react'
import ColumnNav from '../../layout/columnNav';
import Axios from 'axios';
import './events.scss'
import * as EventCard from './index';
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "../../../store/slices/user";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function Event() {

  const [events, setEvents] = useState(false);
  const { username } = useSelector(state => state.user)
  let history = useHistory();
  const dispatch = useDispatch();

  // ONINITIS actions: get event data
  
  useEffect(()=>{
      username === false && dispatch(fetchUser());
  },[dispatch])

  useEffect(()=>{
      username === true && dispatch(fetchUser())
  },[username])

  useEffect(()=>{
    try{
      Axios({
        method: 'get',
        withCredentials: true,
        url: '/events/10'
      })
      .then((res)=>{
        setEvents(res.data)
      })
      .then((res)=>{
        
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
      
        default:
          break;
      }
      const Component = EventCard[type]
      return <Component event={event} data={event.data}/>;
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
                  
                  <Card key={i} sx={{width: 370}} className='event'>
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
